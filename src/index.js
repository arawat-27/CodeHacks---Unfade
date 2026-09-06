import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from "./App";
import Business from "./Business";
import Music from "./Music";
import Films from "./Films";
import Books from "./Books";
import Collaborate from "./Collaborate";
import AddWork from "./AddWork";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Business" element={<Business />} />
          <Route path="/Music" element={<Music />} />
          <Route path="/Films" element={<Films />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/Collaborate" element={<Collaborate />} />
          <Route path="/AddWork" element={<AddWork />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

