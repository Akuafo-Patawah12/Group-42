import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pencil } from "lucide-react";
import { DeleteOutlined, MessageOutlined, CopyOutlined } from '@ant-design/icons';
import { Button,Form, Input, Table,Modal,message,Layout, Space, Tag ,Row,Col,Card} from 'antd';
import { motion } from 'framer-motion';
import { Copy } from "lucide-react";
import moment from "moment";



import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import OrderMessagePopup from './OrderMessagePopup';


const { Content } = Layout;

const Orders = () => {
  const accesstoken = localStorage.getItem('accesstoken');
  const decode = jwtDecode(accesstoken);
  const socket = useMemo(() => io('http://localhost:4000/orderList', { transports: ['websocket'] }), []);
  const messageSocket = useMemo(() => io('http://localhost:4000/message', { transports: ['websocket'] }), []);
  
  const [orders, setOrders] = useState([]);
  const [checked, setChecked] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [openCBM, setOpenCBM] = useState(false);
  const [receipient,setReceipient] = useState("")
  const [cbm, setCbm] = useState("");
  const [qty,setQty] = useState("")
  
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

  function save(){
    socket.emit('addCBM/CTN', {
      Sender_id: decode.id,
      userId: receipient,
      cbm,
      qty
    });
  }

  

  const handleDelete = (orderId, customerId) => {
    socket.emit('deleteOrder', { orderId, customerId });
  };

  

  const openCBMPop = (user_id) => {
    setOpenCBM(!openCBM);
    setReceipient(user_id);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };
  
  const columns = [
    
    
    {
      title: '#Order ID',
      dataIndex: '_id',
      key: 'order_id',
      render: (text, record) => (
        <Space>
          <Link to={`/Orders/View_Order/${record.customer_id}`}>{text}</Link>
          <Copy size={15} onClick={() => navigator.clipboard.writeText(record._id)} />
        </Space>
      ),
    },
    {
      title: 'Shipping Mark',
      dataIndex: 'customerName',
      key: 'client',
    },
    
    {
      title: 'Container No.',
      dataIndex: 'containerNumber',
      key: 'containerNumber',
      render:(text)=>(
        text === undefined ? <p>N/A</p> : <p>{text}</p>
      )
    },
    {
      title: 'CBM',
      dataIndex: 'cbm',
      key: 'cbm',
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
      title: 'Route',
      dataIndex: 'route',
      key: 'route',
    },
    {
      title: 'ETA',
      dataIndex: 'eta',
      key: 'eta',
      render: (text) => moment(text).format('MMMM D, YYYY'),
    }
    ,

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<Pencil size={18} className="text-purple-700" />}
            onClick={() => openCBMPop(record.customer_id)}
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

  const handleBulkDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete selected orders?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        if (selectedRowKeys.length === 0) return;
  
        socket.emit("bulkDeleteOrders", { orderIds: selectedRowKeys }, (response) => {
          if (response.success) {
            message.success("Orders deleted successfully");
            setSelectedRowKeys([]);
            // refetch or update your orders list here
          } else {
            message.error("Failed to delete orders");
            console.error(response.error);
          }
        });
      },
    });
  };
  
  
  const handleAssignToContainer = () => {
    // Example - assign to group logic
    Modal.info({
      title: "Assigning to group...",
      content: `Assigning ${selectedRowKeys.length} orders.`,
    });
  };
  

  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false)

  const onStart = (containerNumber) => {
    console.log("Start shipment for:", containerNumber);
    socket.emit("start-shipment",{containerNumber,selectedRowKeys},(response)=>{
      if (response.status==="ok"){
        message.success("shipment started")
      }else{
        message.error("error starting shipments")
      }
    })
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
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Layout style={{paddingTop:"100px"}}
          className='layout-shift  w-full bg-stone-100 lg:w-[80%] '>
    
      
 <div style={{marginInline:"auto",marginBottom:"12px"}} className="flex flex-col w-[90%] mb-3  sm:flex-row justify-between items-center gap-4  px-4 py-3 bg-white rounded-2xl shadow-sm border border-purple-300">
  <div className="flex gap-2 w-fit">
  <Button
    disabled={selectedRowKeys.length === 0}
    onClick={()=> setModalOpen(true)}
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? '#c084fc' : '#9333ea', // purple-400 or purple-600
        color: 'white',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        borderRadius: '0.75rem',
        fontSize: '0.875rem', // text-sm
        fontWeight: 500, // font-medium
        transition: 'all 0.3s ease'
      }}
    className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-400 transition-all text-sm font-medium"
  >
    Start shipment
  </Button>

  {selectedRowKeys.length !== 0 &&
  <Button
    danger
    disabled={selectedRowKeys.length === 0}
    onClick={()=>handleBulkDelete()}
  >
    Delete Selected
  </Button>}
  </div>

  <input
    type="text"
    placeholder="Search by Container Number..."
   
    className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>



<Modal
      title={`Start Shipment ( ${selectedRowKeys.length > 0 && `${selectedRowKeys.length} selected )`}`}
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

     <Content style={{ padding: "10px 50px",width:"100%" }}>
             <Row gutter={[16, 16]}>
               {/* Container Page Title */}
               <Col span={24}>
                 <Card title="Shipments Overview" style={{border:"1px solid #ddd",width:"100%"}}>
      <Table
        columns={columns}
        dataSource={orders}
        rowSelection={rowSelection}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
        bordered
      />

      </Card>
      </Col>
      </Row>
      </Content>

      <OrderMessagePopup openCBM={openCBM} setOpenCBM={setOpenCBM} cbm={cbm} setCbm={setCbm} qty={qty} setQty={setQty} onSave={save} />
    </Layout>
  );
};

export default Orders;
