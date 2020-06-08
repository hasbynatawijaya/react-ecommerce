import React, { Component } from "react";

import FormUpload from "../form-upload/form-upload.component";
import CustomButton from "../custom-button/custom-button.component";

import { connect } from "react-redux";

import { uploadTransferProofStart } from "../../redux/checkout/checkout.actions";

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

    const { uploadTransferProofStart, transactionId } = this.props;
    const { imageAsFile } = this.state;

    uploadTransferProofStart({ transactionId, imageAsFile });
  };

  render() {
    const { imageUrl } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <FormUpload onChange={this.handleImageAsFile} imageUrl={imageUrl} />
        <CustomButton type="submit"> Upload Bukti Transfer </CustomButton>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadTransferProofStart: (data) => dispatch(uploadTransferProofStart(data)),
});

export default connect(null, mapDispatchToProps)(UploadTransferProof);
