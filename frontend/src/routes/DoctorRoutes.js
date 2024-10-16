import React from "react";
import { Route, Routes } from "react-router-dom";
import Doctors from "../doctorPage";
import UserStateChange from "../doctorPage/pages/UserStateChange";
import UserClinicCheck from "../doctorPage/pages/UserClinicCheck";
import UserReservationCheck from "../doctorPage/pages/UserReservationCheck";
<<<<<<< HEAD
import Home from "../doctorPage/pages/Home";
import UserManagement from "../doctorPage/pages/UserManagement";
import CertificateList from "../doctorPage/pages/CertificateList";
import Certificates from "../doctorPage/pages/Certificates";
=======
>>>>>>> main

function DoctorRoutes() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Doctors/>}>
        <Route index element={<Home/>}/>
        <Route path="/list" element={<UserManagement/>}/>
        <Route path="/clinic" element={<UserClinicCheck/>}/>
        <Route path="/reserv" element={<UserReservationCheck/>}/>
        <Route path="/state" element={<UserStateChange/>}/>
        <Route path="/certificateList" element={<CertificateList/>}/>
        <Route path="/certificate" element={<Certificates/>}/>
      </Route>
=======
    <Route path="/" element={<Doctors />}>
      <Route path="/s" element={<UserStateChange />} />
      <Route path="/a" element={<UserClinicCheck />} />
      <Route path="userReservationCheck" element={<UserReservationCheck />} />
    </Route>
>>>>>>> main
    </Routes>
  );
}

<<<<<<< HEAD
export default DoctorRoutes;
=======
export default DoctorRoutes;
>>>>>>> main
