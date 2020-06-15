import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const PieCharts = ({ data }) => {
  return (
    <div>
      <PieChart width={800} height={400}>
        <Pie
          dataKey="quantity"
          isAnimationActive={false}
          data={data}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieCharts;
