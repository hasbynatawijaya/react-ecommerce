import ShopActionTypes from "./shop.types";

export const loadingCollectionAction = (isLoading) => ({
  type: ShopActionTypes.LOADING_COLLECTION_ACTION,
  payload: isLoading,
});

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

export const addCollectionsStart = (data) => ({
  type: ShopActionTypes.ADD_COLLECTIONS_START,
  payload: data,
});

export const editCollectionStart = (data) => ({
  type: ShopActionTypes.EDIT_COLLECTIONS_START,
  payload: data,
});

export const deleteCollectionsStart = (data) => ({
  type: ShopActionTypes.DELETE_COLLECTIONS_START,
  payload: data,
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

export const addCategorySuccess = () => ({
  type: ShopActionTypes.ADD_CATEGORY_SUCCESS,
});

export const editCategoryStart = (data) => ({
  type: ShopActionTypes.EDIT_CATEGORY_START,
  payload: data,
});

export const editCategorySuccess = () => ({
  type: ShopActionTypes.EDIT_CATEGORY_SUCCESS,
});

export const deleteCategoryStart = (categoryId) => ({
  type: ShopActionTypes.DELETE_CATEGORY_START,
  payload: categoryId,
});

export const deleteCategorySuccess = () => ({
  type: ShopActionTypes.DELETE_CATEGORY_SUCCESS,
});

export const fetchCollectionByIdStart = (collectionId) => ({
  type: ShopActionTypes.FETCH_COLLECTION_BY_ID_START,
  payload: collectionId,
});

export const fetchCollectionByIdSuccess = (collection) => ({
  type: ShopActionTypes.FETCH_COLLECTION_BY_ID_SUCCESS,
  payload: collection,
});

export const fetchCollectionByIdFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTION_BY_ID_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionByProductIdStart = (productId) => ({
  type: ShopActionTypes.FETCH_COLLECTION_BY_PRODUCT_ID_START,
  payload: productId,
});

export const resetCollectionByProductId = () => ({
  type: ShopActionTypes.RESET_COLLECTION_BY_PRODUCT_ID,
});
