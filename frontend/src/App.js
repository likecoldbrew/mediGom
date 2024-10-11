import React,{ useEffect, useState } from "react";
import SubCategories from "./userMain/components/SubCategory";
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./userMain/pages/Login";
import SignUpPage from "./userMain/pages/signUp";
import MainPage from "./userMain/pages/MainPage";
import Doctors from "./doctorPage";
import DoctorInfo from "./userMain/pages/DoctorInfo";

import Admin from "./admin";
import Home from "./admin/pages/Home";
import AllUsersList from "./admin/pages/AllUsersList";
import PatientList from "./admin/pages/PatientList";
import DoctorList from "./admin/pages/DoctorList";
import AdminList from "./admin/pages/AdminList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/:subcategory" element={<SubCategories />} />
                <Route path="/1001" element={<DoctorInfo />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Home />} /> {/* 기본 페이지 */}
                    <Route path="all" element={<AllUsersList />} />
                    <Route path="patient" element={<PatientList />} />
                    <Route path="doctor" element={<DoctorList />} />
                    <Route path="admin" element={<AdminList />} />
                </Route>
                <Route path="/doctors" element={<Doctors />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;