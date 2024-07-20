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

router.post('/', async (req, res) => {
    const { emailorusername, patientid } = req.body;
    console.log(emailorusername, patientid);
    try {
        const chosenuserid = await pool.query('SELECT patientid from Patient where email = $1 or username = $1', [emailorusername]);
        if (chosenuserid.rows.length === 0) {
            return res.status(400).json({ message: 'Contact Not found' });
        }
        const newEmergenyContact = await pool.query('INSERT INTO emergency_contacts (patientid, chosenuserid) VALUES ($1, $2) RETURNING *', [patientid, chosenuserid.rows[0].patientid]);
        if (newEmergenyContact.rows.length === 0) {
            return res.status(400).json({ message: 'Emergency Contact Not Added' });
        }
        res.status(200).json({ message: 'Emergency Contact Added Successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Emergency Contact
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const deleteEmergencyContact = await pool.query('DELETE FROM emergency_contacts WHERE id = $1', [id]);
        if (deleteEmergencyContact.rowCount === 0) {
            return res.status(400).json({ message: 'Emergency Contact Not found' });
        }
        res.status(200).json({ message: 'Emergency Contact Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:emailorusername', async (req, res) => {
    const { emailorusername } = req.params;
    console.log(req.params, emailorusername);

    try {
        let chosenuserid = '';
        const usertype = await pool.query('SELECT type FROM login WHERE email = $1 OR username = $1', [emailorusername]);

        if (usertype.rows[0].type === 'Patient' || usertype.rows[0].type === 'Doctor') {
            const chosenuseridQuery = await pool.query('SELECT patientid FROM patient WHERE email = $1 OR username = $1', [emailorusername]);
            chosenuserid = chosenuseridQuery.rows[0].patientid;
        } else {
            const chosenuseridQuery = await pool.query('SELECT id FROM healthcare_provider WHERE email = $1 OR username = $1', [emailorusername]);
            chosenuserid = chosenuseridQuery.rows[0].id;
        }

        console.log(chosenuserid);

        const chosenUserQuery = await pool.query('SELECT * FROM emergency_contacts WHERE chosenuserid = $1', [chosenuserid]);
        if (chosenUserQuery.rows.length === 0) {
            return res.status(400).json([]);
        }

        const emergencyContacts = [];
        for (let i = 0; i < chosenUserQuery.rows.length; i++) {
            const chosenUser = await pool.query('SELECT firstname, lastname, personalphoto, sex FROM patient WHERE patientid = $1', [chosenUserQuery.rows[i].patientid]);
            emergencyContacts.push({
                id: chosenUserQuery.rows[i].id,
                chosenuserid: chosenUserQuery.rows[i].chosenuserid,
                patientid: chosenUserQuery.rows[i].patientid,
                name: chosenUser.rows[0].firstname + ' ' + chosenUser.rows[0].lastname,
                sex: chosenUser.rows[0].sex,
                personalphoto: await readFileContent(chosenUser.rows[0].personalphoto),
            });
        }

        console.log(emergencyContacts);
        res.status(200).json(emergencyContacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router