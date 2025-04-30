import RegisterForm from './components/Register';
import './App.css';
//import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'; //enable page routing
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';

// HomePage component
function HomePage() {
  const navigate = useNavigate();

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Welcome to Time To Study!</h1>
      <button onClick={handleGoToRegister}>Register</button>
    </div>
  );
}

// App component
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}

