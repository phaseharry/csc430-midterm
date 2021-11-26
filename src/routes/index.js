const Router = require('express').Router();

const subjectRouter = require('./subject');
const userRouter = require('./user');
const searchRouter = require('./search');
const registerRouter = require('./register');

Router.use('/search', searchRouter);
Router.use('/subject', subjectRouter);
Router.use('/user', userRouter);
Router.use('/register', registerRouter);

module.exports = Router;