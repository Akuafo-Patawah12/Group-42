import React from "react";
import BarChart from "../Components/Chartjs/BarChart";
import LineChart from "../Components/Chartjs/LineChart";


const AnalyticsPage = () => {
  

  // Data for Bar Chart (Freight Costs by Region)
  const freightCostsData = {
    labels: ["North America", "Europe", "Asia", "Australia", "Africa"],
    datasets: [
      {
        label: "Freight Costs ($)",
        data: [4000, 3500, 4500, 3000, 2500],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderWidth: 1,
      },
    ],
  };

  // Data for Pie Chart (Delivery Status Breakdown)
  const deliveryStatusData = {
    labels: ["Delivered", "In Transit", "Delayed", "Canceled"],
    datasets: [
      {
        data: [65, 25, 8, 2],
        backgroundColor: ["#4BC0C0", "#FFCE56", "#FF6384", "#9966FF"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#9966FF"],
      },
    ],
  };

  return (
    <div className="p-6 mt-[90px] bg-stone-100 space-y-6 lg:w-[80%] ml-auto">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* KPI Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold">Total Shipments</h3>
          <p className="text-2xl font-bold">1,245</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold">Successful Deliveries</h3>
          <p className="text-2xl font-bold">1,102</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold">Pending Shipments</h3>
          <p className="text-2xl font-bold">143</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold">Average Freight Cost</h3>
          <p className="text-2xl font-bold">$1,530</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       

        {/* Bar Chart */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Freight Costs by Region</h2>
          <BarChart Data={freightCostsData} />
        </div>

        {/* Pie Chart */}
        <div className="p-4 bg-white rounded-lg shadow-md col-span-2 md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Delivery Status Breakdown</h2>
          <LineChart Data={deliveryStatusData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
