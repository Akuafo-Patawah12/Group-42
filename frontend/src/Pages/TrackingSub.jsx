import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'

import { Button,  Table, Tag } from "antd";



const TrackingSub = (props) => {

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: () => "Sea Freight - Electronics",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, order) => (
        <>
          <Button type="primary" style={{ marginRight: 8 }} className='bg-purple-300 text-stone-700' 
          onClick={() => {
            props.setSelectedOrder(order)
            props.handleOpen()
            }}>
            View Details
          </Button>
          <Button
            type="primary"
            className="bg-transparent border-0 text-red-500 hover:text-red-700"
            icon={<DeleteOutlined />}
            onClick={() => props.deleteOrder(order._id, order.customer_id)}
          />
        </>
      ),
    },
  ];
  
  return (
    <>
      
      <section style={{scrollbarWidth:"none",marginInline:"auto"}} className='flex gap-4 w-[95%] mt-4 mx-auto items-center overflow-x-auto'>
  <p className="text-sm font-medium">Filter activities</p>

  <button 
    className={`bg-stone-300 border-2 border-stone-400 rounded-2xl py-1 text-sm px-2 ${props.selectedFilter === "All" ? "bg-stone-500 text-white" : ""}`}  
    onClick={() => props.filterOrders("All")}
  >All</button>

  <button 
    className={`bg-stone-300 border-2 border-stone-400 rounded-2xl py-1 text-sm px-2 ${props.selectedFilter === "Delivered" ? "bg-stone-500 text-white" : ""}`}  
    onClick={() => props.filterOrders("Delivered")}
  >Delivered</button>

  <button 
    className={`bg-stone-300 border-2 border-stone-400 rounded-2xl py-1 text-sm px-2 ${props.selectedFilter === "in-Transit" ? "bg-stone-500 text-white" : ""}`}  
    onClick={() => props.filterOrders("in-Transit")}
  >In Transit</button>

  <button 
    className={`bg-stone-300 border-2 border-stone-400 rounded-2xl py-1 text-sm px-2 ${props.selectedFilter === "Pending" ? "bg-stone-500 text-white" : ""}`}  
    onClick={() => props.filterOrders("Pending")}
  >Pending</button>

  <button 
    className={`bg-stone-300 border-2 border-stone-400 rounded-2xl py-1 text-sm px-2 ${props.selectedFilter === "Cancelled" ? "bg-stone-500 text-white" : ""}`}  
    onClick={() => props.filterOrders("Cancelled")}
  >Cancelled</button>

</section>

        <div style={{marginInline:"auto",marginTop:"12px"}} className="bg-white w-[95%]  shadow-md rounded-lg p-6 ">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Recent Orders</h3>
        
      <Table dataSource={props.orders} columns={columns} pagination={{ pageSize: 5 }} rowKey={(record, index) => index}  scroll={{ x: 'max-content' }}/>
        </div>

      </>
    
  )
}

export default TrackingSub