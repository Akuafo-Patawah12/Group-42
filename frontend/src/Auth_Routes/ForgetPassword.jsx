import React from 'react'
import axios from "axios"
import { message } from 'antd';


const ForgetPassword = () => {
  const [email,setEmail]= React.useState("");

  const handSubmit = async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/forgetPassword",{email})
      .then(res=>{
        message.success(
          "SCM sent a reset link to your email.",
          )
      })
      .catch(err=>{
        console.log(err)
      })
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className='h-screen flex items-center justify-center'>
      <section className='border-[1px]  bg-white border-stone-300 shadow-2xl flex items-center flex-col h-[250px]'>
    <form onSubmit={handSubmit}>
    <div className=' flex  flex-col gap-2 w-[300px]'>
        <h4 className='mx-auto text-sm font-medium'>SCM SOLUTIONS.</h4>
        <div className='font-bold text-gray-600 w-[78%] mx-auto'>Regain Access to Your Account.
        </div>
    
        <input type='email'
        placeholder='Enter email' 
        className='border-2 border-gray-400 rounded-sm w-[78%] mx-auto h-[40px]'
        onChange={(e)=>setEmail( e.target.value)} 
        required={true}
        ></input>
        <input type='submit' value={"Continue"} className="h-[40px] bg-green-400 w-[78%] text-white font-medium mx-auto"></input>
    </div>
    </form>
    </section>
    </div>
  )
}

export default ForgetPassword