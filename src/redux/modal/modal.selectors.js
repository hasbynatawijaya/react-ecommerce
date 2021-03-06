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

export const selectModalUploadTransferProof = createSelector(
  [selectModal],
  (modal) => modal.isOpenModalUploadTransferProof
);

export const selectModalServiceNumber = createSelector(
  [selectModal],
  (modal) => modal.isOpenModalServiceNumber
);

export const selectModalAddAddress = createSelector(
  [selectModal],
  (modal) => modal.isOpenModalAddAddress
);

export const selectModalEditAddress = createSelector(
  [selectModal],
  (modal) => modal.isOpenModalEditAddress
);
