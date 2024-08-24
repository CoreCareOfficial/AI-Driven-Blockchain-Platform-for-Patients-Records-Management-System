import express from 'express';
import pool from '../db.js';

const router = express.Router();

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

router.get('/:emailorusername', async (req, res) => {
    try {
        const { emailorusername } = req.params;
        const emailQuery = await pool.query('SELECT email FROM login WHERE email = $1 OR username = $1', [emailorusername]);
        const email = emailQuery.rows[0].email;
        const visitHours = await pool.query(
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

        if (visitHours.rows.length === 0) {
            return res.status(400).send('Not found');
        }

        const formattedData = formatVisitHours(visitHours.rows);

        res.json(formattedData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/', async (req, res) => {
    try {

        const { email, hospitalName, visitDays, DayvisitHours, NightvisitHours } = req.body;
        const emailQuery = await pool.query('SELECT email FROM login WHERE email = $1 or username = $2', [email]);
        // Insert into VISIT_DAYS table
        const newVisitDay = await pool.query(
            `INSERT INTO VISIT_DAYS (email, facilityName, days)
            VALUES ($1, $2, $3)
            RETURNING id`,
            [emailQuery.rows[0].email, hospitalName, visitDays]
        );

        const visitDayID = newVisitDay.rows[0].id;

        // Insert into VISIT_HOURS table for DayvisitHours
        if (DayvisitHours) {
            const [fromm, to] = DayvisitHours.split(' - ');
            await pool.query(
                `INSERT INTO VISIT_HOURS (visitDayID, "from", "to", period)
                VALUES ($1, $2, $3, $4)`,
                [visitDayID, fromm, to, 'Morning']
            );
        }

        // Insert into VISIT_HOURS table for NightvisitHours
        if (NightvisitHours) {
            const [fromm, to] = NightvisitHours.split(' - ');
            await pool.query(
                `INSERT INTO VISIT_HOURS (visitDayID, "from", "to", period)
        VALUES ($1, $2, $3, $4)`,
                [visitDayID, fromm, to, 'Afternoon']
            );
        }

        res.status(200).json({ message: 'Visit Day and Visit Hours added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { hospitalName, visitDays, DayvisitHours, NightvisitHours } = req.body;

        // Update VISIT_DAYS table
        await pool.query(
            `UPDATE VISIT_DAYS
            SET facilityName = $1, days = $2
            WHERE id = $3`,
            [hospitalName, visitDays, id]
        );

        // Update VISIT_HOURS table for DayvisitHours
        if (DayvisitHours) {
            const [fromm, to] = DayvisitHours.split(' - ');
            await pool.query(
                `UPDATE VISIT_HOURS
                SET "from" = $1, "to" = $2
                WHERE visitDayID = $3 AND period = 'Morning'`,
                [fromm, to, id]
            );
        }

        // Update VISIT_HOURS table for NightvisitHours
        if (NightvisitHours) {
            const [fromm, to] = NightvisitHours.split(' - ');
            await pool.query(
                `UPDATE VISIT_HOURS
                SET "from" = $1, "to" = $2
                WHERE visitDayID = $3 AND period = 'Afternoon'`,
                [fromm, to, id]
            );
        }

        res.status(200).json({ message: 'Visit Day and Visit Hours updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;