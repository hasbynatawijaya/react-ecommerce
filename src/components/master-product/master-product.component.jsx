import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-modal";

import Table from "../../components/table/table.component";
import Button from "../../components/custom-button/custom-button.component";
import FormSelect from "../../components/form-select/form-select.component";
import AddProduct from "../../components/add-product/add-product.component";
import EditProduct from "../../components/edit-product/edit-product.component";

import { MasterProductHeader } from "./master-product.styles";

import {
  fetchCollectionsStart,
  fetchCollectionByIdStart,
  fetchCollectionByProductIdStart,
  deleteCollectionsStart,
} from "../../redux/shop/shop.actions";
import {
  modalAddProduct,
  modalEditProduct,
} from "../../redux/modal/modal.actions";
import {
  selectCollectionsCategory,
  selectCollectionById,
} from "../../redux/shop/shop.selectors";
import {
  selectModalAddProduct,
  selectModalEditProduct,
} from "../../redux/modal/modal.selectors";

const MasterProduct = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [category, setCategory] = React.useState("choose");
  const {
    collectionCategory,
    deleteCollectionsStart,
    collectionById,
    modalAddProduct,
    modalEditProduct,
    isOpenModalAddProduct,
    isOpenModalEditProduct,
  } = props;

  React.useEffect(() => {
    const { fetchCollectionsStart } = props;
    fetchCollectionsStart();
  }, []);

  const handleCategory = (event) => {
    const { value } = event.target;
    const { fetchCollectionByIdStart } = props;

    setCategory(value);
    fetchCollectionByIdStart(value);
  };

  const handleModalEdit = (id) => {
    const { fetchCollectionByProductIdStart } = props;

    modalEditProduct();

    if (!isOpenModalEditProduct) {
      setTimeout(() => {
        fetchCollectionByProductIdStart(id);
      }, 1000);
    }
  };
  React.useEffect(() => {
    const dataSource = (collectionById ? collectionById.items : []).map(
      (col) => ({
        key: col.id,
        Photo: col.imageUrl ? (
          <img src={col.imageUrl} width={120} height={120} />
        ) : (
          "-"
        ),
        Name: col.name,
        Price: col.price,
        Stock: col.stock,
        Action: (
          <>
            <button onClick={() => handleModalEdit(col.id)}>Edit</button>
            {" | "}
            <button
              onClick={() =>
                deleteCollectionsStart({ id: col.id, categoryId: category })
              }
            >
              Delete
            </button>
          </>
        ),
      })
    );

    setTableData(dataSource);
  }, [collectionById]);

  return (
    <div>
      <MasterProductHeader>
        <Button onClick={() => modalAddProduct()}>Tambah Produk</Button>
      </MasterProductHeader>
      <FormSelect
        value={category}
        label="Kategori produk"
        name="category"
        onChange={handleCategory}
      >
        <option value="choose">Pilih kategori produk</option>
        {collectionCategory.map(({ id, title }) => (
          <option value={id}>{title}</option>
        ))}
      </FormSelect>
      <Table
        tableHead={["Photo", "Nama Produk", "Harga", "Stok", "Aksi"]}
        tableData={tableData}
      />
      <Modal isOpen={isOpenModalAddProduct} contentLabel="Example Modal">
        <button onClick={() => modalAddProduct()}>close add</button>
        <AddProduct />
      </Modal>
      <Modal isOpen={isOpenModalEditProduct} contentLabel="Example Modal">
        <button onClick={() => modalEditProduct()}>close edit</button>
        <EditProduct />
      </Modal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collectionCategory: selectCollectionsCategory,
  collectionById: selectCollectionById,
  isOpenModalAddProduct: selectModalAddProduct,
  isOpenModalEditProduct: selectModalEditProduct,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  fetchCollectionByIdStart: (collectionId) =>
    dispatch(fetchCollectionByIdStart(collectionId)),
  fetchCollectionByProductIdStart: (productId) =>
    dispatch(fetchCollectionByProductIdStart(productId)),
  modalAddProduct: () => dispatch(modalAddProduct()),
  modalEditProduct: () => dispatch(modalEditProduct()),
  deleteCollectionsStart: (data) => dispatch(deleteCollectionsStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterProduct);
