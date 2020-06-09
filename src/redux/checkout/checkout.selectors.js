import { createSelector } from "reselect";

const selectCheckout = (state) => state.checkout;

export const selectLoadingCheckoutAction = createSelector(
  [selectCheckout],
  (checkout) => checkout.loadingCheckoutAction
);

export const selectCheckoutData = createSelector(
  [selectCheckout],
  (checkout) => checkout.checkoutData
);

export const selectCheckoutDataByUserId = createSelector(
  [selectCheckout],
  (checkout) => checkout.checkoutDataByUserId
);
