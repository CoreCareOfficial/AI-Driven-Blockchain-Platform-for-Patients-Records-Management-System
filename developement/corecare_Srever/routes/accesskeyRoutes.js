import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const { patietid, keyuser, period } = req.body;


});

export default router;