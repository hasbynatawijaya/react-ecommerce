import ShippingActionTypes from "./shipping.types";

const INITIAL_STATE = {
  province: [],
  city: [],
  shippingCost: [],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShippingActionTypes.FETCH_CITY_SUCCESS:
      return {
        ...state,
        city: action.payload,
      };
    case ShippingActionTypes.FETCH_PROVINCE_SUCCESS:
      return {
        ...state,
        province: action.payload,
      };
    case ShippingActionTypes.FETCH_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        shippingCost: action.payload,
      };
    default:
      return state;
  }
};

export default directoryReducer;
