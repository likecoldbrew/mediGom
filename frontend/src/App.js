import React, { useEffect, useState } from 'react';
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "./admin";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          {/* 추가적인 Route를 여기에 작성 */}
        </Routes>
      </Router>
  );
}

export default App;
