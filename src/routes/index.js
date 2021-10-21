const Router = require('express').Router();

const coursesRouter = require('./courses');

Router.use('/subject', coursesRouter);

module.exports = Router;