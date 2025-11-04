import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "../../redux/slices/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Book Categories</h2>

        {loading && <p>Loading categories...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && categories.length === 0 && <p>No categories found.</p>}

        {!loading && categories.length > 0 && (
          <table className="category-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat._id || cat.id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description || "—"}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(cat._id || cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
