import React from "react";
import 'chart.js/auto';
import { Line } from "react-chartjs-2";

const SalesChart = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default SalesChart;
