const { Book, User } = require('../models');
const { getAbility } = require('./authController');

// Upload a new book
const uploadBook = async (req, res) => {
  const { title, author, category, quantity, price } = req.body;

  try {
    // Check if the book already exists
    const existingBook = await Book.findOne({ where: { title, author } });
    if (existingBook) {
      return res.status(400).json({ error: 'Book already registered' });
    }

    // Create a new book
    const book = await Book.create({
      title,
      author,
      category,
      quantity,
      price,
      status: 'pending',
      ownerId: req.user.id,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update book information
const updateBook = async (req, res) => {
  const id = parseInt(req.params.id, 10); // Convert id to integer
  const { title, author, category, quantity, status, price } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const ability = getAbility(req.user);
    if (!ability.can('update', book)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await book.update({ title, author, category, quantity, status, price });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a book
const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id, 10); // Convert id to integer

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const ability = getAbility(req.user);
    if (!ability.can('delete', book)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List books uploaded by the owner
const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { ownerId: req.user.id } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadBook, updateBook, deleteBook, listBooks };
