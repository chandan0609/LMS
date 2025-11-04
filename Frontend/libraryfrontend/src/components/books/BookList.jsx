// BookList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBooks, deleteBook } from "../../redux/slices/bookSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import BookSearch from "./BookSearch";
// import "./Books.css";

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, loading } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id)).then(() => dispatch(fetchBooks()));
    }
  };

  const handleBorrow = (bookId) => {
    navigate(`/borrow/new?bookId=${bookId}`);
  };

  return (
    <div className="book-list-container">
      <div className="list-header">
        <h2>Books</h2>
        {isAdmin && (
          <button
            className="btn-primary"
            onClick={() => navigate("/books/new")}
          >
            Add New Book
          </button>
        )}
      </div>

      <BookSearch />

      {loading ? (
        <div className="loading">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="no-data">No books found</div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-isbn">ISBN: {book.ISBN}</p>
              <span className={`status-badge status-${book.status}`}>
                {book.status}
              </span>

              <div className="book-actions">
                <button
                  className="btn-secondary"
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  View Details
                </button>

                {book.status === "available" && (
                  <button
                    className="btn-primary"
                    onClick={() => handleBorrow(book.id)}
                  >
                    Borrow
                  </button>
                )}

                {isAdmin && (
                  <>
                    <button
                      className="btn-warning"
                      onClick={() => navigate(`/books/${book.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
