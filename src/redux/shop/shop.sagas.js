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
  deleteCollectionsStart,
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

export function* addCollectionAsync({ payload }) {
  const { categoryId, data } = payload;
  const productId = uuid();

  try {
    // upload image to get image URL
    const storageRef = storage.ref();
    const productImageRef = storageRef.child(`productImages/${productId}`);

    yield productImageRef.put(data.imageAsFile);
    const imageUrl = yield productImageRef.getDownloadURL();

    const ref = firestore.collection("collections").doc(categoryId);
    const snapshot = yield ref.get();
    const collectionItem = yield snapshot.data().items;

    yield ref.set(
      {
        items: [
          ...collectionItem,
          {
            id: productId,
            imageUrl,
            price: data.price,
            name: data.name,
            stock: data.stock,
          },
        ],
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}

export function* editCollectionAsync({ payload }) {
  const { categoryId, data } = payload;

  try {
    let imageUrl = data.imageUrl;

    // upload image to get image URL
    if (data.imageAsFile) {
      const storageRef = storage.ref();
      const productImageRef = storageRef.child(`productImages/${data.id}`);

      yield productImageRef.put(data.imageAsFile);
      imageUrl = yield productImageRef.getDownloadURL();
    }

    const ref = firestore.collection("collections").doc(categoryId);
    const snapshot = yield ref.get();
    const collectionItems = yield snapshot.data().items;

    const collectionIndex = yield collectionItems
      .map((col) => col.id)
      .indexOf(data.id);

    collectionItems[collectionIndex] = {
      id: data.id,
      imageUrl,
      price: data.price,
      name: data.name,
      stock: data.stock,
    };

    yield ref.set(
      {
        items: [...collectionItems],
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}

export function* deleteCollectionAsync({ payload }) {
  const { categoryId, id } = payload;

  try {
    // delete image first
    const storageRef = storage.ref();
    const productImageRef = storageRef.child(`productImages/${id}`);
    yield productImageRef.delete();

    const ref = firestore.collection("collections").doc(categoryId);
    const snapshot = yield ref.get();
    const collectionItems = yield snapshot.data().items;

    const collectionIndex = yield collectionItems
      .map((col) => col.id)
      .indexOf(id);

    collectionItems.splice(collectionIndex, 1);

    yield ref.set(
      {
        items: [...collectionItems],
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}

export function* addCategoryAsync({ payload }) {
  const { category, imageAsFile } = payload;
  const categoryId = uuid();

  try {
    // upload image to get image URL
    const storageRef = storage.ref();
    const productImageRef = storageRef.child(`categoryImages/${categoryId}`);

    yield productImageRef.put(imageAsFile);
    const imageUrl = yield productImageRef.getDownloadURL();

    yield firestore.collection("collections").doc(categoryId).set({
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

      yield productImageRef.put(imageAsFile);
      imageUrl = yield productImageRef.getDownloadURL();
    }

    const categgoryRef = firestore.collection("collections").doc(categoryId);
    yield categgoryRef.set(
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
    yield productImageRef.delete();

    yield firestore.collection("collections").doc(categoryId).delete();
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

export function* editCollectionStart() {
  yield takeLatest(ShopActionTypes.EDIT_COLLECTIONS_START, editCollectionAsync);
}

export function* deleteCollectionStart() {
  yield takeLatest(
    ShopActionTypes.DELETE_COLLECTIONS_START,
    deleteCollectionAsync
  );
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
    call(editCollectionStart),
    call(deleteCollectionStart),
    call(fetchCollectionByIdStart),
    call(addCategoryStart),
    call(editCategoryStart),
    call(deleteCategoryStart),
  ]);
}
