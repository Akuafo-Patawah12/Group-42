import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button,Form, Modal,message,Popconfirm,Layout,Card} from 'antd';
import { motion } from 'framer-motion';
import {
  Box,
  
 
 
 
 
 
  
  
 
  
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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

  const handleSelectionChange = (selectionModel) => {
    const ids = Array.from(selectionModel.ids); // Convert Set to Array
    console.log('Selected Row Keys:', ids);
    setSelectedRowKeys(ids);
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
    field: '_id',
    headerName: 'Shipment ID',
    width: 200,
    renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Link to={`/L/Shipments/View_Shipments/${params.row.customer_id}`}>
          {params.value}
        </Link>
        <Copy size={15} style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(params.value)} />
      </Box>
    ),
  },
  { field: 'customerName', headerName: 'Shipping Mark', width: 180 },
  { field: 'containerNumber', headerName: 'Container No.', width: 160, renderCell: (params) => params.value || 'N/A' },
  { field: 'cbm', headerName: 'CBM', width: 100, renderCell: (params) => params.value || 'N/A' },
  { field: 'qty', headerName: 'Quantity', width: 120, renderCell: (params) => params.value || 'N/A' },
  {
    field: 'Status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => {
      const status = params.value;
      const color =
        status === 'Delivered' ? 'success' :
        status === 'In Transit' ? 'warning' :
        status === 'Pending' ? 'error' : 'default';

      return <Chip label={status} color={color} size="small" />;
    },
  },
  { field: 'route', headerName: 'Route', width: 140 },
  {
    field: 'eta',
    headerName: 'ETA',
    width: 160,
    renderCell: (params) => moment(params.value).format('MMMM D, YYYY') || 'N/A',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Box display="flex" gap={1} style={{ display: 'flex', gap: 6, alignItems: 'center' ,height:"100%"}}>

        <Button onClick={() => openCBMPop(params.row.customer_id, params.row._id)} size="small" variant="outlined" color="secondary">
          <Edit size={16} />
        </Button>
        <Button onClick={() => handleDelete(params.row._id, params.row.customer_id)} size="small" variant="outlined" color="error">
          <Trash2 size={16} />
        </Button>
      </Box>
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
  
  const [formData, setFormData] = useState({ containerNumber: '' });
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
      
      onStart(formData.containerNumber);
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
    <Popconfirm
            title="Are you sure you want to delete selected record?"
            onConfirm={handleBulkDelete}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              style: {
                backgroundColor: '#dc2626', // Tailwind red-600
                borderColor: '#dc2626',
                color: 'white',
              },
              danger: true,
            }}
          >
            <Button
              danger
              disabled={selectedRowKeys.length === 0}
              
            >
              Delete Selected
            </Button>
          </Popconfirm>
}
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



<Dialog
  open={modalOpen}
  onClose={() => {
    setFormData({ containerNumber: '' }); // reset manually or via Formik
    setModalOpen(false);
  }}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: { borderRadius: 3, p: 2 },
  }}
>
  <DialogTitle>
    <Typography variant="h6" fontWeight={600}>
      Start Shipment ({selectedRowKeys.length} selected)
    </Typography>
  </DialogTitle>

  <DialogContent dividers>
    <TextField
      fullWidth
      label="Container Number"
      value={formData.containerNumber}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, containerNumber: e.target.value }))
      }
      placeholder="e.g., CNT1234567"
      required
      margin="normal"
    />
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button
      onClick={() => setModalOpen(false)}
      variant="outlined"
      color="inherit"
    >
      Cancel
    </Button>
    <Button onClick={handleStart} variant="contained" color="primary">
      Start
    </Button>
  </DialogActions>
</Dialog>

     <div style={{ padding: "10px 0",width:"90%",marginInline:"auto" }}>
             
               {/* Container Page Title */}
               
                 <Card title="Shipments Overview" style={{border:"1px solid #ddd",width:"100%"}} className="w-full">
                 <DataGrid
                    rows={filteredContainers} // Data for the rows
                    columns={columns} // Define your columns
                    getRowId={(row) => row._id} // Ensure to use _id as the unique identifier for each row
                    checkboxSelection // Enable checkbox selection
                    onRowSelectionModelChange={handleSelectionChange} // Capture the selected row IDs
                    selectionModel={selectedRowKeys} // Bind selectedRowKeys to the DataGrid's selection
                    autoHeight // Adjust the height to fit the content
                  />

                </Card>
     
      
      </div>
       <SessionExpiredModal visible={visible}/>
      <OrderMessagePopup openCBM={openCBM} setOpenCBM={setOpenCBM} cbm={cbm} setCbm={setCbm} qty={qty} setQty={setQty} onSave={save} />
    </Layout>
  );
};

export default Orders;