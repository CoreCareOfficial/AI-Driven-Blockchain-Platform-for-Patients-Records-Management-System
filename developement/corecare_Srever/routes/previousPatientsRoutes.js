import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/:emailorusername', async (req, res) => {
    const { emailorusername } = req.params;

    try {
        const providerType = await pool.query('SELECT type from login where email = $1 or username = $1', [emailorusername]);
        const type = providerType.rows[0].type;

        let providerid;
        if (type === 'Doctor') {
            const patientid = await pool.query('SELECT patientid from patient where email = $1', [emailorusername]);
            const provideridQuery = await pool.query('SELECT doctorid from doctor where patientid = $1', [patientid.rows[0].patientid]);
            providerid = provideridQuery.rows[0].doctorid;
        }

        else {
            const provideridQuery = await pool.query('SELECT id from healthcare_provider where email = $1', [emailorusername]);
            providerid = provideridQuery.rows[0].id;
        }

        const previousPatientsQuery = await pool.query(
            `SELECT * from previous_patients WHERE providerid = $1`, [providerid]);
        if (previousPatientsQuery.rows.length === 0) {

            return res.status(400).json({ message: 'Not found' });
        }

        const previousPatients = [];
        for (let i = 0; i < previousPatientsQuery.rows.length; i++) {
            const patientNameQuery = await pool.query('SELECT firstname, lastname FROM patient WHERE patientid = $1', [previousPatientsQuery.rows[i].patientid]);
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