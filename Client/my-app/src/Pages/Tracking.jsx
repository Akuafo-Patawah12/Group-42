import React, { useState } from "react";

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState("");

  const handleTracking = () => {
    if (!trackingNumber) {
      setError("Please enter a valid tracking number.");
      return;
    }

    // Simulating API call (replace with actual API logic)
    const mockData = {
      number: trackingNumber,
      status: "In Transit",
      estimatedDelivery: "January 22, 2025",
      checkpoints: [
        { date: "January 16, 2025", location: "Warehouse A", status: "Dispatched" },
        { date: "January 17, 2025", location: "Port City", status: "Loaded onto Ship" },
        { date: "January 18, 2025", location: "Customs Check", status: "Cleared" },
      ],
    };

    setTrackingInfo(mockData);
    setError("");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-24 w-[80%] ml-auto">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Track Your Shipment</h1>
        <p className="text-gray-600 text-lg">
          Enter your tracking number to get real-time updates on your shipment status.
        </p>
      </header>

      {/* Tracking Input */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter Tracking Number"
            className="w-full md:w-2/3 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button
            onClick={handleTracking}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Track
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Tracking Information */}
      {trackingInfo && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tracking Details</h2>
          <p className="text-gray-600 mb-2">
            <span className="font-bold">Tracking Number:</span> {trackingInfo.number}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-bold">Current Status:</span> {trackingInfo.status}
          </p>
          <p className="text-gray-600 mb-6">
            <span className="font-bold">Estimated Delivery:</span>{" "}
            {trackingInfo.estimatedDelivery}
          </p>

          {/* Checkpoints */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Shipment Checkpoints</h3>
            <ul className="space-y-4">
              {trackingInfo.checkpoints.map((checkpoint, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="text-blue-500 font-bold">{checkpoint.date}</div>
                  <div>
                    <p className="text-gray-800 font-semibold">{checkpoint.location}</p>
                    <p className="text-gray-600">{checkpoint.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
