import React, { useEffect, useState } from "react";
import SubCategories from "./userMain/components/SubCategory";
import axios from "axios";
import "./index.css";
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
import AdminHome from "./admin/pages/Home";
import DoctorHome from "./doctorPage/pages/Home"
import DepartmentInfo from "./userMain/pages/DepartmentInfo";
import UserMain from "./userMain/index";
import Payment from "./components/Payment";
import HospitalInfo from "./userMain/pages/HospitalInfo";
import UserManagement from "./doctorPage/pages/UserManagement";
import CertificateList from "./doctorPage/pages/CertificateList";
import Certificates from "./doctorPage/pages/Certificates";
import AllUsersList from "./admin/pages/list/AllUsersList";
import PatientList from "./admin/pages/list/PatientList";
import DoctorList from "./admin/pages/list/DoctorList";
import AdminList from "./admin/pages/list/AdminList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserMain />}>
          <Route index element={<MainPage />} />
          <Route path="101" element={<DoctorInfo />} />
          <Route path="102" element={<DepartmentInfo />} />
          <Route path="103" element={<HospitalInfo />} />
          <Route path="subcategory" element={<SubCategories />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/empLogin" element={<EmployLogin />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminHome />} /> {/* 기본 페이지 */}
          <Route path="all" element={<AllUsersList />} />
          <Route path="patient" element={<PatientList />} />
          <Route path="doctor" element={<DoctorList />} />
          <Route path="admin" element={<AdminList />} />
        </Route>
        <Route path="/doctor" element={<Doctors />}>
          <Route index element={<DoctorHome />} />
          <Route path="list" element={<UserManagement />} />
          <Route path="clinic" element={<UserClinicCheck />} />
          <Route path="reserv" element={<UserReservationCheck />} />
          <Route path="state" element={<UserStateChange />} />
          <Route path="certificateList" element={<CertificateList />} />
          <Route path="certificate" element={<Certificates />} />
        </Route>
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
