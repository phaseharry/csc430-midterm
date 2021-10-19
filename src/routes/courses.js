const Router = require('express').Router();

/**
 * @route GET api/courses
 * @description gets all courses 
 * @access Students, Professors, Advisors
 */

Router.get('/', (req, res, next) => {

})

/**
 * @route GET api/courses/search?input=""
 * @description gets courses that matches the filter
 * @access Students, Professors, Advisors
 */
Router.get('/search?', (req, res, next) => {
  const { input } = req.query;
})

/**
 * @route PUT api/courses/:courseId
 * @description gets courses that matches the filter
 * @access Advisors
 */
Router.put('/:courseId', (req, res, next) => {
  const { courseId } = req.params;
})

/**
 * @route GET api/courses/:courseId/sections
 * @description gets all sections for a specific course
 * @access Students, Professors, Advisors
 */
Router.get('/:courseId/sections', (req, res, next) => {
  const { courseId } = req.params;
})

/**
 * @route PUT api/courses/:courseId/sections/:sectionId
 * @description updates to a section
 * @access Students, Professors, Advisors
 */
Router.put('/:courseId/sections/:sectionId', (req, res, next) => {
  const { courseId, sectionId } = req.params;
})

module.exports = Router;
