import express from 'express';
import pool from '../db.js';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import moment from 'moment-timezone';
import { log } from 'console';

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

router.get('/:patientID', async (req, res) => {
    const { patientID } = req.params;
    try {
        const healthinfo = await pool.query('SELECT * FROM health_info WHERE patientID = $1', [patientID]);
        if (healthinfo.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(healthinfo.rows[0]);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/personalhealthinfo/:patientid', async (req, res) => {
    const { patientid } = req.params;
    try {

        const personalinfoQuery = await pool.query('SELECT firstname, lastname, username, sex, dateofbirth, personalphoto FROM patient WHERE patientID = $1', [patientid]);
        if (personalinfoQuery.rows.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const personalinfo = personalinfoQuery.rows[0];
        const patientinfo = {
            ...personalinfo,
            personalphoto: await readFileContent(personalinfo.personalphoto),
        }


        const healthinfoQuery = await pool.query('SELECT * FROM health_info WHERE patientID = $1', [patientid]);
        // if (healthinfoQuery.rows.length === 0) {
        //     return res.status(404).json({ message: 'Patient not found' });
        // }
        const healthinfo = healthinfoQuery.rows[0];

        const allergiesQuery = await pool.query('SELECT * FROM allergies WHERE patientID = $1', [patientid]);
        const allergies = allergiesQuery.rows[0];

        const medicationQuery = await pool.query('SELECT * FROM medication WHERE patientID = $1', [patientid]);
        // if (medicationQuery.rows.length === 0) {
        //     return res.status(400).send('Not found');
        // }
        const medication = medicationQuery.rows;

        const pastConditionQuery = await pool.query('SELECT * FROM past_condition WHERE patientID = $1', [patientid]);
        // if (pastConditionQuery.rows.length === 0) {
        //     return res.status(400).send('Not found');
        // }

        const pastCondition = pastConditionQuery.rows;

        // ###########################################################################

        const recordsQuery = await pool.query('SELECT * FROM record WHERE patientid = $1 ORDER BY dateofcreation DESC', [patientid]);
        // if (recordsQuery.rows.length === 0) {
        //     return res.status(400).json({ message: 'Records Not found' });
        // }

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


        // ###########################################################################


        res.status(200).json({ patientinfo: patientinfo, healthinfo: healthinfo, allergies: allergies, medication: medication, pastCondition: pastCondition, response: response });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});


// UPDATE a patient's health 
router.put('/updatehealthinfo/:patientid', async (req, res) => {
    const { patientid } = req.params;
    const { blood, bloodsugar, bloodpressure, heartrate, respiratoryrate, allergies } = req.body;
    console.log('req.body:', req.body);
    console.log('req.params:', req.params);
    console.log(patientid);
    console.log(blood, bloodsugar, bloodpressure, heartrate, respiratoryrate, allergies);
    const currentDate = moment().tz('Asia/Aden').format('YYYY-MM-DDTHH:mm:ss');

    console.log('currentDate:', currentDate);


    try {


        console.log('1')
        const updateHealthInfo = await pool.query(
            `INSERT INTO health_info (blood, bloodsugar, bloodpressure, heartrate, respiratoryrate, patientid, blooddate, bloodsugardate, bloodpressuredate, heartratedate, respiratoryratedate)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ON CONFLICT (patientid) DO UPDATE 
            SET blood = EXCLUDED.blood,
                bloodsugar = EXCLUDED.bloodsugar,
                bloodpressure = EXCLUDED.bloodpressure,
                heartrate = EXCLUDED.heartrate,
                respiratoryrate = EXCLUDED.respiratoryrate,
                blooddate = EXCLUDED.blooddate,
                bloodsugardate = EXCLUDED.bloodsugardate,
                bloodpressuredate = EXCLUDED.bloodpressuredate,
                heartratedate = EXCLUDED.heartratedate,
                respiratoryratedate = EXCLUDED.respiratoryratedate
            RETURNING *`,
            [blood, bloodsugar, bloodpressure, heartrate, respiratoryrate, patientid, currentDate, currentDate, currentDate, currentDate, currentDate]
        );

        console.log('2')
        const updateAllergies = await pool.query(
            `INSERT INTO allergies (allergyname, allergiesdate, patientid)
            VALUES ($1, $2, $3)
            ON CONFLICT (patientid) DO UPDATE 
            SET allergyname = EXCLUDED.allergyname, allergiesdate = EXCLUDED.allergiesdate
            RETURNING *`,
            [allergies, currentDate, patientid]
        );

        console.log('3')

        if (updateHealthInfo.rows.length === 0 && updateAllergies.rows.length === 0) {
            console.log('5')
            return res.status(404).json({ message: 'Failed to update health information' });

        }
        console.log('4')
        res.status(200).json({ message: "Patient updated successfully" });
    } catch (err) {
        console.log('6')
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.put('/:patientID', async (req, res) => {
    const { patientID } = req.params;
    const { bloodType, weight, height, } = req.body;

    try {
        const newHealthInfo = await pool.query('UPDATE health_info set bloodtype=$1, weight=$2, height=$3 WHERE patientID = $4 RETURNING *', [bloodType, weight, height, patientID]);
        if (newHealthInfo.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(newHealthInfo.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

export default router;