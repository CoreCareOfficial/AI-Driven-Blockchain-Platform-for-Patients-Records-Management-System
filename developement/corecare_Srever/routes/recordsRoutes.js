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
            let prescriptiondate = '';
            let star = false;
            const prescriptionsQuery = await pool.query('SELECT * FROM prescription WHERE recordid = $1', [record.recordid]);

            const prescriptions = prescriptionsQuery.rows.map((prescription, idx) => {
                prescribedMedicine.push(prescription.id);
                prescriptiondate = prescription.prescriptiondate;
                star = prescription.star;
            });

            let prescribedLabtests = []
            const labtestQuery = await pool.query('SELECT * FROM lab_test WHERE recordid = $1', [record.recordid]);
            if (labtestQuery.rows.length > 0) {

                const labtestsQuery = await pool.query('SELECT * FROM lab_tests WHERE labtestid = $1', [labtestQuery.rows[0].id]);
                const labtestsextractiom = labtestsQuery.rows.map((labtest, idx) => {
                    prescribedLabtests.push(labtest.id);
                });
            }

            let prescribedRadiologies = []
            const radiologyQuery = await pool.query('SELECT * FROM radiology WHERE recordid = $1', [record.recordid]);
            if (radiologyQuery.rows.length > 0) {

                const radiologiesQuery = await pool.query('SELECT * FROM radiologies WHERE radiologyid = $1', [radiologyQuery.rows[0].id]);
                const labtestsextractiom = radiologiesQuery.rows.map((radiology, idx) => {
                    prescribedRadiologies.push(radiology.id);
                });
            }


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
                {
                    key: `${index}-0`,
                    data: {
                        name: record.diagnosis,
                        "Name Of Health Provider": doctorName,
                        type: 'Report',
                        date: record.dateofcreation
                    },
                },
                {
                    key: `${index}-1`,
                    data: {
                        name: record.notes,
                        "Name Of Health Provider": doctorName,
                        type: 'Report',
                        date: record.dateofcreation
                    },
                },
                prescribedMedicine.length > 0 && {
                    key: `${index}-2`,
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
                    key: `ss`,
                    data: {
                        name: `Lab Tests`,
                        "Name Of Health Provider": doctorName,
                        type: 'Report',
                        date: labtestQuery.rows[0].testdate,
                        // star: star,
                        prescribedLabtests: prescribedLabtests,
                    }
                },
                prescribedRadiologies.length > 0 && {
                    key: `ee`,
                    data: {
                        name: `Radiology Tests`,
                        "Name Of Health Provider": doctorName,
                        type: 'Report',
                        date: radiologyQuery.rows[0].radiologydate,
                        // star: star,
                        prescribedRadiologies: prescribedRadiologies,
                    }
                },
                ...results
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



// router.get('/reports/:patientid', async (req, res) => {
//     const { patientid } = req.params;

//     try {
//         const recordsQuery = await pool.query('SELECT * FROM record WHERE patientid = $1', [patientid]);
//         if (recordsQuery.rows.length === 0) {
//             return res.status(400).json({ message: 'Records Not found' });
//         }

//         const records = recordsQuery.rows;

//         const response = await Promise.all(records.map(async (record, index) => {
//             const doctorQuery = await pool.query('SELECT doctorid FROM doctor WHERE doctorid = $1', [record.doctorid]);
//             const doctorid = doctorQuery.rows[0].doctorid;

//             const patientidQuery = await pool.query('SELECT patientid FROM doctor WHERE doctorid = $1', [doctorid]);
//             const doctorPatientid = patientidQuery.rows[0].patientid;

//             const doctorNameQuery = await pool.query('SELECT firstname, lastname FROM patient WHERE patientid = $1', [doctorPatientid]);
//             const doctorName = 'DR: ' + doctorNameQuery.rows[0].firstname + ' ' + doctorNameQuery.rows[0].lastname;

//             const resultsQuery = await pool.query('SELECT * FROM result WHERE recordid = $1', [record.recordid]);
//             const results = await Promise.all(resultsQuery.rows.map(async (result, idx) => {
//                 const healthcareProviderQuery = await pool.query('SELECT name FROM healthcare_provider WHERE id = $1', [result.healthcareproviderid]);
//                 const healthcareProviderName = healthcareProviderQuery.rows[0].name;

//                 return {
//                     key: `${index}-${idx}`,
//                     data: {
//                         name: `${result.type} Result ${idx + 1}`,
//                         "Name Of Health Provider": healthcareProviderName,
//                         type: result.type,
//                         date: result.dateofupload,
//                         star: result.star,
//                     }
//                 };
//             });

//             return {
//                 key: `${index}`,
//                 data: {
//                     name: `Record ${index + 1}`,
//                     "Name Of Health Provider": doctorName,
//                     type: 'Record',
//                     date: record.dateofcreation,
//                 },
//                 children: results
//             };
//         }));

//         res.status(200).json(response);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

export default router;
