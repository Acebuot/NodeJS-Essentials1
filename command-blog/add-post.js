const config = require('./config');
const sqlite3 = require('sqlite3');
const chalk = require('chalk');
const inquirer = require('inquirer');

const db = new sqlite3.Database(config.databaseName);

//prompt user to give data
inquirer.prompt([
    {
        name: 'title',
        message: 'Post Title',
    },
    {
        name: 'author',
        message: 'AUTHOR',
    },
    {
        name: 'date',
        message: 'Date: ',
        default: new Date().toUTCString(),
    },
    {
        name: "post",
        message: "Post Content",
    }
]).then(answers =>
    {
        //make take each element value out of the answer obj
        const {title, author, date, post} = answers;

        const stmt = 
        `INSERT INTO ${config.tableName}
        (title, author, date, post)
        VALUES
        ("${title}", "${author}", "${date}", "${post}")`;

        db.serialize(() => 
        {
            db.run(stmt);
            console.log(chalk.green('New post added to the databse'));
        });
        db.close()
    })