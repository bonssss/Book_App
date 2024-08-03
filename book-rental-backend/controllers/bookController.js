const { Book, User } = require('../models');
const { getAbility } = require('./authController');

const uploadBook = async (req, res) => {
  const { title, author, category, quantity } = req.body;

  try {
    const book = await Book.create({
      title,
      author,
      category,
      quantity,
      status: 'pending',
      ownerId: req.user.userId,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, quantity, status } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const ability = getAbility(req.user);
    if (!ability.can('update', book)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await book.update({ title, author, category, quantity, status });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

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

const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadBook, updateBook, deleteBook, listBooks };
