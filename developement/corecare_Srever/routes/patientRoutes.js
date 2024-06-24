import express from 'express';
import pool from '../db.js';
import path from 'path';
import multer from 'multer';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage engine using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username = req.body.username;
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
        if (!fs.existsSync(paths[type])) {
            fs.mkdirSync(paths[type], { recursive: true });
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
    const { username, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, idType, nationalID, passportNo, passportType, passportCountryCode, PublicWalletAddress } = req.body;

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

        console.log({
            patientID,
            firstName,
            secondName,
            thirdName,
            lastName,
            email,
            password,
            dateOfBirth,
            country,
            sex,
            phoneNumber,
            status,
            address,
            job,
            personalPhotoPath,
            idType,
            nationalID,
            passportNo,
            FIDCardPhotoPath,
            BIDCardPhotoPath,
            passportType,
            passportCountryCode,
            passportDocumentPath,
            PublicWalletAddress,
            uniqueUsername
        });

        const newPatient = await pool.query(
            `INSERT INTO PATIENT (patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhoto, idType, nationalID, passportNo, FIDCardPhoto, BIDCardPhoto, passportType, passportCountryCode, passportDocument, PublicWalletAddress, username) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) 
            RETURNING *`,
            [patientID, firstName, secondName, thirdName, lastName, email, password, dateOfBirth, country, sex, phoneNumber, status, address, job, personalPhotoPath, idType, nationalID, passportNo, FIDCardPhotoPath, BIDCardPhotoPath, passportType, passportCountryCode, passportDocumentPath, PublicWalletAddress, uniqueUsername]
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

// 

// Get Patient Data
router.get('/', async (req, res) => {
    const { email } = req.body;

    try {
        const patientQuery = await pool.query('SELECT * FROM PATIENT WHERE email = $1 or username = $1', [email]);
        if (patientQuery.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }

        const patient = patientQuery.rows[0];

        // Read files and include them in the response
        const response = {
            ...patient,
            personalphoto: await readFileContent(patient.personalphoto),
            fidcardphoto: await readFileContent(patient.fidcardphoto),
            bidcardphoto: await readFileContent(patient.bidcardphoto),
            passportdocument: await readFileContent(patient.passportdocument)
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
    const { firstName, secondName, thirdName, lastName, phoneNumber, address, country, job, sex, dateOfBirth, status } = req.body;

    try {
        const updatePatient = await pool.query(
            `UPDATE PATIENT SET 
            firstname=$1, 
            secondname=$2, 
            thirdname=$3, 
            lastname=$4, 
            phonenumber=$5, 
            address=$6, 
            country=$7, 
            job=$8, 
            sex=$9, 
            dateofbirth=$10, 
            status=$11
      WHERE patientID =$12  RETURNING *`,
            [firstName, secondName, thirdName, lastName, phoneNumber, address, country, job, sex, dateOfBirth, status, patientID]
        );

        if (updatePatient.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json(updatePatient.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// DELETE a patient
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletePatient = await pool.query('DELETE FROM PATIENT WHERE ID = $1 RETURNING *', [id]);
        if (deletePatient.rows.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
