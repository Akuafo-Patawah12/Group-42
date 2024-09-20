import React,{useState,useEffect,useMemo} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import Warning_icon from '../icons/Warning_icon'
import ButtonLoader from '../icons/ButtonLoader';

import {Swal} from "sweetalert2"
import { motion} from 'framer-motion';

const Clients = () => {

    const socket= useMemo(() =>io("http://localhost:5000/users",{
        transports: ['websocket'],
      }),[])

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

    const style={color:" #57534e", fontSize: "0.875rem", lineHeight: "1.25rem",border:"2px solid  #e7e5e4",paddingBock:"10px"}
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

        
         <table className="w-[95%] bg-white mt-3  overflow-hidden rounded-2xl">
        <thead>  {/*Table head */}
            <tr className='bg-stone-300 h-[40px] rounded-2xl'>
                <th><input type="checkbox" ></input></th>
                <th style={style}>User_id</th>
                <th style={style}>#Client</th>
                <th style={style}>Email</th>
                <th style={style}>Last Active</th>
                <th style={style}>Permissions</th>
                <th style={style}>Created At</th>
            </tr>
        </thead>
        <tbody className="transition-all">
            
        {Users.map((user,index)=>(
              <tr key={index} className='border-b-[1px] border-stone-200 h-[35px]  relative'>
                <td className='flex justify-center item-center'>
                   {user._id}
                  </td>
                <td style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize: '15px', color:"#57534e"}}>
                  {user.email}
                </td>
                <td className="pl-2 text-stone-600">{user.username} </td>
                
                <td style={{fontSize: '15px',color:"#57534e"}}>
                  {user.account_type}  
                </td> 
                <td></td>
                <td>{user.createdAt}</td>
            </tr>
            ))}
        
        </tbody>
    </table>
    </motion.div>
  )
}

export default Clients