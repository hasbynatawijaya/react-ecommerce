export const getAddressById = (currentUser, addressId) => {
  if (currentUser) {
    const filteredAddress = currentUser.address.filter(
      (address) => address.id === addressId
    );

    if (filteredAddress.length > 0) {
      return filteredAddress[0];
    }
  }
};
