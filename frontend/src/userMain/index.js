import SubCategories from "./components/SubCategory";
import Header from "./components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function userMain() {
  return (
    <div>
      <Header />
      <div className="bg-sky-50">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default userMain;
