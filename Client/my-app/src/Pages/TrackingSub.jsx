import React from 'react'

const TrackingSub = (props) => {
  return (
    <>
      <div className='flex gap-2 justify-between mt-4 w-[95%] ml-auto'>
        <section className='w-[48%] bg-slate-400 h-[170px] rounded-2xl'></section>
        <section className='w-[48%] h-[170px] rounded-2xl flex flex-col gap-2'>
            <div className='w-full h-[78%] bg-slate-400  rounded-2xl'></div>
            <div className='h-[22%] w-full  bg-black rounded-2xl  '></div>
        </section>
        
      </div>
      <section className='flex gap-4 w-[95%] mt-4 ml-auto'>
            <p>Filter activities</p>
            <button className='bg-stone-400 rounded-2xl p-2'>All</button>
            <button className='bg-stone-400 rounded-2xl p-2'>Delivered</button>
            <button className='bg-stone-400 rounded-2xl p-2'>In tansit</button>
            <button className='bg-stone-400 rounded-2xl p-2'>Pending</button>
            <button className='bg-stone-400 rounded-2xl p-2'>Cancelled</button>
        </section>
        <table className="w-[95%] mt-3 ml-auto">
        <thead>
            <tr>
              <th><input type='checkbox'></input></th>
                <th className='bg-slate-400 rounded-sm'>Order ID</th>
                <th className='bg-slate-400 rounded-sm'>Product</th>
                <th className='bg-slate-400 rounded-sm'>Quantity</th>
                <th className='bg-slate-400 rounded-sm'>Price</th>
                <th className='bg-slate-400 rounded-sm'>Status</th>
                <th className='bg-slate-400 rounded-sm'>Arrival time</th>
            </tr>
        </thead>
        <tbody>
          {props.orders.map((order,index)=>(
            <tr key={index}>
              <td><input type="checkbox"></input></td>
              <td style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize:"14px",lineHeight:"20px"}}>{order._id}</td>
              <td></td>
              <td></td>
              <td></td>
              <td className='text-sm'>{order.Status}</td>
            </tr>
          ))}
            
        </tbody>
    </table>
      </>
    
  )
}

export default TrackingSub