export const getCollectionByProductId = (collectionById, productId) => {
  console.log(collectionById);
  console.log(productId);
  if (collectionById) {
    return collectionById.items.filter(
      (collection) => collection.id === productId
    );
  }
};
