import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { patientID } = req.query;
    try {
        const healthinfo = await pool.query('SELECT * FROM health_info WHERE patientID = $1', [patientID]);
        if (healthinfo.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(healthinfo.rows[0]);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.put('/:patientID', async (req, res) => {
    const { patientID } = req.params;
    const { bloodType, weight, height, } = req.body;

    try {
        const newHealthInfo = await pool.query('UPDATE health_info set bloodtype=$1, weight=$2, height=$3 WHERE patientID = $4 RETURNING *', [bloodType, weight, height, patientID]);
        if (newHealthInfo.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(newHealthInfo.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

export default router;