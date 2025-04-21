import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Modal, Input, Button, Typography, Alert, Space } from "antd";

const { Title, Text } = Typography;

const TrackShipmentPopup = ({open,trackRef}) => {
    const [setIsOpen,isOpen] = open
    const navigate = useNavigate()
  
  const [trackingId, setTrackingId] = useState("");
  

  const handleTrackShipment = () => {
    // Simulate API call to fetch shipment status
    navigate(`/Customer/Tracking/?track_id=${trackingId}`)
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
      title="Track Your Shipment"
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Input
          placeholder="Enter Tracking ID"
          value={trackingId}
          className="h-[40px]"
          onChange={(e) => setTrackingId(e.target.value)}
        />

        <Alert
          type="info"
          showIcon
          style={{background:"#f5f3ff",border:"2px solid #d8b4fe"}}
          className="border-2 border-purple-300 bg-purple-50"
          message={
            <div>
              <Text strong>NB:</Text> Your Consignment No. is the same as the Tracking number, which is sent to the email address you submitted for registration. <br />
              <br />
              The tracking number is a 13-digit code which starts with the prefix <Text code>“ILL”</Text> and ends with <Text code>“-SHP”</Text>.
              <br />
              <br />
              If you cannot find the email in your inbox, please check your Spam. Kindly get in touch with us if you still have not received your tracking number.
            </div>
          }
        />

        <Button type="primary" style={{background:"var(--purple)",height:"40px"}} className="bg-purple-500" block onClick={handleTrackShipment}>
          Track
        </Button>

        

        <Button danger block onClick={() => {
          setIsOpen(false);
          setTrackingId("");
          
        }}>
          Close
        </Button>
      </Space>
    </Modal>
    </div>
  );
};

export default TrackShipmentPopup;
