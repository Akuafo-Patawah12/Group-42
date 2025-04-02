import { useState } from "react";
import "./LogisticsReport.css"; // Assuming you have a CSS file for styling

const LogisticsReport = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="logistics-popup show">
      <div className="popup-content">
        <h3 className="popup-title">Logistics Report</h3>
        <p><strong>Tracking No:</strong> {order.tracking_no || "N/A"}</p>
        <p><strong>Status:</strong> {order.Status || "Pending"}</p>
        <p><strong>CBM</strong> {order.cbm || "N/A"}</p>
        <p><strong>Location:</strong> {order.location || "Not Available"}</p>
        <p><strong>Quantity:</strong> {order.qty || "Unknown"}</p>
        <p><strong>Total Amount:</strong> {order.totalAmount ? `$${order.totalAmount}` : "N/A"}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LogisticsReport;