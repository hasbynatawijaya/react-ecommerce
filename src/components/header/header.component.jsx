import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth } from "../../firebase/firebase.utils";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import Logo from "../../assets/puding/logo.jpeg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden, signOutStart }) => {
  const handleMenu = () => {
    const menu = [];

    if (auth.currentUser) {
      if (currentUser.role === "admin") {
        menu.push(<OptionLink to="/dashboard">Dashboard</OptionLink>);
      } else if (
        currentUser.role === "user" &&
        auth.currentUser.emailVerified
      ) {
        menu.push(<OptionLink to="/transaction">Transaksi</OptionLink>);
        menu.push(<OptionLink to="/me">Akun saya</OptionLink>);
      }
    }

    return menu;
  };

  const handleVerify = () => {
    const user = auth.currentUser;
    user
      .sendEmailVerification()
      .then(function () {
        alert("sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <HeaderContainer>
        <LogoContainer to="/">
          <img src={Logo} width={80} height={80} className="logo" />
        </LogoContainer>
        <OptionsContainer>
          <OptionLink to="/shop">Belanja</OptionLink>
          {handleMenu()}
          {currentUser ? (
            <OptionLink as="div" onClick={signOutStart}>
              Logout
            </OptionLink>
          ) : (
            <OptionLink to="/signin">Login</OptionLink>
          )}
          <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
        {/* <button onClick={handleVerify}>verify</button> */}
      </HeaderContainer>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
