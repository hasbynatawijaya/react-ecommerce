import React from "react";
import { withRouter } from "react-router-dom";

import BcaLogo from "../../assets/kisspng-bank-central-asia-logo-bca-finance-business-logo-bank-central-asia-bca-format-cdr-amp-pn-5b63687e470088.3520223915332414702908.jpg";

import Button from "../../components/custom-button/custom-button.component";

import {
  Container,
  BankNumber,
  Divider,
  ImageContainer,
  ButtonContainer,
} from "./checkout-complete.styles";

const CheckoutComplete = ({ history }) => {
  return (
    <Container>
      <h1>Pesanan selesai silahkan selesaikan pembayaran segera</h1>
      <Divider />
      <h3>Pembayaran dapat di transfer ke rekening</h3>
      <ImageContainer>
        <img width={200} src={BcaLogo}></img>
      </ImageContainer>
      <BankNumber>0841778388</BankNumber>
      <span>
        <i>
          *Segera lakukan upload bukti transfer di menu Transaksi apabila sudah
          melakukan pembayaran
        </i>
      </span>
      <ButtonContainer>
        <Button onClick={() => history.push(`/transaction`)}>
          Lihat Transaksi
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default withRouter(CheckoutComplete);
