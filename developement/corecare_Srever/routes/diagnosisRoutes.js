import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { patientid, doctorid, diagnosis, notes, prescribedMedicine, prescribedLabTests, prescribedXrays, labTestsNotes, radiologyNotes, nextVisitDate, nextVisitReason } = req.body;
    console.log(req.body);
    console.log(patientid, doctorid, diagnosis, notes, prescribedMedicine, prescribedLabTests, prescribedXrays, labTestsNotes, radiologyNotes, nextVisitDate, nextVisitReason);
    let status = false;
    const REC = "REC-";
    try {

        const idResult = await pool.query('SELECT MAX(ID) as maxID FROM record');
        const lastID = idResult.rows[0].maxid || 0;
        const newID = lastID + 1;
        const recordID = REC + newID;
        const recordName = 'Record' + newID;

        const createRecordQuery = await pool.query('INSERT INTO record (recordid, doctorid, patientid, diagnosis, notes, dateofcreation, name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [recordID, doctorid, patientid, diagnosis, notes, new Date(), recordName]);
        console.log(createRecordQuery.rows.length);
        const pastCondition = await pool.query('INSERT INTO past_condition(patientid, conditionname, diagnosisdate) VALUES($1, $2, $3)', [patientid, diagnosis, new Date()]);
        const previousDoctors = await pool.query('INSERT INTO previous_doctors(patientid, doctorid) VALUES($1, $2)', [patientid, doctorid]);
        const prevousPatients = await pool.query('INSERT INTO previous_patients(providerid, patientid, accessdate, nextvisitdate, diagnosis) VALUES($1, $2, $3, $4, $5)', [doctorid, patientid, new Date(), nextVisitDate ? new Date(nextVisitDate).toISOString().split('T')[0] : null, diagnosis]);
        if (prescribedMedicine) {
            for (let i = 0; i < prescribedMedicine.length; i++) {
                const { medname, dosage, notes } = prescribedMedicine[i];
                const prescriptionQuery = await pool.query('INSERT INTO prescription (doctorid, patientid, medicinename, dosage, notes, prescriptiondate, recordid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [doctorid, patientid, medname, dosage, notes, new Date(), recordID]);
                const prescription = prescriptionQuery.rows[0];
                console.log(prescription);
                const medication = await pool.query('INSERT INTO medication (patientid, medname) VALUES($1, $2) ', [patientid, medicineName]);
                status = true;
            }
        }

        if (prescribedLabTests) {
            const labTestsQuery = await pool.query('INSERT INTO lab_test (doctorid, patientid, testdate, notes, recordid) VALUES ($1, $2, $3, $4, $5) RETURNING id', [doctorid, patientid, new Date(), labTestsNotes, recordID]);
            const labTests = labTestsQuery.rows[0].id;

            for (let i = 0; i < prescribedLabTests.length; i++) {
                const { name } = prescribedLabTests[i];
                const labTestQuery = await pool.query('INSERT INTO lab_tests (labtestid, name) VALUES ($1, $2) RETURNING *', [labTests, name]);
                const labTest = labTestQuery.rows[0];
                console.log(labTest);
                status = true;
            }
        }

        if (prescribedXrays) {

            const radiologyQuery = await pool.query('INSERT INTO radiology (doctorid, patientid, radiologydate, notes, recordid) VALUES ($1, $2, $3, $4, $5) RETURNING id', [doctorid, patientid, new Date(), radiologyNotes, recordID]);
            const radiology = radiologyQuery.rows[0].id;

            for (let i = 0; i < prescribedXrays.length; i++) {
                const { name } = prescribedXrays[i];
                const radiologyQuery = await pool.query('INSERT INTO radiologies (radiologyid, name) VALUES ($1, $2) RETURNING *', [radiology, name]);
                const radiologyTest = radiologyQuery.rows[0];
                console.log(radiologyTest);
                status = true;
            }
        }
        if (nextVisitDate || nextVisitReason) {
            const nextVisitDateObj = new Date(nextVisitDate);
            const visitDate = nextVisitDateObj.toISOString().split('T')[0];
            const visitTime = nextVisitDateObj.toISOString().split('T')[1];

            const nextVisitQuery = await pool.query(
                'INSERT INTO appointments (doctorid, patientid, nextvisitdate, nextvisittime, visitreason, recordid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [doctorid, patientid, visitDate, visitTime, nextVisitReason, recordID]
            );
            status = true;
        }



        if (!status || createRecordQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Diagnosis not created' });
        }

        res.status(200).json({ message: 'Diagnosis created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/', async (req, res) => {

});


export default router;