import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { emailorusername, patientid } = req.body;
    console.log(emailorusername, patientid);
    try {
        const chosenuserid = await pool.query('SELECT patientid from Patient where email = $1 or username = $1', [emailorusername]);
        if (chosenuserid.rows.length === 0) {
            return res.status(400).json({ message: 'Contact Not found' });
        }
        const newEmergenyContact = await pool.query('INSERT INTO emergency_contacts (patientid, chosenuserid) VALUES ($1, $2) RETURNING *', [patientid, chosenuserid.rows[0].patientid]);
        if (newEmergenyContact.rows.length === 0) {
            return res.status(400).json({ message: 'Emergency Contact Not Added' });
        }
        res.status(200).json({ message: 'Emergency Contact Added Successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Emergency Contact
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const deleteEmergencyContact = await pool.query('DELETE FROM emergency_contacts WHERE id = $1', [id]);
        if (deleteEmergencyContact.rowCount === 0) {
            return res.status(400).json({ message: 'Emergency Contact Not found' });
        }
        res.status(200).json({ message: 'Emergency Contact Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router