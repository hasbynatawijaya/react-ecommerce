import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectLoadingCollectionAction = createSelector(
  [selectShop],
  (shop) => shop.loadingCollectionAction
);

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectLoadingCategoryAction = createSelector(
  [selectShop],
  (shop) => shop.loadingCategoryAction
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);

export const selectCollectionsCategory = createSelector(
  [selectCollections],
  (collections) =>
    collections
      ? Object.keys(collections).map((key) => ({
          id: collections[key].id,
          title: collections[key].title,
          imageUrl: collections[key].imageUrl,
        }))
      : []
);

export const selectCollectionById = createSelector(
  [selectShop],
  (shop) => shop.collectionById
);

export const selectCollectionByProductId = createSelector(
  [selectShop],
  (shop) => shop.collectionByProductId
);
