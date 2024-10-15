import React from "react";
import { Route, Routes } from "react-router-dom";
import UserMain from "../userMain/index";
import MainPage from "../userMain/pages/MainPage";
import DoctorInfo from "../userMain/pages/DoctorInfo";
import DepartmentInfo from "../userMain/pages/DepartmentInfo";
import SubCategories from "../userMain/components/SubCategory";
import LoginPage from "../userMain/pages/Login";
import EmployLogin from "../userMain/pages/employLogin";
import SignUpPage from "../userMain/pages/signUp";
import BoardContainer from "../userMain/pages/list/BoardContainer";
import CategoryContainer from "../userMain/pages/list/CategoryContainer";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserMain />}>
        <Route index element={<MainPage />} />
        <Route path="board/:boardId" element={<BoardContainer />} />
        <Route path="board/:action/:boardId" element={<BoardContainer />} />
        <Route path=":urlName/:page?" element={<CategoryContainer />} />
        <Route
          path=":urlName/:action?/:page?"
          element={<CategoryContainer />}
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/empLogin" element={<EmployLogin />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  );
}

export default UserRoutes;
