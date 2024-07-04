import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const socialAccounts = await pool.query('SELECT * from socialmedia WHERE email = $1', [email]);
        if (socialAccounts.rows.length === 0) {
            return res.status(404).send('account not found');
        }
        res.json(socialAccounts.rows);

    } catch (err) {

    }
});
router.get('healthcare/:patientID', async (req, res) => {
    const { patientID } = req.params;

    try {
        const socialAccounts = await pool.query('SELECT * from socialmedia WHERE patientID = $1', [patientID]);
        if (socialAccounts.rows.length === 0) {
            return res.status(404).send('account not found');
        }
        res.json(socialAccounts.rows);

    } catch (err) {

    }
});

router.put('/:email', async (req, res) => {
    const { email } = req.params;
    const { fb, facebook, tw, twitter, li, linkedin, im, instagram, wh, whatsapp } = req.body;
    try {
        const upsertQueries = [
            pool.query(`
                INSERT INTO socialmedia (email, type, link)
                VALUES ($3, $2, $1)
                ON CONFLICT (email, type) DO UPDATE 
                SET link = EXCLUDED.link
            `, [twitter, tw, email]),
            pool.query(`
                INSERT INTO socialmedia (email, type, link)
                VALUES ($3, $2, $1)
                ON CONFLICT (email, type) DO UPDATE 
                SET link = EXCLUDED.link
            `, [linkedin, li, email]),
            pool.query(`
                INSERT INTO socialmedia (email, type, link)
                VALUES ($3, $2, $1)
                ON CONFLICT (email, type) DO UPDATE 
                SET link = EXCLUDED.link
            `, [instagram, im, email]),
            pool.query(`
                INSERT INTO socialmedia (email, type, link)
                VALUES ($3, $2, $1)
                ON CONFLICT (email, type) DO UPDATE 
                SET link = EXCLUDED.link
            `, [whatsapp, wh, email]),
            pool.query(`
                INSERT INTO socialmedia (email, type, link)
                VALUES ($3, $2, $1)
                ON CONFLICT (email, type) DO UPDATE 
                SET link = EXCLUDED.link
            `, [facebook, fb, email])
        ];

        await Promise.all(upsertQueries);

        res.json({ message: "Socailmedia accounts updated successfully" });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;