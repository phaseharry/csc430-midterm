const Sequelize = require('sequelize');
const conn = require('../connection');
const Course = require('./Course');

const Section = conn.define('Section', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  sectionCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  courseId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  professorId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  availableSeats: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 0
    }
  }
});

module.exports = Section;