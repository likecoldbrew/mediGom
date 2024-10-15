import React from "react";
import { Routes, Route  } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import DoctorRoutes from "./DoctorRoutes";
import Payment from "../components/Payment";

function AppRoutes() {
  return (
    <Routes>
      <UserRoutes />
      <AdminRoutes />
      <DoctorRoutes />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default AppRoutes;
