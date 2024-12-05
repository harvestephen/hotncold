import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/App.css";
import "./scripts/script.js";
import App from "./App.jsx";
import Test from "./components/Test.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/as" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
