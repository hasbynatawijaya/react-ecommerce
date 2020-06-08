import { takeLatest, call, put, all } from "redux-saga/effects";
import { storage } from "../../firebase/firebase.utils";
import { toastr } from "react-redux-toastr";

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
  addCategorySuccess,
  editCategorySuccess,
  deleteCategorySuccess,
  loadingCollectionAction,
} from "./shop.actions";

import {
  modalAddCategory,
  modalEditCategory,
  modalAddProduct,
  modalEditProduct,
} from "../modal/modal.actions";

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
    console.log(error);
    yield put(fetchCollectionByIdFailure(error.message));
  }
}

export function* addCollectionAsync({ payload }) {
  const { categoryId, data } = payload;
  const productId = uuid();

  try {
    // upload image to get image URL

    yield put(loadingCollectionAction(true));

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
            weight: data.weight,
          },
        ],
      },
      { merge: true }
    );
    yield toastr.success("Sukses", "Berhasil menambahkan produk");
    yield put(loadingCollectionAction(false));
    yield put(modalAddProduct());
    yield fetchCollectionByIdAsync({ payload: categoryId });
  } catch (error) {
    yield toastr.success("Error", error);
    yield put(loadingCollectionAction(false));
  }
}

export function* editCollectionAsync({ payload }) {
  const { categoryId, data } = payload;

  try {
    yield put(loadingCollectionAction(true));

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
      weight: data.weight,
    };

    yield ref.set(
      {
        items: [...collectionItems],
      },
      { merge: true }
    );
    yield toastr.success("Sukses", "Berhasil mengubah produk");
    yield put(loadingCollectionAction(false));
    yield put(modalEditProduct());
    yield fetchCollectionByIdAsync({ payload: categoryId });
  } catch (error) {
    yield toastr.success("Error", error);
    yield put(loadingCollectionAction(false));
  }
}

export function* deleteCollectionAsync({ payload }) {
  const { categoryId, id } = payload;

  try {
    yield put(loadingCollectionAction(true));
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

    yield toastr.success("Sukses", "Berhasil menghapus produk");
    yield put(loadingCollectionAction(false));
    yield fetchCollectionByIdAsync({ payload: categoryId });
  } catch (error) {
    console.log(error);
    yield toastr.success("Error", error);
    yield put(loadingCollectionAction(false));
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

    yield toastr.success("Sukses", "Berhasil menambah kategori produk");
    yield put(addCategorySuccess());
    yield put(modalAddCategory());
    yield fetchCollectionsAsync();
  } catch (error) {
    yield put(addCategorySuccess());
    yield toastr.error("Error", error);
  }
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

    yield toastr.success("Sukses", "Berhasil mengubah kategori produk");
    yield put(editCategorySuccess());
    yield put(modalEditCategory());
    yield fetchCollectionsAsync();
  } catch (error) {
    yield toastr.error("Error", error);
    yield put(editCategorySuccess());
  }
}

export function* deleteCategoryAsync({ payload: categoryId }) {
  try {
    // delete image first

    const storageRef = storage.ref();
    const productImageRef = storageRef.child(`categoryImages/${categoryId}`);
    yield productImageRef.delete();

    yield firestore.collection("collections").doc(categoryId).delete();

    yield toastr.success("Sukses", "Berhasil menghapus kategori produk");
    yield put(deleteCategorySuccess());
    yield fetchCollectionsAsync();
  } catch (error) {
    yield toastr.error("Error", error);
    yield put(deleteCategorySuccess());
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
