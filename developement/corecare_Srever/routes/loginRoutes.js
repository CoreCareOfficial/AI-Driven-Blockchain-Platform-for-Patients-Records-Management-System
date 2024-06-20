// patientRoutes.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Check if email exists
router.post('/login', async (req, res) => {
    const { email } = req.body;

    try {
        const checkEmail = await pool.query('SELECT email FROM LOGIN WHERE email = $1', [email]);
        if (checkEmail.rows.length > 0) {
            res.status(400).json({ message: "Email Already Exists" });
        } else {
            res.status(200).json({ message: "Email doesn't Exist" });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
