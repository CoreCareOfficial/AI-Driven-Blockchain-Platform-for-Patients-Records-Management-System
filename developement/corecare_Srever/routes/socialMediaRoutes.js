import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { patientID } = req.query;

    try {
        const socialAccounts = await pool.query('SELECT * from socialmedia WHERE patientID = $1 or healthcareid = $1', [patientID]);
        if (socialAccounts.rows.length === 0) {
            return res.status(404).send('account not found');
        }
        res.json(socialAccounts.rows);

    } catch (err) {

    }
});

router.put('/:patientID', async (req, res) => {
    const { patientID } = req.params;
    const { fb, facebook, tw, twitter, li, linkedin, im, instagram, wh, whatsapp } = req.body;

    try {
        const fbupdate = await pool.query('UPDATE socialmedia set link = $1 wHERE type = $2 and patientID = $3', [facebook, fb, patientID]);
        const twupdate = await pool.query('UPDATE socialmedia set link = $1 wHERE type = $2 and patientID = $3', [twitter, tw, patientID]);
        const liupdate = await pool.query('UPDATE socialmedia set link = $1 wHERE type = $2 and patientID = $3', [linkedin, li, patientID]);
        const imupdate = await pool.query('UPDATE socialmedia set link = $1 wHERE type = $2 and patientID = $3', [instagram, im, patientID]);
        const whupdate = await pool.query('UPDATE socialmedia set link = $1 wHERE type = $2 and patientID = $3', [whatsapp, wh, patientID]);

        res.json({ message: "Updated successfully" })

    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;