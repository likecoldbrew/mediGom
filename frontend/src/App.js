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
import UserStateChange from "./doctorPage/pages/UserStateChange";
import UserClinicCheck from "./doctorPage/pages/UserClinicCheck";
import UserReservationCheck from "./doctorPage/pages/UserReservationCheck";
import EmployLogin from "./userMain/pages/employLogin";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:subcategory" element={<SubCategories />} />
                <Route path="/101" element={<DoctorInfo />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/empLogin" element={<EmployLogin />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/doctors" element={<Doctors />} />
                {/*연동 안해놔서 임시로 그냥 화면에서 보려고 함*/}
                <Route path="/doctors/userStateChange" element={<UserStateChange />} />
                <Route path="/doctors/userClinicCheck" element={<UserClinicCheck />} />
                <Route path="/doctors/userReservationCheck" element={<UserReservationCheck />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;