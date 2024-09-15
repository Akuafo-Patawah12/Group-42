import { SendOutlined } from '@ant-design/icons'
import React from 'react'

const OrderMessagePopup = (props) => {
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
           <textarea className='w-[75%]'></textarea>
           <button className='size-7 bg-orange-300 rounded-[50%]'><SendOutlined/></button>
        </section>
    </div>}
    </>
  )
}

export default OrderMessagePopup