import React from "react";
import DashboardMenu from "../components/dashboard-menu/dashboard-menu-component";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardMenu />
      {children}
    </div>
  );
};

export default DashboardLayout;
