import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Payment from "./components/Payment";

function App() {
  return (
    <BrowserRouter >
      <Routes>
      <AppRoutes />
      <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter >

  );
}

export default App;
