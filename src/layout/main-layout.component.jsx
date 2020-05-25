import React from "react";
import Header from "../components/header/header.component";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
