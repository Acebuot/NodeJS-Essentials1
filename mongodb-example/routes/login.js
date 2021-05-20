var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');

router.get('/login', (req, res, next) =>
{
    //loading without errors
    const errors = [];
    // outdated course method
    // //array of errors or returns empty array
    // const errors = req.flash().errors || [];
    res.render('login', {messages: errors});
});

// outdated course method
// //calling passport.authenticate first to see if it is correct (used Localstrategy in app.js)
// //then it can continue to next funtion at 3rd param
// router.post('/login', passport.authenticate('local',
// {



//     /// Which failureFlash does NOT work hahaha kms
//     // //enable passport to flash messages back to route
//     // //then redirect to login
//     // failureFlash: true,
//     // failureRedirect: '/login',
    
// }), (req,res,next) =>
// {
//     res.redirect('/secret');
// });

router.post('/login', function(req, res, next) 
{
    passport.authenticate('local', function(err, user, info) 
    {
      if(err) { return res.redirect('/info'); }
      if(!user) { console.log(info);return res.render('login', {messages : info.message})}
      req.logIn(user, function(err) {
        if(err) { return next(err); }
        return res.json(req.body.user);
      })
    })(req,res,next);
  })

//reusable function redirecting unauthenticated request back to login
const ensureAuthenticated = (req, res, next) => 
{
    if (!req.isAuthenticated())
        return res.redirect('/login');
    return next();
}

// ensure authentication before running next funtion protected area (just the message)
router.get('/secret', ensureAuthenticated,(req, res, next) =>
{
    res.send('secret area');
});

module.exports = router;