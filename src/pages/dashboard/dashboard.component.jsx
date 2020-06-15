import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import BarCharts from "../../components/bar-chart/bar-chart.component";
import PieCharts from "../../components/pie-chart/pie-chart.component";
import LineCharts from "../../components/line-chart/line-chart.component";
import Select from "../../components/form-select/form-select.component";
import Filter from "../../components/transaction-filter/transaction-filter.component";

import { fetchCheckoutDataStart } from "../../redux/checkout/checkout.actions";

import {
  selectCheckoutDataforChart,
  selectCheckoutDataTotalPrice,
  selectItemPurchasedForExcel,
} from "../../redux/checkout/checkout.selectors";

import {
  DashboardContainer,
  DashboardTitle,
  DashboardCartSelection,
} from "./dashboard.styles";
import ExportExcel from "../../components/export-excel/export-excel.component";

const Dashboard = ({
  fetchCheckoutDataStart,
  chartData,
  totalPrice,
  reportData,
}) => {
  const [chartType, setChartType] = React.useState("bar");

  console.log(reportData);

  React.useState(() => {
    fetchCheckoutDataStart({
      status: "choose",
      date: [new Date(), new Date()],
    });
  }, []);

  const handleChart = () => {
    if (chartType === "bar") {
      return <BarCharts data={chartData} />;
    } else if (chartType === "line") {
      return <LineCharts data={chartData} />;
    } else if (chartType === "pie") {
      return <PieCharts data={chartData} />;
    }
  };

  return (
    <DashboardContainer>
      <DashboardTitle>Data Penjualan</DashboardTitle>
      <Filter transactionType="admin" />
      <DashboardCartSelection>
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          label="Tipe Chart"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </Select>
      </DashboardCartSelection>
      <ExportExcel data={reportData} />
      <h3>Total harga : Rp.{totalPrice}</h3>
      {handleChart()}
    </DashboardContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  chartData: selectCheckoutDataforChart,
  totalPrice: selectCheckoutDataTotalPrice,
  reportData: selectItemPurchasedForExcel,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCheckoutDataStart: (data) => dispatch(fetchCheckoutDataStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
