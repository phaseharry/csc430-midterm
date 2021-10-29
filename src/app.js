const express = require('express');
const cors = require('cors');
const app = express();
const { connectToDb } = require('../db');

connectToDb(app);

app.use(cors())

// body parsing middleware for json
app.use(express.json({ extended: false }))

const apiRouter = require('./routes');

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// api middleware
app.use('/api', apiRouter);

// final error catcher just incase an error didn't get handled
app.use((err, req, res, next) => {
  const status = err.status || 500
  const msg = err.message || 'Server Error'
  res.status(status).json({ msg })
})

module.exports = app;