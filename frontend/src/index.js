import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/Store';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import createRoot from react-dom/client
import { createRoot } from 'react-dom/client';

// Create a root instance
const root = createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
