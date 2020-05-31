import React, { Component } from "react";

import FormInput from "../form-input/form-input.component";
import FormUpload from "../form-upload/form-upload.component";
import CustomButton from "../custom-button/custom-button.component";

import { AddCategoryContainer } from "./add-category.styles";

import { connect } from "react-redux";

import { addCategoryStart } from "../../redux/shop/shop.actions";

class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
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

    const { addCategoryStart } = this.props;
    const { category, imageAsFile } = this.state;

    addCategoryStart({ category, imageAsFile });
  };

  render() {
    const { category, imageUrl } = this.state;

    return (
      <AddCategoryContainer>
        <form onSubmit={this.handleSubmit}>
          <FormUpload onChange={this.handleImageAsFile} imageUrl={imageUrl} />
          <FormInput
            name="category"
            type="text"
            handleChange={this.handleChange}
            value={category}
            label="Nama Produk"
            required
          />
          <CustomButton type="submit"> Tambah Kategori </CustomButton>
        </form>
      </AddCategoryContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCategoryStart: (data) => dispatch(addCategoryStart(data)),
});

export default connect(null, mapDispatchToProps)(AddCategory);
