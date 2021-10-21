const conn = require('./connection');
const Subject = require('./models/Subject');
const Course = require('./models/Course');
const Section = require('./models/Section');

// Subject.hasMany(Course, { as: 'courses' });
// Course.belongsTo(Subject, { foreignKey: 'id' });

// Course.hasMany(Section, { as: 'sections' });
// Section.belongsTo(Course, { foreignKey: 'courseId' });

const connectToDb = async (expressApp) => {
  try {
    await conn.sync({ force: true });
    expressApp.emit('ready');
    console.log('connected to database');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = {
  connectToDb,
  models: {
    Subject,
    Course
  }
}