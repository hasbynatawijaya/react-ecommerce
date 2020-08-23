import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

import ShippingActionTypes from "../shipping/shipping.types";

import {
  fetchCityStart,
  fetchCitySuccess,
  fetchProvinceStart,
  fetchProvinceSuccess,
  fetchShippingCostStart,
  fetchShippingCostSuccess,
} from "./shipping.actions";

const instance = axios.create({
  baseURL: "/starter/",
  //   timeout: 10000,
  headers: { key: "b826d90eba7378d6039ea64e996f11fc" },
});

export function* fetchCity({ payload: provinceId }) {
  try {
    const res = yield instance.get(`city?province=${provinceId}`);

    yield put(fetchCitySuccess(res.data.rajaongkir.results));
  } catch (error) {}
}

export function* fetchProvince() {
  try {
    const res = yield instance.get("province");

    yield put(fetchProvinceSuccess(res.data.rajaongkir.results));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchShippingCost({ payload: data }) {
  try {
    const res = yield instance.post("cost", data);

    yield put(fetchShippingCostSuccess(res.data.rajaongkir.results[0].costs));
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchCityStart() {
  yield takeLatest(ShippingActionTypes.FETCH_CITY_START, fetchCity);
}

export function* onFetchProvinceStart() {
  yield takeLatest(ShippingActionTypes.FETCH_PROVINCE_START, fetchProvince);
}

export function* onFetchShippingCostStart() {
  yield takeLatest(
    ShippingActionTypes.FETCH_SHIPPING_COST_START,
    fetchShippingCost
  );
}

export function* shippingSagas() {
  yield all([
    call(onFetchCityStart),
    call(onFetchProvinceStart),
    call(onFetchShippingCostStart),
  ]);
}
