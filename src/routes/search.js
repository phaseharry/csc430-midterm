const Router = require('express').Router();
const { Op } = require("sequelize");
const Course = require('../../db/models/Course');
const Section = require('../../db/models/Section');
const Subject = require('../../db/models/Subject');
const authenticateToken = require('../middleware/authenticateToken');

/**
 * @route GET api/search/courses?courseName=?&courseNumber=?&subjectId=?""
 * @description gets courses that matches the filter
 * @access Students, Professors, Advisors
 */
Router.get('/courses?', authenticateToken, async (req, res, next) => {
  const { courseName, courseNumber, subjectId } = req.query;
  const query = {};
  if (courseName) query.name = courseName;
  if (courseNumber) query.code = courseNumber;
  if (subjectId) query.subjectId = subjectId;
  try {
    const courses = await Course.findAll({
      where: query,
      include: Section
    });
    res.json(courses).status(200);
  } catch (e) {
    console.log(e);
    next(e);
  }
})


module.exports = Router;
