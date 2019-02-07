const express = require('express');
const router = express.Router();
const config = require('../../config');
const pgp = require('pg-promise')(/*options*/);
const db = pgp(`postgres://${config.userName}:${config.password}@host:${config.port}/${config.dbname}`);

/* GET home page. */
router.get('/products', (req, res, next) => {
  console.log(config.userName)
  // const data = await db.query('select * from profile', []);
  res.status(200).send({ 'testing': true })
  next()
});

module.exports = router;