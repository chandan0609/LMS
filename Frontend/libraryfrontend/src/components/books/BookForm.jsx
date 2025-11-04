// BookForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBook,
  updateBook,
  fetchBookById,
} from "../../redux/slices/bookSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";

const BookForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { currentBook, loading } = useSelector((state) => state.books);
  const { categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    ISBN: "",
    category: "",
    status: "available",
  });

  useEffect(() => {
    dispatch(fetchCategories());
    if (isEdit) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && currentBook) {
      setFormData({
        title: currentBook.title || "",
        author: currentBook.author || "",
        ISBN: currentBook.ISBN || "",
        category: currentBook.category || "",
        status: currentBook.status || "available",
      });
    }
  }, [isEdit, currentBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(updateBook({ id, bookData: formData })).then(() => {
        navigate("/books");
      });
    } else {
      dispatch(createBook(formData)).then(() => {
        navigate("/books");
      });
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? "Edit Book" : "Add New Book"}</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ISBN">ISBN *</label>
          <input
            type="text"
            id="ISBN"
            name="ISBN"
            value={formData.ISBN}
            onChange={handleChange}
            required
            maxLength="13"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Book" : "Add Book"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/books")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
