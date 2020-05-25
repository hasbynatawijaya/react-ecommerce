import { takeLatest, call, put, all } from "redux-saga/effects";
import { storage } from "../../firebase/firebase.utils";

import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  addCollectionsStart,
  fetchCollectionsStart,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* addCollectionAsync() {
  const ref = firestore.collection("Hai");
  const snapshot = yield ref.get();

  yield snapshot.docs.map((doc) => {
    console.log(doc.id);
  });
}

export function* addCategoryAsync({ payload }) {
  const { category, imageAsFile } = payload;

  try {
    //upload image to get image URL
    const storageRef = storage.ref();
    const productImageRef = storageRef.child(
      `categoryImages/${imageAsFile.name}`
    );

    const res = yield productImageRef.put(imageAsFile);
    const imageUrl = yield productImageRef.getDownloadURL();

    const collectionRef = yield firestore.collection("collections").doc().set({
      imageUrl,
      title: category,
      items: [],
    });

    console.log(collectionRef);
  } catch (error) {
    console.log(error);
  }

  //upload images

  // productImageRef
  //   .put(imageAsFile)
  //   .then((snapshot) => {
  //     console.log(snapshot);
  //   })
  //   .then((snapshot) => {
  //     const imageURL = productImageRef.getDownloadURL();
  //     console.log(imageURL);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  yield console.log(payload);
  // const ref = firestore.collection("Hai");
  // const snapshot = yield ref.get();

  // console.log(payload);

  // yield snapshot.docs.map((doc) => {
  //   console.log(doc.id);
  // });
}

//////////////////

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* addCollectionStart() {
  yield takeLatest(ShopActionTypes.ADD_COLLECTIONS_START, addCollectionAsync);
}

export function* addCategoryStart() {
  yield takeLatest(ShopActionTypes.ADD_CATEGORY_START, addCategoryAsync);
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionStart),
    call(addCollectionStart),
    call(addCategoryStart),
  ]);
}
