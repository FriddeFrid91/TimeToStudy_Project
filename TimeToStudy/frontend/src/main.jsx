//Entry point
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; //enable page routing
import './styles/App.css';
import './index.css'
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

