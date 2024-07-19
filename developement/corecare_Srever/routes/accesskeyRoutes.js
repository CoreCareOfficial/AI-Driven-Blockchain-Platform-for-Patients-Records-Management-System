import express from 'express';
import pool from '../db.js';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const router = express.Router();

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

const generateAccessKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>?';
    let accessKey = '';
    for (let i = 0; i < 43; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        accessKey += characters[randomIndex];
    }
    return accessKey;
};

// To create a new access key
router.post('/create', async (req, res) => {
    const { patientid, keyuser, period, specificDateTime } = req.body;
    console.log(patientid, keyuser, period, specificDateTime);

    const accessKey = generateAccessKey();
    console.log(accessKey);

    try {
        let accessKeyQuery;
        if (specificDateTime) {
            // Use specific datetime if provided
            accessKeyQuery = await pool.query(
                'INSERT INTO temp_access (patientid, keyuser, accesskey, created_at, valid_until) VALUES ($1, $2, $3, NOW(), $4) RETURNING *',
                [patientid, keyuser, accessKey, specificDateTime]
            );
        } else {
            // Use period to calculate valid_until
            accessKeyQuery = await pool.query(
                'INSERT INTO temp_access (patientid, keyuser, accesskey, created_at, valid_until) VALUES ($1, $2, $3, NOW(), NOW() + $4::INTERVAL) RETURNING *',
                [patientid, keyuser, accessKey, period]
            );
        }

        res.status(200).json({ accessKey: accessKeyQuery.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// To get all access keys for a doctor
router.get('/get/:emailorusername', async (req, res) => {
    const emailorusername = req.params.emailorusername;
    try {
        const providerType = await pool.query('SELECT type from login where email = $1 or username = $1', [emailorusername]);
        const type = providerType.rows[0].type;

        let providerid;
        if (type === 'Doctor') {
            const patientid = await pool.query('SELECT patientid from patient where email = $1', [emailorusername]);
            const provideridQuery = await pool.query('SELECT doctorid from doctor where patientid = $1', [patientid.rows[0].patientid]);
            providerid = provideridQuery.rows[0].doctorid;
        }
        else {
            const provideridQuery = await pool.query('SELECT id from healthcare_provider where email = $1', [emailorusername]);
            providerid = provideridQuery.rows[0].id;
        }

        const accessKeysQuery = await pool.query('SELECT * FROM temp_access WHERE keyuser = $1 ORDER BY created_at', [providerid]);
        if (accessKeysQuery.rows.length === 0) {
            return res.status(404).json({ message: 'No access keys found' });
        }
        const notifications = [];
        for (let i = 0; i < accessKeysQuery.rows.length; i++) {
            const patientName = await pool.query('SELECT firstname, lastname FROM patient WHERE patientid = $1', [accessKeysQuery.rows[i].patientid]);
            if (accessKeysQuery.rows[i].valid_until > new Date()) {
                notifications.push({
                    ...accessKeysQuery.rows[i],
                    patientName: patientName.rows[0].firstname + ' ' + patientName.rows[0].lastname,
                });
            }

        }
        res.status(200).json({ notifications: notifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getnotificationtoast/:emailorusername', async (req, res) => {
    const emailorusername = req.params.emailorusername;
    try {
        const providerType = await pool.query('SELECT type from login where email = $1 or username = $1', [emailorusername]);
        const type = providerType.rows[0].type;

        let providerid;
        if (type === 'Doctor') {
            const patientid = await pool.query('SELECT patientid from patient where email = $1', [emailorusername]);
            const provideridQuery = await pool.query('SELECT doctorid from doctor where patientid = $1', [patientid.rows[0].patientid]);
            providerid = provideridQuery.rows[0].doctorid;
        }
        else {
            const provideridQuery = await pool.query('SELECT id from healthcare_provider where email = $1', [emailorusername]);
            providerid = provideridQuery.rows[0].id;
        }

        const accessKeysQuery = await pool.query('SELECT * FROM temp_access WHERE keyuser = $1 ORDER BY created_at', [providerid]);
        if (accessKeysQuery.rows.length === 0) {
            return res.status(404).json(accessKeysQuery.rows.length);
        }
        let notifications = 0;
        for (let i = 0; i < accessKeysQuery.rows.length; i++) {
            if (accessKeysQuery.rows[i].valid_until > new Date()) {
                notifications++;
            }

        }
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// To get all providerss
router.get('/getproviders', async (req, res) => {
    try {
        const providers = [];
        const doctorsQuery = await pool.query('SELECT patientid, doctorid, specialization FROM doctor');
        for (let i = 0; i < doctorsQuery.rows.length; i++) {
            const doctor = doctorsQuery.rows[i];
            const doctorpersonalQuery = await pool.query('SELECT firstname, lastname, personalphoto FROM patient WHERE patientid = $1', [doctor.patientid]);

            providers.push({
                id: doctor.doctorid,
                personalphoto: await readFileContent(doctorpersonalQuery.rows[0].personalphoto),
                name: 'Dr/  ' + doctorpersonalQuery.rows[0].firstname + ' ' + doctorpersonalQuery.rows[0].lastname,
                specialization: doctor.specialization,
                type: 'Doctor',
            })
        }

        // const healthcareProvidersInfo = [];
        const healthcareProvidersQuery = await pool.query('SELECT id, name, country, address, facility_id, facilityphoto FROM healthcare_provider');
        for (let i = 0; i < healthcareProvidersQuery.rows.length; i++) {
            const healthcareProvider = healthcareProvidersQuery.rows[i];
            const facility_type = await pool.query('SELECT facilityname FROM healthcare_facilities WHERE id = $1', [healthcareProvider.facility_id]);
            providers.push({
                id: healthcareProvider.id,
                personalphoto: await readFileContent(healthcareProvider.facilityphoto),
                name: healthcareProvider.name,
                specialization: healthcareProvider.country + ' ' + healthcareProvider.address,
                type: facility_type.rows[0].facilityname,
            })
        }

        res.status(200).json(providers);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;