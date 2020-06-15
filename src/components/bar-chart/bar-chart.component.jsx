import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarCharts = ({ data }) => {
  return (
    <BarChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" stackId="a" fill="#8884d8" />
    </BarChart>
  );
};

export default BarCharts;
