const { post } = require('../routes/routes');
const db = require('./db');

const Question = db.mariadb.define('questions', {
    question: {
        type: db.Sequelize.STRING
    },
    answer: {
        type: db.Sequelize.STRING
    }
})

//Question.sync({force: true})
module.exports = Question