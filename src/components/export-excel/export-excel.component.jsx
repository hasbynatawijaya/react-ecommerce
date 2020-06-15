import React, { Component } from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExportExcel extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <ExcelFile element={<button>Download Excel</button>}>
          <ExcelSheet data={data} name="Employees">
            <ExcelColumn label="Nama produk" value="name" />
            <ExcelColumn label="Jumlah pembelian" value="quantity" />
            <ExcelColumn
              label="Harga"
              value={(col) => parseFloat(col.price) * col.quantity}
            />
            <ExcelColumn label="Nama Pembeli" value="receiverName" />
            <ExcelColumn label="Kota" value="city" />
            <ExcelColumn label="Provinsi" value="province" />
            <ExcelColumn label="Alamat" value="address" />
          </ExcelSheet>
        </ExcelFile>
      </div>
    );
  }
}

export default ExportExcel;
