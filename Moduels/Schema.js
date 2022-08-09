"use strict";

const mongoose = require('mongoose');


function createBook (req, res) {

    mongoose.connect('mongodb://127.0.0.1:27017/books');
    const book = new mongoose.Schema({
        title: String,
        description: String,
        status: String
      })
      
      const bookModel = mongoose.model('bookModel', book);
      
      const Book1 = new bookModel ({
        title: "Notes from Underground",
        description: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, and is considered by many to be one of the first existentialist novels. The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, unnamed narrator, who is a retired civil servant living in St. Petersburg.",
        status: "Available"
      })
      const Book2 = new bookModel ({
        title: "Notes from a Dead House",
        description: "In 1849, Dostoevsky was sentenced to four years at hard labor in a Siberian prison camp for participating in a socialist discussion group. The novel he wrote after his release, based on notes he smuggled out, not only brought him fame, but also founded the tradition of Russian prison writing. Notes from a Dead House (sometimes translated as The House of the Dead) depicts brutal punishments, feuds, betrayals, and the psychological effects of confinement, but it also reveals the moments of comedy and acts of kindness that Dostoevsky witnessed among his fellow prisoners. ",
        status: "Available"
      })
      const Book3 = new bookModel ({
        title: "The Double",
        description: "The Double centers on a government clerk who goes mad. It deals with the internal psychological struggle of its main character, Yakov Petrovich Golyadkin, who repeatedly encounters someone who is his exact double in appearance but confident, aggressive, and extroverted, characteristics that are the polar opposites to those of the toadying pushover protagonist. The motif of the novella is a doppelgänger (Russian dvoynik), known throughout the world in various guises such as the fetch.",
        status: "Available"
      })
    
      Book1.save();
      Book2.save();
      Book3.save();

      
    
}

module.exports = createBook;
  