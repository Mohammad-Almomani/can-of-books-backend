"use strict";

const mongoose = require('mongoose');

const NewBook = new mongoose.Schema({
  title: String,
  description: String,
  status: String
})

const BookModel = mongoose.model('books', NewBook)

module.exports = BookModel;
