import express from 'express';
import pool from '../db.js';
import path from 'path';
import multer from 'multer';
import fs from 'fs/promises';
import fss from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username = req.body.username;
        const type = file.fieldname;

        // Define paths based on the file type
        const basePath = `Users/Doctor/${username}`;
        const paths = {
            licenseDocument: `${basePath}/licenseDocument`,
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

// Helper function to read file content
const readFileContent = async (filePath) => {
    if (!filePath) {
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

// INSERT a new doctor
router.post('/', upload.fields([
    { name: 'licenseDocument', maxCount: 1 }
]), async (req, res) => {
    const DOC = "DOC-";
    const { patientID, specialization, academicDegree, locationOfWork, licenseNumber } = req.body;

    try {
        // Get the last ID from the table
        const result = await pool.query('SELECT MAX(ID) as maxID FROM DOCTOR');
        const lastID = result.rows[0].maxid || 0;
        const newID = lastID + 1;
        const doctorID = DOC + newID;


        // File paths
        const licenseDocumentPath = req.files.licenseDocument ? req.files.licenseDocument[0].path : null;

        const newDoctor = await pool.query(
            `INSERT INTO DOCTOR (doctorID, patientID, specialization, academicdegree, locationofwork, licensenumber, licensedocument) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [doctorID, patientID, specialization, academicDegree, locationOfWork, licenseNumber, licenseDocumentPath]
        );
        res.json(newDoctor.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get Doctor Data
router.get('/:patientID', async (req, res) => {
    const { patientID } = req.params;

    try {
        // Edit this fetch query to get the doctor data except the license document


        const doctor = await pool.query('SELECT id, doctorid, patientid, specialization, academicdegree, yearsofexperience, locationofwork, clinicnumber FROM DOCTOR WHERE patientID = $1', [patientID]);
        if (doctor.rows.length === 0) {
            return res.status(404).send('Doctor not found');
        }


        res.json(doctor.rows[0]);
    } catch (err) {
        console.error('Error in GET route:', err);
        res.status(500).send(err.message);
    }
});

router.get('/:doctorID', async (req, res) => {
    const { doctorID } = req.params;

    try {
        const doctor = await pool.query('SELECT * FROM DOCTOR WHERE doctorID = $1', [doctorID]);
        if (doctor.rows.length === 0) {
            return res.status(404).send('Doctor not found');
        }
        res.json(doctor.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/getdoctorinfo/:patientID', async (req, res) => {
    const { patientID } = req.params;

    try {

        const doctorEmailResult = await pool.query('SELECT email FROM PATIENT WHERE patientID = $1', [patientID]);
        const email = doctorEmailResult.rows[0].email;

        const doctoridResult = await pool.query('SELECT doctorid FROM DOCTOR WHERE patientID = $1', [patientID]);
        const doctorid = doctoridResult.rows[0].doctorid;

        const profissionalInfoResult = await pool.query('SELECT doctorid, specialization, academicdegree, yearsofexperience, locationofwork, clinicnumber FROM DOCTOR WHERE patientID = $1', [patientID]);
        const profissional = profissionalInfoResult.rows[0];

        const practiceInfoResult = await pool.query('SELECT practicelocation, affiliations, practicehours, languagesspoken FROM PRACTICE_INFO WHERE doctorID = $1', [doctorid]);
        const practice = practiceInfoResult.rows[0];

        const educacaionalInfoResult = await pool.query('SELECT medschool, internships, residencies, fellowships FROM EDUCATIONAL_INFO WHERE doctorID = $1', [doctorid]);
        const educational = educacaionalInfoResult.rows[0];

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
            [email]
        );

        const workHours = formatWorkHours(workHoursResult.rows);

        const doctorData = {
            doctorid,
            profissional,
            practice,
            educational,
            workHours
        };

        res.json(doctorData);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update Proffesional Info
router.put('/updateprofissionalinfo/:doctorID', async (req, res) => {
    const { doctorID } = req.params;
    const { specialization, academicdegree, yearsofexperience, locationofwork, clinicnumber } = req.body;

    try {
        const updateProffesionalInfo = await pool.query(`
        UPDATE DOCTOR 
        SET specialization = $1, 
        academicdegree = $2,
        yearsofexperience = $3, 
        locationofwork = $4, 
        clinicnumber = $5 
        WHERE doctorID = $6 RETURNING *`, [specialization, academicdegree, yearsofexperience, locationofwork, clinicnumber, doctorID]);

        if (updateProffesionalInfo.rowCount === 0) {
            return res.status(404).send("Proffesional Info not Updated");
        }
        res.status(200).json({ message: "Proffesional Info Updated Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Practice Info
router.put('/updatepracticeinfo/:doctorID', async (req, res) => {
    const { doctorID } = req.params;
    const { practicelocation, affiliations, practicehours, languagesspoken } = req.body;

    try {

        const getPracticeInfo = await pool.query(`SELECT practicelocation, affiliations, practicehours, languagesspoken from PRACTICE_INFO WHERE doctorID = $1`, [doctorID]);
        if (getPracticeInfo.rows.length === 0) {
            return res.status(404).json({ message: 'Practice Info not found' });
        }
        const oldpractice = getPracticeInfo.rows[0];

        const updatedPracticeLocation = practicelocation !== '' ? practicelocation : oldpractice.practicelocation;
        const updatedAffiliations = affiliations !== '' ? affiliations : oldpractice.affiliations;
        const updatedPracticehours = practicehours !== '' ? practicehours : oldpractice.practicehours;
        const updatedLanguagesspoken = languagesspoken !== '' ? languagesspoken : oldpractice.languagesspoken;

        const updatePracticeInfo = await pool.query(
            `INSERT INTO PRACTICE_INFO (practicelocation, affiliations, practicehours, languagesspoken, doctorID)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (doctorID) DO UPDATE 
            SET practicelocation = EXCLUDED.practicelocation, affiliations = EXCLUDED.affiliations, practicehours = EXCLUDED.practicehours, languagesspoken = EXCLUDED.languagesspoken
            RETURNING *`,
            [updatedPracticeLocation, updatedAffiliations, updatedPracticehours, updatedLanguagesspoken, doctorID]
        );


        if (updatePracticeInfo.rowCount === 0) {
            return res.status(404).json("Failed to update practice info");
        }
        res.json('Updated Practice Info Successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update Educational Info
router.put('/updateeducationalinfo/:doctorID', async (req, res) => {
    const { doctorID } = req.params;
    const { medschool, internships, residencies, fellowships } = req.body;

    try {
        const getEducationalInfo = await pool.query(`SELECT medschool, internships, residencies, fellowships from EDUCATIONAL_INFO WHERE doctorid = $1 `, [doctorID]);
        if (getEducationalInfo.rows.length === 0) {
            return res.status(404).json({ message: 'Educational Info not found' });
        }
        const oldedu = getEducationalInfo.rows[0];

        const updatedMedschool = medschool !== '' ? medschool : oldedu.medschool;
        const updatedInternships = internships !== '' ? internships : oldedu.internships;
        const updatedResidencies = residencies !== '' ? residencies : oldedu.residencies;
        const updatedFellowships = fellowships !== '' ? fellowships : oldedu.fellowships;

        const updateEducationalInfo = await pool.query(
            `INSERT INTO EDUCATIONAL_INFO (medschool, internships, residencies, fellowships, doctorID)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (doctorID) DO UPDATE 
            SET medschool = EXCLUDED.medschool, internships = EXCLUDED.internships, residencies = EXCLUDED.residencies, fellowships = EXCLUDED.fellowships
            RETURNING *`,
            [updatedMedschool, updatedInternships, updatedResidencies, updatedFellowships, doctorID]
        );

        if (updateEducationalInfo.rowCount === 0) {
            return res.status(404).json({ message: "Failed to update educational info" });
        }
        res.status(200).json({ message: 'Updated Educational Info Successfully' });
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// update work hours
router.put('/updateworkhours/:email', async (req, res) => {
    const { email } = req.params;
    const workHours = req.body;

    try {
        const existingWorkDays = await pool.query(
            `SELECT 
            WORK_DAYS.ID, 
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
            [email]
        );

        if (existingWorkDays.rows.length === 0) {
            return res.status(404).send('Work days not found');
        }

        for (const workDay of workHours) {
            const existingWorkDay = existingWorkDays.rows.find(
                (entry) =>
                    entry.facilityname === workDay.facilityName &&
                    entry.days === workDay.workDays
            );

            if (existingWorkDay) {
                const updateWorkDay = await pool.query('UPDATE WORK_DAYS SET facilityName = $1, days = $2 WHERE ID = $3 RETURNING *', [workDay.facilityName, workDay.workDays, existingWorkDay.id]);
                if (updateWorkDay.rowCount === 0) {
                    return res.status(404).send('Work day not found');
                }

                const updateWorkHours = await pool.query('UPDATE WORK_HOURS SET from = $1, to = $2, period = $3 WHERE workDayID = $4 RETURNING *', [workDay.from, workDay.to, workDay.period, existingWorkDay.id]);
                if (updateWorkHours.rowCount === 0) {
                    return res.status(404).send('Work hours not found');
                }
            } else {
                const newWorkDay = await pool.query('INSERT INTO WORK_DAYS (facilityName, days, email) VALUES ($1, $2, $3) RETURNING *', [workDay.facilityName, workDay.workDays, email]);
                if (newWorkDay.rowCount === 0) {
                    return res.status(404).send('Work day not found');
                }

                const newWorkHours = await pool.query('INSERT INTO WORK_HOURS (workDayID, from, to, period) VALUES ($1, $2, $3, $4) RETURNING *', [newWorkDay.rows[0].id, workDay.from, workDay.to, workDay.period]);
                if (newWorkHours.rowCount === 0) {
                    return res.status(404).send('Work hours not found');
                }
            }
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 

export default router;