import {useState,useEffect,useMemo} from 'react'

import { io } from 'socket.io-client';

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
      },[socket1,socket])

      useEffect(()=>{
        socket.emit("joinRoom")
      },[socket])

    useEffect(()=>{
        socket.emit("getAllUsers")
    },[socket])
    

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
    },[socket,hasFetched])

    
    


  
   
     
       

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