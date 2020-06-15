import React from "react";
import { connect } from "react-redux";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import Select from "../form-select/form-select.component";

import {
  fetchCheckoutDataStart,
  fetchCheckoutByUserIdStart,
} from "../../redux/checkout/checkout.actions";

import { Container, FilterItem } from "./transaction-filter.styles";
import "./transaction-filter.styles";

const TransactionFilter = ({
  fetchCheckoutByUserIdStart,
  fetchCheckoutDataStart,
  transactionType,
  userId,
  cbHandleFilterPayload,
}) => {
  const [date, setDate] = React.useState([new Date(), new Date()]);
  const [status, setStatus] = React.useState("choose");

  const handleChangeStatus = (e) => {
    const value = e.target.value;

    setStatus(value);
    cbHandleFilterPayload({ status: value, date });

    if (transactionType === "admin") {
      if (value === "choose") {
        fetchCheckoutDataStart();
      } else {
        fetchCheckoutDataStart({ status: value, date });
      }
    } else {
      fetchCheckoutByUserIdStart({ userId, status: value, date });
    }
  };

  const handleChangeDate = (value) => {
    setDate(value);

    if (transactionType === "admin") {
      fetchCheckoutDataStart({ status: status, date: value });
    } else {
      fetchCheckoutByUserIdStart({ userId, status: status, date: value });
    }
  };

  return (
    <Container>
      <FilterItem>
        <Select value={status} onChange={handleChangeStatus} zeroMargin>
          <option value="choose">Semua</option>
          <option value="process">Menunggu Pembayaran</option>
          <option value="paid">Menunggu Konfirmasi Penjual</option>
          <option value="accepted">Pesanan sudah dikirim</option>
          <option value="rejected">Pesanan ditolak</option>
        </Select>
      </FilterItem>
      <FilterItem>
        <DateRangePicker
          value={date}
          onChange={handleChangeDate}
          className="calendar"
        />
      </FilterItem>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCheckoutDataStart: (data) => dispatch(fetchCheckoutDataStart(data)),
  fetchCheckoutByUserIdStart: (data) =>
    dispatch(fetchCheckoutByUserIdStart(data)),
});

export default connect(null, mapDispatchToProps)(TransactionFilter);
