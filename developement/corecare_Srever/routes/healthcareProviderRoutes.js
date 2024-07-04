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
        const type = file.fieldname;
        const userType = req.body.type ?? req.params.type;
        const username = req.body.username ?? req.params.username;

        console.log(userType);

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

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB limit
});

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

const formatWorkHours = (data) => {
    const result = [];

    data.forEach((item) => {
        let existingEntry = result.find(
            (entry) =>
                entry.hospitalName === item.facilityname &&
                entry.workDays === item.days
        );

        if (!existingEntry) {
            existingEntry = {
                id: item.id,
                hospitalName: item.facilityname,
                workDays: item.days,
                DayworkHours: '',
                NightworkHours: '',
            };
            result.push(existingEntry);
        }

        const timeRange = `${item.from} - ${item.to}`;

        if (item.period === 'Morning') {
            existingEntry.DayworkHours = timeRange;
        } else if (item.period === 'Afternoon') {
            existingEntry.NightworkHours = timeRange;
        }
    });

    return result;
};

const formatVisitHours = (data) => {
    const result = [];

    data.forEach((item) => {
        let existingEntry = result.find(
            (entry) =>
                entry.hospitalName === item.facilityname &&
                entry.visitDays === item.days
        );

        if (!existingEntry) {
            existingEntry = {
                id: item.id,
                hospitalName: item.facilityname,
                visitDays: item.days,
                DayvisitHours: '',
                NightvisitHours: '',
            };
            result.push(existingEntry);
        }

        const timeRange = `${item.from} - ${item.to}`;

        if (item.period === 'Morning') {
            existingEntry.DayvisitHours = timeRange;
        } else if (item.period === 'Afternoon') {
            existingEntry.NightvisitHours = timeRange;
        }
    });

    return result;
};

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
    const { email } = req.query;
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

// get all healthcare_provider info by email or username then get department info by healthcareid then services by healthcareid then workhours by email and if type is hospital get visithours by email
router.get('/gethealtcareinfo/:emailorusername', async (req, res) => {
    const { emailorusername } = req.params;
    try {

        const healthcareproviderType = await pool.query('SELECT type from login WHERE email = $1 or username = $1', [emailorusername]);
        const healthcareProviderQuery = await pool.query('SELECT id, username, name, phonenumber, email, country, address, facilityphoto from healthcare_provider WHERE email = $1 or username = $1', [emailorusername]);
        if (healthcareProviderQuery.rows.length === 0) {
            return res.status(404).send('Healthcare Provider not found');
        }

        const healthcareProvider = healthcareProviderQuery.rows[0];
        const healthcareProviderInfo = {
            ...healthcareProvider,
            facilityphoto: await readFileContent(healthcareProvider.facilityphoto),
        };

        const departmentQuery = await pool.query('SELECT id, healthcareid, name from departmets WHERE healthcareid = $1', [healthcareProvider.id]);
        const departments = departmentQuery.rows;

        const servicesQuery = await pool.query('SELECT id, healthcareid, name from services WHERE healthcareid = $1', [healthcareProvider.id]);
        const services = servicesQuery.rows;

        const facilitySocialMediaQuery = await pool.query('SELECT * from socialmedia WHERE email = $1', [healthcareProvider.email]);
        const facilitySocialMedia = facilitySocialMediaQuery.rows;

        const workHoursResult = await pool.query(
            `SELECT 
            WORK_DAYS.id,
            WORK_DAYS.facilityName, 
            WORK_DAYS.days, 
            WORK_HOURS.from, 
            WORK_HOURS.to,
            WORK_HOURS.period
        FROM 
            WORK_DAYS
        INNER JOIN 
            WORK_HOURS ON WORK_DAYS.ID = WORK_HOURS.workDayID
            WHERE 
            WORK_DAYS.email = $1;
        `,
            [healthcareProviderInfo.email]
        );
        const ficilityWorkHours = formatWorkHours(workHoursResult.rows);


        if (healthcareproviderType.rows[0].type === 'Hospital') {
            const visitHoursResult = await pool.query(
                `SELECT 
                VISIT_DAYS.id,
                VISIT_DAYS.facilityName, 
                VISIT_DAYS.days, 
                VISIT_HOURS.from, 
                VISIT_HOURS.to,
                VISIT_HOURS.period
            FROM 
            VISIT_DAYS
            INNER JOIN 
            VISIT_HOURS ON VISIT_DAYS.ID = VISIT_HOURS.visitDayID
                WHERE 
                VISIT_DAYS.email = $1;
            `,
                [healthcareProviderInfo.email]
            );
            const visitHours = formatVisitHours(visitHoursResult.rows);
            const healthcareProviderData = {
                healthcareProviderInfo,
                departments,
                services,
                facilitySocialMedia,
                ficilityWorkHours,
                visitHours
            }
            res.json(healthcareProviderData);
        }
        else {

            const healthcareProviderData = {
                healthcareProviderInfo,
                departments,
                services,
                facilitySocialMedia,
                ficilityWorkHours
            }

            res.json(healthcareProviderData);
        }

    } catch (err) {
        console.error('Error in GET route:', err);
        res.status(500).send(err.message);
    }
});

// update healtchcare provider info
router.put('/updatehealthcareprovider/:emailorusername', async (req, res) => {
    const { emailorusername } = req.params;
    const { name, phonenumber, country, address } = req.body;
    try {
        const updatedHealthcareProvider = await pool.query(
            `UPDATE healthcare_provider SET name = $1, phoneNumber = $2, country = $3, address = $4 WHERE username = $5 or email = $5 RETURNING *`,
            [name, phonenumber, country, address, emailorusername]
        );
        res.json('Healthcare Provider Updated Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// update facility photo
router.put('/updatefacilityphoto/:username', upload.fields([
    { name: 'facilityPhoto', maxCount: 1 }
]), async (req, res) => {
    const { username } = req.params;
    console.log(req.body);
    try {
        const facilityPhototPath = req.files.facilityPhoto ? req.files.facilityPhoto[0].path : null;
        const newPhoto = await pool.query('UPDATE healthcare_provider SET facilityphoto = $1 where username = $2 RETURNING *', [facilityPhototPath, username]);
        if (newPhoto.rows.length === 0) {
            return res.status(404).send('Failed to update facility photo');
        }
        res.json('Facility Photo Updated Successfully');

    } catch (err) {
        res.status(500).send(err.message);
    }

});

// Update Departments
router.put('/updatedepartments/:healthcareid', async (req, res) => {
    const { healthcareid } = req.params;
    const { departments, newDepartment } = req.body;
    let success = false;
    console.log(req.body);
    console.log(healthcareid);
    try {

        for (let index = 0; index < departments.length; index++) {
            const department = departments[index];
            await pool.query('UPDATE departmets set name = $1 where id = $2 and healthcareid = $3  ', [department.value, department.id, healthcareid]);
            success = true;
        }

        if (newDepartment !== '') {
            const insertDepartment = await pool.query(`INSERT INTO departmets (name, healthcareid) VALUES ($1, $2)`, [newDepartment, healthcareid]);
            success = true;
        }

        if (!success) {
            return res.status(400).json({ message: "Failed to update" });
        }
        res.status(200).json({ message: 'Departments Updated Successfully' }

        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Services
router.put('/updateservices/:healthcareid', async (req, res) => {
    const { healthcareid } = req.params;
    const { services, newService } = req.body;
    let success = false;
    console.log(req.body);
    console.log(healthcareid);
    try {

        for (let index = 0; index < services.length; index++) {
            const service = services[index];
            await pool.query('UPDATE services set name = $1 where id = $2 and healthcareid = $3  ', [service.value, service.id, healthcareid]);
            success = true;
        }

        if (newService !== '') {
            const insertService = await pool.query(`INSERT INTO services (name, healthcareid) VALUES ($1, $2)`, [newService, healthcareid]);
            success = true;
        }

        if (!success) {
            return res.status(400).json({ message: "Failed to update" });
        }
        res.status(200).json({ message: 'Services Updated Successfully' }

        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




export default router;