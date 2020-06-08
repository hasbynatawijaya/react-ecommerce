import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-modal";

import Table from "../../components/table/table.component";
import AddCategory from "../../components/add-category/add-category.component";
import EditCategory from "../../components/edit-category/edit-category.component";
import Button from "../../components/custom-button/custom-button.component";

import { CategoryHeader } from "./category.styles";

import {
  fetchCollectionsStart,
  fetchCollectionByIdStart,
  deleteCategoryStart,
} from "../../redux/shop/shop.actions";
import {
  modalAddCategory,
  modalEditCategory,
} from "../../redux/modal/modal.actions";
import { selectCollectionsCategory } from "../../redux/shop/shop.selectors";
import {
  selectModalAddCategory,
  selectModalEditCategory,
} from "../../redux/modal/modal.selectors";

const Category = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const {
    collectionCategory,
    isOpenModalAddCategory,
    isOpenModalEditCategory,
    modalAddCategory,
    modalEditCategory,
    deleteCategoryStart,
  } = props;

  const handleModalEdit = (collectionId) => {
    const { fetchCollectionByIdStart } = props;

    modalEditCategory();

    if (!isOpenModalEditCategory) {
      setTimeout(() => {
        fetchCollectionByIdStart(collectionId);
      }, 1000);
    }
  };

  React.useEffect(() => {
    const { fetchCollectionsStart } = props;
    fetchCollectionsStart();
  }, []);

  React.useEffect(() => {
    const dataSource = collectionCategory.map((col) => ({
      key: col.id,
      Category: col.title,
      Photo: col.imageUrl ? (
        <img src={col.imageUrl} width={120} height={120} />
      ) : (
        "-"
      ),
      Action: (
        <>
          <button onClick={() => handleModalEdit(col.id)}>Edit</button>
          {" | "}
          <button onClick={() => deleteCategoryStart(col.id)}>Delete</button>
        </>
      ),
    }));

    setTableData(dataSource);
  }, [collectionCategory]);

  return (
    <div>
      <CategoryHeader>
        <Button onClick={() => modalAddCategory()}>Tambah Kategori</Button>
      </CategoryHeader>
      <Table tableHead={["Kategori", "Photo", "Aksi"]} tableData={tableData} />
      <Modal isOpen={isOpenModalEditCategory} contentLabel="Example Modal">
        <button onClick={handleModalEdit}>close</button>
        <EditCategory />
      </Modal>
      <Modal isOpen={isOpenModalAddCategory} contentLabel="Example Modal">
        <button onClick={() => modalAddCategory()}>close</button>
        <AddCategory />
      </Modal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collectionCategory: selectCollectionsCategory,
  isOpenModalAddCategory: selectModalAddCategory,
  isOpenModalEditCategory: selectModalEditCategory,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  fetchCollectionByIdStart: (collectionId) =>
    dispatch(fetchCollectionByIdStart(collectionId)),
  modalAddCategory: () => dispatch(modalAddCategory()),
  modalEditCategory: () => dispatch(modalEditCategory()),
  deleteCategoryStart: (categoryId) =>
    dispatch(deleteCategoryStart(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
