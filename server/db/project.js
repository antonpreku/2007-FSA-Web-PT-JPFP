const Sequelize = require('sequelize')
const db = require('./database')

const Project = db.define('project', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },

    deadline: {
        type: Sequelize.DATE,
    },

    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

    priority: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 10
        }
    },

    description: {
        type: Sequelize.TEXT
    }

})

module.exports = Project