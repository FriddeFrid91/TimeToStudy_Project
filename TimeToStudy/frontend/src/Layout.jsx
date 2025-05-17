//Hero Page to navigate further into the app
import { Link, Outlet } from 'react-router-dom';
import './styles/App.css';
import './styles/Home.css';
import { useState } from 'react';

// ✅ Import images correctly from src/assets
import logo from './assets/logo.png';
import homeIcon from './assets/home.png';
import aboutIcon from './assets/about-us.png';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div>
      <div className="layout">
        <header className="header">
          <Link to="/" className="title">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Time2Study</h1>
          </Link>
        </header>

        <nav className="right-side-navbar">
          <div className="toggle-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className="navbar-links">
            <li>
              <Link to="/">
                <img src={homeIcon} alt="Home" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <img src={aboutIcon} alt="About Us" />
                <span>About Us</span>
              </Link>
            </li>
          </ul>

          {/* slide out menu*/} 
          <div id="menu-slideout" className={menuOpen ? 'open' : ''}>
            <ul className="menu-links">
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
            </ul>
          </div>
        </nav>

        <section className="main-layout">
          <main className="content">
            <Outlet />
          </main>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 Time2Study. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}