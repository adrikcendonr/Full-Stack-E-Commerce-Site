import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import SalesChart from "./SalesChart";
import { getNumberOfActiveUsers, getNumberofCancelledOrders, getTotalRevenue, getNumberofActiveOrders, getSales } from "../api";
import Loader from "../utils/Loader";
import { convertMonthNumberToName } from "../utils";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [numberOfUsers, setNumberOfUsers] = useState();
  const [numberOfCancelledOrders, setNumberOfCancelledOrders] = useState();
  const [numberOfActiveOrders, setNumberOfActiveOrders] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [sales, setSales] = useState();
  
  const month = convertMonthNumberToName(sales?.map((sale) => sale.month)?.[0])

  const chartData = {
    labels: [month],
    datasets: [
      {
        label: "Sales",
        data: sales?.map((sale) => sale.order_count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // higher order promise resolve

  const fetchData = async (fetchFunc, setDataFunc) => {
    const { data } = await fetchFunc();
    setDataFunc(data);
  };
  
  const loadDashboardData = async () => {
    setLoading(true);
    await Promise.all([
      fetchData(getNumberOfActiveUsers, setNumberOfUsers),
      fetchData(getNumberofCancelledOrders, setNumberOfCancelledOrders),
      fetchData(getNumberofActiveOrders, setNumberOfActiveOrders),
      fetchData(getTotalRevenue, setTotalRevenue),
      fetchData(getSales, setSales)
    ]);
    setLoading(false);
  };
  
  useEffect(() => {
    loadDashboardData();
  }, []);

  if(loading) return <Loader />

  return (
    <React.Fragment>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Total Orders" value={`${numberOfActiveOrders || 0}`} bgColor="bg-green-500" />
          <Card title="Cancelled Orders" value={`${numberOfCancelledOrders || 0}`} bgColor="bg-red-500" />
          <Card title="Revenue" value={`$${Math.round(totalRevenue) || 0}`} bgColor="bg-blue-500" />
          <Card title="Active Users" value={`${numberOfUsers || 0}`} bgColor="bg-indigo-500" />
        </div>
        <div className="mt-8 bg-white p-6 rounded-md shadow">
          <h3 className="text-xl font-semibold mb-4">Monthly Sales</h3>
          <SalesChart data={chartData} options={chartOptions} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
