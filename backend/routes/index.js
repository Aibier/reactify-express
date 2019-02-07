var express = require('express');
var router = express.Router();
const config = require('../../config');
const pgp = require('pg-promise')(/*options*/);
const db = pgp(`postgres://${config.userName}:${config.password}@host:${config.port}/${config.dbname}`);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(config.userName)
  // const data = await db.query('select * from profile', []);
  res.status(200).send({title: 'tony', message: 'Messthe'})
  next()
});

router.get('/products', function(req, res, next) {
  // console.log(config.userName)
  // // const data = await db.query('select * from profile', []);
  // res.status(200).send({title: 'tony', message: 'Messthe'})
  next()
});
module.exports = router;