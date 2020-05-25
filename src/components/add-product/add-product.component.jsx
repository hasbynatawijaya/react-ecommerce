import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import FormSelect from "../form-select/form-select.component";
import CustomButton from "../custom-button/custom-button.component";

import { AddProductContainer } from "./add-product.styles";
import { storage } from "../../firebase/firebase.utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  addCollectionsStart,
  fetchCollectionsStart,
} from "../../redux/shop/shop.actions";
import { selectCollectionsCategory } from "../../redux/shop/shop.selectors";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      stock: "",
      category: "choose",
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

    addCollectionsStart();

    // const { imageAsFile } = this.state;

    // const storageRef = storage.ref();
    // const productImageRef = storageRef.child(
    //   `productImages/${imageAsFile.name}`
    // );
    // productImageRef
    //   .put(imageAsFile)
    //   .then((snapshot) => {
    //     console.log(snapshot);
    //   })
    //   .then((snapshot) => {
    //     const imageURL = productImageRef.getDownloadURL();
    //     console.log(imageURL);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  render() {
    const { name, price, stock, category, imageAsFile, imageUrl } = this.state;
    const { collectionCategory } = this.props;

    return (
      <AddProductContainer>
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
            // required
          />
          <FormInput
            name="price"
            type="number"
            value={price}
            handleChange={this.handleChange}
            label="Harga"
            // required
          />
          <FormInput
            name="stock"
            type="number"
            value={stock}
            handleChange={this.handleChange}
            label="Jumlah stok"
            // required
          />
          <CustomButton type="submit"> Tambah Produk </CustomButton>
        </form>
      </AddProductContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  collectionCategory: selectCollectionsCategory,
});

const mapDispatchToProps = (dispatch) => ({
  addCollectionsStart: () => dispatch(addCollectionsStart()),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
