import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, MessageOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Input, Table, Space, Tag } from 'antd';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import OrderMessagePopup from './OrderMessagePopup';

const Orders = () => {
  const accesstoken = localStorage.getItem('accesstoken');
  const decode = jwtDecode(accesstoken);
  const socket = useMemo(() => io('http://localhost:4000/orderList', { transports: ['websocket'] }), []);
  const messageSocket = useMemo(() => io('http://localhost:4000/message', { transports: ['websocket'] }), []);
  
  const [orders, setOrders] = useState([]);
  const [checked, setChecked] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [msgPop, setMsgPop] = useState(false);
  const [receipient, setReceipient] = useState('');
  
  useEffect(() => {
    socket.emit('joinRoom', { id: decode.id });
    socket.emit('clientOrders');
    messageSocket.on('connection', () => console.log('connected to the message namespace'));
    messageSocket.on('disconnect', (reason) => console.log(reason));

    return () => {
      messageSocket.off('connection');
      socket.off('connect');
      socket.off('receivedOrder');
      socket.off('orderDeleted');
      socket.off('SendShippment');
      socket.off('disconnect');
      socket.off('getAllOrders');
    };
  }, [socket, messageSocket, decode.id]);

  useEffect(() => {
    socket.on('getAllOrders', (data) => {
      setOrders(data);
    });

    socket.on('receivedOrder', (data) => {
      setOrders((prev) => [data, ...prev]);
    });

    socket.on('orderDeleted', (data) => {
      setOrders((prev) => prev.filter((order) => order._id !== data));
    });

    socket.on('SendShippment', (data) => {
      setOrders((prev) => prev.map((order) => (order._id === data.order_id ? { ...order, Status: data.status } : order)));
    });
  }, [socket]);

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleDelete = (orderId, customerId) => {
    socket.emit('deleteOrder', { orderId, customerId });
  };

  const handleSendMessage = (e, message) => {
    e.preventDefault();
    messageSocket.emit('sendMessage', {
      Sender_id: decode.id,
      receipient_id: receipient,
      message,
    });
  };

  const messagePop = (receipient_id) => {
    setMsgPop(!msgPop);
    setReceipient(receipient_id);
  };

  const columns = [
    {
      title: '#Order ID',
      dataIndex: '_id',
      key: 'order_id',
      render: (text, record) => (
        <Space>
          <Link to={`/Orders/View_Order/${record.customer_id}`}>{text}</Link>
          <CopyOutlined onClick={() => navigator.clipboard.writeText(record._id)} />
        </Space>
      ),
    },
    {
      title: '#Client',
      dataIndex: 'customerName',
      key: 'client',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Delivered':
            color = 'green';
            break;
          case 'In Transit':
            color = 'orange';
            break;
          case 'Pending':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrival_time',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<MessageOutlined />}
            onClick={() => messagePop(record.customer_id)}
            type="link"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id, record.customer_id)}
            type="link"
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className='mt-[100px] w-full bg-stone-100 lg:w-[80%] ml-auto'
    >
      <Button className="mb-4" type="primary">
        #Orders
      </Button>
      <Space direction="vertical" className="filters" style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Filter orders"
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: 200 }}
        />
        <Input
          list="activities"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Filter by activity"
          style={{ width: 200 }}
        />
        <datalist id="activities">
          {['#All', '#Delivered', '#In Transit', '#Pending'].map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </Space>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      <OrderMessagePopup msgPop={msgPop} sendMessage={handleSendMessage} />
    </motion.div>
  );
};

export default Orders;
