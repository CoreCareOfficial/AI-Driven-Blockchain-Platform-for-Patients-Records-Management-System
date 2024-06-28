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


export default router;