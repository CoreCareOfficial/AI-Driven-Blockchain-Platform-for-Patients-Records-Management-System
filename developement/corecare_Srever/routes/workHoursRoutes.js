import express from 'express';
import pool from '../db.js';

const router = express.Router();

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

router.get('/:emailorusername', async (req, res) => {
    try {
        const { emailorusername } = req.params;
        const emailQuery = await pool.query('SELECT email FROM login WHERE email = $1 OR username = $1', [emailorusername]);
        const email = emailQuery.rows[0].email;
        const workHours = await pool.query(
            `SELECT 
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

        if (workHours.rows.length === 0) {
            return res.status(400).send('Not found');
        }

        const formattedData = formatWorkHours(workHours.rows);

        res.json(formattedData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const { email, hospitalName, workDays, DayworkHours, NightworkHours } = req.body;
        // Insert into WORK_DAYS table
        const newWorkDay = await pool.query(
            `INSERT INTO WORK_DAYS (email, facilityName, days)
            VALUES ($1, $2, $3)
            RETURNING id`,
            [email, hospitalName, workDays]
        );

        const workDayID = newWorkDay.rows[0].id;

        // Insert into WORK_HOURS table for DayworkHours
        if (DayworkHours) {
            const [fromm, to] = DayworkHours.split(' - ');
            await pool.query(
                `INSERT INTO WORK_HOURS (workDayID, "from", "to", period)
                VALUES ($1, $2, $3, $4)`,
                [workDayID, fromm, to, 'Morning']
            );
        }

        // Insert into WORK_HOURS table for NightworkHours
        if (NightworkHours) {
            const [fromm, to] = NightworkHours.split(' - ');
            await pool.query(
                `INSERT INTO WORK_HOURS (workDayID, "from", "to", period)
                VALUES ($1, $2, $3, $4)`,
                [workDayID, fromm, to, 'Afternoon']
            );
        }

        res.status(200).json({ message: 'Work Day and Work Hours added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    try {
        const { id } = req.params;
        const { hospitalName, workDays, DayworkHours, NightworkHours } = req.body;

        // Update WORK_DAYS table
        await pool.query(
            `UPDATE WORK_DAYS
            SET facilityName = $1, days = $2
            WHERE id = $3`,
            [hospitalName, workDays, id]
        );

        // Update WORK_HOURS table for DayworkHours
        if (DayworkHours) {
            const [fromm, to] = DayworkHours.split(' - ');
            await pool.query(
                `UPDATE WORK_HOURS
                SET "from" = $1, "to" = $2
                WHERE workDayID = $3 AND period = 'Morning'`,
                [fromm, to, id]
            );
        }

        // Update WORK_HOURS table for NightworkHours
        if (NightworkHours) {
            const [fromm, to] = NightworkHours.split(' - ');
            await pool.query(
                `UPDATE WORK_HOURS
                SET "from" = $1, "to" = $2
                WHERE workDayID = $3 AND period = 'Afternoon'`,
                [fromm, to, id]
            );
        }

        res.status(200).json({ message: 'Work Day and Work Hours updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
