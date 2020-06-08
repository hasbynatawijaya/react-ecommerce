import CheckoutActionTypes from "./checkout.types";

const INITIAL_STATE = {
  loading: false,
  errorMessage: "",
  checkoutData: [],
  checkoutDataByUserId: [],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.CHECKOUT_START:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case CheckoutActionTypes.FETCH_CHECKOUT_DATA_SUCCESS:
      return {
        ...state,
        checkoutData: action.payload,
      };
    case CheckoutActionTypes.FETCH_CHECKOUT_DATA_BY_USER_ID_SUCCESS:
      return {
        ...state,
        checkoutDataByUserId: action.payload,
      };
    default:
      return state;
  }
};

export default directoryReducer;
