// BookSearch.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  clearFilters,
  fetchBooks,
} from "../../redux/slices/bookSlice";

const BookSearch = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.books);
  const { categories } = useSelector((state) => state.categories);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleSearch = () => {
    dispatch(fetchBooks(filters));
  };

  const handleClear = () => {
    dispatch(clearFilters());
    dispatch(fetchBooks());
  };

  return (
    <div className="search-container">
      <div className="search-filters">
        <input
          type="text"
          name="search"
          placeholder="Search by title, author, or ISBN..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
          <option value="reserved">Reserved</option>
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          name="ordering"
          value={filters.ordering}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">Sort By</option>
          <option value="title">Title (A-Z)</option>
          <option value="-title">Title (Z-A)</option>
          <option value="author">Author (A-Z)</option>
          <option value="-author">Author (Z-A)</option>
        </select>

        <button className="btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn-secondary" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default BookSearch;
