//Shared layout
import { Link, Outlet } from 'react-router-dom';
import './styles/App.css';


export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div 
        className="logo">Time2Study</div>
      </header>

      <section className="main-layout">
        <main className="content">
          <Outlet />
        </main>

        <nav className="side-navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </nav>
      </section>
    </div>
  );
}