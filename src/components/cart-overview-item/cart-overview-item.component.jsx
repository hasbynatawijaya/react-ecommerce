import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./cart-overview-item.styles";

const CheckoutItem = ({
  cartItem,
  clearItem,
  addItem,
  removeItem,
  collections,
}) => {
  const { name, imageUrl, price, quantity, weight, stock } = cartItem;

  const handleAddQuantity = () => {
    if (quantity < parseInt(stock)) {
      addItem(cartItem);
    }
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt="item" width="100%" />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <TextContainer>{weight}gr</TextContainer>
      <QuantityContainer>
        <div onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
        <div
          style={{ cursor: quantity >= parseInt(stock) && "not-allowed" }}
          onClick={handleAddQuantity}
        >
          &#10095;
        </div>
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
