import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";  

const DashboardLayout = () => {
  return (
    <div className="layout-wrapper">
      <Sidebar />

      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
