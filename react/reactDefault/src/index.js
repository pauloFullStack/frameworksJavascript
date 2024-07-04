import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  // remove 'React.StrictMode' when putting into production this component is for development only
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
