// src/components/Renter/RentBooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { rentBooks } from '../../services/rentalService';

const getCurrentUserId = () => {
  return localStorage.getItem('userId') || 'defaultUserId';
};

const RentBooks = () => {
  const [userId, setUserId] = useState('');
  const [bookDetails, setBookDetails] = useState([]);
  const [books, setBooks] = useState([{ bookId: '', quantity: 1, days: 1 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setUserId(getCurrentUserId());
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBookDetails(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, []);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = books.reduce((acc, book) => {
        const bookDetail = bookDetails.find(b => b._id === book.bookId);
        const price = bookDetail ? bookDetail.price : 0;
        const amount = price * book.quantity * book.days;
        return acc + amount;
      }, 0);
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [books, bookDetails]);

  const handleRentBooks = async () => {
    try {
      const response = await rentBooks({ userId, books });
      setMessage(`Success: ${response.message}. Total Amount: $${response.totalAmount}`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  const handleAddBook = () => {
    setBooks([...books, { bookId: '', quantity: 1, days: 1 }]);
  };

  const handleBookChange = (index, field, value) => {
    const newBooks = [...books];
    newBooks[index][field] = value;
    setBooks(newBooks);
  };

  return (
    <div>
      <h1>Rent Books</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        readOnly
      />
      {books.map((book, index) => {
        const bookDetail = bookDetails.find(b => b._id === book.bookId);
        return (
          <div key={index}>
            <input
              type="text"
              placeholder="Book ID"
              value={book.bookId}
              onChange={(e) => handleBookChange(index, 'bookId', e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={book.quantity}
              onChange={(e) => handleBookChange(index, 'quantity', e.target.value)}
            />
            <input
              type="number"
              placeholder="Days"
              value={book.days}
              onChange={(e) => handleBookChange(index, 'days', e.target.value)}
            />
            {bookDetail && (
              <div>
                <p><strong>Title:</strong> {bookDetail.title}</p>
                <p><strong>Price:</strong> ${bookDetail.price}</p>
              </div>
            )}
          </div>
        );
      })}
      <button onClick={handleAddBook}>Add More Books</button>
      <button onClick={handleRentBooks}>Rent Books</button>
      {totalAmount > 0 && <p>Total Amount: ${totalAmount.toFixed(2)}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RentBooks;
