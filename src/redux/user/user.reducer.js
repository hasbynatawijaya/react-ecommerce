import UserActionTypes from "./user.types";
import { getAddressById } from "./user.utils";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  loadingUserAddressAction: false,
  userAddressById: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.LOADING_USER_ADDRESS_ACTION:
      return {
        ...state,
        loadingUserAddressAction: action.payload,
      };
    case UserActionTypes.GET_USER_ADDRESS_BY_ID:
      return {
        ...state,
        userAddressById: getAddressById(state.currentUser, action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
