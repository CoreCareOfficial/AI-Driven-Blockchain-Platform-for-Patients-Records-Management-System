import express from 'express';
import pool from '../db.js';
import path from 'path';
import multer from 'multer';
import fs from 'fs/promises';
import fss from 'fs';
import { fileURLToPath } from 'url';
import moment from 'moment-timezone';
import bcrypt from 'bcryptjs';
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

// Set up storage engine using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username = req.body.username ?? req.params.username;
        const type = file.fieldname;

        // Define paths based on the file type
        const basePath = `Users/Patient/${username}`;
        const paths = {
            personalPhoto: `${basePath}/PersonalPhoto`,
            FIDCardPhoto: `${basePath}/FIDCardPhoto`,
            BIDCardPhoto: `${basePath}/BIDCardPhoto`,
            passportDocument: `${basePath}/passportDocument`
        };

        // Create the directory if it does not exist
        if (!fss.existsSync(paths[type])) {
            fss.mkdirSync(paths[type], { recursive: true });
        }

        cb(null, paths[type]);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Function to generate a random two-digit string
const generateRandomTwoDigitString = () => {
    return Math.floor(1000 + Math.random() * 9000).toString().slice(-2);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to read file content
const readFileContent = async (filePath) => {
    if (!filePath) {
        console.log(`Skipping file read for null or undefined path`);
        return null;
    }
    try {
        const fullPath = path.resolve(__dirname, '..', filePath);
        const data = await fs.readFile(fullPath);
        return data.toString('base64');
    } catch (error) {
        console.error(`Error reading file from path ${filePath}:`, error);
        return null;
    }
}


// INSERT a new patient
router.post('/', upload.fields([
    { name: 'personalPhoto', maxCount: 1 },
    { name: 'FIDCardPhoto', maxCount: 1 },
    { name: 'BIDCardPhoto', maxCount: 1 },
    { name: 'passportDocument', maxCount: 1 }
]), async (req, res) => {
    const PAT = "PAT-";
    const { username, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, idType, nationalID, passportNo, passportType, passportCountryCode, PublicWalletAddress, bloodType } = req.body;

    try {
        // Get the last ID from the table
        const result = await pool.query('SELECT MAX(ID) as maxID FROM PATIENT');
        const lastID = result.rows[0].maxid || 0;
        const newID = lastID + 1;
        const patientID = PAT + newID;

        // Check if the username already exists
        let uniqueUsername = username;
        const usernameResult = await pool.query('SELECT username FROM PATIENT WHERE username = $1', [username]);

        if (usernameResult.rows.length > 0) {
            // Append random two-digit string until a unique username is found
            let isUnique = false;
            while (!isUnique) {
                uniqueUsername = username + generateRandomTwoDigitString();
                const newUsernameResult = await pool.query('SELECT username FROM PATIENT WHERE username = $1', [uniqueUsername]);
                if (newUsernameResult.rows.length === 0) {
                    isUnique = true;
                }
            }
        }

        // File paths
        const personalPhotoPath = req.files.personalPhoto ? req.files.personalPhoto[0].path : null;
        const FIDCardPhotoPath = req.files.FIDCardPhoto ? req.files.FIDCardPhoto[0].path : null;
        const BIDCardPhotoPath = req.files.BIDCardPhoto ? req.files.BIDCardPhoto[0].path : null;
        const passportDocumentPath = req.files.passportDocument ? req.files.passportDocument[0].path : null;

        const newPatient = await pool.query(
            `INSERT INTO PATIENT (patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhoto, idType, nationalID, passportNo, FIDCardPhoto, BIDCardPhoto, passportType, passportCountryCode, passportDocument, PublicWalletAddress, username, bloodtype) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26) 
            RETURNING *`,
            [patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhotoPath, idType, nationalID, passportNo, FIDCardPhotoPath, BIDCardPhotoPath, passportType, passportCountryCode, passportDocumentPath, PublicWalletAddress, uniqueUsername, bloodType]
        );
        // res.json(newPatient.rows[0].patientID);
        res.json(patientID);
    } catch (err) {
        console.error('Error inserting patient:', err);
        if (err.code === '23505') {
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send('Server error');
        }
    }
});

// add patient account from hospital
router.post('/addpatient', upload.fields([
    { name: 'personalPhoto', maxCount: 1 },
    { name: 'FIDCardPhoto', maxCount: 1 },
    { name: 'BIDCardPhoto', maxCount: 1 },
    { name: 'passportDocument', maxCount: 1 }
]), async (req, res) => {
    const PAT = "PAT-";
    const { username, firstName, secondName, thirdName, lastName, email, dateOfBirth, country, sex, phoneNumber, status, address, job, idType, nationalID, passportNo, passportType, passportCountryCode, PublicWalletAddress, bloodType } = req.body;


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
        // Get the last ID from the table
        const result = await pool.query('SELECT MAX(ID) as maxID FROM PATIENT');
        const lastID = result.rows[0].maxid || 0;
        const newID = lastID + 1;
        const patientID = PAT + newID;

        // Check if the username already exists
        let uniqueUsername = username;
        const usernameResult = await pool.query('SELECT username FROM PATIENT WHERE username = $1', [username]);

        if (usernameResult.rows.length > 0) {
            // Append random two-digit string until a unique username is found
            let isUnique = false;
            while (!isUnique) {
                uniqueUsername = username + generateRandomTwoDigitString();
                const newUsernameResult = await pool.query('SELECT username FROM PATIENT WHERE username = $1', [uniqueUsername]);
                if (newUsernameResult.rows.length === 0) {
                    isUnique = true;
                }
            }
        }

        // File paths
        const personalPhotoPath = req.files.personalPhoto ? req.files.personalPhoto[0].path : null;
        const FIDCardPhotoPath = req.files.FIDCardPhoto ? req.files.FIDCardPhoto[0].path : null;
        const BIDCardPhotoPath = req.files.BIDCardPhoto ? req.files.BIDCardPhoto[0].path : null;
        const passportDocumentPath = req.files.passportDocument ? req.files.passportDocument[0].path : null;

        const generatedPassword = Math.floor(1000 + Math.random() * 900000).toString(); // Generate a 6-digit code
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatedPassword, salt);
        console.log(generatedPassword);
        console.log(hashedPassword);


        const newPatient = await pool.query(
            `INSERT INTO PATIENT (patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhoto, idType, nationalID, passportNo, FIDCardPhoto, BIDCardPhoto, passportType, passportCountryCode, passportDocument, PublicWalletAddress, username, bloodtype) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26) 
            RETURNING *`,
            [patientID, firstName, secondName, thirdName, lastName, email, hashedPassword, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhotoPath, idType, nationalID, passportNo, FIDCardPhotoPath, BIDCardPhotoPath, passportType, passportCountryCode, passportDocumentPath, PublicWalletAddress, uniqueUsername, bloodType]
        );
        if (newPatient.rows[0].length === 0) {
            return res.json({ message: "error adding new patient" })
        }
        const mailOptions = {
            from: "CoreCare <corecareofficial@gmail.com>",
            to: email,
            subject: 'Password to signin to corecare platform',
            text: `
    Hello,
    
    Thank you for signing up with CoreCare. To signin to your account, please use this password: ${generatedPassword}
    
    Then you can change this password in your settings page
    
    If you didn't use your email to create an account in our platform, please ignore this email.
    
    Best regards,
    CoreCare Team
    
    This is an automated message, please do not reply.
      `,
            html: `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="border: 1px solid white; border-radius:25px; padding: 10px;">
      <div style="padding: 10px;">
      <h2 style="color: #4a4a4a;">Password to signin to corecare platform</h2>
      <p>Hello,</p>
      <p>Thank you for signing up with CoreCare. </p>
      <p>To signin to your account, please use this password:</p>
      <h1 style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px;">${generatedPassword}</h1>
      <p>Then you can change this password in your settings page.</p>
      <p>If you didn't use your email to create an account in our platform, please ignore this email.</p>
      <p>Best regards,<br>CoreCare Team</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #888;">This is an automated message, please do not reply.</p>
      </div>
      </div>
    </body>
    </html>
      `
        };

        res.json({ patientID, hashedPassword });
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error inserting patient:', err);
        if (err.code === '23505') {
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send('Server error');
        }
    }
});


// SELECT all patients
// router.get('/', async (req, res) => {
//     try {
//         const allPatients = await pool.query('SELECT * FROM PATIENT');
//         res.json(allPatients.rows);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// SELECT a patient by ID
router.get('/:patientID', async (req, res) => {
    const { patientID } = req.params;

    try {
        const patient = await pool.query('SELECT * FROM PATIENT WHERE patientID = $1', [patientID]);
        if (patient.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(patient.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Select a patient by email
router.get('/', async (req, res) => {
    const { email } = req.query;

    try {
        const patientQuery = await pool.query('SELECT * FROM PATIENT WHERE email = $1 OR username = $1', [email]);
        if (patientQuery.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }

        const patient = patientQuery.rows[0];

        // Read files and include them in the response
        const response = {
            ...patient,
            personalphoto: await readFileContent(patient.personalphoto),
            // Uncomment these if you need them
            // fidcardphoto: await readFileContent(patient.fidcardphoto),
            // bidcardphoto: await readFileContent(patient.bidcardphoto),
            // passportdocument: await readFileContent(patient.passportdocument)
        };

        res.json(response);
    } catch (err) {
        console.error('Error in GET route:', err);
        res.status(500).send(err.message);
    }
});

// UPDATE a general info
router.put('/general/:patientID', async (req, res) => {
    const { patientID } = req.params;
    let { firstname, secondname, thirdname, lastname, phonenumber, address, country, job, sex, dateofbirth, status } = req.body;

    console.log('req.body:', req.body);


    console.log('Received request to update patient:', patientID);
    try {
        const oldPatientQuery = await pool.query('SELECT firstname, secondname, thirdname, lastname, phonenumber, address, country, job, sex, dateofbirth, status FROM PATIENT WHERE patientID = $1', [patientID]);

        if (oldPatientQuery.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }

        const oldPatient = oldPatientQuery.rows[0];
        console.log("Existing patient data: ", oldPatient);

        // Assign old values if new values are undefined
        firstname = firstname !== '' ? firstname : oldPatient.firstname;
        lastname = lastname !== '' ? lastname : oldPatient.lastname;
        phonenumber = phonenumber !== '' ? phonenumber : oldPatient.phonenumber;
        address = address !== '' ? address : oldPatient.address;
        country = country !== '' ? country : oldPatient.country;
        dateofbirth = dateofbirth !== '' ? dateofbirth : oldPatient.dateofbirth;

        console.log('Updated values:', firstname, secondname, thirdname, lastname, phonenumber, address, country, job, sex, dateofbirth, status);

        const updatePatient = await pool.query(
            `UPDATE PATIENT SET 
                firstname = $1, 
                secondname = $2, 
                thirdname = $3, 
                lastname = $4, 
                phonenumber = $5, 
                address = $6, 
                country = $7, 
                job = $8, 
                sex = $9, 
                dateofbirth = $10, 
                status = $11
            WHERE patientID = $12 
            RETURNING *`,
            [firstname, secondname, thirdname, lastname, phonenumber, address, country, job, sex, dateofbirth, status, patientID]
        );

        if (updatePatient.rows.length === 0) {
            return res.status(404).send('Failed to update patient information');
        }

        res.json('Patient updated successfully');
    } catch (err) {
        console.error('Error updating patient information:', err);
        res.status(500).send('Internal server error');
    }
});

// Update a patient's personal photo via email
router.put('/personalphoto/:username', upload.fields([
    { name: 'personalPhoto', maxCount: 1 }
]), async (req, res) => {
    const { username } = req.params;

    try {
        const personalPhotoPath = req.files.personalPhoto ? req.files.personalPhoto[0].path : null;
        const newPhoto = await pool.query('UPDATE PATIENT SET personalphoto = $1 WHERE username = $2 RETURNING personalphoto', [personalPhotoPath, username]);
        if (newPhoto.rows.length === 0) {
            return res.status(404).send('Personal photo not updated');
        }
        // const newPersonalphoto = await readFileContent(newPhoto.rows[0].personalphoto);
        res.json('Personal photo updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a patient's personal photo via patientID
router.put('/personalphoto/:patientID', upload.fields([
    { name: 'personalPhoto', maxCount: 1 }
]), async (req, res) => {
    const { patientID } = req.params;

    try {
        const personalPhotoPath = req.files.personalPhoto ? req.files.personalPhoto[0].path : null;
        const newPhoto = await pool.query('UPDATE PATIENT SET personalphoto = $1 WHERE patientID = $2 RETURNING *', [personalPhotoPath, patientID]);
        if (newPhoto.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(newPhoto.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATE a patient's health info
router.put('/healthinfo/:patientID', async (req, res) => {
    const { patientID } = req.params;
    const { bloodtype, weight, height, allergies } = req.body;
    const currentDate = moment().tz('Asia/Aden').format('YYYY-MM-DDTHH:mm:ss');

    console.log('currentDate:', currentDate);


    try {

        const updatebloodtype = await pool.query(`UPDATE patient SET bloodtype=$1 WHERE patientID =$2 RETURNING *`, [bloodtype, patientID]);

        const updateHealthInfo = await pool.query(
            `INSERT INTO health_info (weight, height, weightdate, heightdate, patientid)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (patientid) DO UPDATE 
            SET weight = EXCLUDED.weight, height = EXCLUDED.height, weightdate = EXCLUDED.weightdate, heightdate = EXCLUDED.heightdate
            RETURNING *`,
            [weight, height, currentDate, currentDate, patientID]
        );

        const updateAllergies = await pool.query(
            `INSERT INTO allergies (allergyname, allergiesdate, patientid)
            VALUES ($1, $2, $3)
            ON CONFLICT (patientid) DO UPDATE 
            SET allergyname = EXCLUDED.allergyname, allergiesdate = EXCLUDED.allergiesdate
            RETURNING *`,
            [allergies, currentDate, patientID]
        );

        if (updateHealthInfo.rows.length === 0 && updatebloodtype.rows.length === 0 && updateAllergies.rows.length === 0) {
            return res.status(404).send('Failed to update health information');
        }
        res.json("Patient updated successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATE a patient's allergie



// GET patient info from the database
router.get('/getpatientinfo/:emailorusername', async (req, res) => {
    const { emailorusername } = req.params;
    try {
        const patientIDResult = await pool.query('SELECT patientID FROM PATIENT WHERE email = $1 or username = $1', [emailorusername]);
        const patientID = patientIDResult.rows[0].patientid;

        const emailQuery = await pool.query('SELECT email FROM PATIENT WHERE patientID = $1', [patientID]);
        const email = emailQuery.rows[0].email;

        const patientInfoResult = await pool.query('SELECT patientid, username, firstName, secondName, thirdName, lastName, phoneNumber, address, country, job, sex, dateOfBirth, status, personalphoto, bloodtype FROM PATIENT WHERE email = $1', [email]);
        const patient = patientInfoResult.rows[0];
        const patientInfo = {
            ...patient,
            personalphoto: await readFileContent(patient.personalphoto),
        };

        const healthInfoResult = await pool.query('SELECT weight, height FROM health_info WHERE patientID = $1', [patientID]);
        const healthInfo = healthInfoResult.rows[0];

        const allergiesResult = await pool.query('SELECT * FROM allergies WHERE patientID = $1', [patientID]);
        const allergies = allergiesResult.rows[0];

        const socialMediaResult = await pool.query('SELECT * FROM socialmedia WHERE email = $1', [email]);
        const socialMedia = socialMediaResult.rows;

        const emergencyContactsResult = await pool.query('SELECT * FROM emergency_contacts WHERE patientID = $1', [patientID]);
        let emergencyContacts = [];
        for (let i = 0; i < emergencyContactsResult.rows.length; i++) {
            const chosenUserResult = await pool.query('SELECT firstname, lastname FROM patient WHERE patientID = $1', [emergencyContactsResult.rows[i].chosenuserid]);
            emergencyContacts[i] = {
                id: emergencyContactsResult.rows[i].id,
                name: chosenUserResult.rows[0].firstname + " " + chosenUserResult.rows[0].lastname
            };
        }

        const patientData = {
            patientInfo,
            healthInfo,
            allergies,
            socialMedia,
            emergencyContacts
        };

        res.json(patientData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// INSERT a new emergency contact via emailorusername
router.post('/newemergencycontact/:emailorusername', async (req, res) => {
    const { emailorusername } = req.params;
    const { chosenUserEmail } = req.body;
    try {
        const patientIDResult = await pool.query('SELECT patientID FROM PATIENT WHERE email = $1 or username = $1', [emailorusername]);
        const patientID = patientIDResult.rows[0].patientid;

        const chosenUserIDResult = await pool.query('SELECT patientID FROM PATIENT WHERE email = $1', [chosenUserEmail]);
        const chosenUserID = chosenUserIDResult.rows[0].patientid;

        const newEmergencyContact = await pool.query('INSERT INTO emergency_contacts (patientID, chosenUserID) VALUES ($1, $2) RETURNING *', [patientID, chosenUserID]);
        res.json(newEmergencyContact.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE an emergency contact via emailorusername
router.delete('/deleteemergencycontact/:emailorusername', async (req, res) => {
    const { emailorusername } = req.params;
    const { chosenUserEmail } = req.body;
    try {
        const patientIDResult = await pool.query('SELECT patientID FROM PATIENT WHERE email = $1 or username = $1', [emailorusername]);
        const patientID = patientIDResult.rows[0].patientid;

        const chosenUserIDResult = await pool.query('SELECT patientID FROM PATIENT WHERE email = $1', [chosenUserEmail]);
        const chosenUserID = chosenUserIDResult.rows[0].patientid;

        const deleteEmergencyContact = await pool.query('DELETE FROM emergency_contacts WHERE patientID = $1 AND chosenUserID = $2 RETURNING *', [patientID, chosenUserID]);
        res.json(deleteEmergencyContact.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE a patient via email
router.delete('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const deletePatient = await pool.query('DELETE FROM PATIENT WHERE email = $1 RETURNING *', [email]);
        res.json(deletePatient.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//



export default router;
