import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import DoctorRoutes from "./DoctorRoutes";
import Payment from "../components/Payment";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/*" element={<AdminRoutes />} />
      <Route path="/*" element={<DoctorRoutes />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default AppRoutes;
