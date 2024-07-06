import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/:patientid', async (req, res) => {
    const { patientid } = req.params;
    console.log(patientid);

    try {
        const recordsQuery = await pool.query('SELECT * FROM record WHERE patientid = $1', [patientid]);
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

            const resultsQuery = await pool.query('SELECT * FROM result WHERE recordid = $1', [record.recordid]);
            const results = await Promise.all(resultsQuery.rows.map(async (result, idx) => {
                const healthcareProviderQuery = await pool.query('SELECT name FROM healthcare_provider WHERE id = $1', [result.healthcareproviderid]);
                const healthcareProviderName = healthcareProviderQuery.rows[0].name;

                return {
                    key: `${index}-${idx + 3}`,
                    data: {
                        name: `${result.type} Result ${idx + 1}`,
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
                ...results
            ].filter(Boolean); // Remove falsy values

            return {
                key: `${index}`,
                data: {
                    name: `Record ${index + 1}`,
                    "Name Of Health Provider": doctorName,
                    type: 'Record',
                    date: record.dateofcreation,
                },
                children: children
            };
        }));

        res.status(200).json(response);
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
