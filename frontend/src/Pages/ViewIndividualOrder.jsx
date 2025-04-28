import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { Table, Checkbox, Tag, Space } from 'antd';  // Import Ant Design components

import './Pages.css';

const ViewIndividualOrder = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const accesstoken = localStorage.getItem("accesstoken");
  const decode = jwtDecode(accesstoken);
  const socket = useMemo(() => io("http://localhost:4000/orderList", {
    transports: ['websocket'],
  }), []);

  useEffect(() => {
    socket.emit("getUserOrder", id);
    socket.emit("joinRoom", { id: decode.id });
  }, [id, decode.id, socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected");
    });
    socket.on("sendUserOrder", (data) => {
      console.log(data);
      setOrders(data);
    });
    socket.on('receiveOneOrder', (data) => {
      if (data.customer_id === id) {
        setOrders(prev => [data, ...prev]);
      }
      console.log("order data", data);
    });
    socket.on("disconnect", (reason) => {
      console.log(reason);
    });
    return () => {
      socket.off("connect");
      socket.off("sendUserOrder");
      socket.off("receiveOneOrder");
      socket.off("disconnect");
    };
  }, [id, socket]);

  const columns = [
    {
      title: '',
      dataIndex: 'checkbox',
      render: (_, record) => (
        <Checkbox className="flex justify-center items-center" />
      ),
    },
    {
      title: '#Order ID',
      dataIndex: '_id',
      render: (text) => (
        <Link to={`/orders/${text}`} style={{ fontSize: '15px', color: '#57534e' }}>
          {text}
        </Link>
      ),
    },
    {
      title: '#Client',
      dataIndex: 'customerName',
      render: (text) => <span style={{ fontSize: '15px', color: '#57534e' }}>{text}</span>,
    },
    {
      title: 'Product',
      dataIndex: 'product',  // Assuming product is an object or array that needs to be mapped
      render: () => <span>-</span>,  // Placeholder for actual product data
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: () => <span>-</span>,  // Placeholder for actual quantity data
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      render: (status) => (
        <Tag color={status === 'Delivered' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',  // Assuming you have this field in the data
      render: () => <span>-</span>,  // Placeholder for actual arrival time data
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: "100px" }}
      className='layout-shift w-full bg-stone-100 lg:w-[80%]'>
      <div className='flex ml-[5%] max-w-[250px]'>
        <Link to={"/Orders"} className='breadcrumb1'>Orders</Link>
        <Link className='breadcrumb'>View Order</Link>
      </div>

      <div className='rounded-xl border-[1px] border-stone-300 py-5 w-[95%] ml-auto mt-3'>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={false}  // Disable pagination for simplicity (you can add it back if needed)
          style={{ background: 'white', borderRadius: '8px' }}
        />
      </div>
    </motion.div>
  );
};

export default ViewIndividualOrder;
