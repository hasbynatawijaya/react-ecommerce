import { takeLatest, call, put, all } from "redux-saga/effects";
import { storage } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";

import CheckoutActionTypes from "./checkout.types";

import {
  fetchCheckoutDataSuccess,
  fetchCheckoutByUserIdSuccess,
} from "./checkout.actions";

import { v4 as uuid } from "uuid";

export function* checkout({ payload }) {
  try {
    console.log(payload);
    yield firestore.collection("transactions").doc(uuid()).set(payload);
  } catch (error) {
    console.log(error);
  }
}

export function* fetchCheckoutData() {
  try {
    const collectionRef = firestore.collection("transactions");
    const snapshot = yield collectionRef.get();

    const snapshotMap = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    yield put(fetchCheckoutDataSuccess(snapshotMap));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchCheckoutDataByUserId({ payload }) {
  try {
    const collectionRef = firestore
      .collection("transactions")
      .where("userId", "==", payload);

    const snapshot = yield collectionRef.get();

    const snapshotMap = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    yield put(fetchCheckoutByUserIdSuccess(snapshotMap));
  } catch (error) {
    console.log(error);
  }
}

export function* uploadTransferProof({ payload }) {
  const { transactionId, imageAsFile } = payload;

  try {
    const storageRef = storage.ref();
    const transferProofImageRef = storageRef.child(
      `transferProofImages/${transactionId}`
    );

    yield transferProofImageRef.put(imageAsFile);
    const transferPhotoImageUrl = yield transferProofImageRef.getDownloadURL();

    const transcationRef = firestore
      .collection("transactions")
      .doc(transactionId);

    yield transcationRef.set(
      {
        transferPhotoImageUrl,
        status: "paid",
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}

export function* submitServiceNumber({ payload }) {
  const { transactionId, serviceNumberValue } = payload;

  try {
    const transcationRef = firestore
      .collection("transactions")
      .doc(transactionId);

    yield transcationRef.set(
      {
        serviceNumber: serviceNumberValue,
        status: "accepted",
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}

export function* onCheckoutStart() {
  yield takeLatest(CheckoutActionTypes.CHECKOUT_START, checkout);
}

export function* onFetchCheckoutDataStart() {
  yield takeLatest(
    CheckoutActionTypes.FETCH_CHECKOUT_DATA_START,
    fetchCheckoutData
  );
}

export function* onFetchCheckoutDataByUserIdStart() {
  yield takeLatest(
    CheckoutActionTypes.FETCH_CHECKOUT_DATA_BY_USER_ID_START,
    fetchCheckoutDataByUserId
  );
}

export function* onUploadTransferProofImage() {
  yield takeLatest(
    CheckoutActionTypes.UPLOAD_TRANSFER_PROOF_START,
    uploadTransferProof
  );
}

export function* onSubmitServiceNumberStart() {
  yield takeLatest(
    CheckoutActionTypes.SUBMIT_SERVICE_NUMBER_START,
    submitServiceNumber
  );
}

export function* checkoutSagas() {
  yield all([
    call(onCheckoutStart),
    call(onFetchCheckoutDataStart),
    call(onFetchCheckoutDataByUserIdStart),
    call(onUploadTransferProofImage),
    call(onSubmitServiceNumberStart),
  ]);
}
