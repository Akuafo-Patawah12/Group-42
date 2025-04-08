import React,{useState,useEffect,useMemo,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import Warning_icon from '../icons/Warning_icon'
import ButtonLoader from '../icons/ButtonLoader';
import { Button, Table, Input, Checkbox } from 'antd';
import {Swal} from "sweetalert2"
import { motion} from 'framer-motion';

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
      },[socket1])

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

    
    

    const [formData,setFormData]= useState({
        username:"",
        email:"",
        account_type:"Admin",
        password:"",
       });

     const navigate= useNavigate()
     const[loader,setLoader] =useState(false)
       const[validation,setValidation] =useState("")
       const handSubmit = async(e)=>{
        e.preventDefault();
        try{
            setLoader(true)
          await axios.post("http://localhost:5000/SignUp",{formData})
          .then(res=>{
            if(res.data.message==="exist") {
                setValidation("Email already exist") 
                setLoader(false)
            }else{
                setValidation("")
                 Swal.fire({
                    title:"Sign up successfully",
                    icon:"success",
                    timer:2000
                 });
                 setLoader(false)
                navigate('/Login');
            }
        })
          .catch(err=>{
            setLoader(false)
            Swal.fire({
                title:"Oops,system down",
                icon:"error"
             }); 
            console.log(err)
        })
      }catch(e){
         console.log(e)
        } 
    }

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
      {
        title: <Checkbox />,
        dataIndex: 'checkbox',
        key: 'checkbox',
        render: () => <Checkbox />,
        width: 50,
      },
      {
        title: 'User_id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...getColumnSearchProps('email'),
        render: (text) => (
          <div
            style={{
              cursor: 'pointer',
              overflowX: 'auto',
              maxWidth: '80px',
              fontSize: '15px',
              color: '#57534e',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            title={text}
          >
            {text}
          </div>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Last Active',
        dataIndex: 'active',
        key: 'active',
        render: (active) => (
          <span style={{ fontSize: '15px', color: '#57534e' }}>
            {getTimeDifference(active)}
          </span>
        ),
      },
      {
        title: 'Permissions',
        dataIndex: 'account_type',
        key: 'account_type',
      },
    ];
  
    const dataSource = Users.map((user, index) => ({
      key: index,
      ...user,
    }));
    
    
  return (
    <motion.div
    initial={{ opacity: 0, perspective: 1000, rotateY: -90 ,y:150}}
    animate={{ opacity: 1, perspective: 1000, rotateY: 0 ,y:0}}
    exit={{ opacity: 0 ,y:-100}}
    duration={{duration: 0.3}}
    className='mt-[100px] w-full bg-stone-100 lg:w-[80%] ml-auto'>
        <div className='relative'>
            <Button primary>Add user</Button>
            <div className="w-[250px] absolute hidden bottom-[-130px] flex flex-col gap-4 bg-white shadow-2xl">
            <form onSubmit={handSubmit}>
            <input type='text'
               onChange={(e)=>{setFormData({...formData,username:e.target.value})}}
               required={true}
               className='h-8 border-2'
            ></input>
            <input type='email'
               onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
               required={true}
               className='h-8 border-2'
            ></input>
            <input type="password" 
               className='h-8 border-2'
               required={true}
               onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
               />
            <div className='flex w-[73%] text-md font-small text-red-400 items-center mx-auto'>
                         {validation==="" ?"":<Warning_icon size={18}/>} {validation} 
            </div>
            <button type='submit' disabled={loader?true:false} className="h-[35px] flex justify-center items-center gap-2 bg-green-400 w-[73%] rounded-md text-white font-medium mx-auto"><p>Add</p>{loader? <ButtonLoader/>:""}</button>
            </form>
        </div>
        </div>

        <div className="bg-white w-{95%} shadow-md rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your Recent Orders</h3>
        <Table
      dataSource={dataSource}
      columns={columns}
      scroll={{ x: 'max-content' }}
      pagination={{ pageSize: 15 }}
      rowClassName="h-[35px]"
      bordered
    />
    </div>
    </motion.div>
  )
}

export default Clients