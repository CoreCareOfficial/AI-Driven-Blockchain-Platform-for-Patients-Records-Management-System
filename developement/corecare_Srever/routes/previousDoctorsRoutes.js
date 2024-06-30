import express from 'express';
import pool from '../db.js';
import path from 'path';
import fs from 'fs/promises';
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


router.get('/:patientID', async (req, res) => {
    const { patientID } = req.params;

    try {

        const previousDoctorsQuery = await pool.query(
            `SELECT doctor.doctorid, doctor.specialization, patient.firstname AS firstname, patient.lastname AS lastname, patient.personalphoto AS doctor_photo
            FROM doctor
            INNER JOIN previous_doctors
            ON doctor.doctorID = previous_doctors.doctorID
            INNER JOIN patient
            ON doctor.patientID = patient.patientID
            WHERE previous_doctors.patientID = $1
            `, [patientID]);
        if (previousDoctorsQuery.rows.length === 0) {

            return res.status(400).send('Not found');
        }
        const previousDoctors = previousDoctorsQuery.rows;
        for (let doctor of previousDoctors) {
            doctor.personalphoto = await readFileContent(doctor.doctor_photo);
        }

        res.json(previousDoctors);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// add a put request to update the past condition

router.put('/:patientID', async (req, res) => { // put request to update the past condition
    const { patientID } = req.params;
    const { condition, date, treatment, doctor } = req.body;

    try {
        const pastCondition = await pool.query('UPDATE past_condition set condition = $1, date = $2, treatment = $3, doctor = $4 WHERE patientID = $5', [condition, date, treatment, doctor, patientID]);
        res.json({ message: "Updated successfully" })
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// add a delete request to delete the past condition

router.delete('/:patientID', async (req, res) => {
    const { patientID } = req.params;

    try {
        const pastCondition = await pool.query('DELETE FROM past_condition WHERE patientID = $1', [patientID]);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});




export default router;