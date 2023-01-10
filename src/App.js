import React from "react";
import "./App.css";
import { Gallery } from "./components/Gallery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CubeRender from "./components/ex1_r3f";

function App() {
  return (
    <div className="section">
      <Router>
        <Routes>
          <Route path="/" element={<Gallery />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ex1" element={<CubeRender />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
