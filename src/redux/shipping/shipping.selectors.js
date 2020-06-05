import { createSelector } from "reselect";

const selectShipping = (state) => state.shipping;

export const selectProvince = createSelector(
  [selectShipping],
  (shipping) => shipping.province
);
