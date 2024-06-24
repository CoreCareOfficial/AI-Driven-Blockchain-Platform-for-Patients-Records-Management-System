import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
const router = express.Router();

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    try {

        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    console.error('Error getting access token:', err);
                    reject("Failed to create access token");
                }
                resolve(token);
            });
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }
        });

        return transporter;
    } catch (error) {
        console.error('Error in createTransporter:', error);
        throw error;
    }
};

let transporter;
let transporterReady = false;

const initializeTransporter = async () => {
    try {
        transporter = await createTransporter();
        transporterReady = true;
        console.log('Transporter initialized successfully');
    } catch (error) {
        console.error('Failed to initialize transporter:', error);
    }
};

initializeTransporter();

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
        from: "CoreCare <corecareofficial@gmail.com>",
        to: email,
        subject: 'Verify Your Email for CoreCare',
        text: `
Hello,

Thank you for signing up with CoreCare. To complete your registration, please verify your email address.

Your verification code is: ${code}

Enter this code on the verification page to activate your account. This code will expire in 10 minutes.

If you didn't request this verification, please ignore this email.

Best regards,
CoreCare Team

This is an automated message, please do not reply.
  `,
        html: `
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="border: 1px solid white; border-radius:25px; padding: 10px;">
  <div style="padding: 10px;">
  <h2 style="color: #4a4a4a;">Verify Your Email for CoreCare</h2>
  <p>Hello,</p>
  <p>Thank you for signing up with CoreCare. To complete your registration, please verify your email address.</p>
  <p>Your verification code is:</p>
  <h1 style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px;">${code}</h1>
  <p>Enter this code on the verification page to activate your account. This code will expire in 10 minutes.</p>
  <p>If you didn't request this verification, please ignore this email.</p>
  <p>Best regards,<br>CoreCare Team</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="font-size: 12px; color: #888;">This is an automated message, please do not reply.</p>
  </div>
  </div>
</body>
</html>
  `
    };
    console.log("server 5");

    if (!transporterReady) {
        console.log("Transporter not ready, waiting...");
        await new Promise((resolve, reject) => {
            const checkTransporter = setInterval(() => {
                if (transporterReady) {
                    clearInterval(checkTransporter);
                    resolve();
                }
            }, 100);
            // Add a timeout of 30 seconds
            setTimeout(() => {
                clearInterval(checkTransporter);
                reject(new Error('Transporter initialization timed out'));
            }, 30000);
        });
    }

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
