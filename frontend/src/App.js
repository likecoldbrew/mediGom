import React,{ useEffect, useState } from "react";
import SubCategories from "./userMain/components/SubCategory";
import axios from "axios";
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./userMain/pages/Login";
import SignUpPage from "./userMain/pages/signUp";
import MainPage from "./userMain/pages/MainPage";
// import Doctors from "./doctorPage";
import Admin from "./admin";
import DoctorInfo from "./userMain/pages/DoctorInfo";
import UserStateChange from "./DoctorPage/pages/UserStateChange";
import UserClinicCheck from "./DoctorPage/pages/UserClinicCheck";
import UserReservationCheck from "./DoctorPage/pages/UserReservationCheck";
import EmployLogin from "./userMain/pages/employLogin";
import DepartmentInfo from "./userMain/pages/DepartmentInfo";
import UserMain from "./userMain/index";
import Payment from "./components/Payment";
import HospitalInfo from "./userMain/pages/HospitalInfo";
import Home from "./admin/pages/Home";
import AllUsersList from "./admin/pages/AllUsersList";
import PatientList from "./admin/pages/PatientList";
import DoctorList from "./admin/pages/DoctorList";


function App() {
    return (
        <BrowserRouter>
            <Routes>
               <Route path="/" element={<UserMain />} >
                    <Route index element={<MainPage />} />
                    <Route path="mediInfo" element={<DoctorInfo />} />
                    <Route path="department" element={<DepartmentInfo />} />
                    <Route path="hospitalInfo" element={<HospitalInfo />} />
                    <Route path="subcategory" element={<SubCategories />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/empLogin" element={<EmployLogin />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Home />} /> {/* 기본 페이지 */}
                    <Route path="all" element={<AllUsersList />} />
                    <Route path="patient" element={<PatientList />} />
                    <Route path="doctor" element={<DoctorList />} />
                </Route>
                {/*<Route path="/doctors" element={<Doctors />} />*/}
                {/*연동 안해놔서 임시로 그냥 화면에서 보려고 함*/}
                <Route path="/doctors/userStateChange" element={<UserStateChange />} />
                <Route path="/doctors/userClinicCheck" element={<UserClinicCheck />} />
                <Route path="/doctors/userReservationCheck" element={<UserReservationCheck />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;