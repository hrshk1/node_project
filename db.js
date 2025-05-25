const mongoose = require('mongoose');
require('dotenv').config();
//const mongoURL = 'mongodb://localhost:27017/menu';
const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL) // ✅ Remove deprecated options

const db = mongoose.connection;

db.on('connected', () => {
    console.log('✅ MongoDB connected successfully');
});

db.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
});

module.exports = db; // ✅ Fix typo from "module.export" to "module.exports"
