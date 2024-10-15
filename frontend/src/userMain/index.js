import Header from "./components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function userMain() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="z-50">
        <Header />
      </div>
      <div className="bg-sky-50 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default userMain;
