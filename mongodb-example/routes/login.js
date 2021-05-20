var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');

router.get('/login', (req, res, next) =>
{
    const errors = req.session.message || [];
    if (req.session.message != undefined) req.session.message = undefined;
    console.log(req.session.message);
    res.render('login', {messages: errors});
});

router.post('/login', function(req, res, next) 
{
  passport.authenticate('local', function(err, user, info) 
  {
    if(err) { return res.redirect('/info'); }
    if(!user) { console.log(info);return res.render('login', {messages : info.message})}
    req.logIn(user, function(err) {
      if(err) { return next(err); }
      return res.redirect('/secret');
    })
  })(req,res,next);
})

//reusable function redirecting unauthenticated request back to login
const ensureAuthenticated = (req, res, next) => 
{
    if (!req.isAuthenticated())
    {
      req.session.message = 'You must first log in';
      return res.redirect('/login');
    }
    return next();
}

// ensure authentication before running next funtion protected area (just the message)
router.get('/secret', ensureAuthenticated,(req, res, next) =>
{
    res.send('secret area');
});

module.exports = router;