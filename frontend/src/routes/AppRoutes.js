import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import DoctorRoutes from "./DoctorRoutes";
import Payment from "../components/Payment";
import PrintDocument from "../components/PrintDocument";
import Chatting from "../components/Chatting";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/document" element={<PrintDocument />} />
      <Route path="/chatting" element={<Chatting />} />
    </Routes>
  );
}

export default AppRoutes;
