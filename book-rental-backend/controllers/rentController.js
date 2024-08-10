const { User, Book, Rental } = require('../models');
const sequelize = require('../models').sequelize;

const postRentBooks = async (req, res) => {
  const { userId, books } = req.body;

  if (!userId || !Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  const transaction = await sequelize.transaction();

  try {
    const renter = await User.findByPk(userId, { transaction });
    if (!renter) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Renter not found' });
    }

    let totalAmount = 0;
    const rentalRecords = [];

    for (const { bookId, quantity } of books) {
      const book = await Book.findByPk(bookId, { transaction });
      if (!book) {
        await transaction.rollback();
        return res.status(404).json({ error: `Book with ID ${bookId} not found` });
      }

      const owner = await User.findByPk(book.ownerId, { transaction });
      if (!owner) {
        await transaction.rollback();
        return res.status(404).json({ error: `Owner of book with ID ${bookId} not found` });
      }

      const amountForThisBook = book.price * quantity;
      totalAmount += amountForThisBook;

      if (book.rentedQuantity + quantity > book.quantity) {
        await transaction.rollback();
        return res.status(400).json({ error: `Not enough quantity available for book ID ${bookId}` });
      }

      const rental = await Rental.create({
        bookId: book.id,
        userId: renter.id,
        quantity,
        amount: amountForThisBook,
        rentDate: new Date(),
      }, { transaction });

      rentalRecords.push(rental);

      book.rentedQuantity += quantity;
      book.quantity -= quantity;
      await book.save({ transaction });

      owner.walletBalance += amountForThisBook;
      await owner.save({ transaction });
    }

    if (renter.walletBalance < totalAmount) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    renter.walletBalance -= totalAmount;
    await renter.save({ transaction });

    await transaction.commit();
    res.json({ message: 'Books rented successfully', rentals: rentalRecords });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

const getVerifyRental = async (req, res) => {
  const { rentalId } = req.params;

  try {
    const rental = await Rental.findByPk(rentalId, {
      include: [
        { model: Book, as: 'book' },
        { model: User, as: 'renter' },
      ],
    });

    if (!rental) {
      return res.status(404).json({ error: 'Rental not found' });
    }

    res.json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postReturnBook = async (req, res) => {
  const { rentalId } = req.body;

  if (!rentalId) {
    return res.status(400).json({ error: 'Rental ID is required' });
  }

  const transaction = await sequelize.transaction();

  try {
    const rental = await Rental.findByPk(rentalId, {
      include: { model: Book, as: 'book' },
      transaction,
    });

    if (!rental) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Rental not found' });
    }

    const book = await Book.findByPk(rental.bookId, { transaction });

    book.rentedQuantity -= rental.quantity;
    await book.save({ transaction });

    rental.returnDate = new Date();
    await rental.save({ transaction });

    const renter = await User.findByPk(rental.userId, { transaction });
    if (renter) {
      // Example: Optionally refund some amount to renter's wallet if applicable
      // const refundAmount = calculateRefundAmount(rental);
      // renter.walletBalance += refundAmount;
      // await renter.save({ transaction });
    }

    await transaction.commit();
    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postRentBooks,
  getVerifyRental,
  postReturnBook
};
