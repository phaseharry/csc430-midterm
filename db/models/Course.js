const Sequelize = require('sequelize');
const conn = require('../connection');
const Subject = require('./Subject');

const Course = conn.define('Course', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subjectId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: Subject,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

module.exports = Course;