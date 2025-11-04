// BookDetail.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "../../redux/slices/bookSlice";

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBook, loading } = useSelector((state) => state.books);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  if (loading || !currentBook) {
    return <div className="loading">Loading book details...</div>;
  }

  const category = categories.find((cat) => cat.id === currentBook.category);

  return (
    <div className="book-detail-container">
      <button className="btn-secondary" onClick={() => navigate("/books")}>
        ← Back to Books
      </button>

      <div className="book-detail-card">
        <h2>{currentBook.title}</h2>
        <div className="detail-row">
          <strong>Author:</strong> {currentBook.author}
        </div>
        <div className="detail-row">
          <strong>ISBN:</strong> {currentBook.ISBN}
        </div>
        <div className="detail-row">
          <strong>Category:</strong> {category?.name || "N/A"}
        </div>
        <div className="detail-row">
          <strong>Status:</strong>
          <span className={`status-badge status-${currentBook.status}`}>
            {currentBook.status}
          </span>
        </div>

        {currentBook.status === "available" && (
          <button
            className="btn-primary"
            onClick={() => navigate(`/borrow/new?bookId=${currentBook.id}`)}
          >
            Borrow This Book
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
