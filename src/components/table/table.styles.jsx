import styled from "styled-components";

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align:top;
  
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;

export const TableData = styled.td`
  padding: 8px;
`;

export const TableDataEmpty = styled.td`
  padding: 50px;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
`;

export const TableHead = styled.th`
  padding: 8px;
`;
