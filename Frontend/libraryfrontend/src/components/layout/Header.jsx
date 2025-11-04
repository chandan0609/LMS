// Header.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
// import "./Layout.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/"> Library Management</Link>
        </div>

        {isAuthenticated && (
          <nav className="nav-menu">
            <Link to="/books">Books</Link>
            <Link to="/borrow-records">My Borrows</Link>
            {user?.role === "admin" && (
              <>
                <Link to="/categories">Categories</Link>
                <Link to="/users">Users</Link>
              </>
            )}
          </nav>
        )}

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <span className="user-info">
                Welcome, {user?.username} ({user?.role})
              </span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-link">
                Login
              </Link>
              <Link to="/register" className="btn-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
