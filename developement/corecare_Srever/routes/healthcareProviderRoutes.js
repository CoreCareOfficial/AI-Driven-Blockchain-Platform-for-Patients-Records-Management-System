import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import fss from 'fs';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username = req.body.username;
        const userType = req.body.type;
        const type = file.fieldname;

        // Define paths based on the file type
        const basePath = `Users/${userType}/${username}`;
        const paths = {
            licenseDocument: `${basePath}/licenseDocument`,
            facilityPhoto: `${basePath}/facilityPhoto`,
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

// Insert a new healthcare Provider
router.post('/', upload.fields([
    { name: 'licenseDocument', maxCount: 1 }
]), async (req, res) => {
    const { username, name, phoneNumber, email, country, address, licenseNumber, publicWalletAddress, facility_id, facilityPhoto } = req.body;

    try {


        // File paths
        const licenseDocumentPath = req.files.licenseDocument ? req.files.licenseDocument[0].path : null;

        const newHealthcareProvider = await pool.query(
            `INSERT INTO healthcare_provider (username, name, phoneNumber, email, country, address, licenseNumber, licensedocument, publicWalletAddress, facility_id, facilityphoto) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING *`,
            [username, name, phoneNumber, email, country, address, licenseNumber, licenseDocumentPath, publicWalletAddress, facility_id, facilityPhoto]
        );
        res.json(newHealthcareProvider.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Select Healthcare by email
router.get('/', async (req, res) => {
    const { email } = req.body;
    try {
        const healthcareProviderQuery = await pool.query('SELECT * from healthcare_provider WHERE email = $1 or username = $1', [email]);
        if (healthcareProviderQuery.rows.length === 0) {
            return res.status(404).send('Healthcare Provider not found');
        }

        const healthcareProvider = healthcareProviderQuery.rows[0];

        const respose = {
            ...healthcareProvider,
            facilityphoto: await readFileContent(healthcareProvider.facilityphoto)
        }

        res.json(respose);

    } catch (err) {
        console.error('Error in GET route:', err);
        res.status(500).send(err.message);
    }
});

router.put('/facilityphoto', upload.fields([
    { name: 'facilityPhoto', maxCount: 1 }
]), async (req, res) => {
    const { email } = req.body;

    try {
        const facilityPhototPath = req.files.facilityPhoto ? req.files.facilityPhoto[0].path : null;
        const newPhoto = await pool.query('UPDATE healthcare_provider SET facilityphoto = $1 where email = $2 RETURNING *', [facilityPhototPath, email]);
        if (newPhoto.rows.length === 0) {
            return res.status(404).send('Facility not found');
        }
        res.json(newPhoto.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }

});




export default router;