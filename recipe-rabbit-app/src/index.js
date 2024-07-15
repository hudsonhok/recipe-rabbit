import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

// Creating the root application component
const root = ReactDOM.createRoot(document.getElementById("root"));

// React.StrictMode for development to check for common mistakes
// Browser Router handles client-side routing
// Allows you to create multiple routes and navigate between them
// Without requiring a full page reload
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
