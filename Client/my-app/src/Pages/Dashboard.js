import React from 'react'
import {motion} from 'framer-motion'
const Dashboard = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >

  <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Shipment
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 space-y-4">
          {/* Analytics Summary */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Total Shipments</h2>
              <p className="text-3xl font-bold text-blue-500">1,234</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
              <p className="text-3xl font-bold text-yellow-500">87</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Delivered</h2>
              <p className="text-3xl font-bold text-green-500">1,147</p>
            </div>
          </section>

          {/* Recent Orders */}
          <section className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">#00123</td>
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4 text-yellow-500">Pending</td>
                  <td className="py-2 px-4">2025-01-18</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">#00122</td>
                  <td className="py-2 px-4">Jane Smith</td>
                  <td className="py-2 px-4 text-green-500">Delivered</td>
                  <td className="py-2 px-4">2025-01-17</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Shipment Tracking */}
          <section className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Active Shipments</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Shipment #12345</span>
                <span className="text-blue-500">In Transit</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipment #12344</span>
                <span className="text-yellow-500">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipment #12343</span>
                <span className="text-green-500">Delivered</span>
              </div>
            </div>
            </section>
            </main>
            </div>
         

    </motion.div>
  )
}

export default Dashboard
