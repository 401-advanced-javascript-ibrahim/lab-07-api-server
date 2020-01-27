'use strict'

const express = require('express');
const app = express();
const logRequest = require('./logger.js');

app.use(express.json());
app.use(logRequest);

//////// Routes Section 

/*** General Routes ***/
app.use('*', notFoundHandler)
app.use(errorHandler)
app.use(timestamp)
app.use(logger)

/*** Categories Routes ***/
app.get('api/v1/categories', getCategories)
app.get('api/v1/categories/:id', getOneCategory)
app.post('api/v1/categories', addCategories)
app.put('api/v1/categories/:id', updateCategories)
app.delete('api/v1/categories/:id', deleteCategories)

/*** Products Routes ***/
app.get('api/v1/products', getProducts)
app.get('api/v1/products/:id', getOneProduct)
app.post('api/v1/products', addProducts)
app.put('api/v1/products/:id', updateProducts)
app.delete('api/v1/products/:id', deleteProducts)




//////// Functios Section

/******* Categories Functions *******/

let dbCate = []

function getCategories(req, res, next) {
    let count = dbCate.length;
    let results = dbCate
    res.json({ count, results });
}

function getOneCategory(req, res, next) {
    let id = req.params.id;
    let record = dbCate.filter((record) => record.id === parseInt(id));
    res.json(record);
}

function addCategories(req, res, next) {
    let { name } = req.body;
    let record = { name }
    record.id = dbCate.length + 1;
    dbCate.push(record)
    res.status(201).json(record);
}

function updateCategories(req, res, next) {
    let idToUpdate = req.params.id;
    let { name, id } = req.body;
    let updatedRecord = { name, id };
    dbCate = dbCate.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
    res.json(updatedRecord);
};

function deleteCategories(req, res, next) {
    let id = req.params.id;
    dbCate = dbCate.filter((record) => record.id !== parseInt(id));
    res.json({ msg: 'catogery deleted' });
};

/******* Products Functions *******/

let dbPro = []

function getProducts(req, res, next) {
    let count = dbPro.length;
    let results = dbPro
    res.json({ count, results });
}

function getOneProduct(req, res, next) {
    let id = req.params.id;
    let record = dbPro.filter((record) => record.id === parseInt(id));
    res.json(record);
}

function addProducts(req, res, next) {
    let { name } = req.body;
    let record = { name }
    record.id = dbPro.length + 1;
    dbPro.push(record)
    res.status(201).json(record);
}

function updateProducts(req, res, next) {
    let idToUpdate = req.params.id;
    let { name, id } = req.body;
    let updatedRecord = { name, id };
    dbPro = dbPro.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
    res.json(updatedRecord);
};

function deleteProducts(req, res, next) {
    let id = req.params.id;
    dbPro = dbPro.filter((record) => record.id !== parseInt(id));
    res.json({ msg: 'catogery deleted' });
};

////// Helper MiddleWare Section

function timestamp(req, res, next) {
    req.requestTime = Date.now();
    next();
}

function logger(req, res, next) {
    console.log('Current Time:', req.requestTime);
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    next();
}
////// Error Section

function errorHandler(err, req, res, next) {
    res.status(500);
    res.statusMessage = 'Internal Server Error'
    res.json({ error: err })
}

function notFoundHandler(req, res, next) {
    res.status(404);
    res.statusMessage = 'WHERE R U GOING !!'
    res.json({ error: 'Not Found!' })
}

////// Listening Section

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`listening on ${PORT}`))
    }
}