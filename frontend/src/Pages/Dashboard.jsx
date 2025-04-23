import React, { useEffect, useState, useMemo } from "react";
import { Layout, Card, Row, Col, Statistic, DatePicker, Space } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { MessageOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import io from "socket.io-client";
import moment from "moment";
import SessionExpiredModal from "../Components/SessionExpiredModal";

const { Content } = Layout;

const Dashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [visible,setVisible] = useState(false)

  // Socket connection
  const socket = useMemo(() => io("http://localhost:4000/Shipping", { transports: ["websocket"] }), []);

  // Emit fetch on mount
  useEffect(() => {
    socket.connect()
    socket.emit("get_Shipment");
  }, [socket]);

  // Listen for shipment data
  useEffect(() => {
    socket.on("fetched_Shipments", (data) => {
      console.log("Fetched shipment data:", data);
      setShipments(data);
    });
    socket.on("connect_error", (err)=>{
              console.log(err)
               if (err.message.includes("Refresh token expired")) {
                              
                                setVisible(true)
                            
                          
                           }else if(err.message.includes("403: Unauthorized")) {
                setTimeout(()=>{
                
              },1000)
                
             } else if (err.message.includes("401: Invalid refresh token")) {
                setTimeout(()=>{
                  setVisible(true)
                },1000)
              }
            else if(err.message.includes("No cookies found")){
              setTimeout(()=>{
              setVisible(true)
            },1000)
              
           }
            });

    return () => socket.off("fetched_Shipments");
  }, [socket]);

  // Group shipments by status
  const shipmentStatus = {
    Delivered: shipments.filter(s => s.Status === "Delivered").length,
    Pending: shipments.filter(s => s.Status === "Pending").length,
    "In Transit": shipments.filter(s => s.Status === "in-Transit").length,
    Cancelled: shipments.filter(s => s.Status === "Cancelled").length,
  };

  // Pie chart data
  const pieData = [
    { name: "Delivered", value: shipmentStatus.Delivered, color: "#4CAF50" },
    { name: "Pending", value: shipmentStatus.Pending, color: "#FFC107" },
    { name: "In Transit", value: shipmentStatus["In Transit"], color: "#2196F3" },
    { name: "Cancelled", value: shipmentStatus.Cancelled, color: "#F44336" },
  ];

  // Handle month change
  const handleMonthChange = (date) => {
    if (date) setSelectedMonth(date);
  };

  return (
    <Layout style={{minHeight: "100vh",paddingTop:"100px"}}
      className='layout-shift  w-full bg-stone-100 lg:w-[80%] '>
      <Content style={{ padding: "20px 50px" }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space direction="vertical" size={12}>
              <DatePicker
                defaultValue={selectedMonth}
                onChange={handleMonthChange}
                picker="month"
                style={{ width: "100%" }}
              />
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* Pie Chart */}
          <Col xs={24} md={12}>
            <Card title="Shipment Status Overview">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Status Cards */}
          <Col xs={24} md={12}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <Statistic title="Delivered" value={shipmentStatus.Delivered} prefix={<MessageOutlined />} valueStyle={{ color: "#4CAF50" }} />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic title="Pending" value={shipmentStatus.Pending} prefix={<SyncOutlined />} valueStyle={{ color: "#FFC107" }} />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic title="In Transit" value={shipmentStatus["In Transit"]} prefix={<SyncOutlined spin />} valueStyle={{ color: "#2196F3" }} />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic title="Cancelled" value={shipmentStatus.Cancelled} prefix={<DeleteOutlined />} valueStyle={{ color: "#F44336" }} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Recent Shipments */}
        <Row style={{ marginTop: "30px" }}>
          <Col span={24}>
            <Card title="Recent Shipments" bordered={false}>
              <ul className="space-y-4">
                {shipments.map((shipment) => (
                  <li key={shipment._id} className="p-4 bg-white shadow rounded-md">
                    <div><strong>Tracking No:</strong> {shipment.tracking_no}</div>
                    <div><strong>Status:</strong> {shipment.Status}</div>
                    <div><strong>Location:</strong> {shipment.location}</div>
                    <div><strong>Date:</strong> {moment(shipment.createdAt).format('MMMM Do YYYY, h:mm a')}</div>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </Content>
      <SessionExpiredModal visible={visible} />
    </Layout>
  );
};

export default Dashboard;
