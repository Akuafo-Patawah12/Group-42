import { SendOutlined } from '@ant-design/icons'
import React,{useState,useEffect} from 'react'

const OrderMessagePopup = (props) => {
   const[message,setMessage]= useState("")

   
    
  return (
    <>
    {props.msgPop&&
    <div 
      className='fixed bg-blue-200 right-2 w-[300px] 
      bottom-4 top-[70px] rounded-2xl shadow-2xl'
    >
        <section className='h-[10%]'>
            <div className='size-10 bg-slate-200 rounded-[50%]'></div>
        </section>
        <section className='h-[80%]'>

        </section>
        <section className='flex h-[10%] bg-yellow-300 justify-around'>
            <form onSubmit={(e)=>{props.sendMessage(e,message)}}>
           <textarea 
              className='w-[75%]'
              onChange={(e)=>{setMessage(e.target.value)}}
            ></textarea>
           <button className='size-7 bg-orange-300 rounded-[50%]'><SendOutlined/></button>
           </form>
        </section>
    </div>}
    </>
  )
}

export default OrderMessagePopup