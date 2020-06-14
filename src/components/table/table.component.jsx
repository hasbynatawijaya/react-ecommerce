import React from "react";
import {
  TableContainer,
  TableData,
  TableHead,
  TableRow,
  TableDataEmpty,
} from "./table.styles";

const Table = (props) => {
  const { tableHead, tableData } = props;

  return (
    <div>
      {/* &#10005; */}
      <TableContainer>
        <TableRow>
          {tableHead.map((title) => (
            <>
              <TableHead>{title}</TableHead>
            </>
          ))}
        </TableRow>
        {tableData.length === 0 && (
          <TableRow>
            <TableDataEmpty colSpan={tableHead.length}>
              Data tidak di temukan
            </TableDataEmpty>
          </TableRow>
        )}
        {tableData.map((data) => {
          return (
            <TableRow key={data.key}>
              {Object.keys(data).map(
                (key) => key !== "key" && <TableData>{data[key]}</TableData>
              )}
            </TableRow>
          );
        })}
      </TableContainer>
    </div>
  );
};

export default Table;
