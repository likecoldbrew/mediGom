import React from "react";
import { Route } from "react-router-dom";
import Doctors from "../doctorPage";
import UserStateChange from "../doctorPage/pages/UserStateChange";
import UserClinicCheck from "../doctorPage/pages/UserClinicCheck";
import UserReservationCheck from "../doctorPage/pages/UserReservationCheck";

function DoctorRoutes() {
    return (
        <Route path="/doctors" element={<Doctors />}>
            <Route path="userStateChange" element={<UserStateChange />} />
            <Route path="userClinicCheck" element={<UserClinicCheck />} />
            <Route path="userReservationCheck" element={<UserReservationCheck />} />
        </Route>
    );
}

export default DoctorRoutes;
