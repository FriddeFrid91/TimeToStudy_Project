// Page to navigate further into the app after login
// when adding a new route DO update the link below!
import { Outlet, Link, useLocation } from 'react-router-dom';
import './styles/App2.css';
import './styles/App.css';

// ✅ Import all images from src/assets
import adminIcon from './assets/admin.png';
import personIcon from './assets/person.png';
import overviewIcon from './assets/overview.png';
import plannerIcon from './assets/planner.png';
import scheduleIcon from './assets/schedule.png';
import helpIcon from './assets/help.png';
import logoutIcon from './assets/bx_log-out.png';

export default function Layout2() {
  const location = useLocation();
  const isPlannerRoute = location.pathname === '/planner';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="layout2">
      <nav className="left-side-navbar">
        <ul>
          {/* Admin link only visible for admin users */}
          {isAdmin && (
            <li>
              <Link to="/admin" className="sidebar-link">
                <img src={adminIcon} alt="Admin" className="nav-icon" />
                <span>Admin</span>
              </Link>
            </li>
          )}

          {/* Profile and Overview for non-admin users */}
          {!isAdmin && (
            <>
              <li>
                <Link to="/profile" className="sidebar-link">
                  <img src={personIcon} alt="Profile" className="nav-icon" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="sidebar-link">
                  <img src={overviewIcon} alt="Overview" className="nav-icon" />
                  <span>Overview</span>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/planner" className="sidebar-link">
              <img src={plannerIcon} alt="Planner" className="nav-icon" />
              <span>Planner</span>
            </Link>
          </li>

          <li>
            <Link to="/schedule" className="sidebar-link">
              <img src={scheduleIcon} alt="Schedule" className="nav-icon" />
              <span>Schedule</span>
            </Link>
          </li>

          {isPlannerRoute && !isAdmin && (
            <li>
              <button
                className="sidebar-link"
                onClick={() => window.dispatchEvent(new Event('start-planner-tour'))}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img src={helpIcon} alt="Help" className="nav-icon" />
                <span style={{ fontFamily: "'Abhaya Libre', sans-serif" }}>Help</span>
              </button>
            </li>
          )}

          <li>
            <Link to="/logout" className="sidebar-link">
              <img src={logoutIcon} alt="Log out" className="nav-icon" />
              <span>Log out</span>
            </Link>
          </li>
        </ul>
      </nav>

      <main className="content2">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Time2Study. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}