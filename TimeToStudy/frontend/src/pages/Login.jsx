import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

// ✅ Import image from src/assets
import loginPerson from '../assets/login-person.png';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);

    // Admin-only 
    if (isAdmin) {
      const allowedAdminUsername = 'admin';
      const allowedAdminPassword = 'pokemon';

      if (username === allowedAdminUsername && password === allowedAdminPassword) {
        const mockToken = 'mock-admin-token';
        localStorage.setItem('accessToken', mockToken);
        localStorage.setItem('isAdmin', 'true');

        navigate('/admin', { replace: true });
        return;
      } else {
        alert('Access denied. Invalid admin credentials.');
        return;
      }
    }

    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, role: 'user' }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error("Server did not return JSON. Check the API URL or backend.");
      }

      const data = await response.json();

      if (response.ok) {
        console.log('🎟️ accessToken:', data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('isAdmin', 'false');
        alert("You're logged in!");
        navigate('/dashboard', { replace: true });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error('❌ Login error:', err.message);
      alert(`Login error: ${err.message}`);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <img src={loginPerson} alt="Logo" className="logoin" />
        <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button
          type="button"
          className="toggle-mode"
          onClick={() => setIsAdmin((prev) => !prev)}
        >
          Switch to {isAdmin ? 'User' : 'Admin'}
        </button>
      </form>
    </div>
  );
}