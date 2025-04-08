import React, { useEffect, useState, useMemo } from "react";
import { Layout, Card, Row, Col, Statistic, DatePicker, Space } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import io from "socket.io-client";
import moment from "moment";

const { Header, Content } = Layout;

const Dashboard = () => {
  // State to store shipment data and shipment status counts
  const [shipmentData, setShipmentData] = useState([]);
  const [shipmentStatus, setShipmentStatus] = useState({
    delivered: 0,
    pending: 0,
    inTransit: 0,
    cancelled: 0
  });
  const [selectedMonth, setSelectedMonth] = useState(moment()); // default is current month

  // Memoized Socket.IO client connection
  const socket = useMemo(
    () => io("http://localhost:4000/logistics", { transports: ["websocket"] }),
    []
  );

  // Data for the pie chart
  const pieData = [
    { name: "Delivered", value: shipmentStatus.delivered },
    { name: "Pending", value: shipmentStatus.pending },
    { name: "In Transit", value: shipmentStatus.inTransit },
    { name: "Cancelled", value: shipmentStatus.cancelled }
  ];

  // Socket.IO connection and event listeners
  useEffect(() => {
    socket.emit("joinRoom", { roomId: "logistics-dashboard" });

    socket.on("shipmentStatusUpdate", (data) => {
      // Update the state with the new shipment data
      setShipmentData((prevData) => [...prevData, data]);

      // Update shipment status counts
      setShipmentStatus((prevStatus) => ({
        ...prevStatus,
        [data.status.toLowerCase()]: prevStatus[data.status.toLowerCase()] + 1
      }));
    });

    return () => {
      socket.off("shipmentStatusUpdate");
    };
  }, [socket]);

  // Handler to delete a shipment (example)
  const deleteShipment = (shipmentId) => {
    socket.emit("deleteShipment", shipmentId);
  };

  // Handler for month change
  const handleMonthChange = (date, dateString) => {
    if (date) {
      setSelectedMonth(date);
      // You could add logic here to fetch and filter data based on the selected month
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className='mt-[100px] w-full bg-stone-100 lg:w-[80%] ml-auto'>
      
      <Content style={{ padding: "20px 50px" }}>
        <Row gutter={[16, 16]}>
          {/* Month Picker */}
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

        <Row gutter={[16, 16]}>
          {/* Card showing the Pie Chart */}
          <Col xs={24} sm={12} lg={8}>
            <Card title="Shipment Status" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    <Cell key="cell-1" fill="#4CAF50" />
                    <Cell key="cell-2" fill="#FFC107" />
                    <Cell key="cell-3" fill="#2196F3" />
                    <Cell key="cell-4" fill="#F44336" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Card showing shipment status counts */}
          <Col xs={24} sm={12} lg={8}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Delivered"
                    value={shipmentStatus.delivered}
                    prefix={<MessageOutlined />}
                    valueStyle={{ color: "#4CAF50" }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Pending"
                    value={shipmentStatus.pending}
                    prefix={<MessageOutlined />}
                    valueStyle={{ color: "#FFC107" }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="In Transit"
                    value={shipmentStatus.inTransit}
                    prefix={<MessageOutlined />}
                    valueStyle={{ color: "#2196F3" }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Cancelled"
                    value={shipmentStatus.cancelled}
                    prefix={<DeleteOutlined />}
                    valueStyle={{ color: "#F44336" }}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* List of shipment updates */}
        <Row style={{ marginTop: "20px" }}>
          <Col span={24}>
            <Card title="Recent Shipments" bordered={false}>
              <ul>
                {shipmentData.map((shipment) => (
                  <li key={shipment.id}>
                    <strong>Shipment ID:</strong> {shipment.id} -{" "}
                    <strong>Status:</strong> {shipment.status}
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
