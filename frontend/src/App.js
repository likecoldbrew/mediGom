import React from "react";
import SubCategories from "./userMain/components/SubCategory";
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./userMain/pages/Login";
import SignUpPage from "./userMain/pages/signUp";
import MainPage from "./userMain/pages/MainPage";
import Doctors from "./doctorPage";
import Admin from "./admin";
import DoctorInfo from "./userMain/pages/DoctorInfo";
import UserStateChange from "./doctorPage/pages/UserStateChange";
import UserClinicCheck from "./doctorPage/pages/UserClinicCheck";
import UserReservationCheck from "./doctorPage/pages/UserReservationCheck";
import EmployLogin from "./userMain/pages/employLogin";
import DepartmentInfo from "./userMain/pages/DepartmentInfo";
import UserMain from "./userMain/index";
import Payment from "./components/Payment";

import Home from "./admin/pages/Home";
import DetailContainer from "./admin/components/DetailContainer";
import ListContainer from "./admin/components/ListContainer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
               <Route path="/" element={<UserMain />} >
                    <Route index element={<MainPage />} />
                    <Route path="101" element={<DoctorInfo />} />
                    <Route path="102" element={<DepartmentInfo />} />
                    <Route path="subcategory" element={<SubCategories />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/empLogin" element={<EmployLogin />} />
                <Route path="/signUp" element={<SignUpPage />} />

                {/* 관리자 페이지 */}
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Home />} />
                    <Route path="list/:type" element={<ListContainer />} />
                    <Route path="users/:userNo" element={<DetailContainer />} />
                </Route>
                <Route path="/doctors" element={<Doctors />} />
                {/*연동 안해놔서 임시로 그냥 화면에서 보려고 함*/}
                <Route path="/doctors/userStateChange" element={<UserStateChange />} />
                <Route path="/doctors/userClinicCheck" element={<UserClinicCheck />} />
                <Route path="/doctors/userReservationCheck" element={<UserReservationCheck />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;