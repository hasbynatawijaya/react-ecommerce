import styled from "styled-components";

export const CheckoutPageContainer = styled.div`
  width: 70%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 32px;
  button {
    margin-left: auto;
    margin-top: 50px;
  }
`;

export const CheckoutHeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

export const HeaderBlockContainer = styled.div`
  text-transform: capitalize;
  width: 16.6%;
`;

export const TotalContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export const WarningContainer = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  color: red;
`;

export const ButtonCheckoutContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const EmptyCartContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  font-size: 20px;
  text-align: center;
  
`;
