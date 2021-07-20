var express = require('express');
var index = express.Router();


var book = require('./book')
var inventory = require('./inventory')
var store = require('./store')
var { user } = require('./user')

/* GET home page. */
index.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = { index, book, inventory, store, user };
