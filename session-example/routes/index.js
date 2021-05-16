var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if (!req.session.viewcount)
    req.session.viewcount = 1;
  else
    req.session.viewcount++;
  res.render('index', { title: 'View Count', viewcount : req.session.viewcount });
});

module.exports = router;
