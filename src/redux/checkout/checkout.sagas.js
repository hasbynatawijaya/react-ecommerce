import { takeLatest, call, put, all } from "redux-saga/effects";
import { storage } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";

import CheckoutActionTypes from "../checkout/checkout.types";
import { checkoutStart } from "./checkout.actions";

import { v4 as uuid } from "uuid";

export function* checkout({ payload }) {
  yield firestore.collection("transactions").doc(uuid()).set({
    items: [],
  });
}

export function* onCheckoutStart() {
  yield takeLatest(CheckoutActionTypes.CHECKOUT_START, checkout);
}

export function* checkoutSagas() {
  yield all([call(onCheckoutStart)]);
}
