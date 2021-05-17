var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

/* GET home page. */
//list all items
router.get('/', function(req, res, next) {
  const collection = req.app.locals.collection;

  collection.find({})
  .toArray()
  .then(data=> res.json(data));
});

//insert data
router.post('/', (req,res, next) =>
{
  const collection = req.app.locals.collection;
  const document = req.body;

  collection
    .insert(document)
    .then(data => res.json(data));
});

//filter by id
router.get('/:id', (req, res, next) =>
{
  const collection = req.app.locals.collection;
  const id = ObjectID(req.params.id);

  collection
    .findOne({ _id: id})
    .then(data => res.json(data));
});

//update document's elements - change name in document
router.patch('/:id/name', (req, res, next) =>
{
  const collection = req.app.locals.collection;
  const id = ObjectID(req.params.id);
  const newname = req.body.newname; //"newname in json"

  collection
    .updateOne({ _id:id }, {$set: {name: newname}})
    .then(data => res.json(data));
});

//replace entire document with a new one
router.put('/:id', (req, res, next) =>
{
  const collection = req.app.locals.collection;
  const id = ObjectID(req.params.id);
  const newDocument = req.body;

  collection
    .replaceOne({ _id:id }, newDocument)
    .then(data => res.json(data));
});

router.delete('/:id', (req,res,next) =>
{
  const collection = req.app.locals.collection;
  const id =ObjectID(req.params.id);

  collection
    .deleteOne({_id:id})
    .then(data => res.json(data));
});

module.exports = router;
