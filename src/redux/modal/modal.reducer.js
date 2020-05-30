import ModalActionTypes from "./modal.types";

const INITIAL_STATE = {
  isOpenModalAddCategory: false,
  isOpenModalEditCategory: false,
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
    default:
      return state;
  }
};

export default shopReducer;
