import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

const RouteWithLayout = (props) => {
  const {
    layout: Layout,
    component: Component,
    needAuth,
    currentUser,
    ...rest
  } = props;

  return (
    <>
      <Route
        {...rest}
        render={(matchProps) => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
      {/* <NoMatch /> */}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(RouteWithLayout);
