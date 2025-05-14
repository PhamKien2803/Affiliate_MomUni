// src/App.jsx
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import CategoryPage from "./page/CategoryPage";
import ProductPage from "./page/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/hand" element={<CategoryPage />} />
        <Route path="/product/resurrection-duet" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
