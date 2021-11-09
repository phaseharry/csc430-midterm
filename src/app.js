const express = require('express');
const cors = require('cors');
const app = express();
const { connectToDb } = require('../db');

connectToDb(app);

app.use(express.json())
app.use(cors())

// body parsing middleware for json
app.use(express.json({ extended: false }))

const apiRouter = require('./routes');

// api middleware
app.use('/api', apiRouter);

// final error catcher just incase an error didn't get handled
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || 'Server Error';
  res.status(status).json({ msg });
})

module.exports = app;