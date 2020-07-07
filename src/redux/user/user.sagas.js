import { takeLatest, put, all, call } from "redux-saga/effects";
import { v4 as uuid } from "uuid";

import userActionTypes from "./user.types";

import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  loadingUserAddressAction,
  checkUserSession,
} from "./user.actions";

import { modalAddAddress, modalEditAddress } from "../modal/modal.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  firestore,
} from "../../firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();

    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();

    window.location.replace("/");

    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    yield put(
      signUpSuccess({
        user,
        additionalData: {
          displayName,
          cart: [],
          role: "user",
          address: [],
        },
      })
    );
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* addUserAddress({ payload }) {
  try {
    yield put(loadingUserAddressAction(true));

    const ref = firestore.collection("users").doc(payload.userId);

    const snapshot = yield ref.get();
    const allAddress = [...(yield snapshot.data().address)];

    allAddress.push({ id: uuid(), ...payload.address });

    yield ref.set(
      {
        address: [...allAddress],
      },
      { merge: true }
    );

    yield put(checkUserSession());
    yield put(loadingUserAddressAction(false));
    yield put(modalAddAddress(false));
  } catch (error) {
    yield put(loadingUserAddressAction(false));
    console.log(error);
  }
}

export function* editUserAddress({ payload }) {
  try {
    yield put(loadingUserAddressAction(true));

    const ref = firestore.collection("users").doc(payload.userId);

    const snapshot = yield ref.get();
    const allAddress = [...(yield snapshot.data().address)];

    const selectedIndex = allAddress.findIndex(
      (address) => address.id === payload.address.id
    );

    allAddress[selectedIndex] = payload.address;

    yield ref.set(
      {
        address: [...allAddress],
      },
      { merge: true }
    );

    yield put(checkUserSession());
    yield put(loadingUserAddressAction(false));
    yield put(modalEditAddress(false));
  } catch (error) {
    yield put(loadingUserAddressAction(false));
    console.log(error);
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onAdduserAddress() {
  yield takeLatest(userActionTypes.ADD_USER_ADDRESS, addUserAddress);
}

export function* onEditUserAddress() {
  yield takeLatest(userActionTypes.EDIT_USER_ADDRESS, editUserAddress);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onAdduserAddress),
    call(onEditUserAddress),
  ]);
}
