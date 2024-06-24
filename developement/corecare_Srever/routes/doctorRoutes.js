import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username = req.body.username;
        const type = file.fieldname;

        // Define paths based on the file type
        const basePath = `Users/Doctor/${username}`;
        const paths = {
            licenseDocument: `${basePath}/licenseDocument`,
        };

        // Create the directory if it does not exist
        if (!fs.existsSync(paths[type])) {
            fs.mkdirSync(paths[type], { recursive: true });
        }

        cb(null, paths[type]);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// INSERT a new doctor
router.post('/', upload.fields([
    { name: 'licenseDocument', maxCount: 1 }
]), async (req, res) => {
    const DOC = "DOC-";
    const { patientID, specialization, academicDegree, locationOfWork, licenseNumber } = req.body;

    try {
        // Get the last ID from the table
        const result = await pool.query('SELECT MAX(ID) as maxID FROM DOCTOR');
        const lastID = result.rows[0].maxid || 0;
        const newID = lastID + 1;
        const doctorID = DOC + newID;


        // File paths
        const licenseDocumentPath = req.files.licenseDocument ? req.files.licenseDocument[0].path : null;

        const newDoctor = await pool.query(
            `INSERT INTO DOCTOR (doctorID, patientID, specialization, academicdegree, locationofwork, licensenumber, licensedocument) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [doctorID, patientID, specialization, academicDegree, locationOfWork, licenseNumber, licenseDocumentPath]
        );
        res.json(newDoctor.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get Doctors Info
router.get('/', async (req, res) => {
    try {
        const allDoctors = await pool.query('SELECT * FROM DOCTOR');
        res.json(allDoctors.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:doctorID', async (req, res) => {
    const { doctorID } = req.params;

    try {
        const doctor = await pool.query('SELECT * FROM DOCTOR WHERE doctorID = $1', [doctorID]);
        if (doctor.rows.length === 0) {
            return res.status(404).send('Doctor not found');
        }
        res.json(doctor.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

export default router;