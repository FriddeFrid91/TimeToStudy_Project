import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authorizedFetch from '../utils/authFetch';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await authorizedFetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
          method: 'POST',
          credentials: 'include', //
        });
      } catch (err) {
        console.warn("Logout request failed. Continue...");
      }

      // Clear token
      localStorage.removeItem('accessToken');

      navigate('/login');
    };

    logout();
  }, [navigate]);

  return <p>Logging out...</p>;
}

