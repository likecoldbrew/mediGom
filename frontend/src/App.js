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
import Certificates from "./doctorPage/pages/Certificates";
import UserManagement from "./doctorPage/pages/UserManagement";
import Home from "./doctorPage/pages/Home";
import CertificateList from "./doctorPage/pages/CertificateList";


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
                <Route path="/doctor" element={<Doctors/>}>
                    <Route index element={<Home/>}/>
                    <Route path="list" element={<UserManagement/>}/>
                    <Route path="clinic" element={<UserClinicCheck/>}/>
                    <Route path="reserv" element={<UserReservationCheck/>}/>
                    <Route path="state" element={<UserStateChange/>}/>
                    <Route path="certificateList" element={<CertificateList/>}/>
                    <Route path="certificate" element={<Certificates/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;