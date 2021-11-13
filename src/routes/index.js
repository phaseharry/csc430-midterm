const Router = require('express').Router();

const coursesRouter = require('./courses');
const userRouter = require('./user');

Router.use('/subject', coursesRouter);
Router.use('/user', userRouter);

module.exports = Router;