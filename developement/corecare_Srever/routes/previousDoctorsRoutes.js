import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/:patientID', async (req, res) => {
    const { patientID } = req.params;

    try {
        const pastCondition = await pool.query('SELECT * FROM past_condition WHERE patientID = $1', [patientID]);
        if (pastCondition.rows.length === 0) {

            return res.status(400).send('Not found');
        }
        res.json(pastCondition.rows);
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




export default router;