import express from 'express';
import pool from '../db.js';

const router = express.Router();


router.get('/:healthcareID', async (req, res) => {
    const { healthcareID } = req.params;

    try {
        const emergencyServices = await pool.query('SELECT * FROM services WHERE healthcareid = $1', [healthcareID]);
        if (emergencyServices.rows.length === 0) {
            return res.status(400).send('Not found');
        }
        res.json(emergencyServices.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});




export default router