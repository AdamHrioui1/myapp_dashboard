import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import App1 from './App1';
import { GlobaleProvider } from './DashboardGlobaleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobaleProvider>
    <App1 />
  </GlobaleProvider>
);