import ShopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const addCollectionsStart = () => ({
  type: ShopActionTypes.ADD_COLLECTIONS_START,
});

export const addCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.ADD_COLLECTIONS_SUCCESS,
});

export const addCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.ADD_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const addCategoryStart = (data) => ({
  type: ShopActionTypes.ADD_CATEGORY_START,
  payload: data,
});
