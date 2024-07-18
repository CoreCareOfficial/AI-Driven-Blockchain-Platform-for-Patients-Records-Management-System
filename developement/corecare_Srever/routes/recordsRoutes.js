import express from 'express';
import pool from '../db.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to read file content
const readFileContent = async (filePath) => {
    if (!filePath) {
        console.log(`Skipping file read for null or undefined path`);
        return null;
    }
    try {
        const fullPath = path.resolve(__dirname, '..', filePath);
        const data = await fs.readFile(fullPath);
        return data.toString('base64');
    } catch (error) {
        console.error(`Error reading file from path ${filePath}:`, error);
        return null;
    }
}

router.get('/:patientid', async (req, res) => {
    const { patientid } = req.params;
    console.log(patientid);

    try {
        const recordsQuery = await pool.query('SELECT * FROM record WHERE patientid = $1 ORDER BY dateofcreation DESC', [patientid]);
        if (recordsQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Records Not found' });
        }

        const records = recordsQuery.rows;

        const response = await Promise.all(records.map(async (record, index) => {
            const doctorQuery = await pool.query('SELECT doctorid FROM doctor WHERE doctorid = $1', [record.doctorid]);
            const doctorid = doctorQuery.rows[0].doctorid;

            const patientidQuery = await pool.query('SELECT patientid FROM doctor WHERE doctorid = $1', [doctorid]);
            const doctorPatientid = patientidQuery.rows[0].patientid;

            const doctorNameQuery = await pool.query('SELECT firstname, lastname FROM patient WHERE patientid = $1', [doctorPatientid]);
            const doctorName = 'DR: ' + doctorNameQuery.rows[0].firstname + ' ' + doctorNameQuery.rows[0].lastname;

            let prescribedMedicine = [];
            let medicinename = [];
            let dosage = [];
            let prescriptiondate = '';
            let star = false;
            const prescriptionsQuery = await pool.query('SELECT * FROM prescription WHERE recordid = $1', [record.recordid]);

            const prescriptions = prescriptionsQuery.rows.map((prescription, idx) => {
                prescribedMedicine.push(prescription.id);
                medicinename.push(prescription.medicinename);
                dosage.push(prescription.dosage);
                prescriptiondate = prescription.prescriptiondate;
                star = prescription.star;
            });

            let prescribedLabtests = [];
            let testnames = [];
            const labtestQuery = await pool.query('SELECT * FROM lab_test WHERE recordid = $1', [record.recordid]);
            if (labtestQuery.rows.length > 0) {

                const labtestsQuery = await pool.query('SELECT * FROM lab_tests WHERE labtestid = $1', [labtestQuery.rows[0].id]);
                const labtestsextractiom = labtestsQuery.rows.map((labtest, idx) => {
                    prescribedLabtests.push(labtest.id);
                    testnames.push(labtest.name);
                });
            }

            let prescribedRadiologies = [];
            let radiologynames = [];
            const radiologyQuery = await pool.query('SELECT * FROM radiology WHERE recordid = $1', [record.recordid]);
            if (radiologyQuery.rows.length > 0) {

                const radiologiesQuery = await pool.query('SELECT * FROM radiologies WHERE radiologyid = $1', [radiologyQuery.rows[0].id]);
                const labtestsextractiom = radiologiesQuery.rows.map((radiology, idx) => {
                    prescribedRadiologies.push(radiology.id);
                    radiologynames.push(radiology.name);
                });
            }

            const previousSummarizationQuery = await pool.query('SELECT * FROM previous_summarizations WHERE patientid = $1 and recordid = $2', [patientid, record.recordid]);
            const previousSummarization = previousSummarizationQuery.rows;
            const summy = previousSummarization.map((summary, idx) => {
                return {
                    key: `${summary.id}`,
                    data: {
                        name: `Summary ${idx + 1}`,
                        type: 'Summary',
                        "Name Of Health Provider": doctorName,
                        recordid: summary.recordid,
                        resultid: summary.resultid,
                        summary: summary.sammary,
                        date: summary.summary_date,
                        // star: summary.star,
                    }
                }
            });



            const resultsQuery = await pool.query('SELECT * FROM result WHERE recordid = $1', [record.recordid]);
            const results = await Promise.all(resultsQuery.rows.map(async (result, idx) => {
                const healthcareProviderQuery = await pool.query('SELECT name FROM healthcare_provider WHERE id = $1', [result.healthcareproviderid]);
                const healthcareProviderName = healthcareProviderQuery.rows[0].name;

                return {
                    key: `${result.id}`,
                    data: {
                        name: `${result.type} ${idx + 1}`,
                        "Name Of Health Provider": healthcareProviderName,
                        type: result.type,
                        date: result.dateofupload,
                        star: result.star,
                    }
                };
            }));



            const children = [
                prescribedMedicine.length > 0 && {
                    key: `${index}-1`,
                    data: {
                        name: `Prescription`,
                        "Name Of Health Provider": doctorName,
                        type: 'Prescription',
                        date: prescriptiondate,
                        star: star,
                        prescribedMedicine: prescribedMedicine,
                    }
                },
                prescribedLabtests.length > 0 && {
                    key: `${index}-2`,
                    data: {
                        name: `Lab Tests`,
                        "Name Of Health Provider": doctorName,
                        type: 'prescribed lab test',
                        date: labtestQuery.rows[0].testdate,
                        star: labtestQuery.rows[0].star,
                        mainid: labtestQuery.rows[0].id,
                        recordid: labtestQuery.rows[0].recordid,
                        prescribedLabtests: prescribedLabtests,
                    }
                },
                prescribedRadiologies.length > 0 && {
                    key: `${index}-3`,
                    data: {
                        name: `Radiology Tests`,
                        "Name Of Health Provider": doctorName,
                        type: 'prescribed radiology test',
                        date: radiologyQuery.rows[0].radiologydate,
                        star: radiologyQuery.rows[0].star,
                        mainid: radiologyQuery.rows[0].id,
                        recordid: radiologyQuery.rows[0].recordid,
                        prescribedRadiologies: prescribedRadiologies,
                    }
                },
                {
                    key: `${record.recordid}`,
                    data: {
                        name: `General Report ${record.id}`,
                        type: 'General Report',
                        date: record.dateofcreation,
                        'Name Of Health Provider': doctorName,
                        star: record.star

                    },
                    children: [
                        {
                            key: `${index}-4-0`,
                            data: {
                                name: record.diagnosis,
                                "Name Of Health Provider": doctorName,
                                type: 'diognosis',
                                date: record.dateofcreation,
                            }
                        },
                        {
                            key: `${index}-4-1`,
                            data: {
                                name: record.notes,
                                "Name Of Health Provider": doctorName,
                                type: 'dioagnosis note',
                                date: record.dateofcreation
                            }
                        },
                        prescribedMedicine.length > 0 &&
                        {
                            key: `${index}-4-2`,
                            data: {
                                name: `Prescription`,
                                "Name Of Health Provider": doctorName,
                                type: 'Prescription',
                                date: prescriptiondate,
                                medicinename: medicinename,
                                dosage: dosage
                            }
                        },
                        prescribedLabtests.length > 0 &&
                        {
                            key: `${index}-4-3`,
                            data: {
                                name: `Lab Tests`,
                                "Name Of Health Provider": doctorName,
                                type: 'prescribed lab test',
                                date: labtestQuery.rows[0].testdate,
                                record: labtestQuery.rows[0].recordid,
                                names: testnames
                            }
                        },
                        prescribedRadiologies.length > 0 &&
                        {
                            key: `${index}-4-4`,
                            data: {
                                name: `Radiology Tests`,
                                "Name Of Health Provider": doctorName,
                                type: 'prescribed radiology test',
                                date: radiologyQuery.rows[0].radiologydate,
                                record: radiologyQuery.rows[0].recordid,
                                names: radiologynames
                            }
                        },

                    ].filter(Boolean),
                },

                ...results,
                ...summy,
                // ...summy1,
            ].filter(Boolean); // Remove falsy values

            return {
                key: `${record.recordid}`,
                data: {
                    name: record.name,
                    "Name Of Health Provider": doctorName,
                    type: 'Record',
                    date: record.dateofcreation,
                    star: record.star,
                },
                children: children
            };
        }));



        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// to get all summaries of patient
router.get('/getsummary/:patientid', async (req, res) => {
    const { patientid } = req.params;

    try {
        const summaryQuery = await pool.query('SELECT * FROM previous_summarizations WHERE patientid = $1', [patientid]);
        if (summaryQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Summary Not found' });
        }

        const summary = summaryQuery.rows;
        const response = summary.map((summary, idx) => {
            return {
                key: `${summary.id}`,
                data: {
                    name: `Summary ${idx + 1}`,
                    type: 'Summary',
                    recordid: summary.recordid,
                    resultid: summary.resultid,
                    summary: summary.sammary,
                    date: summary.summary_date,
                }
            }
        });

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// to get result file {lab report or radiology report}
router.get('/getresult/:resultid', async (req, res) => {
    const { resultid } = req.params;

    try {
        const resultQuery = await pool.query('SELECT * FROM result WHERE id = $1', [resultid]);
        if (resultQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Result Not found' });
        }

        const result = resultQuery.rows[0];
        const data = await readFileContent(result.file);
        const filetype = path.extname(result.file).substring(1).toLocaleLowerCase();

        res.status(200).json({ ...result, data, filetype });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// to get medicines in prescription
router.post('/get/prescription', async (req, res) => {
    const prescribedMedicine = req.body;
    console.log(req.body);
    console.log(prescribedMedicine);
    try {
        const prescriptions = [];

        for (let i = 0; i < prescribedMedicine.length; i++) {
            const prescriptionQuery = await pool.query('SELECT * FROM prescription WHERE id = $1', [prescribedMedicine[i]]);
            if (prescriptionQuery.rows.length === 0) {
                return res.status(400).json({ message: 'Prescription Not found' });
            }

            prescriptions.push(prescriptionQuery.rows[0]);
        }
        const prescriptionDiagnostic = await pool.query('SELECT diagnosis FROM record WHERE recordid = $1', [prescriptions[0].recordid]);
        const patientInfo = await pool.query('SELECT firstname, lastname, sex, dateofbirth FROM patient WHERE patientid = $1', [prescriptions[0].patientid]);
        const doctorInfo = await pool.query('SELECT patientid, specialization, locationofwork FROM doctor WHERE doctorid = $1', [prescriptions[0].doctorid]);
        const doctorPersonInfo = await pool.query('SELECT firstname, lastname, country, address, phonenumber FROM patient WHERE patientid = $1', [doctorInfo.rows[0].patientid]);

        res.status(200).json({ prescriptions, patientInfo: patientInfo.rows[0], doctorInfo: doctorInfo.rows[0], doctorPersonInfo: doctorPersonInfo.rows[0], diagnosis: prescriptionDiagnostic.rows[0] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// to get prescribed labtest
router.post('/get/labtest', async (req, res) => {
    const prescribedLabTests = req.body;
    console.log(req.body, prescribedLabTests);
    try {
        const testsList = [];

        for (let i = 0; i < prescribedLabTests.length; i++) {
            const labTestQuery = await pool.query('SELECT * FROM lab_tests WHERE id = $1', [prescribedLabTests[i]]);
            if (labTestQuery.rows.length === 0) {
                return res.status(400).json({ message: 'Lab Test Not found' });
            }

            testsList.push(labTestQuery.rows[0]);
        }

        const recordIDQuery = await pool.query('SELECT * from lab_test where id = $1', [testsList[0].labtestid]);
        const noteQuery = await pool.query('SELECT notes FROM lab_test WHERE id = $1', [testsList[0].labtestid]);
        const labtestDiagnostic = await pool.query('SELECT diagnosis FROM record WHERE recordid = $1', [recordIDQuery.rows[0].recordid]);
        const patientInfo = await pool.query('SELECT firstname, lastname, sex, dateofbirth FROM patient WHERE patientid = $1', [recordIDQuery.rows[0].patientid]);
        const doctorInfo = await pool.query('SELECT patientid, specialization, locationofwork FROM doctor WHERE doctorid = $1', [recordIDQuery.rows[0].doctorid]);
        const doctorPersonInfo = await pool.query('SELECT firstname, lastname, country, address, phonenumber FROM patient WHERE patientid = $1', [doctorInfo.rows[0].patientid]);

        res.status(200).json({ testsList: testsList, patientInfo: patientInfo.rows[0], doctorInfo: doctorInfo.rows[0], doctorPersonInfo: doctorPersonInfo.rows[0], diagnosis: labtestDiagnostic.rows[0], notes: noteQuery.rows[0], reportdate: recordIDQuery.rows[0].testdate });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// to get prescribed medical radiology
router.post('/get/radiology', async (req, res) => {
    const prescribedRadiologies = req.body;
    console.log(req.body, prescribedRadiologies);
    try {
        const testsList = [];

        for (let i = 0; i < prescribedRadiologies.length; i++) {
            console.log(1)
            const radiologyQuery = await pool.query('SELECT * FROM radiologies WHERE id = $1', [prescribedRadiologies[i]]);
            if (radiologyQuery.rows.length === 0) {
                return res.status(400).json({ message: 'Lab Test Not found' });
            }

            testsList.push(radiologyQuery.rows[0]);
        }

        const recordIDQuery = await pool.query('SELECT * from radiology where id = $1', [testsList[0].radiologyid]);

        const noteQuery = await pool.query('SELECT notes FROM radiology WHERE id = $1', [testsList[0].radiologyid]);
        const radiologyDiagnostic = await pool.query('SELECT diagnosis FROM record WHERE recordid = $1', [recordIDQuery.rows[0].recordid]);
        const patientInfo = await pool.query('SELECT firstname, lastname, sex, dateofbirth FROM patient WHERE patientid = $1', [recordIDQuery.rows[0].patientid]);
        const doctorInfo = await pool.query('SELECT patientid, specialization, locationofwork FROM doctor WHERE doctorid = $1', [recordIDQuery.rows[0].doctorid]);
        const doctorPersonInfo = await pool.query('SELECT firstname, lastname, country, address, phonenumber FROM patient WHERE patientid = $1', [doctorInfo.rows[0].patientid]);

        res.status(200).json({ testsList: testsList, patientInfo: patientInfo.rows[0], doctorInfo: doctorInfo.rows[0], doctorPersonInfo: doctorPersonInfo.rows[0], diagnosis: radiologyDiagnostic.rows[0], notes: noteQuery.rows[0], reportdate: recordIDQuery.rows[0].radiologydate });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// to get general report
router.post('/get/generalreport', async (req, res) => {
    const { patientid, recordid } = req.body;
    console.log(patientid, recordid);
    try {
        const generalDiagnosisQuery = await pool.query('SELECT * FROM record WHERE patientid = $1 and recordid = $2', [patientid, recordid]);
        if (generalDiagnosisQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Record Not found' });
        }
        const generalDiagnosis = await pool.query('SELECT diagnosis FROM record WHERE patientid = $1 and recordid = $2', [patientid, recordid]);
        const generalNotes = await pool.query('SELECT notes FROM record WHERE patientid = $1 and recordid = $2', [patientid, recordid]);
        const reportdate = generalDiagnosisQuery.rows[0].dateofcreation;
        const prescriptionQuery = await pool.query('SELECT * FROM prescription WHERE recordid = $1 and patientid =$2', [recordid, patientid]);
        const labtestQuery = await pool.query('SELECT * FROM lab_test WHERE recordid = $1 and patientid = $2', [recordid, patientid]);
        const labtestsQuery = labtestQuery.rows.length > 0 ? await pool.query('SELECT * FROM lab_tests WHERE labtestid = $1', [labtestQuery.rows[0].id]) : { rows: [] };
        const radiologyQuery = await pool.query('SELECT * FROM radiology WHERE recordid = $1 and patientid = $2', [recordid, patientid]);
        const radiologiesQuery = radiologyQuery.rows.length > 0 ? await pool.query('SELECT * FROM radiologies WHERE radiologyid = $1', [radiologyQuery.rows[0].id]) : { rows: [] };
        const appointmentsQuery = await pool.query('SELECT * from appointments where patientid = $1 and recordid = $2', [patientid, recordid]);
        const patientInfo = await pool.query('SELECT firstname, lastname, sex, dateofbirth FROM patient WHERE patientid = $1', [patientid]);
        const doctorInfo = await pool.query('SELECT patientid, specialization, locationofwork FROM doctor WHERE doctorid = $1', [generalDiagnosisQuery.rows[0].doctorid]);
        const doctorPersonInfo = await pool.query('SELECT firstname, lastname, country, address, phonenumber FROM patient WHERE patientid = $1', [doctorInfo.rows[0].patientid]);

        res.status(200).json({ diagnosis: generalDiagnosis.rows[0], notes: generalNotes.rows[0], reportdate, prescriptions: prescriptionQuery.rows && prescriptionQuery.rows, labtests: labtestsQuery.rows, radiologies: radiologiesQuery.rows, appointments: appointmentsQuery.rows && appointmentsQuery.rows, patientInfo: patientInfo.rows[0], doctorInfo: doctorInfo.rows[0], doctorPersonInfo: doctorPersonInfo.rows[0] });





    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Save previous summaries
router.post('/savesummary', async (req, res) => {
    const { patientid, summary, recordid, resultid } = req.body;
    console.log(patientid, summary, recordid, resultid);

    try {
        if (recordid === undefined && resultid === undefined) {
            const saveRecordsSummary = await pool.query("INSERT INTO previous_summarizations (patientid, sammary, recordid, summary_date, resultid) VALUES ($1, $2, $3, $4, $5) RETURNING *", [patientid, summary, 'all', new Date(), 0]);
            if (saveRecordsSummary.rows.length === 0) {
                return res.status(400).json({ message: 'Summary Not saved' });
            }
            res.status(200).json({ message: 'Summary of all records saved successfully' });
        }

        else {
            if (resultid === undefined) {
                const saveRecordSummary = await pool.query("INSERT INTO previous_summarizations (patientid, sammary, recordid, summary_date, resultid) VALUES ($1, $2, $3, $4, $5) RETURNING *", [patientid, summary, recordid, new Date(), 0]);
                if (saveRecordSummary.rows.length === 0) {
                    return res.status(400).json({ message: 'Summary Not saved' });
                }
                res.status(200).json({ message: 'Summary of record saved successfully' });
            }

            else {
                const saveResultSummary = await pool.query("INSERT INTO previous_summarizations (patientid, sammary, recordid, resultid, summary_date) VALUES ($1, $2, $3, $4, $5) RETURNING *", [patientid, summary, recordid, resultid, new Date()]);
                if (saveResultSummary.rows.length === 0) {
                    return res.status(400).json({ message: 'Summary Not saved' });
                }
                res.status(200).json({ message: 'Summary of result saved successfully' });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Get saved summary
router.get('/get/savedsummary/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const savedSummaryQuery = await pool.query('SELECT * FROM previous_summarizations WHERE id = $1', [id]);
        if (savedSummaryQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Summary Not found' });
        }

        const savedSummary = savedSummaryQuery.rows[0];
        const patientinfoQuery = await pool.query('SELECT firstname, lastname, sex, dateofbirth FROM patient WHERE patientid = $1', [savedSummary.patientid]);
        const patientinfo = patientinfoQuery.rows[0];
        res.status(200).json({ savedSummary, patientinfo: patientinfo });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Update record star
router.put('/updaterecordstar', async (req, res) => {
    const { recordid, star } = req.body;
    console.log(recordid, star, req.body);
    try {
        const updateRecordStar = await pool.query('UPDATE record SET star = $1 WHERE recordid = $2 RETURNING *', [star, recordid]);
        if (updateRecordStar.rows.length === 0) {
            return res.status(400).json({ message: 'Record Not found' });
        }
        res.status(200).json({ message: 'Record updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update prescription start
router.put('/updateprescriptionstar', async (req, res) => {
    const { prescribedMedicine, star } = req.body;
    console.log(prescribedMedicine, star);
    try {
        for (let i = 0; i < prescribedMedicine.length; i++) {
            const updatePrescriptionStar = await pool.query('UPDATE prescription SET star = $1 WHERE id = $2 RETURNING *', [star, prescribedMedicine[i]]);
            if (updatePrescriptionStar.rows.length === 0) {
                return res.status(400).json({ message: 'Prescription Not found' });
            }
        }
        if (prescribedMedicine.length === 0) {
            return res.status(400).json({ message: 'Prescription Not found' });
        }

        res.status(200).json({ message: 'Prescription updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update result star
router.put('/updateresultstar', async (req, res) => {
    const { resultid, star } = req.body;
    console.log(resultid, star);
    try {
        const updateResultStar = await pool.query('UPDATE result SET star = $1 WHERE id = $2 RETURNING *', [star, resultid]);
        if (updateResultStar.rows.length === 0) {
            return res.status(400).json({ message: 'Result Not Found' })
        }

        res.status(200).json({ message: 'Result updated successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/updatelabteststar', async (req, res) => {
    const { mainid, star } = req.body;
    console.log(mainid, star);
    try {

        const updateLabTestStar = await pool.query('UPDATE lab_test SET star = $1 WHERE id = $2 RETURNING *', [star, mainid]);
        if (updateLabTestStar.rows.length === 0) {
            return res.status(400).json({ message: 'Lab Test Not Found' });
        }

        res.status(200).json({ message: 'Lab Test updated successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/updateradiologystar', async (req, res) => {
    const { mainid, star } = req.body;
    console.log(mainid, star);
    try {

        const updateRadiologyStar = await pool.query('UPDATE radiology SET star = $1 WHERE id = $2 RETURNING *', [star, mainid]);
        if (updateRadiologyStar.rows.length === 0) {
            return res.status(400).json({ message: 'Radiology Not Found' });
        }

        res.status(200).json({ message: 'Radiology updated successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
