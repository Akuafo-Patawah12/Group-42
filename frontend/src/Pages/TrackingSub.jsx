import { DeleteOutlined } from '@ant-design/icons'
import React,{useState} from 'react'

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
      render: () => "Unclassified",
    },
    {
      title: 'Loading date',
      dataIndex: ['shipmentId', 'loadingDate'], // access nested value
      key: 'loadingDate',
      render: (text) => (
        <p>{text ? new Date(text).toLocaleDateString() : 'N/A'}</p>
      ),
    },
    {
      title: 'CBM Rate',
      dataIndex: ['shipmentId', 'cbmRate'], // access nested value
      key: 'cbmRate',
      render: (text) => (
        <p>{text ? "$"+ text : 'N/A'}</p>
      ),
    },
    {
      title: 'Eta',
      dataIndex: ['shipmentId', 'eta'], // access nested value
      key: 'eta',
      render: (text) => (
        <p>{text ? new Date(text).toLocaleDateString() : 'N/A'}</p>
      ),
    },
    {
      title: 'Port',
      dataIndex: ['shipmentId', 'port'], // access nested value
      key: 'port',
      render: (text) => (
        <p>{text ? text : 'N/A'}</p>
      ),
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
          <Button type="primary" style={{ marginRight: 8 ,background:"var(--purple)"}} className='bg-purple-300 text-stone-700' 
          onClick={() => {
            props.setSelectedOrder(order)
            console.log("this order",order)
            props.handleOpen()
            }}
            >
            View Details
          </Button>
          <Button
            type="primary"
            style={{background:"#f87171"}}
            className="bg-transparent border-0 text-red-500 hover:text-red-700"
            icon={<DeleteOutlined />}
            onClick={() => props.deleteOrder(order._id, order.customer_id)}
          />
        </>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };
  
  return (
    <>
      
      <section
  style={{ scrollbarWidth: "none", marginInline: "auto", marginTop: "16px" }}
  className="flex gap-3 w-[95%] items-center overflow-x-auto py-2 px-1 backdrop-blur-sm rounded-xl bg-white/80 shadow-sm"
>
  <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">Filter activities</p>

  {["All", "Delivered", "in-Transit", "Pending", "Cancelled"].map((status) => (
    <button
      key={status}
      onClick={() => props.filterOrders(status)}
      className={`transition-all duration-200 border rounded-full px-4 py-1 text-sm font-medium whitespace-nowrap 
        ${
          props.selectedFilter === status
            ? "bg-purple-600 text-white border-purple-700 shadow-md"
            : "bg-white text-gray-700 border-gray-300 hover:bg-purple-100"
        }`}
    >
      {status === "in-Transit" ? "In Transit" : status}
    </button>
  ))}
</section>


        <div style={{marginInline:"auto",marginTop:"12px"}} className="bg-white w-[95%]  shadow-md rounded-lg p-6 ">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Recent Orders</h3>
        
      <Table dataSource={props.orders} rowSelection={rowSelection} columns={columns} pagination={{ pageSize: 5 }} rowKey={(record, index) => index}  scroll={{ x: 1200 }}/>
        </div>

      </>
    
  )
}

export default TrackingSub