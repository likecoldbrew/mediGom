// App.js
import React, { useEffect, useState } from 'react';
import MainPage from "./userMain/components/HeaderFooter";
import axios from 'axios';
import "./userMain/style/index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                {/* 추가적인 Route를 여기에 작성 */}
            </Routes>
        </Router>
    );
}

export default App;
