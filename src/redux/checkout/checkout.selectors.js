import { createSelector } from "reselect";

const selectCheckout = (state) => state.checkout;

export const selectLoadingCheckoutAction = createSelector(
  [selectCheckout],
  (checkout) => checkout.loadingCheckoutAction
);

export const selectCheckoutData = createSelector(
  [selectCheckout],
  (checkout) => checkout.checkoutData
);

export const selectCheckoutDataforChart = createSelector(
  [selectCheckoutData],
  (checkoutData) => {
    const allItems = [];

    for (let i = 0; i < checkoutData.length; i++) {
      for (let j = 0; j < checkoutData[i].items.length; j++) {
        let itemIndex = allItems.findIndex(
          (item) => item.id === checkoutData[i].items[j].id
        );

        if (itemIndex < 0) {
          allItems.push({
            id: checkoutData[i].items[j].id,
            name: checkoutData[i].items[j].name,
            quantity: checkoutData[i].items[j].quantity,
            price: parseFloat(checkoutData[i].items[j].price),
          });
        } else {
          allItems[itemIndex].quantity += checkoutData[i].items[j].quantity;
          allItems[itemIndex].price += parseFloat(
            checkoutData[i].items[j].price
          );
        }
      }
    }

    return allItems;
  }
);

export const selectItemPurchasedForExcel = createSelector(
  [selectCheckoutData],
  (checkoutData) => {
    const allItems = [];

    for (let i = 0; i < checkoutData.length; i++) {
      for (let j = 0; j < checkoutData[i].items.length; j++) {
        allItems.push({
          name: checkoutData[i].items[j].name,
          quantity: checkoutData[i].items[j].quantity,
          price: checkoutData[i].items[j].price,
          address: checkoutData[i].address,
          courier: checkoutData[i].courier,
          city: checkoutData[i].city.city,
          province: checkoutData[i].provinceObj.province,
          receiverName: checkoutData[i].name,
        });
      }
    }

    return allItems;
  }
);

export const selectCheckoutDataTotalPrice = createSelector(
  [selectCheckoutDataforChart],
  (item) =>
    item.reduce(
      (accumalatedQuantity, item) => accumalatedQuantity + item.price,
      0
    )
);

export const selectCheckoutDataByUserId = createSelector(
  [selectCheckout],
  (checkout) => checkout.checkoutDataByUserId
);
