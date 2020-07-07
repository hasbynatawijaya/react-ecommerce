import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

import "./App.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import UserTransactionPage from "./pages/user-transaction/user-transaction.component";

import { checkUserSession } from "./redux/user/user.actions";

import { selectCurrentUser } from "./redux/user/user.selectors";

import RouteWithLayout from "./components/route-with-layout/route-with-layout.component";
import MainLayout from "./layout/main-layout.component";
import DashboardLayout from "./layout/dashboard-layout.component";

import Dashboard from "./pages/dashboard/dashboard.component";
import AddProduct from "./components/add-product/add-product.component";
import Category from "./pages/category/category.component";
import MasterProductPages from "./pages/master-product/master-product.component";
import Transaction from "./pages/transaction/transaction.component";
import CheckoutComplete from "./pages/checkout-complete/checkout-complete.component";
import MyAccount from "./pages/my-account/my-account.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    const authRoute = (
      <>
        <RouteWithLayout
          exact
          path="/checkout"
          component={CheckoutPage}
          layout={MainLayout}
          needAuth
        />
        <RouteWithLayout
          exact
          path="/checkout/complete"
          component={CheckoutComplete}
          layout={MainLayout}
          needAuth
        />
        <RouteWithLayout
          exact
          path="/dashboard"
          component={Dashboard}
          layout={DashboardLayout}
          needAuth
        />
        <RouteWithLayout
          exact
          path="/dashboard/product/add"
          component={AddProduct}
          layout={DashboardLayout}
          needAuth
        />
        <RouteWithLayout
          exact
          path="/dashboard/category"
          component={Category}
          layout={DashboardLayout}
          needAuth
        />
        <RouteWithLayout
          exact
          path="/dashboard/product"
          component={MasterProductPages}
          layout={DashboardLayout}
          needAuth
        />
        <RouteWithLayout
          exact
          path="/dashboard/transaction"
          component={Transaction}
          layout={DashboardLayout}
          needAuth
        />
        <RouteWithLayout
          exact
          path="/me"
          component={MyAccount}
          layout={MainLayout}
          needAuth
        />
      </>
    );

    return (
      <Container maxWidth="lg">
        <ThemeProvider>
          <CssBaseline />
          <Switch>
            <RouteWithLayout
              exact
              path="/"
              component={HomePage}
              layout={MainLayout}
              needAuth={false}
            />
            <RouteWithLayout
              path="/shop"
              component={ShopPage}
              layout={MainLayout}
              needAuth={false}
            />
            <RouteWithLayout
              exact
              path="/transaction"
              component={UserTransactionPage}
              layout={MainLayout}
              needAuth={false}
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
              needAuth={false}
            />
            {this.props.currentUser !== null && authRoute}
          </Switch>
        </ThemeProvider>
      </Container>
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
