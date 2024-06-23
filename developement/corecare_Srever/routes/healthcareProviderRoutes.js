import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username = req.body.username;
        const userType = req.body.type;
        const type = file.fieldname;

        // Define paths based on the file type
        const basePath = `Users/healthcareProvider/${userType}/${username}`;
        const paths = {
            licenseDocument: `${basePath}/licenseDocument`,
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

// Insert a new healthcare Provider
router.post('/', upload.fields([
    { name: 'licenseDocument', maxCount: 1 }
]), async (req, res) => {
    const { username, name, phoneNumber, email, password, country, address, licenseNumber, publicWalletAddress } = req.body;

    try {


        // File paths
        const licenseDocumentPath = req.files.licenseDocument ? req.files.licenseDocument[0].path : null;

        const newHealthcareProvider = await pool.query(
            `INSERT INTO DOCTOR (username, name, phoneNumber, email, password, country, address, licenseNumber, licenseDocument, publicWalletAddress) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *`,
            [username, name, phoneNumber, email, password, country, address, licenseNumber, licenseDocumentPath, publicWalletAddress]
        );
        res.json(newHealthcareProvider.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});




export default router;