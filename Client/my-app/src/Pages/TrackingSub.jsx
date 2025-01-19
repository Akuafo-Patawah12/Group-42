import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'


const TrackingSub = (props) => {
  
  return (
    <>
      
      <section className='flex gap-4 w-[95%] mt-4 mx-auto'>
            <p>Filter activities</p>
            <button className='bg-stone-400 rounded-2xl p-2'>All</button>
            <button className='bg-stone-400 rounded-2xl p-2'>Delivered</button>
            <button className='bg-stone-400 rounded-2xl p-2'>In tansit</button>
            <button className='bg-stone-400 rounded-2xl p-2'>Pending</button>
            <button className='bg-stone-400 rounded-2xl p-2'>Cancelled</button>
        </section>

        <div className="bg-white w-{95%} shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Recent Orders</h3>
          <table className="w-full border-collapse border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
            {props.orders.map((order,index)=>(
              <tr key={order._id} id={`row-${order._id}`}>
                <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                <td className="border border-gray-300 px-4 py-2">Sea Freight - Electronics</td>
                <td className="border border-gray-300 px-4 py-2 text-green-500">{order.Status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    View Details 
                  </button>
                  <button className="bg-red-500 px-4 py-2 rounded text-white" onClick={() => props.deleteOrder(order._id,order.customer_id)}><DeleteOutlined/></button>
                </td>
              </tr>
            ))}
              
            </tbody>
          </table>
        </div>

      </>
    
  )
}

export default TrackingSub