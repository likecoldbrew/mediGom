import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../admin";
import Home from "../admin/pages/Home";
import ListContainer from "../admin/components/ListContainer";
import DetailContainer from "../admin/components/DetailContainer";

function AdminRoutes() {
  return (
    <Routes>
    <Route path="/admin" element={<Admin />}>
      <Route index element={<Home />} />
      <Route path="list/:type" element={<ListContainer />} />
      <Route path="users/:userNo" element={<DetailContainer />} />
    </Route>
    </Routes>
  );
}

export default AdminRoutes;
