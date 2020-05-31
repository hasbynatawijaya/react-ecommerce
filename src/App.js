import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import RouteWithLayout from "./components/route-with-layout/route-with-layout.component";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { checkUserSession } from "./redux/user/user.actions";

import { selectCurrentUser } from "./redux/user/user.selectors";

import MainLayout from "./layout/main-layout.component";
import DashboardLayout from "./layout/dashboard-layout.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import AddProduct from "./components/add-product/add-product.component";
import Category from "./pages/category/category.component";
import MasterProductPages from "./pages/master-product/master-product.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div>
        <Switch>
          <RouteWithLayout
            exact
            path="/"
            component={HomePage}
            layout={MainLayout}
          />
          <RouteWithLayout
            path="/shop"
            component={ShopPage}
            layout={MainLayout}
          />
          <RouteWithLayout
            exact
            path="/checkout"
            component={CheckoutPage}
            layout={MainLayout}
          />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <RouteWithLayout
            exact
            path="/dashboard"
            component={Dashboard}
            layout={DashboardLayout}
          />
          <RouteWithLayout
            exact
            path="/dashboard/product/add"
            component={AddProduct}
            layout={DashboardLayout}
          />
          <RouteWithLayout
            exact
            path="/dashboard/category"
            component={Category}
            layout={DashboardLayout}
          />
          <RouteWithLayout
            exact
            path="/dashboard/product"
            component={MasterProductPages}
            layout={DashboardLayout}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
