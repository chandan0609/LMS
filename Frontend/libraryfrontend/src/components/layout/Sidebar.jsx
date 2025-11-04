// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import "./Layout.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/books" className="sidebar-link">
          <span className="icon"></span>
          <span>Books</span>
        </NavLink>

        <NavLink to="/borrow-records" className="sidebar-link">
          <span className="icon"></span>
          <span>Borrow Records</span>
        </NavLink>

        {isAdmin && (
          <>
            <NavLink to="/categories" className="sidebar-link">
              <span className="icon">️</span>
              <span>Categories</span>
            </NavLink>

            <NavLink to="/users" className="sidebar-link">
              <span className="icon"></span>
              <span>Users</span>
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
