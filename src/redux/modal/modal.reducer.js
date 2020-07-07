import ModalActionTypes from "./modal.types";

const INITIAL_STATE = {
  isOpenModalAddCategory: false,
  isOpenModalEditCategory: false,
  isOpenModalAddProduct: false,
  isOpenModalEditProduct: false,
  isOpenModalUploadTransferProof: false,
  isOpenModalServiceNumber: false,
  isOpenModalAddAddress: false,
  isOpenModalEditAddress: false,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalActionTypes.IS_OPEN_ADD_CATEGORY:
      return {
        ...state,
        isOpenModalAddCategory: !state.isOpenModalAddCategory,
      };
    case ModalActionTypes.IS_OPEN_EDIT_CATEGORY:
      return {
        ...state,
        isOpenModalEditCategory: !state.isOpenModalEditCategory,
      };
    case ModalActionTypes.IS_OPEN_ADD_PRODUCT:
      return {
        ...state,
        isOpenModalAddProduct: !state.isOpenModalAddProduct,
      };
    case ModalActionTypes.IS_OPEN_EDIT_PRODUCT:
      return {
        ...state,
        isOpenModalEditProduct: !state.isOpenModalEditProduct,
      };
    case ModalActionTypes.IS_OPEN_MODAL_UPLOAD_TRANSFER_PROOF:
      return {
        ...state,
        isOpenModalUploadTransferProof: !state.isOpenModalUploadTransferProof,
      };
    case ModalActionTypes.IS_OPEN_MODAL_SERVICE_NUMBER:
      return {
        ...state,
        isOpenModalServiceNumber: !state.isOpenModalServiceNumber,
      };
    case ModalActionTypes.IS_OPEN_MODAL_ADD_ADDRESS:
      return {
        ...state,
        isOpenModalAddAddress: !state.isOpenModalAddAddress,
      };
    case ModalActionTypes.IS_OPEN_MODAL_EDIT_ADDRESS:
      return {
        ...state,
        isOpenModalEditAddress: !state.isOpenModalEditAddress,
      };
    default:
      return state;
  }
};

export default shopReducer;
