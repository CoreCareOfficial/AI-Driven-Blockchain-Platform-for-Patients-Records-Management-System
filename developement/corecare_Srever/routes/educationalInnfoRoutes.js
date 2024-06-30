import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/:doctorID', async (req, res) => {
    try {
        const { doctorID } = req.params;
        const educationalInfo = await pool.query(
            'SELECT id, doctorid, medschool, internships, residencies, fellowships FROM educational_info WHERE doctorid = $1',
            [doctorID]
        );

        if (educationalInfo.rows.length === 0) {
            return res.status(400).send('Not found');
        }
        res.json(educationalInfo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;