import React, { Component } from "react";

import FormInput from "../form-input/form-input.component";
import FormUpload from "../form-upload/form-upload.component";
import CustomButton from "../custom-button/custom-button.component";

import { EditCategoryContainer } from "./edit-category.styles";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { editCategoryStart } from "../../redux/shop/shop.actions";
import {
  selectCollectionById,
  selectLoadingCategoryAction,
} from "../../redux/shop/shop.selectors";

class EditCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      imageAsFile: "",
      imageUrl: null,
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.collectionById !== this.props.collectionById) {
      this.setState({
        category: this.props.collectionById.title,
        imageUrl: this.props.collectionById.imageUrl,
      });
    }
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
      editCategoryStart,
      collectionById: { categoryId },
    } = this.props;
    const { category, imageAsFile, imageUrl } = this.state;

    editCategoryStart({ categoryId, category, imageAsFile, imageUrl });
  };

  render() {
    const { category, imageUrl } = this.state;
    const { loading } = this.props;

    return (
      <EditCategoryContainer>
        <form onSubmit={this.handleSubmit}>
          <FormUpload imageUrl={imageUrl} onChange={this.handleImageAsFile} />
          <FormInput
            name="category"
            type="text"
            handleChange={this.handleChange}
            value={category}
            label="Nama Produk"
            required
          />

          <CustomButton disabled={loading} type="submit">
            {loading ? "loading" : "edit kategori"}
          </CustomButton>
        </form>
      </EditCategoryContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  collectionById: selectCollectionById,
  loading: selectLoadingCategoryAction,
});

const mapDispatchToProps = (dispatch) => ({
  editCategoryStart: (data) => dispatch(editCategoryStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
