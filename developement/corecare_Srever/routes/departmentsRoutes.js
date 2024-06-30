import express from 'express';
import pool from '../db.js';

const router = express.Router();


router.get('/:healthcareID', async (req, res) => {
    const { healthcareID } = req.params;

    try {
        const departments = await pool.query('SELECT * FROM departmets WHERE healthcareid = $1', [healthcareID]);
        if (departments.rows.length === 0) {
            return res.status(400).send('Not found');
        }
        res.json(departments.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});




export default router