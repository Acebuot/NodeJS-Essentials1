const chalk = require('chalk');
const sqlite3 = require('sqlite3');
const config = require('../config')
var express = require('express');
var router = express.Router();

const db = new sqlite3.Database(config.databaseName);

/* GET home page. */
router.get('/', function(req, res, next) {
  const success = req.query.submitted;
  res.render('index', { title: 'Simple Express Blog', success });
});

router.get('/posts/:id', (req,res,next) =>
{
  const id = req.params.id;
  const stmt = 
  `SELECT title, date, author, post 
  FROM ${config.tableName}
  WHERE id = ${id}`;

  db.serialize(() =>
  {
    db.each(stmt, (err, row) =>
    {
      if (err) console.log(chalk.red('Problem reading row'));
      else
      {
        res.render('view-posts', {title: `view ${row.title}`  ,posts: [row]});
      }
    });
  })

});

router.get('/view-posts', (req, res, next) => {
  const stmt = `SELECT title, date, author, post FROM ${config.tableName}`;
  var posts = [];

  db.serialize(() => {
    db.all(stmt, (err, rows) => {
      rows.forEach((row) => {
        posts.push({
          title: `${row.title}`,
          date: `${row.date}`,
          author: `${row.author}`,
          post: `${row.post}`,
        });
      });

      res.render('view-posts', { title: 'view posts', posts });
    });
  });

  db.close();
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
    res.redirect('/?submitted=true');
    console.log(chalk.green('Post has been uploaded to the database'));

  });

  //db.close();
});

module.exports = router;
