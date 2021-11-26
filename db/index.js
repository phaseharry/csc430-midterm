const conn = require('./connection');
const Subject = require('./models/Subject');
const Course = require('./models/Course');
const Section = require('./models/Section');
const SectionToStudent = require('./models/SectionToStudent');
const Student = require('./models/Student');

Subject.hasMany(Course);
Course.belongsTo(Subject);

Course.hasMany(Section);
Section.belongsTo(Course);

const connectToDb = async (expressApp) => {
  try {
    await conn.sync();
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
    Course,
    Section
  }
}