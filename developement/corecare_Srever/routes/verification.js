import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
// router.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let verificationCodes = {}; // In-memory store for simplicity

// Generate and send verification code
router.post('/send-code', (req, res) => {
    const { email } = req.body;
    const code = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code

    // Store the code with the email as key
    verificationCodes[email] = code;

    const mailOptions = {
        from: 'corecareofficial@gmail.com',
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Code sent successfully');
    });
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