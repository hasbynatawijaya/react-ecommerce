import CheckoutActionTypes from "./checkout.types";

export const loadingCheckoutAction = (isLoading) => ({
  type: CheckoutActionTypes.LOADING_CHECKOUT_ACTION,
  payload: isLoading,
});

export const checkoutStart = (data) => ({
  type: CheckoutActionTypes.CHECKOUT_START,
  payload: data,
});

export const fetchCheckoutDataStart = (data) => ({
  type: CheckoutActionTypes.FETCH_CHECKOUT_DATA_START,
  payload: data,
});

export const fetchCheckoutDataSuccess = (data) => ({
  type: CheckoutActionTypes.FETCH_CHECKOUT_DATA_SUCCESS,
  payload: data,
});

export const fetchCheckoutByUserIdStart = (userId) => ({
  type: CheckoutActionTypes.FETCH_CHECKOUT_DATA_BY_USER_ID_START,
  payload: userId,
});

export const fetchCheckoutByUserIdSuccess = (data) => ({
  type: CheckoutActionTypes.FETCH_CHECKOUT_DATA_BY_USER_ID_SUCCESS,
  payload: data,
});

export const uploadTransferProofStart = (data) => ({
  type: CheckoutActionTypes.UPLOAD_TRANSFER_PROOF_START,
  payload: data,
});

export const submitServiceNumberStart = (data) => ({
  type: CheckoutActionTypes.SUBMIT_SERVICE_NUMBER_START,
  payload: data,
});

export const rejectTransaction = (transactionId) => ({
  type: CheckoutActionTypes.REJECT_TRANSACTION,
  payload: transactionId,
});
