import CheckoutActionTypes from "./checkout.types";

const INITIAL_STATE = {
  loading: false,
  errorMessage: "",
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.CHECKOUT_START:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default directoryReducer;
