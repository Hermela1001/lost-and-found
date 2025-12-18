import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">📍bits lost-and-found</div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <a href="#recent" onClick={closeMenu}>Recent Listings</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>

          <Link to="/admin-posts" onClick={closeMenu} className="nav-posts-link">
            Posts
          </Link>

          <div className="nav-buttons">
            {isLoggedIn ? (
              <button className="signin-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="signin-btn" onClick={closeMenu}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
