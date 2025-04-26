import React,{useState,useEffect,useMemo,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { AlertTriangle }  from 'lucide-react';
import ButtonLoader from '../../icons/ButtonLoader';
import { Button, Table, Input, Checkbox } from 'antd';
import {message} from "antd"


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
    <div
    initial={{ opacity: 0, perspective: 1000, rotateY: -90 ,y:150}}
    animate={{ opacity: 1, perspective: 1000, rotateY: 0 ,y:0}}
    exit={{ opacity: 0 ,y:-100}}
    duration={{duration: 0.3}}
     style={{paddingTop:"100px"}}
      className='layout-shift  w-full bg-stone-100 lg:w-[80%] '>
        <div className='relative'>
            <Button primary onClick={openModal}>Add user</Button>
            </div>

             {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[300px] rounded-xl shadow-2xl p-6 relative animate-scaleIn">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New User</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                required
                placeholder="Username"
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <input
                type="email"
                required
                placeholder="Email"
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              {validation && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertTriangle size={18} />
                  <span>{validation}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loader}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white rounded-md py-2 font-medium flex items-center justify-center gap-2"
              >
                <span>Add</span>
                {loader && <ButtonLoader />}
              </button>
            </form>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

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
    </div>
  )
}

export default Clients