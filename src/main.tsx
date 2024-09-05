import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.tsx";
import "./i18n";
import { AdminProvider } from "./contexts/AdminContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <AdminProvider>
        <Router>
          <App />
        </Router>
      </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);
