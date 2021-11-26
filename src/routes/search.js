const Router = require('express').Router();
const { Op } = require("sequelize");
const Course = require('../../db/models/Course');
const Section = require('../../db/models/Section');
const Subject = require('../../db/models/Subject');
const authenticateToken = require('../middleware/authenticateToken');


/**
 * @route GET api/search/courses/:courseId/section/:sectionId
 * @description gets section by id
 * @access Students, Professors, Advisors
 */
Router.get('/courses/:courseId/sections/:sectionId', authenticateToken, async (req, res, next) => {
  const { courseId, sectionId } = req.params;
  const section = await Section.findOne({
    where: {
      courseId,
      id: sectionId
    }
  })
  if (!section) {
    const sectionNotFoundError = new Error('Section is not found');
    sectionNotFoundError.status = 404;
    next(sectionNotFoundError);
    return;
  }
  res.status(200).json(section);
})

/**
 * @route GET api/search/courses/:courseId
 * @description gets courses by id
 * @access Students, Professors, Advisors
 */
Router.get('/courses/:courseId', authenticateToken, async (req, res, next) => {
  const { courseId } = req.params;
  const course = await Course.findByPk(courseId);
  if (!course) {
    const courseNotFoundError = new Error('Course is not found');
    courseNotFoundError.status = 404;
    next(courseNotFoundError);
    return;
  }
  res.status(200).json(course);
})


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
