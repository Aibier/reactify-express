var faker = require("faker");
var db = require('../queries');
var appRouter = function (app) {


    app.get("/", function(req, res) {
   	  res.status(200).send({ message: 'Welcome to our restful API' });
    });
    app.get('/api/products', db.getAllProducts);
    app.get('/api/products/:id', db.getSingleProduct);
    app.post('/api/products', db.createProduct);
    app.put('/api/products/:id', db.updateProduct);
    app.delete('/api/products/:id', db.removeProduct);
}

module.exports = appRouter;
