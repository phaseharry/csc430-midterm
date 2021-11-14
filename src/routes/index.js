const Router = require('express').Router();

const subjectRouter = require('./subject');
const userRouter = require('./user');
const searchRouter = require('./search');

Router.use('/search', searchRouter);
Router.use('/subject', subjectRouter);
Router.use('/user', userRouter);

module.exports = Router;