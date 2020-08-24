import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-modal";
import ModalImage from "react-modal-image";

import "./user-transaction.styles.scss";

import checkoutStatusConvert from "../../utils/convert-checkout-status";

import Table from "../../components/table/table.component";
import Button from "../../components/custom-button/custom-button.component";
import UploadTransferProof from "../../components/upload-transfer-proof/upload-transfer-proof.component";
import Filter from "../../components/transaction-filter/transaction-filter.component";

import {
  Header,
  ItemListContainer,
  ItemListContent,
  ItemListImage,
  ItemListTitleText,
  ItemListText,
  ItemList,
  AddressContainer,
  AddressTitleText,
  AddressContentText,
  TotalPriceText,
  StatusText,
} from "./user-transaction.styles";

import { fetchCheckoutByUserIdStart } from "../../redux/checkout/checkout.actions";
import { modalUploadTransferProof } from "../../redux/modal/modal.actions";

import { selectCheckoutDataByUserId } from "../../redux/checkout/checkout.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectModalUploadTransferProof } from "../../redux/modal/modal.selectors";
import CustomModal from "../../components/custom-modal/custom-modal.component";

const UserTransaction = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [transactionId, setTransactionId] = React.useState(null);
  const [imagePopUp, setImagePopup] = React.useState({
    isOpen: false,
    src: "",
  });
  const [filterPayload, setFilterPayload] = React.useState({
    status: "choose",
    date: [new Date(), new Date()],
  });

  const {
    checkoutDataByUserId,
    isOpenModalUploadTransferProof,
    modalUploadTransferProof,
    fetchCheckoutByUserIdStart,
    currentUser,
  } = props;

  const handleOpenModalUpload = (transactionId) => {
    modalUploadTransferProof();

    setTransactionId(transactionId);
  };

  const handleFilterPayload = (payload) => {
    setFilterPayload(payload);
  };

  React.useEffect(() => {
    fetchCheckoutByUserIdStart({
      userId: currentUser.id,
      status: "choose",
      date: [new Date(), new Date()],
    });
  }, []);

  React.useEffect(() => {
    const dataSource = checkoutDataByUserId.map((col) => ({
      key: col.id,
      items: (
        <ItemListContainer>
          {col.items.map((item) => {
            return (
              <ItemListContent>
                <ItemListImage>
                  <img src={item.imageUrl} width={120} height={120} />
                </ItemListImage>
                <ItemList>
                  <ItemListTitleText>{item.name}</ItemListTitleText>
                  <ItemListText>
                    {item.quantity} Barang ({item.weight}g) @ Rp.{item.price}
                  </ItemListText>
                </ItemList>
              </ItemListContent>
            );
          })}
        </ItemListContainer>
      ),
      address: (
        <>
          <AddressContainer>
            <AddressTitleText>Penerima</AddressTitleText>
            <AddressContentText>{col.name}</AddressContentText>
            <AddressContentText>{col.phoneNumber}</AddressContentText>
          </AddressContainer>
          <AddressContainer>
            <AddressTitleText>Alamat</AddressTitleText>
            <AddressContentText>{col.address}</AddressContentText>
            <AddressContentText>
              {col.city}, {col.province}
            </AddressContentText>
          </AddressContainer>
          <AddressContainer>
            <AddressTitleText>Nomor Resi</AddressTitleText>
            <AddressContentText>
              {col.serviceNumber ? col.serviceNumber : "-"}
            </AddressContentText>
          </AddressContainer>
        </>
      ),
      courier: (
        <>
          <AddressContainer>
            <AddressTitleText>Paket Pengiriman</AddressTitleText>
            <AddressContentText>
              {col.courier.toUpperCase()} - {col.shippingPackageObj.service}
            </AddressContentText>
            <AddressContentText>
              (Rp.{col.shippingPackageObj.cost})
            </AddressContentText>
          </AddressContainer>
        </>
      ),
      totalPrice: <TotalPriceText>Rp.{col.totalPrice}</TotalPriceText>,
      status: (
        <>
          <StatusText>{checkoutStatusConvert(col.status)}</StatusText>
          {col.status === "process" ? (
            <Button onClick={() => handleOpenModalUpload(col.id)}>
              Upload Bukti Transfer
            </Button>
          ) : (
            <>
              <AddressTitleText>Bukti Transfer</AddressTitleText>
              <ModalImage
                className="popup-image-small"
                small={col.transferPhotoImageUrl}
                large={col.transferPhotoImageUrl}
                alt="Bukti Transfer"
              />
              <i>*klik gambar untuk memperbesar</i>
            </>
          )}
        </>
      ),
    }));

    setTableData(dataSource);
  }, [checkoutDataByUserId]);

  return (
    <div>
      <Filter
        transactionType="user"
        userId={currentUser.id}
        cbHandleFilterPayload={handleFilterPayload}
      />
      <Table
        tableHead={["Barang", "Pengiriman", "Kurir", "Total Harga", "Status"]}
        tableData={tableData}
      />
      {/* <Modal isOpen={isOpenModalUploadTransferProof}>
        <button onClick={modalUploadTransferProof}>close</button>
        <UploadTransferProof
          transactionId={transactionId}
          filterPayload={filterPayload}
        />
      </Modal> */}
      <CustomModal
        fullWidth={false}
        maxWidth={"sm"}
        open={isOpenModalUploadTransferProof}
        handleClose={modalUploadTransferProof}
        title="Upload bukti transfer untuk transaksi anda"
      >
        <UploadTransferProof
          transactionId={transactionId}
          filterPayload={filterPayload}
        />
      </CustomModal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  checkoutDataByUserId: selectCheckoutDataByUserId,
  currentUser: selectCurrentUser,
  isOpenModalUploadTransferProof: selectModalUploadTransferProof,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCheckoutByUserIdStart: (userId) =>
    dispatch(fetchCheckoutByUserIdStart(userId)),
  modalUploadTransferProof: () => dispatch(modalUploadTransferProof()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTransaction);
