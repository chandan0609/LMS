import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";

// Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Book Components
import BookList from "./components/books/BookList";
import BookDetail from "./components/books/BookDetail";
import BookForm from "./components/books/BookForm";

// Borrow Components
import BorrowList from "./components/borrowings/BorrowList";
import BorrowForm from "./components/borrowings/BorrowForm";

// Category Components
import CategoryList from "./components/categories/CategoryList";

// User Components
import UserList from "./components/users/UserList";
import UserDetail from "./components/users/UserDetail";

import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/books" />;
  }

  return children;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app">
        <Header />

        <div className="main-container">
          {isAuthenticated && <Sidebar />}

          <main className="content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navigate to="/books" />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/books"
                element={
                  <ProtectedRoute>
                    <BookList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/books/:id"
                element={
                  <ProtectedRoute>
                    <BookDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/books/new"
                element={
                  <AdminRoute>
                    <BookForm />
                  </AdminRoute>
                }
              />

              <Route
                path="/books/:id/edit"
                element={
                  <AdminRoute>
                    <BookForm />
                  </AdminRoute>
                }
              />

              <Route
                path="/borrow-records"
                element={
                  <ProtectedRoute>
                    <BorrowList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/borrow/new"
                element={
                  <ProtectedRoute>
                    <BorrowForm />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/categories"
                element={
                  <AdminRoute>
                    <CategoryList />
                  </AdminRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <AdminRoute>
                    <UserList />
                  </AdminRoute>
                }
              />

              <Route
                path="/users/:id"
                element={
                  <AdminRoute>
                    <UserDetail />
                  </AdminRoute>
                }
              />

              {/* Catch all - redirect to books or login */}
              <Route
                path="*"
                element={
                  isAuthenticated ? (
                    <Navigate to="/books" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
