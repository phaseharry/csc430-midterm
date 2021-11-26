const Router = require('express').Router();
const Section = require('../../db/models/Section');
const SectionToStudent = require('../../db/models/SectionToStudent');
const authenticateToken = require('../middleware/authenticateToken');

/**
 * @route POST api/subject/:subjectId/courses/:courseId/sections/:sectionId
 * @description signs a student up for a section
 * @access Students, Professors, Advisors
 */
Router.post('/courses/:courseId/sections/:sectionId', authenticateToken, async (req, res, next) => {
  const { sectionId, courseId } = req.params;
  const { studentId } = req.body;
  // check if section has slot 
  const desiredSection = await Section.findByPk(sectionId);
  if (!desiredSection) {
    const sectionNotFoundError = new Error('Section not found');
    sectionNotFoundError.status = 404;
    next(sectionNotFoundError);
    return;
  }
  if (desiredSection.availableSeats <= 0) {
    const sectionFullError = new Error('Section is full');
    sectionFullError.status = 400;
    next(sectionFullError);
    return;
  }
  const alreadyExists = await SectionToStudent.findOne({
    where: {
      studentId,
      courseId,
    }
  })
  if (alreadyExists) {
    const alreadySignedUpError = new Error('Student already signed up for this section');
    alreadySignedUpError.status = 400;
    next(alreadySignedUpError);
    return;
  }
  desiredSection.availableSeats -= 1;
  const sectionToStudent = await SectionToStudent.create({
    studentId,
    sectionId: desiredSection.id,
    courseId
  })
  await desiredSection.save()
  res.status(201).send(sectionToStudent);
})

module.exports = Router;