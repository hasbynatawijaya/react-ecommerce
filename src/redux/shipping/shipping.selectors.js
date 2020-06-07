import { createSelector } from "reselect";

const selectShipping = (state) => state.shipping;

export const selectProvince = createSelector(
  [selectShipping],
  (shipping) => shipping.province
);

export const selectCity = createSelector(
  [selectShipping],
  (shipping) => shipping.city
);

export const selectShippingCost = createSelector(
  [selectShipping],
  (shipping) => shipping.shippingCost
);
