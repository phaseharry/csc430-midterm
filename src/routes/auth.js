const Router = require('express').Router();
const User = require('../../db/models/User');
const Student = require('../../db/models/Student');
const Professor = require('../../db/models/Professor');
const Admin = require('../../db/models/Admin');

/**
 * @route POST api/auth/login
 * @description logins a user info and gets their role information
 * @access Students, Professors, Advisors
 */
Router.post('/login', async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    const bodyError = new Error('Missing email, password, or both!');
    bodyError.status = 400;
    next(bodyError);
    return;
  }
  const user = await User.findOne({
    where: {
      email,
      password
    }
  });
  if (!user) {
    const userNotExistError = new Error('User not found or invalid password!');
    userNotExistError.status = 404;
    next(userNotExistError);
    return;
  }
  if (user.role === 'student') {
    const studentInfo = await Student.findOne({
      where: {
        userId: user.id
      }
    });
    user.info = {
      ...studentInfo
    };
  } else if (user.role === 'professor') {
    const professorInfo = await Professor.findOne({
      where: {
        userId: user.id
      }
    });
    user.info = {
      ...professorInfo
    };
  } else if (user.role === 'admin') {
    const adminInfo = await Admin.findOne({
      where: {
        userId: user.id
      }
    });
    user.info = {
      ...adminInfo
    };
  }
  res.json(user).status(200);
})


module.exports = Router;
