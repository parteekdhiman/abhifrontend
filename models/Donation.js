const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    message: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
