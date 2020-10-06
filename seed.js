const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db/index');

const seedRobots = [
  {
    name: 'R2-D2',
    fuelType: 'electric',
    fuelLevel: 100,
    imageUrl: 'https://pixabay.com/images/id-2558877/'
  },

  {
    name: 'WALL-E',
    fuelType: 'gas',
    fuelLevel: 100,
    imageUrl: 'https://pixabay.com/images/id-628570/',
  },

  {
    name: 'Bender',
    fuelType: 'diesel',
    fuelLevel: 100,
    imageUrl: 'https://pixabay.com/images/id-3939223/',
  }
]

const seedProjects = [
  {
    title: 'Clean Aparment',
    deadline: '10/10/2020',
    completed: false,
    priority: 8,
  },

  {
    title: 'Build Spaceship',
    deadline: '02/30/2021',
    completed: false,
    priority: 10,
  },

  {
    title: 'Do Laundry',
    deadline: '10/3/2020',
    completed: false,
    priority: 6
  },

  {
    title: 'Sort Mail',
    deadline: '01/01/2021',
    completed: false,
    priority: 7,
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    // seed your database here!
    await Promise.all(seedRobots.map((robot) => Robot.create(robot)));
    await Promise.all(seedProjects.map((project) => Project.create(project)));

    const robots = await Robot.findAll()
    const projects = await Project.findAll()

    await robots[0].addProject(projects[3])
    await robots[0].addProject(projects[2])
    await projects[1].addRobot(robots[1])
    await projects[2].addRobot(robots[2])

  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
