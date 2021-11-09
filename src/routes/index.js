const Router = require('express').Router();

const coursesRouter = require('./courses');
const authRouter = require('./auth');

Router.use('/subject', coursesRouter);
Router.use('/auth', authRouter);

module.exports = Router;