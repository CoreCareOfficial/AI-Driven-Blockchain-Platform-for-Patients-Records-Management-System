import express from 'express';
import pool from '../db.js';

const router = express.Router();


router.get('/:patientID', async (req, res) => {
    const { patientID } = req.params;

    try {
        const medication = await pool.query('SELECT * FROM medication WHERE patientID = $1', [patientID]);
        if (medication.rows.length === 0) {
            return res.status(400).send('Not found');
        }
        res.json(medication.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});




export default router