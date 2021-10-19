const express = require('express');
const app = express();
const { connectToDb } = require('../db/connection');

connectToDb(app);

const apiRouter = require('./routes');

// api middleware
app.use('/api', apiRouter);

module.exports = app;