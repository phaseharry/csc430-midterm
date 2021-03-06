const Router = require('express').Router();
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
 * @route PUT api/subject/:subjectId/courses/:courseId
 * @description gets courses that matches the filter
 * @access Advisors
 */
Router.post('/:subjectId/courses/:courseId', authenticateToken, async (req, res, next) => {
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
 * @route GET api/subject/:subjectId/courses/:courseId/sections
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

module.exports = Router;
