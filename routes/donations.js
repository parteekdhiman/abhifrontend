const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Middleware to authenticate token
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// POST: Add donation
router.post('/', auth, async (req, res) => {
    const { amount, message } = req.body;
    const donation = await Donation.create({ userId: req.userId, amount, message });
    res.json(donation);
});

// GET: Get all donations by the user
router.get('/', auth, async (req, res) => {
    const donations = await Donation.find({ userId: req.userId }).sort({ date: -1 });
    res.json(donations);
});

module.exports = router;
