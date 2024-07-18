import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/:doctorid', async (req, res) => {
    const { doctorid } = req.params;

    try {

        const previousPatientsQuery = await pool.query(
            `SELECT * from previous_patients WHERE doctorid = $1`, [doctorid]);
        if (previousPatientsQuery.rows.length === 0) {

            return res.status(400).json({ message: 'Not found' });
        }

        const previousPatients = [];
        for (let i = 0; i < previousPatientsQuery.rows.length; i++) {
            const patientNameQuery = await pool.query('SELECT firstname, lastname FROM patient WHERE patientid = $1', [previousPatientsQuery.rows[0].patientid]);
            previousPatients.push({
                ...previousPatientsQuery.rows[i],
                patientName: patientNameQuery.rows[0].firstname + ' ' + patientNameQuery.rows[0].lastname,
            });
        }
        res.status(200).json({ previousPatients: previousPatients });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;