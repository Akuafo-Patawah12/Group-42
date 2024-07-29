import React,{useState} from 'react'

import { Link,useNavigate,useParams } from 'react-router-dom'
import axios from "axios"
import Swal from "sweetalert2"

export default function UpdatePassword(){
    const{id}= useParams()
    const navigate= useNavigate()
    const [password,setPassword]= useState("");

    const handSubmit = async(e)=>{
        e.preventDefault();
        try{
          await axios.put(`http://localhost:4000/updatePassword/${id}`,{password})
          .then(res=>{
            if(res.data==="ok"){
            Swal.fire({
              title:"Password updated.",
              icon:"success",
              timer:3000
            })
            navigate("/Login")
            return
        }
        console.log("server error wait a minute")
          })
          .catch(err=>{
            console.log(err)
          })
        }catch(error){
          console.log(error)
        }
      }

    return(
        
            <div className='h-screen flex items-center justify-center'>
      <section className='border-[1px]  bg-white border-stone-300 shadow-2xl flex items-center flex-col h-[250px]'>
    <form onSubmit={handSubmit}>
    <div className=' flex  flex-col gap-2 w-[300px]'>
        <h4 className='mx-auto text-sm font-medium'>SCM SOLUTIONS.</h4>
        <div className='font-bold text-gray-600 w-[78%] mx-auto'>Regain Access to Your Account.
        </div>
    
        <input type='Password'
        placeholder='Enter new Password' 
        className='border-2 border-gray-400 rounded-sm w-[78%] mx-auto h-[40px]'
        onChange={(e)=>setPassword( e.target.value)} 
        required={true}
        ></input>
        <input type='submit' value={"Update Password"} className="h-[40px] bg-green-400 w-[78%] text-white font-medium mx-auto"></input>
    </div>
    </form>
    </section>
    </div>
        
    )
}