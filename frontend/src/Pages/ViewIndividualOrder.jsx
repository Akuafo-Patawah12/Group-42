import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';
import moment from 'moment'

import {
  Box,
  Chip,
  Breadcrumbs,
  Typography,
  Link,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ViewIndividualOrder = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const accesstoken = localStorage.getItem("accesstoken");
  const decode = jwtDecode(accesstoken);

  const socket = useMemo(() => io("http://localhost:4000/orderList", {
    transports: ['websocket'],
  }), []);

  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.emit("getUserOrder", id);
    socket.emit("joinRoom", { id: decode.id });
    socket.emit('getUserNameById', {userId:id}, (response) => {
      if (response.status === 'success') {
        setUserName(response.name);
      } else {
        toast.error("Failed to fetch user name");
      }
    });
  }, [id, decode.id, socket]);

  
 

  

  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected");
    });
    socket.on("sendUserOrder", (data) => {
      console.log(data)
      setOrders(data);
    });
    socket.on('receiveOneOrder', (data) => {
      if (data.customer_id === id) {
        setOrders(prev => [data, ...prev]);
      }
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
      field: 'id',
      headerName: '#Order ID',
      flex: 1,
      renderCell: (params) => (
        <Link   underline="hover">
          {params.row._id}
        </Link>
      ),
    },
    
    {
      field: 'cbm',
      headerName: 'CBM',
      flex: 1,
      
    },
    {
  field: 'cbmRate',
  headerName: 'CBM Rate (USD)',
  flex: 1,
  renderCell: (params) => {
    const cbmRate = params.row.shipmentId?.cbmRate;
    return cbmRate !== undefined ? "$" + cbmRate : 'N/A';
  },
},
{
field: 'amount',
  headerName: 'Amount (USD)',
  flex: 1,
  renderCell: (params) => {
    const cbmRate = params.row.shipmentId?.cbmRate;
    const cbm = params.row.cbm
    return cbmRate !== undefined ? "$" + cbmRate * cbm : 'N/A';
  },
},

    {
      field: 'qty',
      headerName: 'Quantity',
      flex: 1,
     
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.Status}
          color={params.row.Status === 'Delivered' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      width: 160,
      renderCell: (params) => moment(params.value).format('MMMM D, YYYY') || 'N/A',
    },
  ];

  const rows = orders.map((order) => ({
    ...order,
    id: order._id, // DataGrid requires a unique `id` field
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: "100px" }}
  className="layout-shift w-full min-h-screen bg-stone-100 lg:w-[80%] px-6 py-10 mx-auto"
>
      <Box maxWidth="lg" mx="auto" px={2}>
        <div className='flex justify-between'>
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/L/Shipments" color="inherit">
            Shipments
          </Link>
          <Typography color="text.primary">View {userName}'s Shipments</Typography>
        </Breadcrumbs>
        <div className='size-6 border-3 border-purple-400 flex items-center justify-center text-sm font-semibold rounded-[50%] '>{userName[0]}</div>
        </div>

        <Box
          sx={{
            height: 500,
            width: '100%',
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default ViewIndividualOrder;
