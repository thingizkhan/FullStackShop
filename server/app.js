const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./api');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const key = process.env.API_KEY;
const stripeKey = process.env.STRIPE_KEY;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Middleware to check cookies and serve appropriate static files
app.use((req, res, next) => {
    const adminCookie = req.cookies.admin;
    if (adminCookie && adminCookie === key) {
        // Serve admin files
        express.static(path.join(__dirname, '../client/build-admin'))(req, res, next);
    } else {
        // Serve main files
        express.static(path.join(__dirname, '../client/build-main'))(req, res, next);
    }
});

app.get('*', (req, res) => {
    const adminCookie = req.cookies.admin;
    if (adminCookie && adminCookie === key) {
        res.sendFile(path.join(__dirname, '../client/build-admin', 'index.html'));
    } else {
        res.sendFile(path.join(__dirname, '../client/build-main', 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
