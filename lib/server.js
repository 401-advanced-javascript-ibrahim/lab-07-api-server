// eslint-disable-next-line strict
'use strict';
// 3dr party dependencies
require('dotenv').config();
const express = require('express');

// internal files
const logRequest = require('./logger.js');

// app constants
const app = express();

// 3rd part middleware
// app.use(logger) // In the demo created a file for the logger function
app.use(timestamp, logRequest);
app.use(express.json());

//////// Routes Section ;

/*** Categories Routes ***/
let dbCate = [];
app.get('/categories', getGeneralCategories);
app.get('/api/v1/categories', getCategories);
app.get('/api/v1/categories/:id', getOneCategory);
app.post('/api/v1/categories', addCategories);
app.put('/api/v1/categories/:id', updateCategories);
app.delete('/api/v1/categories/:id', deleteCategories);

/*** Products Routes ***/
let dbPro = [];
// app.get('/products', getGeneralProducts)
app.get('/api/v1/products', getProducts);
app.get('/api/v1/products/:id', getOneProduct);
app.post('/api/v1/products', addProducts);
app.put('/api/v1/products/:id', updateProducts);
app.delete('/api/v1/products/:id', deleteProducts);

/*** General Routes ***/
app.use('*', notFoundHandler);
app.use(errorHandler);
app.get('/error', errorHandler);

//////// Functios Section

/******* Categories Functions *******/

function getGeneralCategories(req, res) {
  let categoriesOutput = {
    name: req.query.name,
    displayName: req.query.displayName,
    // description = req.query.description,
  };
  res.status(200).json(categoriesOutput);
}

function getCategories(req, res) {
  let count = dbCate.length;
  let results = dbCate;
  res.json({ count, results });
}

function getOneCategory(req, res) {
  let id = req.params.id;
  let record = dbCate.filter((record) => record.id === parseInt(id));
  res.json(record);
}

function addCategories(req, res) {
  let { name } = req.body;
  let record = { name };
  record.id = dbCate.length + 1;
  dbCate.push(record);
  res.status(201).json(record);
}

function updateCategories(req, res) {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  dbCate = dbCate.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
}

function deleteCategories(req, res) {
  let id = req.params.id;
  dbCate = dbCate.filter((record) => record.id !== parseInt(id));
  res.json({ msg: 'catogery deleted' });
}

/******* Products Functions *******/

// function getGeneralProducts(req, res, next) {
//     let productsOutput = {
//         name = req.query.name,
//         display_name = req.query.display_name,
//         description = req.query.description
//     }
//     res.status(200).json(productsOutput)
// }

function getProducts(req, res) {
  let count = dbPro.length;
  let results = dbPro;
  res.json({ count, results });
}

function getOneProduct(req, res) {
  let id = req.params.id;
  let record = dbPro.filter((record) => record.id === parseInt(id));
  res.json(record);
}

function addProducts(req, res) {
  let { name } = req.body;
  let record = { name };
  record.id = dbPro.length + 1;
  dbPro.push(record);
  res.status(201).json(record);
}

function updateProducts(req, res) {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  dbPro = dbPro.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
}

function deleteProducts(req, res) {
  let id = req.params.id;
  dbPro = dbPro.filter((record) => record.id !== parseInt(id));
  res.json({ msg: 'product deleted' });
}

////// Helper MiddleWare Section

function timestamp(req, res, next) {
  let day = Date(Date.now());
  req.requestTime = day.toString();
  next();
}

// function logger(req, res, next) {
//   console.log('Current Time:', req.requestTime);
//   console.log('Path:', req.path);
//   console.log('Method:', req.method);
//   next();
// }

////// Error Section

function errorHandler(err, req, res) {
  res.status(500);
  res.statusMessage = 'Internal Server Error';
  res.json({ error: err });
}

function notFoundHandler(req, res) {
  res.status(404);
  res.statusMessage = 'WHERE R U GOING !!';
  res.json({ error: 'Not Found!' });
}

////// Listening Section

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  },
};