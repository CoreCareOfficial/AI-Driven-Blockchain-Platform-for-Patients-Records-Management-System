// loginRoutes.js
import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { populate } from 'dotenv';


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
    const { email, password, userType, username } = req.body
    try {
        const newLogin = await pool.query('INSERT INTO LOGIN (email, password, type, username) VALUES ($1, $2, $3, $4) RETURNING *', [email, password, userType, username]);
        res.json(newLogin.rows[0])

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Login
router.post('/get', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        const checkLogin = await pool.query('SELECT type, password, username, email FROM LOGIN WHERE email = $1 or username = $1', [email]);
        if (checkLogin.rowCount === 0) {
            return res.status(404).send('User not found');
        }

        // Access the first row of the result
        const { type, password: hashedPassword, username, emaill } = checkLogin.rows[0];

        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(400).send("Invalid username or password");
        }

        res.status(200).send({ message: "Login successfully", userType: type, username: username, email: emaill });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Forgot Password

router.post('/checkemail', async (req, res) => {
    const { email } = req.body;

    try {
        const checkEmail = await pool.query('SELECT email FROM LOGIN WHERE email = $1', [email]);
        if (checkEmail.rows.length > 0) {
            res.status(200).json({ message: "Account Exist" });
        } else {
            res.status(400).json({ message: "Account doesn't Exists" });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.put('/forget', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const updatePassword = await pool.query('UPDATE LOGIN SET password = $1 WHERE email = $2 RETURNING *', [newPassword, email]);
        if (updatePassword.rowCount === 0) {
            return res.status(404).send("Password wasn't updated successfully");
        }
        res.status(200).send("Password Updated Successfully");

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Change Password
router.put('/change', async (req, res) => {
    const { emailorusername, password, newPassword } = req.body;

    try {
        const hashedPasswordQuery = await pool.query('SELECT password FROM LOGIN WHERE email = $1 OR username = $1', [emailorusername]);

        if (hashedPasswordQuery.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = hashedPasswordQuery.rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updatePassword = await pool.query('UPDATE LOGIN SET password = $1 WHERE email = $2 OR username = $2', [newPassword, emailorusername]);

        if (updatePassword.rowCount === 0) {
            return res.status(500).json({ message: 'Failed to update password' });
        }

        res.status(200).json({ message: "Password Updated Successfully" });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while changing the password" });
    }
});


export default router;
