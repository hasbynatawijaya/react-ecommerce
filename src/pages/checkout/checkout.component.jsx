import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-modal";
import moment from "moment";
import { withRouter } from "react-router-dom";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CheckoutForm from "../../components/checkout-form/checkout-form.components";

import { checkoutStart } from "../../redux/checkout/checkout.actions";

import { selectShippingCost } from "../../redux/shipping/shipping.selectors";
import { fetchShippingCostStart } from "../../redux/shipping/shipping.actions";

import {
  selectCartItems,
  selectCartTotal,
  selectCartTotalWeight,
} from "../../redux/cart/cart.selectors";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectLoadingCheckoutAction } from "../../redux/checkout/checkout.selectors";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
} from "./checkout.styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paymentContainer: {
    border: "1px solid black",
    padding: "30px",
    height: 400,
  },
  paymentItem: {
    marginBottom: theme.spacing(2),
  },
  buttonCheckout: {
    padding: theme.spacing(1),
    color: "#fff",
    background: "#f74902",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "#f77b48",
    },
  },
}));

const CheckoutPage = ({
  cartItems,
  total,
  checkoutStart,
  totalWeight,
  currentUser,
  fetchShippingCostStart,
  shippingCost,
  history,
  loading,
}) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(null);
  const [courier, setCourier] = React.useState("jne");
  const [courierPackage, setCourierPackage] = React.useState(0);

  const handleChangeCourier = (event) => {
    const value = event.target.value;

    setCourier(value);

    fetchShippingCostStart({
      origin: "79",
      destination: currentUser.address[selectedAddressIndex].city,
      weight: totalWeight,
      courier: value,
    });
  };

  const handleChangeCourierPackage = (event) => {
    const value = event.target.value;

    setCourierPackage(parseInt(value));
  };

  const handleSelectAddress = (addressIndex) => {
    setSelectedAddressIndex(addressIndex);
    setOpenModal(false);

    fetchShippingCostStart({
      origin: "79",
      destination: currentUser.address[addressIndex].city,
      weight: totalWeight,
      courier: courier,
    });
  };

  const handleCheckout = () => {
    const createdAt = new Date(moment().startOf("day").toString());
    const expiredAt = new Date(
      moment().add(2, "days").startOf("day").format("DD MMMM YYYY")
    );
    // shippingCost[courierPackage]
    checkoutStart({
      name: currentUser.address[selectedAddressIndex].name,
      email: currentUser.email,
      address: currentUser.address[selectedAddressIndex].address,
      phoneNumber: currentUser.address[selectedAddressIndex].phoneNumber,
      courier: courier,
      province: currentUser.address[selectedAddressIndex].province,
      city: currentUser.address[selectedAddressIndex].city,
      shippingPackage: shippingCost[courierPackage].service,
      items: cartItems,
      totalPrice: total,
      shippingPackageObj: {
        service: shippingCost[courierPackage].service,
        cost: shippingCost[courierPackage].cost[0].value,
      },
      // provinceObj: {
      //   provinceId: province.split("-")[0],
      //   province: province.split("-")[1],
      // },
      // city: {
      //   cityId: city.split("-")[0],
      //   city: city.split("-")[1],
      // },
      serviceNumber: "",
      status: "process",
      transferPhotoImageUrl: "",
      userId: currentUser.id,
      createdAt,
      expiredAt,
    });
  };

  return (
    <div>
      <Box mb={4}>
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <Grid container spacing={6}>
        <Grid item md={8}>
          <Box mb={2}>
            <Typography variant="h6">Alamat Pengiriman</Typography>
          </Box>
          <Divider />
          <Box mt={2} mb={2}>
            <Button
              onClick={() => setOpenModal(true)}
              variant="contained"
              color="primary"
            >
              Pilih alamat pengiriman
            </Button>
          </Box>
          {selectedAddressIndex !== null ? (
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {currentUser.address[selectedAddressIndex].name} -{" "}
                  {currentUser.address[selectedAddressIndex].phoneNumber}
                </Typography>
                <Typography>
                  {currentUser.address[selectedAddressIndex].address},
                </Typography>
                <Typography>
                  {currentUser.address[selectedAddressIndex].city.split("-")[1]}
                </Typography>
                <Typography>
                  {
                    currentUser.address[selectedAddressIndex].province.split(
                      "-"
                    )[1]
                  }
                </Typography>
              </CardContent>
            </Card>
          ) : null}
          <Box mb={2} mt={2}>
            <Typography variant="h6">Daftar pembelian</Typography>
          </Box>
          <Divider />
          <Box mb={2} mt={2}>
            <Grid container>
              <Grid item md={6}>
                {cartItems.map((cartItem) => (
                  <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Grid>
              {selectedAddressIndex !== null && (
                <Grid item md={6}>
                  <Box mb={2} fontWeight={500}>
                    <Typography>Pilih kurir pengiriman</Typography>
                  </Box>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={courier}
                      onChange={handleChangeCourier}
                      label="Age"
                    >
                      <MenuItem value="jne">JNE</MenuItem>
                      <MenuItem value="tiki">Tiki</MenuItem>
                      <MenuItem value="pos">Pos Indonesia</MenuItem>
                    </Select>
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={courierPackage}
                        onChange={handleChangeCourierPackage}
                      >
                        {shippingCost.map((ship, i) => (
                          <Card>
                            <CardContent>
                              <FormControlLabel
                                value={i}
                                control={<Radio />}
                                label={
                                  <Typography>
                                    <Box fontWeight={600}>
                                      {ship.description} ({ship.service})
                                    </Box>
                                  </Typography>
                                }
                              />
                              {ship.cost.map((cost, i) => {
                                return (
                                  <Grid container justify="space-between">
                                    <Grid item>
                                      <Typography>
                                        Estimasi {cost.etd}
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Typography variant="caption">
                                        Rp.{cost.value}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </CardContent>
                          </Card>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />
          {/* <Box mb={2} mt={2}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography color="textSecondary">
                  Total harga barang
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Box color="#f74902">Rp.{total}</Box>
                </Typography>
              </Grid>
            </Grid>
          </Box> */}
        </Grid>
        <Grid item md={4} className={classes.paymentContainer}>
          <Grid container className={classes.paymentItem}>
            <Grid item>
              <Typography variant="h4">Ringkasan belanja</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.paymentItem}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="subtitle1">
                <Box fontWeight={500}>
                  Total harga ({cartItems.length} produk)
                </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                Rp.{total}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.paymentItem}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Box fontWeight={500}>
                <Typography variant="subtitle1">Total ongkos kirim</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                Rp.
                {shippingCost[courierPackage]
                  ? shippingCost[courierPackage].cost[0].value
                  : 0}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.paymentItem} />
          <Grid
            container
            className={classes.paymentItem}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Box fontWeight={500}>
                <Typography>Total Tagihan</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography>
                Rp.
                {total +
                  (shippingCost[courierPackage]
                    ? shippingCost[courierPackage].cost[0].value
                    : 0)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Button
                variant="outlined"
                fullWidth
                className={classes.buttonCheckout}
                onClick={handleCheckout}
                disabled={selectedAddressIndex === null}
                style={{
                  cursor: selectedAddressIndex === null && "not-allowed",
                }}
              >
                {loading ? "Loading..." : "Checkout"}
              </Button>
              <Box mt={2} mb={2} fontWeight={500}>
                {selectedAddressIndex === null && (
                  <Typography variant="caption">
                    <i>*and belum memilih alamat pengiriman</i>
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        isOpen={openModal}
        contentLabel="Example Modal"
        style={{ zIndex: 99999 }}
      >
        <button onClick={() => setOpenModal(false)}>close</button>
        <Box mb={4} mt={4}>
          <Typography variant="h5">Pilih alamat pengiriman</Typography>
        </Box>
        {currentUser.address.length === 0 && (
          <Box>
            <Typography>Alamat pengiriman belum di tambahkan</Typography>
            <Box mt={3}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => history.push("/me")}
              >
                Tambah alamat pengiriman
              </Button>
            </Box>
          </Box>
        )}
        {(currentUser ? currentUser.address : []).map((val, i) => (
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {val.name} - {val.phoneNumber}
                  </Typography>
                  <Typography>{val.address},</Typography>
                  <Typography>{val.city.split("-")[1]}</Typography>
                  <Typography>{val.province.split("-")[1]}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleSelectAddress(i)}>
                    <CheckIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkoutStart: (data) => dispatch(checkoutStart(data)),
  fetchShippingCostStart: (data) => dispatch(fetchShippingCostStart(data)),
});

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  totalWeight: selectCartTotalWeight,
  currentUser: selectCurrentUser,
  shippingCost: selectShippingCost,
  loading: selectLoadingCheckoutAction,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
);
