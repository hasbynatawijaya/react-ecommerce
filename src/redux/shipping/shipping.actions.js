import ShippingActionTypes from "./shipping.types";

export const fetchCityStart = (provinceId) => ({
  type: ShippingActionTypes.FETCH_CITY_START,
  payload: provinceId,
});

export const fetchCitySuccess = (city) => ({
  type: ShippingActionTypes.FETCH_CITY_SUCCESS,
  payload: city,
});

export const fetchProvinceStart = (cityId) => ({
  type: ShippingActionTypes.FETCH_PROVINCE_START,
  payload: cityId,
});

export const fetchProvinceSuccess = (province) => ({
  type: ShippingActionTypes.FETCH_PROVINCE_SUCCESS,
  payload: province,
});

export const fetchShippingCostStart = (data) => ({
  type: ShippingActionTypes.FETCH_SHIPPING_COST_START,
  payload: data,
});

export const fetchShippingCostSuccess = (shippingCost) => ({
  type: ShippingActionTypes.FETCH_SHIPPING_COST_SUCCESS,
  payload: shippingCost,
});
