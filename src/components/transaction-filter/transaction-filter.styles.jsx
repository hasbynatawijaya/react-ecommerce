import styled, { css } from "styled-components";

export const test = css`
  height: 200px;
  background-color: red;
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 20px 0px;
  padding: 20px 0;
`;

export const FilterItem = styled.div`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;
