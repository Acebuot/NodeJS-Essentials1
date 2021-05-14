const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.get('/time', (req, res, next) => 
{
    res.json({time: new Date().toISOString()});
});

router.post('/hash', (req, res, next) =>
{
    const plainText = req.body.plainText;
    const hash = crypto.createHash('md5').update(plainText).digest('hex');
    res.json({plainText, hash,});
});

router.get('/', (request, response, next) => 
{
    // //hello?name=imongmama
    // const name = request.query.name;
    response.render('hello', {name : 'There!', addMessage: '', title: 'Hello Title'});
});

router.get('/:person/', (request, response, next) => 
{
    // //hello?name=imongmama
    // const name = request.query.name;

    // hello/:person
    
    const name = request.params.person;
    response.render('hello', {name, addMessage: '', title: 'Hello Title'});
});

router.get('/:person/:addMessage', (request, response, next) => 
{
    const name = request.params.person;
    const addMessage = request.params.addMessage;
    response.render('hello', {name, addMessage, title: 'Hello Title Greeting'});
});

module.exports = router;