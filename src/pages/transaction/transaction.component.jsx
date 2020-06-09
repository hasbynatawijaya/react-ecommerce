import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-modal";
import ModalImage from "react-modal-image";

import checkoutStatusConvert from "../../utils/convert-checkout-status";

import Table from "../../components/table/table.component";
import Button from "../../components/custom-button/custom-button.component";

import "./transaction.styles.scss";

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
} from "./transaction.styles";

import { fetchCheckoutDataStart } from "../../redux/checkout/checkout.actions";
import { modalUploadServiceNumber } from "../../redux/modal/modal.actions";

import { selectCheckoutData } from "../../redux/checkout/checkout.selectors";
import { selectModalServiceNumber } from "../../redux/modal/modal.selectors";
import ServiceNumber from "../../components/service-number/service-number.component";

const Transaction = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [serviceNumber, setServiceNumber] = React.useState("");
  const [transactionId, setTransactionId] = React.useState(null);

  const {
    checkoutData,
    isOpenModalServiceNumber,
    modalUploadServiceNumber,
  } = props;

  const handleModalServiceNumber = (serviceNumber, transactionId) => {
    modalUploadServiceNumber();

    setServiceNumber(serviceNumber);
    setTransactionId(transactionId);
  };

  React.useEffect(() => {
    const { fetchCheckoutDataStart } = props;
    fetchCheckoutDataStart();
  }, []);

  React.useEffect(() => {
    const dataSource = checkoutData.map((col) => ({
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
              {col.city.city}, {col.provinceObj.province}
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
          <AddressTitleText>Bukti Transfer</AddressTitleText>
          {col.transferPhotoImageUrl ? (
            <>
              <ModalImage
                className="popup-image-small"
                small={col.transferPhotoImageUrl}
                large={col.transferPhotoImageUrl}
                alt="Bukti Transfer"
              />
              <i>*klik gambar untuk memperbesar</i>{" "}
            </>
          ) : (
            <AddressContentText>
              <i>*Pesanan belum dibayar</i>
            </AddressContentText>
          )}
        </>
      ),
      serviceNumber: (
        <>
          <div style={{ cursor: "now" }}></div>
          <Button
            style={{
              cursor: col.status === "process" ? "not-allowed" : "pointer",
            }}
            onClick={() =>
              col.status === "process"
                ? null
                : handleModalServiceNumber(col.serviceNumber, col.id)
            }
          >
            {col.status === "accepted" ? "Edit No.Resi" : "Setujui Pesanan"}
          </Button>
        </>
      ),
    }));

    setTableData(dataSource);
  }, [checkoutData]);

  return (
    <div>
      <Table
        tableHead={[
          "Barang",
          "Pengiriman",
          "Kurir",
          "Total Harga",
          "Status",
          "",
        ]}
        tableData={tableData}
      />
      <Modal isOpen={isOpenModalServiceNumber}>
        <button onClick={modalUploadServiceNumber}>close</button>
        <ServiceNumber
          serviceNumber={serviceNumber}
          transactionId={transactionId}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  checkoutData: selectCheckoutData,
  isOpenModalServiceNumber: selectModalServiceNumber,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCheckoutDataStart: () => dispatch(fetchCheckoutDataStart()),
  modalUploadServiceNumber: () => dispatch(modalUploadServiceNumber()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
