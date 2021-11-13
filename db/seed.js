const bcrypt = require('bcrypt');
const conn = require('./connection');
const Subject = require('./models/Subject');
const Course = require('./models/Course');
const Section = require('./models/Section');
const User = require('./models/User');
const Student = require('./models/Student');

const seed = async () => {
  try {
    await conn.sync({ force: true });
    const [math, biology, computerScience, english] = await Promise.all([
      Subject.create({
        name: 'Mathematics'
      }),
      Subject.create({
        name: 'Biology'
      }),
      Subject.create({
        name: 'Computer Science'
      }),
      Subject.create({
        name: 'English'
      }),
    ]);

    const mathCourses = await Promise.all([
      Course.create({
        name: 'Algebra',
        code: 'MTH 101',
        subjectId: math.id
      }),
      Course.create({
        name: 'Trigonometry',
        code: 'MTH 110',
        subjectId: math.id
      }),
      Course.create({
        name: 'Calculus I',
        code: 'MTH 201',
        subjectId: math.id
      }),
      Course.create({
        name: 'Calculus II',
        code: 'MTH 202',
        subjectId: math.id
      })
    ]);

    const bioCourses = await Promise.all([
      Course.create({
        name: 'Intro to Biology',
        code: 'BIO 101',
        subjectId: biology.id
      }),
      Course.create({
        name: 'DNA',
        code: 'BIO 110',
        subjectId: biology.id
      }),
      Course.create({
        name: 'Micro Biology',
        code: 'BIO 201',
        subjectId: biology.id
      }),
      Course.create({
        name: 'Ecosystem',
        code: 'BIO 202',
        subjectId: biology.id
      })
    ])

    await Promise.all([
      Section.create({
        courseId: mathCourses[3].id,
        sectionCode: '001',
        availableSeats: 30
      }),
      Section.create({
        courseId: mathCourses[3].id,
        sectionCode: '002',
        availableSeats: 30
      }),
      Section.create({
        courseId: mathCourses[3].id,
        sectionCode: '003',
        availableSeats: 30
      }),
      Section.create({
        courseId: mathCourses[0].id,
        sectionCode: '001',
        availableSeats: 30
      }),
      Section.create({
        courseId: mathCourses[0].id,
        sectionCode: '002',
        availableSeats: 30
      }),
      Section.create({
        courseId: bioCourses[0].id,
        sectionCode: '001',
        availableSeats: 30
      }),
      Section.create({
        courseId: bioCourses[0].id,
        sectionCode: '002',
        availableSeats: 30
      }),
      Section.create({
        courseId: bioCourses[1].id,
        sectionCode: '001',
        availableSeats: 30
      }),
      Section.create({
        courseId: bioCourses[1].id,
        sectionCode: '002',
        availableSeats: 30
      }),
    ]);
    const hashedPassword = await bcrypt.hash('12345', 10);
    const [harry] = await Promise.all([
      User.create({
        email: 'harry@gmail.com',
        password: hashedPassword,
        firstName: 'Harry',
        lastName: 'Chen',
        role: 'student'
      })
    ])
    const [studentHarry] = await Promise.all([
      Student.create({
        userId: harry.id,
      })
    ])
    console.log('Seed successfully ran!');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

seed();