const Router = require('express').Router();

const coursesRouter = require('./courses');

Router.use('/courses', coursesRouter);

module.exports = Router;