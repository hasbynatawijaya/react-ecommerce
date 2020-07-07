import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-modal";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import AddAddress from "../add-address/add-address.component";
import EditAddress from "../edit-address/edit-address.component";

import {
  modalEditAddress,
  modalAddAddress,
} from "../../redux/modal/modal.actions";

import {
  selectModalEditAddress,
  selectModalAddAddress,
} from "../../redux/modal/modal.selectors";

import { getUserAddressById } from "../../redux/user/user.actions";

import { selectCurrentUser } from "../../redux/user/user.selectors";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "24px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const AddressList = (props) => {
  const classes = useStyles();

  const {
    isModalEditAddress,
    isModalAddAddress,
    modalEditAddress,
    modalAddAddress,
    currentUser,
    getUserAddressById,
  } = props;

  const handleEdit = (addressId) => {
    getUserAddressById(addressId);
    modalEditAddress();
  };

  return (
    <div>
      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button variant="outlined" onClick={() => modalAddAddress()}>
          Tambah alamat baru
        </Button>
      </Box>

      <Grid container spacing={2}>
        {(currentUser ? currentUser.address : []).map((val) => (
          <Grid item md={6} xs={12}>
            <Card>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {val.name} - {val.phoneNumber}
                </Typography>
                <Typography>{val.address},</Typography>
                <Typography>{val.city.split("-")[1]}</Typography>
                <Typography>{val.province.split("-")[1]}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(val.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal isOpen={isModalAddAddress} contentLabel="Example Modal">
        <button onClick={() => modalAddAddress()}>close add</button>
        <AddAddress currentUser={currentUser} />
      </Modal>
      <Modal isOpen={isModalEditAddress} contentLabel="Example Modal">
        <button onClick={() => modalEditAddress()}>close edit</button>
        <EditAddress currentUser={currentUser} />
      </Modal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isModalEditAddress: selectModalEditAddress,
  isModalAddAddress: selectModalAddAddress,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  modalEditAddress: () => dispatch(modalEditAddress()),
  modalAddAddress: () => dispatch(modalAddAddress()),
  getUserAddressById: (addressId) => dispatch(getUserAddressById(addressId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
