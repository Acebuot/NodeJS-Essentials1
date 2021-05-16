const chalk = require('chalk');
const sqlite3 = require('sqlite3');
const config = require('../config')
var express = require('express');
var router = express.Router();

const db = new sqlite3.Database(config.databaseName);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/view-posts', function(req, res, next) {
  
  
  db.serialize(() =>
  {
    const posts = [];
    const stmt = `SELECT title, date, author, post FROM ${config.tableName}`;
    db.each(stmt, (err, row) =>
    {
      if (err) console.log(err);
      else
      {
        posts.push(row);
        console.log(posts.length);
        console.log(posts[0].title);
      }

      console.log(chalk.blue(posts.length));
      res.render('view-posts', {posts : posts});
    });

    ///if left in, refresh will crash it.
    //db.close();
    
  });
  
});

router.post('/add-post', (req,res,next) =>
{
  const {title,author,content} = req.body;
  const date = new Date().toISOString();
  const stmt = 
  `INSERT INTO ${config.tableName}
  (title, date, author, post)
  VALUES 
  ("${title}","${date}","${author}","${content}")`;

  db.serialize(() =>
  {
    db.run(stmt);
    res.redirect('/');
    console.log(chalk.green('Post has been uploaded to the database'));

  });

  bd.close();
});

module.exports = router;