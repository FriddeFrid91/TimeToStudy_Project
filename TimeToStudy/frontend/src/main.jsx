//Entry point
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; //enable page routing
//import App from './App';
import './styles/App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

=======


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
>>>>>>> origin/Mi
