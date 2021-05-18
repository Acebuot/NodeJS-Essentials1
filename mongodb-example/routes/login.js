var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');

router.get('/login', (req, res, next) =>
{
    const errors = req.flash().errors || [];
    res.render('login', {errors});
});

//calling passport.authenticate first to see if it is correct (used Localstrategy in app.js)
//then it can continue to next funtion at 3rd param
router.post('/login', passport.authenticate('local'), (req,res,next) =>
{
    res.redirect('/secret');
});

//reuable function redirecting unauthenticated request back to login
const ensureAuthenticated = (req, res, next) => 
{
    if (!req.isAuthenticated())
        return next();
    res.redirect('/login');
}

// ensure authentication before running next funtion protected area (just the message)
router.get('/secret', ensureAuthenticated,(req, res, next) =>
{
    res.send('secret area');
});

module.exports = router;