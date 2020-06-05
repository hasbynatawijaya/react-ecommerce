import CheckoutActionTypes from "./checkout.types";

export const checkoutStart = (data) => ({
  type: CheckoutActionTypes.CHECKOUT_START,
  payload: data,
});