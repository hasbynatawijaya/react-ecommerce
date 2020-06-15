import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import FormSelect from "../form-select/form-select.component";
import FormUpload from "../form-upload/form-upload.component";
import CustomButton from "../custom-button/custom-button.component";

import { AddProductContainer } from "./add-product.styles";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  addCollectionsStart,
  fetchCollectionsStart,
} from "../../redux/shop/shop.actions";
import {
  selectCollectionsCategory,
  selectLoadingCollectionAction,
} from "../../redux/shop/shop.selectors";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      stock: "",
      category: "choose",
      weight: "",
      imageAsFile: "",
      imageUrl: null,
    };
  }

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;

    fetchCollectionsStart();
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

    const { addCollectionsStart } = this.props;
    const { category } = this.state;

    addCollectionsStart({ categoryId: category, data: this.state });
  };

  render() {
    const { name, price, stock, category, imageUrl, weight } = this.state;
    const { collectionCategory, loading } = this.props;

    return (
      <AddProductContainer>
        <form onSubmit={this.handleSubmit}>
          <FormUpload onChange={this.handleImageAsFile} imageUrl={imageUrl} />
          <FormSelect
            value={category}
            label="Kategori produk"
            name="category"
            onChange={this.handleChange}
          >
            <option value="choose">Pilih kategori produk</option>
            {collectionCategory.map(({ id, title }) => (
              <option value={id}>{title}</option>
            ))}
          </FormSelect>
          <FormInput
            name="name"
            type="text"
            handleChange={this.handleChange}
            value={name}
            label="Nama Produk"
            required
          />
          <FormInput
            name="price"
            type="number"
            value={price}
            handleChange={this.handleChange}
            label="Harga"
            required
          />
          <FormInput
            name="weight"
            type="number"
            value={weight}
            handleChange={this.handleChange}
            label="Berat (gram)"
            required
          />
          <CustomButton disabled={loading} type="submit">
            {loading ? "loading" : "Tambah Produk"}
          </CustomButton>
        </form>
      </AddProductContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  collectionCategory: selectCollectionsCategory,
  loading: selectLoadingCollectionAction,
});

const mapDispatchToProps = (dispatch) => ({
  addCollectionsStart: (data) => dispatch(addCollectionsStart(data)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
