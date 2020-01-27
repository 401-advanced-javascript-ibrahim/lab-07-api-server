'use strict';

module.exports = (req, res, next) => {
    console.log('request information:', req.method, req.path);
    next();
}