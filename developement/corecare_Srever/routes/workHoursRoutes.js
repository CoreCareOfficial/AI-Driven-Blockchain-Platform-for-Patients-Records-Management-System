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

router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
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

export default router;