import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>

  </React.StrictMode>
);


