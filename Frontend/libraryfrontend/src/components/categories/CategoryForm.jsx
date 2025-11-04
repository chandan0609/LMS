import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, clearError } from "../../redux/slices/categorySlice";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    dispatch(addCategory(formData));
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Library Management System</h2>
        <h3>Add New Book Category</h3>

        {error && (
          <div className="error-message">
            {typeof error === "string"
              ? error
              : "Failed to add category. Please try again."}
          </div>
        )}

        {success && (
          <div className="success-message">Category added successfully!</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter category name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description (optional)"
              rows="3"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
