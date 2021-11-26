const Sequelize = require('sequelize');
const conn = require('../connection');
const User = require('./User');
const Section = require('./Section');

const SectionToStudent = conn.define('SectionToStudent', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  studentId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
  sectionId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: Section,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
});

module.exports = SectionToStudent;