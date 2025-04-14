import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, MessageOutlined, CopyOutlined } from '@ant-design/icons';
import { Button,Form, Input, Table,Modal,message, Space, Tag } from 'antd';
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

  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false)

  const onStart = (containerNumber) => {
    console.log("Start shipment for:", containerNumber);
    // Send this to your backend or Socket.IO here
  };

  const handleStart = async () => {
    try {
      const values = await form.validateFields();
      onStart(values.containerNumber);
      form.resetFields();
      setModalOpen(false)
      message.success("Shipment started!");
    } catch (error) {
      // Validation error
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className='mt-[100px] w-full bg-stone-100 lg:w-[80%] ml-auto'
    >
      
      <div className="flex flex-col w-[90%] mb-3 mx-auto sm:flex-row justify-between items-center gap-4  px-4 py-3 bg-white rounded-2xl shadow-sm border">
  <button
    onClick={()=> setModalOpen(true)}
    className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-400 transition-all text-sm font-medium"
  >
    Start shipment
  </button>

  <input
    type="text"
    placeholder="Search by Container Number..."
   
    className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


<Modal
      title="Start Shipment"
      open={modalOpen}
      onCancel={() => {
        form.resetFields();
        setModalOpen(false)
      }}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Container Number"
          name="containerNumber"
          rules={[{ required: true, message: 'Please enter a container number' }]}
        >
          <Input placeholder="e.g., CNT1234567" />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={()=> setModalOpen(false)}>Cancel</Button>
          <Button type="primary" onClick={handleStart}>
            Start
          </Button>
        </div>
      </Form>
    </Modal>


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
