import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { patientid, doctorid, diagnosis, notes, prescribedMedicine, prescribedLabTests, prescribedXrays, labTestsNotes, radiologyNotes, nextVisitDate, nextVisitReason } = req.body;
    let status = false;
    const REC = "REC-";
    try {

        const idResult = await pool.query('SELECT MAX(ID) as maxID FROM record');
        const lastID = idResult.rows[0].maxid || 0;
        const newID = lastID + 1;
        const recordID = REC + newID;
        const recordName = 'Record' + newID;

        const createRecordQuery = await pool.query('INSERT INTO record (recordid, doctorid, patientid, diagnosis, notes, dateofcreation, name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [recordID, doctorid, patientid, diagnosis, notes, new Date(), recordName]);
        for (let i = 0; i < prescribedMedicine.length; i++) {
            const { medicineName, dosage, notes } = prescribedMedicine[i];
            const prescriptionQuery = await pool.query('INSERT INTO prescription (doctorid, patientid, medicinename, dosage, notes, prescriptiondate, recordid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [doctorid, patientid, medicineName, dosage, notes, new Date(), recordID]);
            const prescription = prescriptionQuery.rows[0];
            console.log(prescription);
            status = true;
        }

        if (prescribedLabTests) {
            const labTestsQuery = await pool.query('INSERT INTO labtests (doctorid, patientid, testdate, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [doctorid, patientid, new Date(), labTestsNotes]);
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

            const radiologyQuery = await pool.query('INSERT INTO radiology (doctorid, patientid, radiologydate, notes) VALUES ($1, $2, $3, $4) RETURNING id', [doctorid, patientid, new Date(), radiologyNotes]);
            const radiology = radiologyQuery.rows[0].id;

            for (let i = 0; i < prescribedXrays.length; i++) {
                const { name } = prescribedXrays[i];
                const radiologyQuery = await pool.query('INSERT INTO radiology_tests (radiologyid, name) VALUES ($1, $2) RETURNING *', [radiology, name]);
                const radiologyTest = radiologyQuery.rows[0];
                console.log(radiologyTest);
                status = true;
            }
        }
        if (nextVisitDate || nextVisitReason) {
            const nextVisitQuery = await pool.query('INSERT INTO appointments (doctorid, patientid, nextvisitdate, visitreason) VALUES ($1, $2, $3, $4) RETURNING *', [doctorid, patientid, nextVisitDate, nextVisitReason]);
        }



        if (!status || createRecordQuery.rows.length === 0) {
            return res.status(400).json({ message: 'Diagnosis not created' });
        }

        res.status(200).json({ message: 'Diagnosis created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;