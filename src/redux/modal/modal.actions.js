import ModalActionTypes from "./modal.types";

export const modalAddCategory = () => ({
  type: ModalActionTypes.IS_OPEN_ADD_CATEGORY,
});

export const modalEditCategory = () => ({
  type: ModalActionTypes.IS_OPEN_EDIT_CATEGORY,
});
