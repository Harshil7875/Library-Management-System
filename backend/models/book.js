const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: Number,
  genre: String,
  ratings: [Number],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;