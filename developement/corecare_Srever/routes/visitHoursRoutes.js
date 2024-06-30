import express from 'express';
import pool from '../db.js';

const router = express.Router();

const formatVisitHours = (data) => {
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
            [email]
        );

        if (workHours.rows.length === 0) {
            return res.status(400).send('Not found');
        }

        const formattedData = formatVisitHours(workHours.rows);

        res.json(formattedData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;