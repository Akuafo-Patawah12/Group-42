import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pencil } from "lucide-react";
import { DeleteOutlined, MessageOutlined, CopyOutlined } from '@ant-design/icons';
import { Button,Form, Input, Table,Modal,message,Layout, Space, Tag ,Row,Col,Card} from 'antd';
import { motion } from 'framer-motion';
import { Copy ,Edit,Trash2} from "lucide-react";
import moment from "moment";



import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import OrderMessagePopup from '../OrderMessagePopup';
import { toast } from 'react-toastify';
import SessionExpiredModal from '../../Components/SessionExpiredModal';


const { Content } = Layout;

const Orders = () => {
  const accesstoken = localStorage.getItem('accesstoken');
  const decode = jwtDecode(accesstoken);
  const socket = useMemo(() => io('http://localhost:4000/orderList',
     { 
      transports: ['websocket'],
      withCredentials:true ,
      reconnectionAttempts: 2,
      reconnectionDelay: 1000,
      timeout: 5000,
    
    }), []);
  const messageSocket = useMemo(() => io('http://localhost:4000/message', { transports: ['websocket'],withCredentials:true }), []);
  const socket2 = useMemo(() =>io("http://localhost:4000/notify",{
           transports: ['websocket'],credentials: true
         }),[]) 
    
      React.useEffect(()=>{
         socket2.on("connect",()=>{
            console.log("web socket is active")
            socket2.emit('getUnreadNotifications', decode?.id);
         })
        },[socket2,decode?.id])
  const [orders, setOrders] = useState([]);

  const [openCBM, setOpenCBM] = useState(false);
  const [receipient,setReceipient] = useState("")
  const [cbm, setCbm] = useState("");
  const [qty,setQty] = useState("")
  const [order_id,setOrder_id] = useState("")
  const [visible,setVisible] = useState(false)
  const [search, setSearch] = useState("");
  const [filteredContainers, setFilteredContainers] = useState(orders);

  useEffect(()=>{
    socket.connect();
    socket.emit('joinRoom', { id: decode.id });
    socket.emit("verify-token");
    socket.emit('clientOrders');
  },[])

  useEffect(() => {
    
    messageSocket.on('connection', () => console.log('connected to the message namespace'));
    messageSocket.on('disconnect', (reason) => console.log(reason));

    return () => {
      messageSocket.off('connection');
      
    };
  }, [socket, messageSocket, decode.id]);

  useEffect(() => {
    socket.on("connect",()=>{
      
      console.log("socket connected")
    })

    socket.on("token-expired", () => {
      console.log("Session expired");
      setVisible(true);
    });

    socket.on('getAllOrders', (data) => {
      console.log(data)
      setOrders(data);
    });

    socket.on("usersAssigned", ({ message, data }) => {
      console.log("Shipment updated:", message, data);

      setOrders((prev) => {
        const updatedIds = data.map((o) => o._id.toString());

        // Replace the updated orders in the table
        const updated = prev.map((order) =>
          updatedIds.includes(order._id) ? data.find((o) => o._id === order._id) : order
        );

        // Add any new ones not in the list
        const newOnes = data.filter((o) => !prev.find((p) => p._id === o._id));

        return [...updated, ...newOnes];
      });
    });

    socket.on('receivedOrder', (data) => {
      toast.success("New quote received")
      setOrders((prev) => [data, ...prev]);
    });

    socket.on('orderDeleted', (data) => {
      toast.success("Shipment deleted")
      setOrders((prev) => prev.filter((order) => order._id !== data));
    });

    socket.on("Deleted", (data) => {
      toast.success("Shipment deleted")
      setOrders((prev) => prev.filter((order) => order._id !== data));
    });

    socket.on('SendShippment', (data) => {
      setOrders((prev) => prev.map((order) => (order._id === data.order_id ? { ...order, Status: data.status } : order)));
    });

    socket.on("connect_error", (err)=>{
              console.log(err)
              if (err.message.includes("Refresh token expired")) {
                
                  setVisible(true)
              
            
             }else if(err.message.includes("403: Unauthorized")) {
                setTimeout(()=>{
                
              },1000)
            }  
              
              
           
            });

            socket.on("disconnect",(reason)=>{
              console.log(reason)
            })

            return()=>{
              socket.off("connect_error")
              socket.off('connect');
              socket.off("token-expired")
      socket.off('receivedOrder');
      socket.off('orderDeleted');
      socket.off('SendShippment');
      socket.off('disconnect');
      socket.off('getAllOrders');
            }
  }, [socket]);

  useEffect(() => {
    if (!search) {
      setFilteredContainers(orders); // Reset if search is empty
    } else {
      setFilteredContainers(
        orders.filter((order) =>
          order.customerName.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, orders]); 

  function save(){
    socket.emit('addCBM/CTN', {
      Sender_id: decode.id,
      userId: receipient,
      cbm,
      qty,
      order_id
    },
    (response) => {
      if (response.status === "ok") {
        toast.success("CBM & CTN updated")
        setOpenCBM(false)
        setOrders(prev =>
          prev.map(order =>
            order._id === response.data._id ? response.data : order
          )
        );
      }else{
         toast.error("Failed to add cbm/ctn")
      }
    }
    
  );
  }

  

  const handleDelete = (orderId, customerId) => {
    socket.emit('deleteOrder', { orderId, customerId },(response)=>{
       if (response.status==="error"){
          toast.error(response.error)
       }
    });
  };

  

  const openCBMPop = (user_id,order_id) => {
    setOpenCBM(!openCBM);
    setReceipient(user_id);
    setOrder_id(order_id)
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };
  
  function sort(){

    
    setFilteredContainers(
     orders.filter((order) =>
       order.customerName.toString().toLowerCase().includes(search.toLowerCase())
     )
   );
 }


  const columns = [
    
    
    {
      title: 'Shipment ID',
      dataIndex: '_id',
      key: 'order_id',
      render: (text, record) => (
        <Space>
          <Link to={`/L/Shipments/View_Shipments/${record.customer_id}`}>{text}</Link>
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
      render:(record)=>(
        record === undefined ? <p>N/A</p> : <p>{record}</p>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      render:(record)=>(
        record === undefined ? <p>N/A</p> : <p>{record}</p>
      )
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
      render:(record)=>(
        record === undefined ? <p>N/A</p> : <p>{moment(record).format('MMMM D, YYYY')}</p>
      )
    }
    ,

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<Edit size={18} className="text-purple-700" />}
            onClick={() => openCBMPop(record.customer_id,record._id)}
            type="link"
          />
          <Button
            icon={<Trash2 size={18}/>}
            onClick={() => handleDelete(record._id, record.customer_id)}
            type="link"
            danger
          />
        </Space>
      ),
    },
  ];



  const handleBulkDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete selected shipments?");
    if (!confirmed) return;
  
    if (selectedRowKeys.length === 0) {
      alert("No orders selected.");
      return;
    }
  
  
        socket.emit("bulkDeleteShipments", { orderIds: selectedRowKeys }, (response) => {
          if (response.status==="ok") {
            toast.success("Shipments deleted successfully");
            const deletedIds = response.data;
            console.log("deleted shipments",deletedIds)
            setOrders((prev) => prev.filter(order => !deletedIds.includes(order._id.toString())));

            setSelectedRowKeys([]);
            
          } else {
            toast.error("Failed to delete orders");
            console.error(response.error);
          }
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
        toast.success("shipment started")
      }else if(response.status==="warning"){
        toast.warning(response.message)
      }else{
        toast.error(response.message)
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
      console.log(error)
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
    onClick={handleBulkDelete}
  >
    Delete Selected
  </Button>}
  </div>

  <input
    type="text"
    placeholder="Sort by Container No. or Shipping Mark..."
    onChange={(e) =>{ 
      sort()
      setSearch(e.target.value)
    }}
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

     <div style={{ padding: "10px 0",width:"90%",marginInline:"auto" }}>
             
               {/* Container Page Title */}
               
                 <Card title="Shipments Overview" style={{border:"1px solid #ddd",width:"100%"}} className="w-full">
      <Table
        columns={columns}
        dataSource={filteredContainers}
        rowSelection={rowSelection}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        rowClassName={(record) =>
          selectedRowKeys.includes(record._id) ? 'custom-selected-row' : ''
        }
        scroll={{ x: 1200 }}
        bordered
      />

      </Card>
     
      
      </div>
       <SessionExpiredModal visible={visible}/>
      <OrderMessagePopup openCBM={openCBM} setOpenCBM={setOpenCBM} cbm={cbm} setCbm={setCbm} qty={qty} setQty={setQty} onSave={save} />
    </Layout>
  );
};

export default Orders;
