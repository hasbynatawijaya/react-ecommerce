import { takeLatest, call, put, all } from "redux-saga/effects";
import { storage } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";
import { toastr } from "react-redux-toastr";
import moment from "moment";

import CheckoutActionTypes from "./checkout.types";

import {
  fetchCheckoutDataSuccess,
  fetchCheckoutByUserIdSuccess,
  loadingCheckoutAction,
  fetchCheckoutDataStart,
  fetchCheckoutByUserIdStart,
} from "./checkout.actions";

import {
  modalUploadTransferProof,
  modalUploadServiceNumber,
} from "../modal/modal.actions";

import { clearCart } from "../cart/cart.actions";

import { v4 as uuid } from "uuid";

export function* checkout({ payload }) {
  try {
    yield put(loadingCheckoutAction(true));
    yield firestore.collection("transactions").doc(uuid()).set(payload);
    yield put(loadingCheckoutAction(false));
    yield toastr.success("Sukses", "Berhasil membuat pesanan");
    yield put(clearCart());

    // send email
    window.emailjs.send("gmail", "create_order", {
      user_email: payload.email,
      subject: "Pesanan anda berhasil dibuat",
      user_name: payload.name,
      title: "Pesanan anda berhasil dibuat",
      reason: "Dengan nominal sebesar",
      total_price: `Rp.${payload.totalPrice}`,
      make_payment: "Silahkan lakukan pembayaran ke nomor rekening:",
      bank_account_name: "Bank Central Asia (BCA)",
      bank_account_number: "0841778388",
      message_footer:
        "Setelah melakukan pembayaran harap upload bukti transfer di halaman transaksi agar pesanan dapat kami proses",
    });

    setTimeout(() => {
      window.location.replace("/checkout/complete");
    }, 1000);
  } catch (error) {
    yield put(loadingCheckoutAction(false));
    console.log(error);
  }
}

export function* fetchCheckoutData({ payload }) {
  try {
    let collectionRef;

    if (payload) {
      const { date, status } = payload;

      const from = new Date(moment(date[0]).startOf("day").toString());
      const to = new Date(moment(date[1]).startOf("day").toString());

      if (status === "choose") {
        collectionRef = firestore
          .collection("transactions")
          .where("createdAt", ">=", from)
          .where("createdAt", "<=", to);
      } else {
        collectionRef = firestore
          .collection("transactions")
          .where("status", "==", status)
          .where("createdAt", ">=", from)
          .where("createdAt", "<=", to);
      }
    } else {
      collectionRef = firestore.collection("transactions");
    }

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
  const { userId, status, date } = payload;

  const from = new Date(moment(date[0]).startOf("day").toString());
  const to = new Date(moment(date[1]).startOf("day").toString());

  try {
    let collectionRef;

    if (payload.status === "choose") {
      collectionRef = firestore
        .collection("transactions")
        .where("userId", "==", userId)
        .where("createdAt", ">=", from)
        .where("createdAt", "<=", to);
    } else {
      collectionRef = firestore
        .collection("transactions")
        .where("userId", "==", userId)
        .where("createdAt", ">=", from)
        .where("createdAt", "<=", to)
        .where("status", "==", status);
    }

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
  const { transactionId, imageAsFile, userId, status, date } = payload;

  yield put(loadingCheckoutAction(true));

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
    yield put(loadingCheckoutAction(false));
    yield toastr.success("Sukses", "Upload bukti transfer");
    yield put(modalUploadTransferProof());
    yield put(fetchCheckoutByUserIdStart({ userId, status, date }));
  } catch (error) {
    yield put(loadingCheckoutAction(false));
    yield toastr.success("Sukses", error);
  }
}

export function* submitServiceNumber({ payload }) {
  const { transactionId, serviceNumberValue, status, date, detail } = payload;
  console.log(payload);
  try {
    yield put(loadingCheckoutAction(true));

    const transcationRef = firestore
      .collection("transactions")
      .doc(transactionId);

    const transactionSnapshot = yield transcationRef.get();
    const transactionItems = yield transactionSnapshot.data().items;

    yield transcationRef.set(
      {
        serviceNumber: serviceNumberValue,
        status: "accepted",
      },
      { merge: true }
    );

    yield put(loadingCheckoutAction(false));
    yield toastr.success("Sukses", "Upload isi nomor resi");
    yield put(modalUploadServiceNumber());
    yield put(fetchCheckoutDataStart({ status, date }));

    //update stock
    const ref = firestore
      .collection("collections")
      .doc("f3993978-178a-4141-b54b-61a55b4f444c");
    const snapshot = yield ref.get();

    const collectionItems = yield snapshot.data().items;

    const updatedCollectionItems = [...collectionItems];

    for (let i = 0; i < updatedCollectionItems.length; i++) {
      const currentCollection = updatedCollectionItems[i];

      const matchedIndex = transactionItems.findIndex((i) => {
        return i.id === currentCollection.id;
      });

      if (matchedIndex >= 0) {
        updatedCollectionItems[i].stock =
          +updatedCollectionItems[matchedIndex].stock -
          transactionItems[matchedIndex].quantity;
      }
    }

    yield ref.update({
      items: updatedCollectionItems,
    });

    //SEND EMAIL
    window.emailjs.send("gmail", "create_order", {
      user_email: detail.email,
      subject: "Pesanan anda sudah dikirim",
      user_name: detail.name,
      title: "Pesanan sudah dikirim",
      reason: "Pesanan di kirim oleh:",
      make_payment: `${detail.courier.toUpperCase()} - ${
        detail.shippingPackage
      }`,
      bank_name: `No.Resi ${serviceNumberValue}`,
      message_footer: "Terima kasih sudah berbelanja di toko kami",
    });
  } catch (error) {
    yield put(loadingCheckoutAction(false));
    console.log(error);
    // yield toastr.success("Error", error);
  }
}

export function* rejectTransaction({ payload }) {
  const { transactionId, status, date, detail } = payload;
  try {
    yield put(loadingCheckoutAction(true));

    const transcationRef = firestore
      .collection("transactions")
      .doc(transactionId);

    yield transcationRef.set(
      {
        status: "rejected",
      },
      { merge: true }
    );

    yield put(loadingCheckoutAction(false));
    yield toastr.success("Sukses", "Transaksi ditolak");
    yield put(fetchCheckoutDataStart({ status, date }));

    window.emailjs.send("gmail", "create_order", {
      user_email: detail.email,
      subject: "Pesanan anda ditolak",
      user_name: detail.name,
      title: "Pesanan anda ditolak",
      reason:
        "Pesanan anda tidak dapat kami proses karena stok barang tidak tersedia",
      message_footer: "Kami mohon maaf atas ketidak nyamanan ini,",
    });
  } catch (error) {
    yield put(loadingCheckoutAction(false));
    yield toastr.success("Error", error);
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

export function* onRejectTransactionStart() {
  yield takeLatest(CheckoutActionTypes.REJECT_TRANSACTION, rejectTransaction);
}

export function* checkoutSagas() {
  yield all([
    call(onCheckoutStart),
    call(onFetchCheckoutDataStart),
    call(onFetchCheckoutDataByUserIdStart),
    call(onUploadTransferProofImage),
    call(onSubmitServiceNumberStart),
    call(onRejectTransactionStart),
  ]);
}
