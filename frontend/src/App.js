import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Doctors from './doctorPage/components/Doctors'
import "./doctorPage/style/index.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Doctors />} />
                {/* 추가적인 Route를 여기에 작성 */}
            </Routes>
        </Router>
    );

}

export default App;
