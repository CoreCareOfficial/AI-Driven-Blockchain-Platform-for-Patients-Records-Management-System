// loginRoutes.js
import express from 'express';
import pool from '../db.js';
import bodyParser from 'body-parser';

const router = express.Router();

// Check if email exists
router.post('/', async (req, res) => {
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

// Register Account
router.post('/add', async (req, res) => {
    const { email, password, userType } = req.body
    try {
        const newLogin = await pool.query('INSERT INTO LOGIN (email, password, type) VALUES ($1, $2, $3) RETURNING *', [email, password, userType]);
        res.json(newLogin.rows[0])

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Login
router.post('/get', async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkLogin = await pool.query('SELECT type FROM LOGIN WHERE email = $1 and password = $2', [email, password]);
        res.json(checkLogin.rows[0].type);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Forgot Password
router.put('/', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const updatePassword = await pool.query('UPDATE LOGIN SET password = $1 WHERE email = $2 RETURNING *', [newPassword, email]);
        if (updatePassword.rowCount === 0) {
            return res.status(404).send('email not found');
        }
        res.status(200).send("Password Updated Successfully");

    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default router;
