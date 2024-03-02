const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// GET all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new book
router.post('/books', async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to find a book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
}

// GET a single book by ID
router.get('/books/:id', getBook, (req, res) => {
  res.json(res.book);
});

// PUT to update a book by ID
router.put('/books/:id', getBook, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  // Add other fields similarly
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a book
router.delete('/books/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Deleted Book' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;