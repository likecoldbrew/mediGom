import React,{ useEffect, useState } from "react";
import SubCategories from "./userMain/components/SubCategory";
import axios from "axios";
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./userMain/pages/Login";
import SignUpPage from "./userMain/pages/signUp";
import MainPage from "./userMain/pages/MainPage";
import Doctors from "./doctorPage";
import Admin from "./admin";
import DoctorInfo from "./userMain/pages/DoctorInfo";
<<<<<<< HEAD
import Payment from "./components/Payment";
=======
import EmployLogin from "./userMain/pages/EmployLogin";
>>>>>>> ade8e816e03002a94fe2333e2801b7ef6441afa4

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:subcategory" element={<SubCategories />} />
                <Route path="/1001" element={<DoctorInfo />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/empLogin" element={<EmployLogin />} />s
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/payment" element={<Payment/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;