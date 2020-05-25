import styled from "styled-components";

export const DashboardMenuContainer = styled.div`
  display: flex;
`;

export const DashboardMenuItem = styled.div`
  flex: 1;
  width: 32%;
  margin-right: 20px;
  margin-bottom: 40px;
  margin-top: 20px;
  padding: 10px;
  font-size: 24px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #f4f4f4;
  -webkit-box-shadow: -2px 5px 14px -2px rgba(0, 0, 0, 0.48);
  -moz-box-shadow: -2px 5px 14px -2px rgba(0, 0, 0, 0.48);
  box-shadow: -2px 5px 14px -2px rgba(0, 0, 0, 0.48);

  &:last-child {
    margin-right: 0px;
  }
`;
