import React from "react";
import { connect } from "react-redux";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, weight } = cartItem;
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <img height={180} width={180} src={imageUrl} />
      </Grid>
      <Grid item>
        <Typography variant="h5">{name}</Typography>
        <Typography>
          <Box color="#f74902">Rp.{price * quantity}</Box>
          <Typography variant="caption">
            {quantity} barang @{weight} gr
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
