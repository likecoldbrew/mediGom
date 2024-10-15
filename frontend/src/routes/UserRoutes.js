import React from "react";
import { Route, Routes } from "react-router-dom"; // Routes도 import
import UserMain from "../userMain/index";
import MainPage from "../userMain/pages/MainPage";
import DoctorInfo from "../userMain/pages/DoctorInfo";
import DepartmentInfo from "../userMain/pages/DepartmentInfo";
import SubCategories from "../userMain/components/SubCategory";
import LoginPage from "../userMain/pages/Login";
import EmployLogin from "../userMain/pages/employLogin";
import SignUpPage from "../userMain/pages/signUp";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserMain />}>
        <Route index element={<MainPage />} />
        <Route path="101" element={<DoctorInfo />} />
        <Route path="102" element={<DepartmentInfo />} />
        <Route path="subcategory" element={<SubCategories />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/empLogin" element={<EmployLogin />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  );
}

export default UserRoutes;
