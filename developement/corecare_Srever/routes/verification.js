import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let verificationCodes = {}; // In-memory store for simplicity

// Generate and send verification code
router.post('/', async (req, res) => {
    console.log("server 1");
    const { email } = req.body;
    console.log("server 2");
    const code = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
    console.log("server 3");

    // Store the code with the email as key
    verificationCodes[email] = code;
    console.log("server 4");

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${code}`
    };
    console.log("server 5");

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Code sent successfully');
        console.log("server 6");
    } catch (error) {
        console.error('Error sending email:', error); // Log the error
        res.status(500).send('Error sending email');
        console.log("server 7");
    }
});

// Verify the code
router.post('/verify-code', (req, res) => {
    const { email, code } = req.body;
    if (verificationCodes[email] && verificationCodes[email] === code) {
        // Code is correct, remove it from the store
        delete verificationCodes[email];
        res.status(200).send('Code verified successfully');
    } else {
        res.status(400).send('Invalid code');
    }
});

export default router;
