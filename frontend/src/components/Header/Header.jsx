import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/5409f3b3-b085-4d42-8652-580678be8b8f.jpg";

function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar">

        <div className="navbar-container">

          {/* LOGO */}
          <div className="nav-right">

            <Link
              to="/"
              className="logo-box"
              onClick={(e) => { scrollToTop(e); closeMenu(); }}
            >
              <img
                src={logoImage}
                alt="logo"
                className="logo-image"
              />

              <span className="logo">
                UniStay
              </span>
            </Link>

          </div>

          {/* NAVIGATION - Desktop */}
          <nav className="nav-center">

            <ul className="nav-links">

              <li>
                <Link to="/" onClick={scrollToTop}>
                  الرئيسية
                </Link>
              </li>

              <li>
                <a href="/#search-section">
                  ابحث عن سكن
                </a>
              </li>

              <li>
                <a href="/#why-us">
                  لماذا تختار منصتنا
                </a>
              </li>

              <li>
                <a href="/#how-it-works">
                  كيف تعمل منصتنا
                </a>
              </li>

            </ul>

          </nav>

          {/* LEFT SIDE */}
          <div className="nav-left">

            <Link
              to="/wishlist"
              className="wishlist-btn"
              onClick={closeMenu}
            >
              ♡
            </Link>

            <Link
              to="/student"
              className="login-link"
            >
              تسجيل الدخول
            </Link>

            <Link
              to="/add-property"
              className="add-btn"
            >
              أضف عقارك
            </Link>

            {/* Hamburger Button */}
            <button
              className={`hamburger-btn ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

          <ul className="mobile-nav-links">

            <li>
              <Link
                to="/"
                onClick={(e) => { scrollToTop(e); closeMenu(); }}
              >
                الرئيسية
              </Link>
            </li>

            <li>
              <a href="/#search-section" onClick={closeMenu}>
                ابحث عن سكن
              </a>
            </li>

            <li>
              <a href="/#why-us" onClick={closeMenu}>
                لماذا تختار منصتنا
              </a>
            </li>

            <li>
              <a href="/#how-it-works" onClick={closeMenu}>
                كيف تعمل منصتنا
              </a>
            </li>

          </ul>

          <div className="mobile-menu-actions">

            <Link
              to="/student"
              className="login-link"
              onClick={closeMenu}
            >
              تسجيل الدخول
            </Link>

            <Link
              to="/add-property"
              className="add-btn"
              onClick={closeMenu}
            >
              أضف عقارك
            </Link>

          </div>

        </div>

      </header>
    </>
  );
}

export default Header;