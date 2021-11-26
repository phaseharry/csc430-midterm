const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Router = require('express').Router();
const User = require('../../db/models/User');
const Student = require('../../db/models/Student');
const Professor = require('../../db/models/Professor');
const Course = require('../../db/models/Course');
const SectionToStudent = require('../../db/models/SectionToStudent');
const Admin = require('../../db/models/Admin');
const authenticateToken = require('../middleware/authenticateToken');
const Section = require('../../db/models/Section');

/**
 * @route POST api/user/auth/login
 * @description logins a user info and gets their role information
 * @access Students, Professors, Advisors
 */
Router.post('/auth/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const bodyError = new Error('Missing email, password, or both!');
    bodyError.status = 400;
    next(bodyError);
    return;
  }

  const user = await User.findOne({
    where: {
      email
    }
  });
  if (!user || !(await bcrypt.compare(password, user.password))
  ) {
    const userNotExistError = new Error('User not found or invalid password!');
    userNotExistError.status = 404;
    next(userNotExistError);
    return;
  }
  const jwtUserInfo = { userId: user.id };
  const accessToken = jwt.sign(jwtUserInfo, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
})

/**
 * @route POST api/user/info
 * @description Gets a user's role information
 * @access Students, Professors, Advisors
 */
Router.get('/info', authenticateToken, async (req, res, next) => {
  const user = req.user;
  const resUserObj = {
    ...user.dataValues
  }
  if (user.role === 'student') {
    const studentInfo = await Student.findOne({
      where: {
        userId: user.id
      }
    });
    resUserObj.info = {
      ...studentInfo.dataValues
    };
  } else if (user.role === 'professor') {
    const professorInfo = await Professor.findOne({
      where: {
        userId: user.id
      }
    });
    resUserObj.info = {
      ...professorInfo.dataValues
    };
  } else if (user.role === 'admin') {
    const adminInfo = await Admin.findOne({
      where: {
        userId: user.id
      }
    });
    resUserObj.info = {
      ...adminInfo.dataValues
    };
  }
  delete resUserObj.password;
  res.json(resUserObj).status(200);
})

/**
 * @route POST api/user/course-registered
 * @description Gets a students' current registered courses
 * @access Students,
 */
Router.get('/course-registered', authenticateToken, async (req, res, next) => {
  const user = req.user;
  const sectionToStudent = await SectionToStudent.findAll({
    where: {
      studentId: user.id
    }
  });
  const coursesAndSections = await Promise.all(sectionToStudent.map(async (s) => {
    const course = await Course.findByPk(s.courseId);
    const section = await Section.findByPk(s.sectionId);
    return {
      section,
      course
    }
  }))
  res.status(200).json(coursesAndSections);
})

module.exports = Router;
