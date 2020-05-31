export const getCollectionByProductId = (collectionById, productId) => {
  if (collectionById) {
    const filteredCollection = collectionById.items.filter(
      (collection) => collection.id === productId
    );

    if (filteredCollection) {
      filteredCollection[0].categoryId = collectionById.categoryId;

      return filteredCollection[0];
    } else {
      return {};
    }
  }
};
