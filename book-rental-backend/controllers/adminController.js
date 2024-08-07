const { User } = require('../models');

const approveOwner = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user || user.role !== 'owner') {
      return res.status(404).json({ error: 'Owner not found' });
    }

    user.isApproved = true;
    await user.save();

    res.json({ message: 'Owner approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const approveBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.status = 'available';
    await book.save();

    res.json({ message: 'Book approved successfully' });
  } catch (error) {
    console.error('Error approving book:', error);
    res.status(500).json({ error: 'Failed to approve book' });
  }
};


module.exports = { approveOwner,approveBook };
