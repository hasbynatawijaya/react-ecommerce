import { createSelector } from "reselect";

const selectCheckout = (state) => state.checkout;

export const selectCheckoutData = createSelector(
  [selectCheckout],
  (checkout) => checkout.checkoutData
);

export const selectCheckoutDataByUserId = createSelector(
  [selectCheckout],
  (checkout) => checkout.checkoutDataByUserId
);
