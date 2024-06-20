// patientRoutes.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// INSERT a new patient
router.post('/patients', async (req, res) => {
    const { patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhoto, idType, nationalID, passportNo, FIDCardPhoto, BIDCardPhoto, passportType, passportCountryCode, passportDocument, PublicWalletAddress } = req.body;

    try {
        const newPatient = await pool.query(
            `INSERT INTO PATIENT (patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhoto, idType, nationalID, passportNo, FIDCardPhoto, BIDCardPhoto, passportType, passportCountryCode, passportDocument, PublicWalletAddress) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) 
       RETURNING *`,
            [patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhoto, idType, nationalID, passportNo, FIDCardPhoto, BIDCardPhoto, passportType, passportCountryCode, passportDocument, PublicWalletAddress]
        );
        res.json(newPatient.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// SELECT all patients
router.get('/patients', async (req, res) => {
    try {
        const allPatients = await pool.query('SELECT * FROM PATIENT');
        res.json(allPatients.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// SELECT a patient by ID
router.get('/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await pool.query('SELECT * FROM PATIENT WHERE ID = $1', [id]);
        if (patient.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(patient.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATE a patient
router.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const { patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhoto, idType, nationalID, passportNo, FIDCardPhoto, BIDCardPhoto, passportType, passportCountryCode, passportDocument, PublicWalletAddress } = req.body;

    try {
        const updatePatient = await pool.query(
            `UPDATE PATIENT SET 
        patientID = $1, 
        firstName = $2, 
        secondName = $3, 
        thirdName = $4, 
        lastName = $5, 
        email = $6, 
        password = $7, 
        dateOfBirth = $8, 
        country = $9, 
        sex = $10, 
        phoneNumber = $11, 
        status = $12, 
        address = $13, 
        job = $14, 
        personalPhoto = $15, 
        idType = $16, 
        nationalID = $17, 
        passportNo = $18, 
        FIDCardPhoto = $19, 
        BIDCardPhoto = $20, 
        passportType = $21, 
        passportCountryCode = $22, 
        passportDocument = $23, 
        PublicWalletAddress = $24
      WHERE ID = $25 RETURNING *`,
            [patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhoto, idType, nationalID, passportNo, FIDCardPhoto, BIDCardPhoto, passportType, passportCountryCode, passportDocument, PublicWalletAddress, id]
        );

        if (updatePatient.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(updatePatient.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE a patient
router.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletePatient = await pool.query('DELETE FROM PATIENT WHERE ID = $1 RETURNING *', [id]);
        if (deletePatient.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
