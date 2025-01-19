import React from "react";
import ReactDom from 'react-dom/client'
import './index.css'
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)