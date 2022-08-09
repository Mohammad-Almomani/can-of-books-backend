'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const createBook = require('./Moduels/Schema');

const app = express();
app.use(cors());

createBook();

const PORT = process.env.PORT || 3001;
app.get('/books', (req,res)=>{
  const bookModel = mongoose.model('bookModel');

  bookModel.find({}, (error, data) => {
    if (error) console.log(`error reading from the db: ${error}`);
    else res.send(data);
})

})





app.listen(PORT, () => console.log(`listening on ${PORT}`));
