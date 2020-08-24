import React from "react";
import DashboardMenu from "../components/dashboard-menu/dashboard-menu-component";
import Header from "../components/header/header.component";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <DashboardMenu />
      {children}
    </div>
  );
};

export default DashboardLayout;
