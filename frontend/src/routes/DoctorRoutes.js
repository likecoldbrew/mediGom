import React from "react";
import { Route, Routes } from "react-router-dom";
import Doctors from "../doctorPage";
import UserStateChange from "../doctorPage/pages/UserStateChange";
import UserClinicCheck from "../doctorPage/pages/UserClinicCheck";
import UserReservationCheck from "../doctorPage/pages/UserReservationCheck";

function DoctorRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Doctors />}>
      <Route path="/s" element={<UserStateChange />} />
      <Route path="/a" element={<UserClinicCheck />} />
      <Route path="userReservationCheck" element={<UserReservationCheck />} />
    </Route>
    </Routes>
  );
}

export default DoctorRoutes;
