import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ logout }) => {
  return (
    <>
      <Navbar logout={logout} />
      <Outlet />
    </>
  );
};

export default MainLayout;
