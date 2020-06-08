import React from "react";
import {
  DashboardMenuContainer,
  DashboardMenuItem,
} from "./dashboard-menu.styles";

import { withRouter, Route, Switch } from "react-router-dom";

const DashboardMenu = ({ history, match }) => {
  return (
    <div>
      <DashboardMenuContainer>
        <DashboardMenuItem onClick={() => history.push(`/dashboard`)}>
          Dashboard
        </DashboardMenuItem>
        <DashboardMenuItem onClick={() => history.push(`/dashboard/category`)}>
          Kategori Produk
        </DashboardMenuItem>
        <DashboardMenuItem onClick={() => history.push(`/dashboard/product`)}>
          Data Produk
        </DashboardMenuItem>
        <DashboardMenuItem
          onClick={() => history.push(`/dashboard/transaction`)}
        >
          Data Transaksi
        </DashboardMenuItem>
      </DashboardMenuContainer>
    </div>
  );
};

export default withRouter(DashboardMenu);
