import React, { useState } from "react";

const TrackShipmentPopup = ({open,trackRef}) => {
    const [setIsOpen,isOpen] = open
  
  const [trackingId, setTrackingId] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState(null);

  const handleTrackShipment = () => {
    // Simulate API call to fetch shipment status
    if (trackingId) {
      setShipmentStatus({
        id: trackingId,
        status: "In Transit",
        estimatedDelivery: "2025-01-15",
      });
    }
  };

  return (
    <div >
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        Track Shipment
      </button>

      {isOpen && (
        <div  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={trackRef}   className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Track Your Shipment</h2>

            <input
              type="text"
              placeholder="Enter Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full px-3 py-3 border rounded mb-4"
            />

<section className='border-2 border-orange-400 border-dashed rounded py-2 px-[2%]'>
           <span style={{fontWeight:"600",fontSize:"16px",color:"black"}}>NB:</span> Your Consignment No. is the same as the Tracking number, which is sent to the email address you submitted for registration. 

The tracking number is a 13-digit code which starts with the prefix “ILL” and ends with “-SHP”

If you cannot find the email in your inbox, please check your Spam. Kindly get in touch with us if you still have not received your tracking number
        </section>

            <button
              className="bg-purple-500 mt-4 text-white px-4 py-3 rounded hover:bg-purple-600 w-full"
              onClick={handleTrackShipment}
            >
              Track
            </button>

            {shipmentStatus && (
              <div className="mt-4 bg-gray-100 p-3 rounded">
                <p>
                  <span className="font-bold">Tracking ID:</span>{" "}
                  {shipmentStatus.id}
                </p>
                <p>
                  <span className="font-bold">Status:</span>{" "}
                  {shipmentStatus.status}
                </p>
                <p>
                  <span className="font-bold">Estimated Delivery:</span>{" "}
                  {shipmentStatus.estimatedDelivery}
                </p>
              </div>
            )}
           
            <button
              className="mt-4 bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600 w-full"
              onClick={() => {
                setIsOpen(false);
                setTrackingId("");
                setShipmentStatus(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackShipmentPopup;
