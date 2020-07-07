import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectLoadingUserAddressAction = createSelector(
  [selectUser],
  (user) => user.loadingUserAddressAction
);

export const selectUserAddressById = createSelector(
  [selectUser],
  (user) => user.userAddressById
);