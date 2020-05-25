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
        <DashboardMenuItem onClick={() => history.push(`${match.path}`)}>
          Dashboard
        </DashboardMenuItem>
        <DashboardMenuItem onClick={() => history.push(`/dashboard/category`)}>
          Kategori Produk
        </DashboardMenuItem>
      </DashboardMenuContainer>
      {/* <div>
        <Switch>
          <Route exact path={`${match.path}`} render={() => "Statistik"} />
          <Route
            exact
            path={`${match.path}/:collectionId`}
            render={() => "uhuy"}
          />
        </Switch>
      </div> */}
    </div>
  );
};

export default withRouter(DashboardMenu);
