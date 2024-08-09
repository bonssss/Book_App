const { Book,User } = require('../models');
const { Op } = require('sequelize');

const approveOwner = async (req, res) => {
  const { id } = req.params;
  console.log('Received owner ID:', id); 

  if (!id) {
    return res.status(400).json({ error: 'Owner ID is required' });
  }

  try {
    const owner = await User.findByPk(id);

    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    owner.isApproved = true; // Update as necessary
    await owner.save();

    res.json({ message: 'Owner approved successfully' });
  } catch (error) {
    console.error('Error approving owner:', error);
    res.status(500).json({ error: 'Failed to approve owner' });
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

const getOwnerStats = async (req, res) => {
  try {
    const owners = await User.findAll({
      where: {
        role: 'owner' // Filter to include only users with the 'owner' role
      },
      include: {
        model: Book,
        as: 'books',
        attributes: ['id'], // Only include book IDs to count the number of books
      },
      attributes: ['id','username', 'location', 'isApproved'], // Include location and isApproved from Users table
    });

    const response = owners.map(owner => {
      return {
        id:owner.id,
        username: owner.username,
        numberOfBooks: owner.books.length,
        location: owner.location,
        status: owner.isApproved ? 'active' : 'inactive', // Map isApproved to 'active' or 'passive'
        actions: [
          { type: 'view', url: `/view-books/${owner.username}` },
          { type: 'edit', url: `/edit-owner/${owner.username}` }
        ]
      };
    });

    // console.log('Owner stats:', response); // Log the processed response
    res.json(response);
  } catch (error) {
    console.error('Error fetching owner stats:', error);
    res.status(500).json({ error: 'Failed to fetch owner stats' });
  }
};

const deleteOwner = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Owner ID is required' });
  }

  try {
    // Find the owner
    const owner = await User.findByPk(id);

    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    // Start a transaction
    const transaction = await User.sequelize.transaction();

    try {
      // Handle related data: soft delete books associated with the owner
      await Book.update(
        { status: 'deleted' }, // or any status indicating the book is no longer available
        { where: { ownerId: id }, transaction }
      );

      // Delete the owner record
      await owner.destroy({ transaction });

      // Commit transaction
      await transaction.commit();

      res.json({ message: 'Owner deleted successfully' });
    } catch (error) {
      // Rollback transaction on error
      await transaction.rollback();
      console.error('Error during owner deletion transaction:', error);
      res.status(500).json({ error: 'Failed to delete owner' });
    }
  } catch (error) {
    console.error('Error deleting owner:', error);
    res.status(500).json({ error: 'Failed to delete owner' });
  }
};


module.exports = { approveOwner,approveBook,getOwnerStats,deleteOwner };
