const {db, Campuses, Students } = require('./models');

const firstNames = ['Charles', 'Aubrey', 'Skylar', 'Amanda', 'John', 'Karen', 'Shmuel', 'Nicholas', 'Albert', 'Jane', 'Shaun', 'Raymond', 'Angelo', 'Antonio', 'Stephen', 'Will'];

const lastNames = ['McDonald', 'Oh', 'Hutch', 'Hussey', 'Torres', 'Mellos', 'Ortiz', 'Thomas', 'Macpherson', 'Volin', 'Lotman', 'Arcangel', 'Nguyen', 'Shaw'];

const random = (min, max) => {
  return Math.floor(Math.random() * max);
}

const randomGpa = () => {
  return Math.round( ( ( Math.random() * ( 4 - 0.01 ) + 0.01 ) * 100 ) ) / 100 ;
}

const randomFirstName = () => {
  return firstNames[random(0, firstNames.length - 1)];
}

const randomLastName = () => {
  return lastNames[random(0, lastNames.length - 1)];
}

const generateStudent = () => {
  const firstName = randomFirstName();
  const lastName = randomLastName();

  return {
    firstName,
    lastName,
    email: `${firstName}.${lastName}@gmail.com`,
    gpa: randomGpa()
  }
}

const generateStudents = (num) => {
  studentsArr = [];
  let i = 0;

  while (i < num) {
    studentsArr.push(generateStudent())
    i++
  }

  return studentsArr;
}

const campuses = [
  {
    name: 'Fullstack Academy',
    imageURL: 'https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk.png',
    description: 'Fullstack Academy is an immersive software engineering coding bootcamp located in New York City and Chicago. Students of the full-time flagship course learn full stack JavaScript over the course of a 13-week, on-campus program.',
    students: generateStudents(5)
  },
  {
    name: 'Hack Reactor',
    imageURL: 'https://secure.meetupstatic.com/photos/event/a/c/4/6/highres_231404102.jpeg',
    description: 'Hack Reactor is a 12-week software engineering Coding Bootcamp education program founded in San Francisco by Anthony Phillips, Shawn Drost, Marcus Phillips, and Douglas Calhoun in 2012.',
    students: generateStudents(5)
  },
  {
    name: 'App Academy',
    imageURL: 'http://www.missmaggiemo.com/assets/a_A_logo-e3ba72aa1a4647730242c7a5cc64aa9a.png',
    description: 'App Academy is a twelve-week intensive computer programming school founded by Ned Ruggeri and Kush Patel.',
    students: generateStudents(5)
  },
  {
    name: 'BrainStation',
    imageURL: 'https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/84/00-BrainStation_Icon-blue-01.png',
    description: 'BrainStation is a global leader in digital skills training. BrainStation empowers individuals and organizations to achieve digital success through courses, workshops, events and corporate training.',
    students: generateStudents(5)
  }
];

db.sync({force: true})
  .then(() => {
    return Promise.all(campuses.map(campus => {
      Campuses.create(campus, { include: [Students] })
    }))
  })
  .then(() => console.log('Successfully seeded db!'))
  .catch(err => console.error('Error seeding db. Error:', err));
