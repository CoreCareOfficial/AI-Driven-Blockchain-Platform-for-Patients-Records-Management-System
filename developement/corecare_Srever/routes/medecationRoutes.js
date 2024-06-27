import express from 'express';
import pool from '../db.js';

const router = express.Router();


router.get('/', async (req, res) => {
    const { patientID } = req.query;

    try {
        const medicationQuery = await pool.query('SELECT * from ')

    } catch (err) {

    }
})




export default router