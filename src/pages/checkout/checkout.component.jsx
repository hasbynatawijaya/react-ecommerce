import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CheckoutForm from "../../components/checkout-form/checkout-form.components";

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
  TotalContainer,
} from "./checkout.styles";

const CheckoutPage = ({ cartItems, total, checkoutStart, totalWeight }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Berat</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <CheckoutForm
      totalWeight={totalWeight}
      totalPrice={total}
      items={cartItems}
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
