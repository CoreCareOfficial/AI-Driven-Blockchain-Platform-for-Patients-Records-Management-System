import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { patientID } = req.body;

    try {
        const allergies = await pool.query('SELECT * FROM allergies WHERE patientID = $1', [patientID]);
        if (allergies.rows.length === 0) {
            return res.status(400).send('Not found');
        }
        res.json(allergies.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;