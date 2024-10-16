import React from "react";
import { Route, Routes } from "react-router-dom";
import UserMain from "../userMain/index";
import MainPage from "../userMain/pages/MainPage";
import LoginPage from "../userMain/pages/Login";
import EmployLogin from "../userMain/pages/employLogin";
import SignUpPage from "../userMain/pages/signUp";
import CategoryContainer from "../userMain/pages/list/CategoryContainer";

function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserMain />}>
          <Route index element={<MainPage />} />
          <Route
            path=":urlName/:action?/:page?"
            element={<CategoryContainer />}
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/empLogin" element={<EmployLogin />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default UserRoutes;
