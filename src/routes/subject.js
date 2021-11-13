const Router = require('express').Router();
const { Op } = require("sequelize");
const Course = require('../../db/models/Course');
const Section = require('../../db/models/Section');
const Subject = require('../../db/models/Subject');
const authenticateToken = require('../middleware/authenticateToken');

/**
 * @route GET api/subject/
 * @description gets a list of all subjects
 * @access Students, Professors, Advisors
 */
Router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects).status(200);
  } catch (e) {
    next(e);
  }
})

/**
 * @route GET api/subject/:subjectId/courses/
 * @description gets all courses for certain subject
 * @access Students, Professors, Advisors
 */
Router.get('/:subjectId/courses/', authenticateToken, async (req, res, next) => {
  const { subjectId } = req.params;
  try {
    const subject = await Subject.findOne({
      where: {
        id: subjectId
      }
    });
    if (subject === null) {
      const err = new Error('Subject does not exist');
      err.status = 404;
    }
    const courses = await Course.findAll({
      where: {
        subjectId: subject.id
      }
    });
    res.json(courses).status(200);
  } catch (e) {
    next(e);
  }
})

/**
 * @route GET api/courses/search?courseName=?&courseNumber=?&subjectId=?""
 * @description gets courses that matches the filter
 * @access Students, Professors, Advisors
 */
Router.get('/search?', authenticateToken, (req, res, next) => {
  const { courseName, courseNumber, subjectId } = req.query;
  const query = {};
  if (courseName) query.name = courseName;
  if (courseCode) {
    query.code = {
      [Op.or]: {
        [Op.lt]: courseNumber,
        [Op.eq]: courseNumber
      }
    }
  }
  if (subjectId) query.subjectId = subjectId
  console.log(query)
  try {
    return Course.findAll({
      where: query
    })
  } catch (e) {
    next(e);
  }
})

/**
 * @route PUT api/subject/:subjectId/courses/:courseId
 * @description gets courses that matches the filter
 * @access Advisors
 */
Router.put('/:subjectId/courses/:courseId', authenticateToken, async (req, res, next) => {
  const { courseId, subjectId } = req.params;
  const payload = req.body;
  try {
    await Course.update(payload, {
      where: {
        courseId,
        subjectId
      }
    });
    res.status(200).send();
  } catch (e) {
    next(e);
  }
})

/**
 * @route GET api/courses/:courseId/sections
 * @description gets all sections for a specific course
 * @access Students, Professors, Advisors
 */
Router.get('/:subjectId/courses/:courseId/sections', authenticateToken, async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const sections = await Section.findAll({
      where: {
        courseId
      }
    });
    res.status(200).json(sections);
  } catch (e) {
    next(e);
  }
})

/**
 * @route PUT api/courses/:courseId/sections/:sectionId
 * @description updates to a section
 * @access Students, Professors, Advisors
 */
Router.put('/:courseId/sections/:sectionId', authenticateToken, (req, res, next) => {
  const { courseId, sectionId } = req.params;
})

module.exports = Router;
