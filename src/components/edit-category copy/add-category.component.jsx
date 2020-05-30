import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { AddCategoryContainer } from "./add-category.styles";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

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
          <div
            style={{
              width: "400px",
              height: "280px",
              padding: "10px",
              border: "4px solid grey",
            }}
          >
            <img src={imageUrl} width="100%" height="100%" />
          </div>
          <input type="file" onChange={this.handleImageAsFile} />

          <FormInput
            name="category"
            type="text"
            handleChange={this.handleChange}
            value={category}
            label="Nama Produk"
            // required
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
