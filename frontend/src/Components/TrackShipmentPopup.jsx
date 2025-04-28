import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Modal, Input, Button, Typography, Alert, Space } from "antd";
import {Package} from "lucide-react"
import axios from "axios";
import { toast } from "react-toastify"; 
const { Title, Text } = Typography;

const TrackShipmentPopup = ({open,trackRef}) => {
    const [setIsOpen,isOpen] = open
    const navigate = useNavigate()
  
  const [trackingId, setTrackingId] = useState("");
  




  const [loading,setLoading] = useState(false)
  const handleGetQuoteClick = async () => {
    setLoading(true);
    

    try {
      // Make an API call to check if the refresh token exists in cookies
      const response = await axios.get('http://localhost:4000/confirm_token', {
        withCredentials: true,  // Ensures cookies are sent with the request
      });

      if (response.status === 200) {
        // Handle success if refresh token exists
        console.log('Refresh token exists and is valid');
        setLoading(false);
        navigate(`/Customer/Tracking?track_id=${trackingId}`);
        // You can proceed with further actions, such as displaying a quote
      }else{
        // Handle case where refresh token does not exist or is invalid
        console.log("You're not logged in");
        setLoading(false);
        toast.warning("Please login to track your shipment")
        // Redirect to login page with trackingId as a query parameter
        navigate(`/login?id=${trackingId}`)
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        // Handle response error from the API (e.g., invalid or missing token)
        
        console.log("You're not logged in");
        setLoading(false);
        toast.warning("Please login to track your shipment")
        setIsOpen(false)
        navigate(`/login?id=${trackingId}`)
        console.log(`Error: ${err.response.data.message}`);
      } else {
        console.log('Error checking refresh token');
      }
    }
  };

  return (
    <div >
      

      <Modal
  open={isOpen}
  onCancel={() => {
    setIsOpen(false);
    setTrackingId("");
  }}
  footer={null}
  centered
  title={
    <div className="text-center text-xl flex gap-3 justify-center font-semibold text-gray-800">
      <Package/> Track Your Shipment
    </div>
  }
>
  <div className="flex flex-col gap-4 mt-4">
    <Input
      placeholder="Enter your Tracking Number (e.g., ILL123456789-SHP)"
      value={trackingId}
      className="h-[42px] border-gray-300 rounded-md shadow-sm"
      onChange={(e) => setTrackingId(e.target.value)}
    />

    <div className="bg-purple-50 border border-purple-300 rounded-md p-4 shadow-sm flex items-start gap-3">
      <span className="text-purple-600 text-xl">
        <i className="ri-check-double-line" />
      </span>
      <div className="text-sm text-gray-700">
        You received your Tracking Number right after requesting a quote.
        <div className="mt-1 text-xs text-gray-500">
          Forgot it? Check your <strong>Quote Confirmation</strong> screen or the <strong>Recent Quotes</strong> tab in your dashboard.
        </div>
      </div>
    </div>

    <Button
      type="primary"
      block
      style={{height:"40px",background:"var(--purple)"}}
      className="bg-purple-600 hover:bg-purple-700 h-[42px] text-white font-semibold"
      onClick={handleGetQuoteClick}
    >
      {loading ? "Loading":" Track Now"}
    </Button>

    <Button
      danger
      block
      
      style={{height:"40px"}}
      onClick={() => {
        setIsOpen(false);
        setTrackingId("");
      }}
    >
      Cancel
    </Button>
  </div>
</Modal>

    </div>
  );
};

export default TrackShipmentPopup;
