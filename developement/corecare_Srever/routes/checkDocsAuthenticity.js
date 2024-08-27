import express from 'express';
import pool from '../db.js';
import dotenv from 'dotenv';
import multer from 'multer';
import { PDFExtract } from 'pdf.js-extract';
import { createWorker } from 'tesseract.js';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function extractPdfContent(pdfFilePaths) {
    try {
        const pdfExtract = new PDFExtract();
        const options = {}; // Specify options if needed

        const promises = pdfFilePaths.map(async (pdfFilePath) => {
            const data = await pdfExtract.extract(pdfFilePath, options);
            const text = data.pages.map(page =>
                page.content.map(item => item.str).join(' ')
            ).join('\n\n');
            return { filePath: pdfFilePath, text };
        });

        const results = await Promise.all(promises);
        return results;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`One or more PDF files not found.`);
        } else {
            throw new Error('Error extracting text: ' + error.message);
        }
    }
}

// check authenticity of passport and id card
router.post('/checkidentity', upload.single('image'), async (req, res) => {
    const prompt = "if the text i provided is either extracted from an id card or a passport photo .. if it is from a passport extract passport number only without any other charachters before it or after it and return it in one line withoutany addiotional info, if it is from an id card extract id number only without any other charachters before it or after it and return it in one line withoutany addiotional info, and if it is neither return only empty string withoutany addiotional info";
    const file = req.file;
    const id = req.body.id;
    // const filePath = 'c:/Users/osama/Documents/v.jpg';
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    if (!prompt) {
        return res.status(400).send('Missing prompt in request body');
    }

    if (!file) {
        return res.status(400).send('Missing file in request body');
    }

    try {
        const worker = await createWorker('eng');
        const { data } = await worker.recognize(file.buffer);
        await worker.terminate();

        const fileContent = data.text;
        // Enhanced prompt creation
        const combinedPrompt = `Prompt: ${prompt}\nFile Content: ${fileContent}`;

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ];

        const parts = [{ text: combinedPrompt }];
        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            generationConfig,
            safetySettings,
        });
        const response = await result.response;
        const text = response.text().trim();
        if (id === text) {
            res.status(200).json({ message: "matched" })
        }
        else {
            res.status(400).json({ message: "Not match" })
        }

        // res.json(text);
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Internal Server Error');
    }
});

// check the authenticity of license document
router.post('/checklicense', upload.single('image'), async (req, res) => {
    const prompt = "if the text i provided is either extracted from doctor license , hospital license, pharmacy license, laboratory license or Radiology center license    .. extract license number only (it may contain charachters and special charachters) and return it in one line withoutany addiotional info, and if it is neither return only empty string withoutany addiotional info";
    const file = req.file;
    const id = req.body.id;
    // const filePath = 'c:/Users/osama/Documents/v.jpg';
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    if (!prompt) {
        return res.status(400).send('Missing prompt in request body');
    }

    if (!file) {
        return res.status(400).send('Missing file in request body');
    }

    try {
        const worker = await createWorker('eng+ara');
        const { data } = await worker.recognize(file.buffer);
        await worker.terminate();

        const fileContent = data.text;
        // Enhanced prompt creation
        const combinedPrompt = `Prompt: ${prompt}\nFile Content: ${fileContent}`;

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ];

        const parts = [{ text: combinedPrompt }];
        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            generationConfig,
            safetySettings,
        });
        const response = await result.response;
        const text = response.text().trim();
        if (id === text) {
            res.status(200).json({ message: "matched" })
        }
        else {
            res.status(400).json({ message: "Not match" })
        }

        // res.json(text);
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Summarize medical record files
router.post('/summarizerecords', upload.single('file'), async (req, res) => {
    const { patientid } = req.body
    const prompt = "Summarize medical record files , extract relevant information such as patient demographics, medical history, diagnoses, treatments, and outcomes. Identify key trends and patterns in the data. Here is the process you will follow to summarize the medical record files: 1. *Review the files.* you will carefully review all of the medical record files that i send you. This may include doctor's notes, hospital records, lab results, and imaging studies. 2. *Extract relevant information.* you will extract the following information from the medical record files:   * Patient demographics: name, date of birth, gender, address, etc.   * Medical history: past illnesses, surgeries, hospitalizations, etc.    * Diagnoses: all of the medical conditions that have been diagnosed for the patient.    * Treatments: all of the treatments that have been prescribed for the patient.    * Outcomes: the results of the treatments. 3. *Identify key trends and patterns.* you will look for any key trends or patterns in the data. For example, you may look for changes in the patient's symptoms over time, or you may look for any relationships between the patient's medical conditions and their treatments.\n4. *Summarize the information.* you will summarize the information that youI have extracted from the medical record files in a clear and concise manner. The summary will include the patient's demographics, medical history, diagnoses, treatments, outcomes, and any key trends or patterns that you have identified.  provide me with a comprehensive and accurate summary of the medical record files. give me the response in english then in arabic seperate them with <hr>,"

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    if (!patientid) {
        return res.status(400).send('Missing patientid in request body');
    }

    try {
        const recordsQuery = await pool.query('SELECT * FROM record WHERE patientid = $1 ORDER BY dateofcreation DESC', [patientid]);
        if (recordsQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Records Not found' });
        }

        const records = recordsQuery.rows;

        const response = await Promise.all(records.map(async (record, index) => {
            const prescriptionQuery = await pool.query('SELECT * FROM prescription WHERE recordid = $1', [record.recordid]);
            const prescriptions = prescriptionQuery.rows.map(prescription => ({
                id: prescription.id,
                name: prescription.medicinename,
                dosage: prescription.dosage,
                notes: prescription.notes,
            }));

            const resultsQuery = await pool.query('SELECT * FROM result WHERE recordid = $1', [record.recordid]);
            const results = resultsQuery.rows.map(result => ({
                id: result.id,
                filepath: result.file,
                type: result.type,
                date: result.dateofupload,
            }));

            return {
                id: record.recordid,
                name: `Record ${index + 1}`,
                diagnosis: record.diagnosis,
                notes: record.notes,
                date: record.dateofcreation,
                prescriptions: prescriptions,
                results: results,
            };
        }));

        // Extract file paths from results
        const filePaths = response.flatMap(record => record.results.map(result => result.filepath));

        // Extract text from the PDF file paths
        const pdfResults = await extractPdfContent(filePaths);

        // Map PDF text back to their respective records
        response.forEach(record => {
            record.results.forEach(result => {
                const pdfResult = pdfResults.find(pdf => pdf.filePath === result.filepath);
                if (pdfResult) {
                    result.text = pdfResult.text;
                }
            });
        });

        // Enhanced prompt creation
        const combinedPrompt = response.map(record => {
            const prescriptionsText = record.prescriptions.map(p => `- ${p.name}, ${p.dosage}: ${p.notes}`).join('\n');
            const resultsText = record.results.map(r => `- ${r.type} (${r.date}): ${r.text}`).join('\n');
            return `Record Name: ${record.name}\nDiagnosis: ${record.diagnosis}\nNotes: ${record.notes}\nPrescriptions:\n${prescriptionsText}\nResults:\n${resultsText}`;
        }).join('\n\n');

        const fullPrompt = `Prompt: ${prompt}\n\n${combinedPrompt}`;

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ];

        const parts = [{ text: fullPrompt }];
        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            generationConfig,
            safetySettings,
        });
        const sumresponse = await result.response;
        const text = await sumresponse.text();

        res.json({ summary: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Summarize one medical record file
router.post('/summarizeonerecord', upload.single('file'), async (req, res) => {
    const { patientid, recordid } = req.body
    const prompt = "Summarize medical record files , extract relevant information such as patient demographics, medical history, diagnoses, treatments, and outcomes. Identify key trends and patterns in the data. Here is the process you will follow to summarize the medical record files: 1. *Review the files.* you will carefully review all of the medical record files that i send you. This may include doctor's notes, hospital records, lab results, and imaging studies. 2. *Extract relevant information.* you will extract the following information from the medical record files:   * Patient demographics: name, date of birth, gender, address, etc.   * Medical history: past illnesses, surgeries, hospitalizations, etc.    * Diagnoses: all of the medical conditions that have been diagnosed for the patient.    * Treatments: all of the treatments that have been prescribed for the patient.    * Outcomes: the results of the treatments. 3. *Identify key trends and patterns.* you will look for any key trends or patterns in the data. For example, you may look for changes in the patient's symptoms over time, or you may look for any relationships between the patient's medical conditions and their treatments.\n4. *Summarize the information.* you will summarize the information that youI have extracted from the medical record files in a clear and concise manner. The summary will include the patient's demographics, medical history, diagnoses, treatments, outcomes, and any key trends or patterns that you have identified.  provide me with a comprehensive and accurate summary of the medical record files. give me the response in english then in arabic seperate them with <hr>,"

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    if (!patientid && !recordid) {
        return res.status(400).send('Missing patientid and recordid in request body');
    }

    try {
        const recordsQuery = await pool.query('SELECT * FROM record WHERE patientid = $1 and recordid = $2 ORDER BY dateofcreation DESC', [patientid, recordid]);
        if (recordsQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Records Not found' });
        }

        const records = recordsQuery.rows;

        const response = await Promise.all(records.map(async (record, index) => {
            const prescriptionQuery = await pool.query('SELECT * FROM prescription WHERE recordid = $1', [record.recordid]);
            const prescriptions = prescriptionQuery.rows.map(prescription => ({
                id: prescription.id,
                name: prescription.medicinename,
                dosage: prescription.dosage,
                notes: prescription.notes,
            }));

            const resultsQuery = await pool.query('SELECT * FROM result WHERE recordid = $1', [record.recordid]);
            const results = resultsQuery.rows.map(result => ({
                id: result.id,
                filepath: result.file,
                type: result.type,
                date: result.dateofupload,
            }));

            return {
                id: record.recordid,
                name: `Record ${index + 1}`,
                diagnosis: record.diagnosis,
                notes: record.notes,
                date: record.dateofcreation,
                prescriptions: prescriptions,
                results: results,
            };
        }));

        // Extract file paths from results
        const filePaths = response.flatMap(record => record.results.map(result => result.filepath));

        // Extract text from the PDF file paths
        const pdfResults = await extractPdfContent(filePaths);

        // Map PDF text back to their respective records
        response.forEach(record => {
            record.results.forEach(result => {
                const pdfResult = pdfResults.find(pdf => pdf.filePath === result.filepath);
                if (pdfResult) {
                    result.text = pdfResult.text;
                }
            });
        });

        // Enhanced prompt creation
        const combinedPrompt = response.map(record => {
            const prescriptionsText = record.prescriptions.map(p => `- ${p.name}, ${p.dosage}: ${p.notes}`).join('\n');
            const resultsText = record.results.map(r => `- ${r.type} (${r.date}): ${r.text}`).join('\n');
            return `Record Name: ${record.name}\nDiagnosis: ${record.diagnosis}\nNotes: ${record.notes}\nPrescriptions:\n${prescriptionsText}\nResults:\n${resultsText}`;
        }).join('\n\n');

        const fullPrompt = `Prompt: ${prompt}\n\n${combinedPrompt}`;

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ];

        const parts = [{ text: fullPrompt }];
        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            generationConfig,
            safetySettings,
        });
        const sumresponse = await result.response;
        const text = await sumresponse.text();

        res.json({ summary: text, recordid: recordid });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Summarize one medical result file
router.post('/summarizresult', upload.single('file'), async (req, res) => {
    const { patientid, resultid } = req.body
    const prompt = "Summarize medical record files , extract relevant information such as patient demographics, medical history, diagnoses, treatments, and outcomes. Identify key trends and patterns in the data. Here is the process you will follow to summarize the medical record files: 1. *Review the files.* you will carefully review all of the medical record files that i send you. This may include doctor's notes, hospital records, lab results, and imaging studies. 2. *Extract relevant information.* you will extract the following information from the medical record files:   * Patient demographics: name, date of birth, gender, address, etc.   * Medical history: past illnesses, surgeries, hospitalizations, etc.    * Diagnoses: all of the medical conditions that have been diagnosed for the patient.    * Treatments: all of the treatments that have been prescribed for the patient.    * Outcomes: the results of the treatments. 3. *Identify key trends and patterns.* you will look for any key trends or patterns in the data. For example, you may look for changes in the patient's symptoms over time, or you may look for any relationships between the patient's medical conditions and their treatments.\n4. *Summarize the information.* you will summarize the information that youI have extracted from the medical record files in a clear and concise manner. The summary will include the patient's demographics, medical history, diagnoses, treatments, outcomes, and any key trends or patterns that you have identified.  provide me with a comprehensive and accurate summary of the medical record files. give me the response in english then in arabic seperate them with <hr>,"

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    if (!patientid && !resultid) {
        return res.status(400).send('Missing patientid and resultid in request body');
    }

    try {

        const resultQuery = await pool.query('SELECT * FROM result WHERE patientid = $1 and id = $2', [patientid, resultid]);
        if (resultQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Result Not found' });
        }

        const results = resultQuery.rows[0];
        const filePaths = [results.file];

        // Extract text from the PDF file paths
        const pdfResults = await extractPdfContent(filePaths);

        // Enhanced prompt creation
        const combinedPrompt = `Prompt: ${prompt}\nFile Content: ${pdfResults.map(pdf => pdf.text).join('\n\n')}`;

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ];

        const parts = [{ text: combinedPrompt }];
        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            generationConfig,
            safetySettings,
        });
        const sumresponse = await result.response;
        const text = await sumresponse.text();

        res.json({ summary: text, recordid: results.recordid, resultid: resultid });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Internal Server Error');
    }
});






export default router;