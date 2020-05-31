import { createSelector } from "reselect";

const selectModal = (state) => state.modal;

export const selectModalAddCategory = createSelector(
  [selectModal],
  (modal) => modal.isOpenModalAddCategory
);

export const selectModalEditCategory = createSelector(
  [selectModal],
  (modal) => modal.isOpenModalEditCategory
);

export const selectModalAddProduct = createSelector(
  [selectModal],
  (modal) => modal.isOpenModalAddProduct
);

export const selectModalEditProduct = createSelector(
  [selectModal],
  (modal) => modal.isOpenModalEditProduct
);
