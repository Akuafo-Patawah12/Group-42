import React from "react";

const Invoice = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-24 w-[80%] ml-auto">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Invoice</h1>
        <p className="text-gray-600 text-lg">Your comprehensive invoice summary</p>
      </header>

      {/* Invoice Container */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Company and Client Info */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Company Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">Company Name</h2>
            <p className="text-gray-600">123 Logistics Lane</p>
            <p className="text-gray-600">City, State, ZIP</p>
            <p className="text-gray-600">Phone: +123 456 789</p>
            <p className="text-gray-600">Email: support@company.com</p>
          </div>

          {/* Client Info */}
          <div className="text-right mt-6 md:mt-0">
            <h2 className="text-lg font-bold text-gray-800">Bill To:</h2>
            <p className="text-gray-600">Client Name</p>
            <p className="text-gray-600">789 Client Avenue</p>
            <p className="text-gray-600">City, State, ZIP</p>
            <p className="text-gray-600">Phone: +987 654 321</p>
            <p className="text-gray-600">Email: client@domain.com</p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="flex justify-between mb-8">
          <div>
            <p className="text-gray-600">
              <span className="font-bold">Invoice #:</span> 000123
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Date:</span> January 18, 2025
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">
              <span className="font-bold">Due Date:</span> January 28, 2025
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Unit Price</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Service 1</td>
                <td className="border border-gray-300 px-4 py-2">Air Freight</td>
                <td className="border border-gray-300 px-4 py-2 text-right">1</td>
                <td className="border border-gray-300 px-4 py-2 text-right">$500</td>
                <td className="border border-gray-300 px-4 py-2 text-right">$500</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Service 2</td>
                <td className="border border-gray-300 px-4 py-2">Sea Freight</td>
                <td className="border border-gray-300 px-4 py-2 text-right">2</td>
                <td className="border border-gray-300 px-4 py-2 text-right">$300</td>
                <td className="border border-gray-300 px-4 py-2 text-right">$600</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mt-8">
          <div className="w-full md:w-1/3 text-gray-800">
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>$1,100</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax (10%):</span>
              <span>$110</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total:</span>
              <span>$1,210</span>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.print()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
