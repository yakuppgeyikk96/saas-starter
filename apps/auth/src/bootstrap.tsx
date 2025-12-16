import React from "react";
import { createRoot } from "react-dom/client";
import { configureApi } from "shell/lib/api";
import App from "./App";

import "@repo/styles/styles.css";

// Configure API base URL from webpack DefinePlugin
const apiUrl = (window as any).__API_BASE_URL__ || "http://localhost:8080";
configureApi(apiUrl);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
