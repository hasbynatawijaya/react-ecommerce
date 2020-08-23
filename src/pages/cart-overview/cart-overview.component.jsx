import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CartOverviewItem from "../../components/cart-overview-item/cart-overview-item.component";
import Button from "../../components/custom-button/custom-button.component";

import { checkoutStart } from "../../redux/checkout/checkout.actions";

import {
  selectCartItems,
  selectCartTotal,
  selectCartTotalWeight,
} from "../../redux/cart/cart.selectors";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  ButtonCheckoutContainer,
  EmptyCartContainer,
} from "./cart-overview.styles";

const CartOverviewPage = ({
  cartItems,
  total,
  checkoutStart,
  totalWeight,
  history,
}) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Produk</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Deskripsi</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Berat</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Jumlah</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Harga</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Hapus</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.length > 0 ? (
      cartItems.map((cartItem) => (
        <CartOverviewItem key={cartItem.id} cartItem={cartItem} />
      ))
    ) : (
      <EmptyCartContainer>
        <div> Anda tidak memiliki item apapun </div>
      </EmptyCartContainer>
    )}
    <ButtonCheckoutContainer>
      <Button
        disabled={cartItems.length === 0}
        onClick={() => history.push("/checkout")}
        style={{ cursor: cartItems.length === 0 && "not-allowed" }}
      >
        Beli
      </Button>
    </ButtonCheckoutContainer>
  </CheckoutPageContainer>
);

const mapDispatchToProps = (dispatch) => ({
  checkoutStart: () => dispatch(checkoutStart()),
});

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  totalWeight: selectCartTotalWeight,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartOverviewPage)
);
