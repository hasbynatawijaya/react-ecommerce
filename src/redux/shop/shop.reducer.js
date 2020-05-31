import ShopActionTypes from "./shop.types";
import { getCollectionByProductId } from "./shop.utils";

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
  collectionById: null,
  collectionByProductId: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTION_BY_ID_SUCCESS:
      return {
        ...state,
        collectionById: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTION_BY_ID_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTION_BY_PRODUCT_ID_START:
      return {
        ...state,
        collectionByProductId: getCollectionByProductId(
          state.collectionById,
          action.payload
        ),
      };
    default:
      return state;
  }
};

export default shopReducer;
