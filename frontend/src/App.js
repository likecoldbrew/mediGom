import React from "react";
import SubCategories from "./userMain/components/SubCategory";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./userMain/pages/Login";
import SignUpPage from "./userMain/pages/signUp";
import MainPage from "./userMain/pages/MainPage";
// import Doctors from "./DoctorPage";
import Admin from "./admin";
import DoctorInfo from "./userMain/pages/DoctorInfo";
// import UserStateChange from "./DoctorPage/pages/UserStateChange";
// import UserClinicCheck from "./DoctorPage/pages/UserClinicCheck";
// import UserReservationCheck from "./DoctorPage/pages/UserReservationCheck";
import EmployLogin from "./userMain/pages/employLogin";
import AdminHome from "./admin/pages/Home";
// import DoctorHome from "./DoctorPage/pages/Home";
import DepartmentInfo from "./userMain/pages/DepartmentInfo";
import UserMain from "./userMain/index";
import Payment from "./components/Payment";
import HospitalInfo from "./userMain/pages/HospitalInfo";
// import UserManagement from "./DoctorPage/pages/UserManagement";
// import CertificateList from "./DoctorPage/pages/CertificateList";
// import Certificates from "./DoctorPage/pages/Certificates";
import AllUsersList from "./admin/pages/list/AllUsersList";
import PatientList from "./admin/pages/list/PatientList";
import DoctorList from "./admin/pages/list/DoctorList";
import AdminList from "./admin/pages/list/AdminList";
import Community from "./userMain/pages/Community";
import CommunityDetail from "./userMain/pages/CommunityDetail";
import BoardRegist from "./userMain/pages/BoardRegist";
import BoardUpdate from "./userMain/pages/BoardUpdate";
import Faq from "./userMain/pages/Faq";
import CategoryContainer from "./userMain/container/CategoryContainer";
import BoardContainer from "./userMain/container/BoardContainer";

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminHome />} /> {/* 기본 페이지 */}
          <Route path="all" element={<AllUsersList />} />
          <Route path="patient" element={<PatientList />} />
          <Route path="doctor" element={<DoctorList />} />
          <Route path="admin" element={<AdminList />} />
        </Route>
        {/*<Route path="/doctor" element={<Doctors />}>*/}
        {/*  <Route index element={<DoctorHome />} />*/}
        {/*  <Route path="list" element={<UserManagement />} />*/}
        {/*  <Route path="clinic" element={<UserClinicCheck />} />*/}
        {/*  <Route path="reserv" element={<UserReservationCheck />} />*/}
        {/*  <Route path="state" element={<UserStateChange />} />*/}
        {/*  <Route path="certificateList" element={<CertificateList />} />*/}
        {/*  <Route path="certificate" element={<Certificates />} />*/}
        {/*</Route>*/}
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
