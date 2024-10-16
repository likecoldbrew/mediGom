import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../admin";
import ListContainer from "../admin/components/ListContainer";
import DetailContainer from "../admin/components/DetailContainer";

function AdminRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Admin />}>
      <Route path="list/:type" element={<ListContainer />} />
      <Route path="users/:userNo" element={<DetailContainer />} />
    </Route>
    </Routes>
  );
}

export default AdminRoutes;
