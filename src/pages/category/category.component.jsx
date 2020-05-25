import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-modal";

import Table from "../../components/table/table.component";
import AddCategory from "../../components/add-category/add-category.component";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectCollectionsCategory } from "../../redux/shop/shop.selectors";

const Category = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [isModalOpen, setOpenModal] = React.useState(false);
  const { collectionCategory } = props;

  const handleModal = () => {
    setOpenModal(!isModalOpen);
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
          <button onClick={handleModal}>Edit</button>
          {" | "}
          <button>Delete</button>
        </>
      ),
    }));

    setTableData(dataSource);
  }, [collectionCategory]);

  console.log(collectionCategory);

  return (
    <div>
      <Table tableHead={["Kategori", "Photo", "Aksi"]} tableData={tableData} />
      <Modal isOpen={isModalOpen} contentLabel="Example Modal">
        <button onClick={handleModal}>close</button>
        <AddCategory />
      </Modal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collectionCategory: selectCollectionsCategory,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
