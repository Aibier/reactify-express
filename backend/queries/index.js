var promise = require('bluebird');
var config = require('../../config');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = `postgres://${config.userName}:${config.password}@localhost:5432/${config.dbname}`;
var db = pgp(connectionString);

function getAllProducts(req, res, next) {
  db.any('select * from products')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL products'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleProduct(req, res, next) {
  var pid = parseInt(req.params.id);
  console.log('dara', pid);
  db.one('select * from products where id = $1', pid)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE product'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function createProduct(req, res, next) {
  // req.body.age = parseInt(req.body.age);
  db.none('insert into products(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one product'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateProduct(req, res, next) {
  db.none('update products set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated product'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removeProduct(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from products where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} products`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
module.exports = {
  getAllProducts: getAllProducts,
  getSingleProduct: getSingleProduct,
  createProduct: createProduct,
  updateProduct: updateProduct,
  removeProduct: removeProduct
};
