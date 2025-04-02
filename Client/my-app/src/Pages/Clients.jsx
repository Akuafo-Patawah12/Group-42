import React,{useState,useEffect,useMemo} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import Warning_icon from '../icons/Warning_icon'
import ButtonLoader from '../icons/ButtonLoader';

import {Swal} from "sweetalert2"
import { motion} from 'framer-motion';

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
    

    
  return (
    <motion.div
    initial={{ opacity: 0, perspective: 1000, rotateY: -90 ,y:150}}
    animate={{ opacity: 1, perspective: 1000, rotateY: 0 ,y:0}}
    exit={{ opacity: 0 ,y:-100}}
    duration={{duration: 0.3}}
    className='mt-[60px] w-full bg-stone-100 lg:w-[80%] ml-auto'>
        <div className='relative'>
            <button>Add user</button>
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
         <table className="w-full border-collapse border border-gray-200 rounded">
        <thead>  {/*Table head */}
            <tr className='bg-gray-100'>
                <th className="border border-gray-300 px-4 py-2 text-left"><input type="checkbox" ></input></th>
                <th className="border border-gray-300 px-4 py-2 text-left">User_id</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Last Active</th> 
                <th className="border border-gray-300 px-4 py-2 text-left">Permissions</th>
                
            </tr>
        </thead>
        <tbody className="transition-all">
            
        {Users.map((user,index)=>(
              <tr key={index} className='border-b-[1px] border-stone-200 h-[35px]  relative'>
               <td className="border border-gray-300 px-4 py-2"><input type="checkbox" /></td>
                <td className="border border-gray-300 px-4 py-2">
                   {user._id}
                  </td>
                <td style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize: '15px', color:"#57534e"}} className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.username} </td>
                
                <td style={{fontSize: '15px',color:"#57534e"}} className="border border-gray-300 px-4 py-2">
                   {getTimeDifference(user.active)}
                </td> 
                <td className="border border-gray-300 px-4 py-2">{user.account_type} </td>
                
            </tr>
            ))}
        
        </tbody>
    </table>
    </div>
    </motion.div>
  )
}

export default Clients