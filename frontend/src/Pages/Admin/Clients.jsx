import React,{useState,useEffect,useMemo,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { AlertTriangle }  from 'lucide-react';
import ButtonLoader from '../../icons/ButtonLoader';
import { Button, Table, Input, Checkbox } from 'antd';
import {message} from "antd"
import {
  DataGrid,


} from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';


import { SearchOutlined } from '@ant-design/icons';

const Clients = () => {

    const socket= useMemo(() =>io("http://localhost:4000/users",{
        transports: ['websocket'],
      }),[])

      const socket1= useMemo(() =>io("http://localhost:4000/",{
        transports: ['websocket'],
      }),[])


      useEffect(()=>{
        socket1.on("Active",(data)=>{
             console.log(data)
        })

        socket.on("joined",(data)=>{
          console.log(data)
     })
        socket1.on("disconnect",(reasons)=>{
          console.log(reasons)
      })
      return()=>{
          socket1.off("connection")
          socket1.off("Active")
          socket1.off("disconnect")
      }
      },[])

      useEffect(()=>{
        socket.emit("joinRoom")
      },[])

    useEffect(()=>{
        socket.emit("getAllUsers")
    },[])
    

    const[Users,setUsers] =useState([])
    const[hasFetched,setHasFetched]= useState(false)
    useEffect(()=>{
        socket.on("connection",()=>{
            console.log("You are connected to the user's namespace")
        })
        socket.on("All_users",async(data)=>{
          try{
            console.log(data)
            const newData= data.length
            if(!hasFetched)
            for(let i =0;i< newData;i++){
              setUsers(prevData=>[...prevData,data[i]])
              await new Promise(resolve=> setTimeout(resolve,200))
            }
             setHasFetched(true)  
        
            }catch(error){
              console.error(error)
            }
            
        })

        socket.on("disconnect",(reasons)=>{
            console.log(reasons)
        })
        return()=>{
            socket.off("connection")
            socket.off("All_users")
            socket.off("disconnect")
        }
    },[socket])

    
    

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loader, setLoader] = useState(false);
  const [validation, setValidation] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post('http://localhost:5000/SignUp', { formData });
      if (res.data.message === 'exist') {
        setValidation('Email already exists');
        setLoader(false);
      } else {
        setValidation('');
        message.success('Sign up successfully');
        setLoader(false);
        navigate('/Login');
      }
    } catch (err) {
      setLoader(false);
      message.error('Oops, system down');
      console.error(err);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setValidation('');
    setFormData({ username: '', email: '', password: '' });
  };


   
     
       

    const getTimeDifference = (lastActive) => {
      const now = new Date(); // Current time in local timezone
      const past = new Date(lastActive); // Parse timestamp
      const diffInSeconds = Math.floor((now - past) / 1000); // Difference in seconds
      console.log("Now:", now); // Log the current date
    console.log("Past:", past); // Log the parsed timestamp
  
      if (diffInSeconds < 1) {
        return "online"; // Handle future timestamps gracefully
      }
    
      if (diffInSeconds < 60) {
        return `${diffInSeconds}s ago`; // Less than 1 minute
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m ago`; // Less than 1 hour
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h ago`; // Less than 1 day
      } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d ago`; // Less than 1 month
      } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months}mo ago`; // Less than 1 year
      } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years}y ago`; // More than 1 year
      }
    };
    
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters, confirm) => {
      clearFilters();
      setSearchText('');
      confirm(); // resets the table to show all rows
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedKeys(value ? [value] : []);
              if (!value) {
                handleReset(clearFilters, confirm);
              }
            }}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Search
            </button>
            <button
              onClick={() => handleReset(clearFilters, confirm)}
              className="bg-gray-300 px-2 py-1 rounded text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    });
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: '_id', headerName: 'User ID', width: 180 },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
          <Typography
          style={{ display: 'flex', alignItems: 'center',height:"100%" }}
            noWrap
            sx={{
              fontSize: '14px',
              color: '#57534e',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '160px',
            }}
            title={params.value}
          >
            {params.value}
          </Typography>
        ),
      },
      {
        field: 'username',
        headerName: 'Name',
        width: 150,
      },
      {
        field: 'active',
        headerName: 'Last Active',
        width: 160,
        renderCell: (params) => (
          <Typography fontSize="14px" color="#57534e" style={{ display: 'flex', alignItems: 'center',height:"100%" }}>
            {getTimeDifference(params.value)}
          </Typography>
        ),
      },
      {
        field: 'account_type',
        headerName: 'Permissions',
        width: 150,
      },
    ];
    
    const rows = Users.map((user, index) => ({
      id: index + 1,
      ...user,
    }));
    
    return (
      <div style={{paddingTop:"100px",paddingInline:"2.5%"}}
          className='layout-shift  w-full bg-stone-100 lg:w-[80%] '>
        
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
      </div>
    );
}

export default Clients