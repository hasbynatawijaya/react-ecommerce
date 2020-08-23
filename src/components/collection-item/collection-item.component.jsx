import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toastr } from "react-redux-toastr";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import { addItem } from "../../redux/cart/cart.actions";

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./collection-styles.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginBottom: theme.spacing(4),
  },
  container: {
    display: "flex",
    height: 240,
    backgroundColor: "#fff",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  price: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(3),
    borderLeft: "1px solid #bcbfbf",
  },
  content: {
    flex: "1 0 auto",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  cover: {
    width: 300,
  },
  addToCartButton: {
    backgroundColor: "#f74902",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    padding: "15px",
    "&:hover": {
      backgroundColor: "#ecb26add",
    },
  },
  favouriteTag: {
    position: "absolute",
    right: "-5px",
    top: "-5px",
    zIndex: 1,
    overflow: "hidden",
    width: "75px",
    height: "75px",
    textAlign: "right",

    "& span": {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#FFF",
      textTransform: "uppercase",
      textAlign: "center",
      lineHeight: "20px",
      transform: "rotate(45deg)",
      width: "100px",
      display: "block",
      background: "#79A70A",
      background: "linear-gradient(#F79E05 0%, #8F5408 100%)",
      boxShadow: "0 3px 10px -5px rgba(0, 0, 0, 1)",
      position: "absolute",
      top: "19px",
      right: "-21px",

      "&::before": {
        content: "",
        position: "absolute",
        left: "0px",
        top: "100%",
        zIndex: -1,
        borderLeft: "3px solid #8F5408",
        borderRight: "3px solid transparent",
        borderBottom: "3px solid transparent",
        borderTop: "3px solid #8F5408",
      },

      "&::after": {
        content: "",
        position: "absolute; right: 0px; top: 100%",
        zIndex: -1,
        borderLeft: "3px solid transparent",
        borderRight: "3px solid #8F5408",
        borderBottom: "3px solid transparent",
        borderTop: "3px solid #8F5408",
      },
    },
  },
}));

const CollectionItem = ({ item, addItem, currentUser, cartItems }) => {
  const [disabledAddButton, setDisabledAddButton] = React.useState(false);

  const classes = useStyles();
  const theme = useTheme();

  const {
    name,
    price,
    imageUrl,
    stock,
    weight,
    description,
    isFavourite,
  } = item;

  React.useEffect(() => {
    handleCheckProductOnCart(item);
  }, []);

  const handleCheckProductOnCart = (cartItemToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === cartItemToAdd.id) {
          if (cartItems[i].quantity >= parseInt(cartItemToAdd.stock)) {
            setDisabledAddButton(true);
            return false;
          }
        }
      }
    }

    return true;
  };

  const handleAddItem = (cartItemToAdd) => {
    const isAvailableToAdd = handleCheckProductOnCart(cartItemToAdd);

    if (isAvailableToAdd) {
      return addItem(cartItemToAdd);
    }
  };

  return (
    <div className={classes.root}>
      <Card elevation={5} className={classes.container}>
        <CardMedia className={classes.cover} image={imageUrl} title={name} />
        <div className={classes.info}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Box mb={1}>
                <Typography component="h5" variant="h5">
                  {name}
                </Typography>
              </Box>
              <Divider />
              <Box mt={1}>
                <Typography variant="subtitle1">
                  <Box fontWeight={500}>Stok: {stock}</Box>
                </Typography>
              </Box>
              <Box mt={1}>
                <Typography variant="subtitle1">
                  <Box fontWeight={500}>Berat: {weight}gr/ pcs</Box>
                </Typography>
              </Box>
              {/* <Box mt={1}>
                <Typography variant="caption">
                  <Box color="red">
                    <i>*dapatkan harga spesial untuk pembelian &gt; 12 pcs</i>
                  </Box>
                </Typography>
              </Box> */}
            </CardContent>
          </div>
          <div className={classes.price}>
            <Box>
              <Typography variant="h4" color="textSecondary" component="span">
                <Box fontWeight="bold">
                  Rp.{price}
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="span"
                  >
                    / pcs
                  </Typography>
                </Box>
              </Typography>
            </Box>
            <Divider />
            <Button
              onClick={() => handleAddItem(item)}
              variant="outlined"
              className={classes.addToCartButton}
              disabled={disabledAddButton}
            >
              {disabledAddButton
                ? "pembelian melebihi stok"
                : "tambahkan ke keranjang"}
            </Button>
          </div>
        </div>
      </Card>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <Box fontWeight={500}>Detail Produk</Box>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {isFavourite === "yes" && (
        <div className={classes.favouriteTag}>
          <span>Favorit</span>
        </div>
      )}
    </div>
    // <CollectionItemContainer>
    //   <BackgroundImage className="image" imageUrl={imageUrl} />
    //   <CollectionFooterContainer>
    //     <NameContainer>{name}</NameContainer>
    //     <PriceContainer>{price}</PriceContainer>
    //   </CollectionFooterContainer>
    //   {currentUser ? (
    //     <AddButton onClick={() => addItem(item)} inverted>
    //       Tambah ke keranjang
    //     </AddButton>
    //   ) : (
    //     <AddButton onClick={() => window.location.replace("/signin")} inverted>
    //       Login untuk membeli
    //     </AddButton>
    //   )}
    // </CollectionItemContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
