const config = require('./config');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(config.databaseName);

db.serialize(() => 
{
    const stmt = `SELECT title, author, date, post FROM ${config.tableName}`;
    db.each(stmt, (err,row) =>
    {
        if(err) console.log(chalk.red('Problem reading row data'));
        else
        {
                const {title, author, date, post} = row;
                console.log(title);
                console.log(`by: ${author}`);
                console.log(date);
                console.log(post);

            console.log();
        }
    });

    db.close();
});