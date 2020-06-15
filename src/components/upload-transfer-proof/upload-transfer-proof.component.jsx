import React, { Component } from "react";

import FormUpload from "../form-upload/form-upload.component";
import CustomButton from "../custom-button/custom-button.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { uploadTransferProofStart } from "../../redux/checkout/checkout.actions";
import { selectLoadingCheckoutAction } from "../../redux/checkout/checkout.selectors";

class UploadTransferProof extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageAsFile: "",
      imageUrl: null,
    };
  }

  handleImageAsFile = (e) => {
    const image = e.target.files[0];
    this.setState({
      imageAsFile: image,
      imageUrl: URL.createObjectURL(image),
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      uploadTransferProofStart,
      transactionId,
      currentUser,
      filterPayload,
    } = this.props;
    const { imageAsFile } = this.state;

    uploadTransferProofStart({
      transactionId,
      imageAsFile,
      userId: currentUser.id,
      ...filterPayload,
    });
  };

  render() {
    const { imageUrl } = this.state;
    const { loading } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <FormUpload onChange={this.handleImageAsFile} imageUrl={imageUrl} />
        <CustomButton type="submit">
          {loading ? "loading" : "Upload Bukti Transfer "}
        </CustomButton>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingCheckoutAction,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  uploadTransferProofStart: (data) => dispatch(uploadTransferProofStart(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadTransferProof);
