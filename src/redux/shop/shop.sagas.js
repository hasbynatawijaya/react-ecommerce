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
  fetchCollectionByIdSuccess,
  fetchCollectionByIdFailure,
} from "./shop.actions";

import { v4 as uuid } from "uuid";

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

export function* fetchCollectionByIdAsync({ payload }) {
  try {
    const collectionRef = firestore.collection("collections").doc(payload);
    const snapshot = yield collectionRef.get();

    yield put(
      fetchCollectionByIdSuccess({ categoryId: payload, ...snapshot.data() })
    );
  } catch (error) {
    yield put(fetchCollectionByIdFailure(error.message));
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
  const categoryId = uuid();

  try {
    // upload image to get image URL
    const storageRef = storage.ref();
    const productImageRef = storageRef.child(`categoryImages/${categoryId}`);

    const res = yield productImageRef.put(imageAsFile);
    const imageUrl = yield productImageRef.getDownloadURL();

    const collectionRef = yield firestore
      .collection("collections")
      .doc(categoryId)
      .set({
        imageUrl,
        title: category,
        items: [],
      });
  } catch (error) {}
}

export function* editCategoryAsync({ payload }) {
  const {
    category,
    imageAsFile,
    imageUrl: currentImageUrl,
    categoryId,
  } = payload;

  try {
    // check if there is new image uploaded

    let imageUrl = currentImageUrl;

    if (imageAsFile) {
      const storageRef = storage.ref();
      const productImageRef = storageRef.child(`categoryImages/${categoryId}`);

      const res = yield productImageRef.put(imageAsFile);
      imageUrl = yield productImageRef.getDownloadURL();
    }

    const categgoryRef = firestore.collection("collections").doc(categoryId);
    const categorySetWithMerge = yield categgoryRef.set(
      {
        imageUrl,
        title: category,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}

export function* deleteCategoryAsync({ payload: categoryId }) {
  try {
    // delete image first

    const storageRef = storage.ref();
    const productImageRef = storageRef.child(`categoryImages/${categoryId}`);
    const res = yield productImageRef.delete();

    const categoryRef = yield firestore
      .collection("collections")
      .doc(categoryId)
      .delete();
  } catch (error) {
    console.log(error);
  }
}

//////////////////

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* fetchCollectionByIdStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTION_BY_ID_START,
    fetchCollectionByIdAsync
  );
}

export function* addCollectionStart() {
  yield takeLatest(ShopActionTypes.ADD_COLLECTIONS_START, addCollectionAsync);
}

export function* addCategoryStart() {
  yield takeLatest(ShopActionTypes.ADD_CATEGORY_START, addCategoryAsync);
}

export function* editCategoryStart() {
  yield takeLatest(ShopActionTypes.EDIT_CATEGORY_START, editCategoryAsync);
}

export function* deleteCategoryStart() {
  yield takeLatest(ShopActionTypes.DELETE_CATEGORY_START, deleteCategoryAsync);
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionStart),
    call(addCollectionStart),
    call(fetchCollectionByIdStart),
    call(addCategoryStart),
    call(editCategoryStart),
    call(deleteCategoryStart),
  ]);
}
