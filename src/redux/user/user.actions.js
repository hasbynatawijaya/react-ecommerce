import UserActionTypes from "./user.types";

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => {
  return {
    type: UserActionTypes.CHECK_USER_SESSION,
  };
};

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const addUserAddressStart = (data) => ({
  type: UserActionTypes.ADD_USER_ADDRESS,
  payload: data,
});

export const editUserAddressStart = (data) => ({
  type: UserActionTypes.EDIT_USER_ADDRESS,
  payload: data,
});

export const deleteUserAddress = (data) => ({
  type: UserActionTypes.DELETE_USER_ADDRESS,
  payload: data,
});

export const loadingUserAddressAction = (isLoading) => ({
  type: UserActionTypes.LOADING_USER_ADDRESS_ACTION,
  payload: isLoading,
});

export const getUserAddressById = (addressId) => ({
  type: UserActionTypes.GET_USER_ADDRESS_BY_ID,
  payload: addressId,
});
