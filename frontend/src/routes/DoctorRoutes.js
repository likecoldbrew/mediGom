import React from "react";
import { Route, Routes } from "react-router-dom";
import Doctors from "../doctorPage";
import UserStateChange from "../doctorPage/pages/UserStateChange";
import UserClinicCheck from "../doctorPage/pages/UserClinicCheck";
import UserReservationCheck from "../doctorPage/pages/UserReservationCheck";
import Home from "../doctorPage/pages/Home";
import UserManagement from "../doctorPage/pages/UserManagement";
import CertificateList from "../doctorPage/pages/CertificateList";
import Certificates from "../doctorPage/pages/Certificates";
import MyPage from "../doctorPage/pages/MyPage";
import ChangeDepartment from "../doctorPage/pages/ChangeDepartment";
import HospitalApplication from "../doctorPage/pages/HospitalApplication";
import HospitalListOrChange from "../doctorPage/pages/HospitalListOrChange";


function DoctorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Doctors />}>
        <Route index element={<Home />} />
        <Route path="/list/:userNo" element={<UserManagement />} />
        <Route path="/clinic/:doctorNo/:userNo" element={<UserClinicCheck />} />
        <Route path="/reserv/:doctorNo" element={<UserReservationCheck />} />
        <Route path="/state" element={<UserStateChange />} />
        <Route path="/depart" element={<ChangeDepartment />} />
        <Route path="/certificateList/:userNo" element={<CertificateList />} />
        <Route path="/certificate" element={<Certificates />} />
        <Route path="/hospiapp/:userNo" element={<HospitalApplication />} />
        <Route path="/hospi/:userNo" element={<HospitalListOrChange />} />
        <Route path="/my/:userNo" element={<MyPage />} />
      </Route>

    </Routes>
  );
}

export default DoctorRoutes;

