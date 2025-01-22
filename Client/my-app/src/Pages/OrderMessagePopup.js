import { SendOutlined } from '@ant-design/icons'
import React,{useState,useEffect} from 'react'

const OrderMessagePopup = (props) => {
   const[message,setMessage]= useState("")

   const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSendEmail = () => {
    if (!emailData.recipient || !emailData.subject || !emailData.message) {
      alert("Please fill in all fields before sending.");
      return;
    }

    // Simulate email sending (Replace with your email API logic)
    alert(`Email sent to ${emailData.recipient} with subject "${emailData.subject}"`);
     // Close the popup after sending
    setEmailData({ recipient: "", subject: "", message: "" }); // Reset form
  };

   
    
  return (
    <>
    {props.msgPop&&
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* Popup Content */}
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Send Email</h2>

            {/* Recipient Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                To:
              </label>
              <input
                type="email"
                name="recipient"
                value={emailData.recipient}
                onChange={handleChange}
                placeholder="Recipient Email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleChange}
                placeholder="Email Subject"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Message:
              </label>
              <textarea
                name="message"
                value={emailData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="5"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default OrderMessagePopup