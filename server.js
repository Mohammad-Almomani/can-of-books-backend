'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const BookModel = require('./Moduels/Schema');

const app = express();
app.use(cors());
app.use(express.json());


const Book1 = new BookModel ({
  title: "Notes from Underground",
  description: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, and is considered by many to be one of the first existentialist novels. The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, unnamed narrator, who is a retired civil servant living in St. Petersburg.",
  status: "Available"
})
const Book2 = new BookModel ({
  title: "Notes from a Dead House",
  description: "In 1849, Dostoevsky was sentenced to four years at hard labor in a Siberian prison camp for participating in a socialist discussion group. The novel he wrote after his release, based on notes he smuggled out, not only brought him fame, but also founded the tradition of Russian prison writing. Notes from a Dead House (sometimes translated as The House of the Dead) depicts brutal punishments, feuds, betrayals, and the psychological effects of confinement, but it also reveals the moments of comedy and acts of kindness that Dostoevsky witnessed among his fellow prisoners. ",
  status: "Available"
})
const Book3 = new BookModel ({
  title: "The Double",
  description: "The Double centers on a government clerk who goes mad. It deals with the internal psychological struggle of its main character, Yakov Petrovich Golyadkin, who repeatedly encounters someone who is his exact double in appearance but confident, aggressive, and extroverted, characteristics that are the polar opposites to those of the toadying pushover protagonist. The motif of the novella is a doppelgänger (Russian dvoynik), known throughout the world in various guises such as the fetch.",
  status: "Available"
})

Book1.save();
Book2.save();
Book3.save();

mongoose.connect(`${process.env.MONGO_URI}/books`);
const PORT = process.env.PORT || 3001;

app.get('/books', (req,res)=>{
  BookModel.find({}, (error, data) => {
    if (error) console.log(`error reading from the db: ${error}`);
    else res.send(data);
})
})
app.get('/', (req,res)=>{
  res.send("hello home page")
  })

app.post('/books', createNewBook)

app.listen(PORT, () => console.log(`listening on ${PORT}`));



function createNewBook (req,res) {
  const {newBook} = req.body;
  const book = new BookModel(newBook);
  book.save();
  res.status(201).json(book)
}

app.delete('/books/:id', deleteBook)

function deleteBook (req,res){
  const id = req.params.id;
  console.log(id)
  BookModel.findByIdAndDelete(id).then(sendRec =>{
    res.send(sendRec);
  }).catch (error => {
    res.send(error)
  })
}

app.put('/books/:id', updateBook);

function updateBook(req, res) {
  const id = req.params.id;
  const {data} = req.body;

  BookModel.findByIdAndUpdate(id, data, {new: true}).then(record => {
      res.send(record);
  }).catch(err => {
      console.log(err)
      res.status(500).send(err.message);
  })
}