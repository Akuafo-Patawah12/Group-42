import React, { useState, useEffect,useMemo,useRef } from "react";
import { Layout,Form,Modal,Input,DatePicker, Table, Card, Row, Col,Empty, Tag, Space,message, Button,Select ,Typography,Spin} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { Edit, Trash2,Copy } from "lucide-react";
import {toast} from "react-toastify"
import SessionExpiredModal from "../Components/SessionExpiredModal";
import io from "socket.io-client"

const { Search } = Input;
const { Content } = Layout;
   const { Option } = Select;
const { Text } = Typography;

const ContainerPage = () => {
  // Sample data for containers (can be fetched from an API or database)

  const socket = useMemo(() =>io("http://localhost:4000/Shipping",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

  const socket1 = useMemo(() =>io("http://localhost:4000/orders",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState(containers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modal_open, set_modal_open] = useState(false);
const [selectedShipmentId, setSelectedShipmentId] = useState(null); 
const [visible,setVisible] = useState(false)

  useEffect(() => {
    if (!search) {
      setFilteredContainers(containers); // Reset if search is empty
    } else {
      setFilteredContainers(
        containers.filter((container) =>
          container.containerNumber.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, containers]); 

  useEffect(() => {
    socket.connect()
      socket1.emit("joinRoom", "adminRoom");
      socket.emit("get_all_container");

    
  },[]);

  

  const routes = {
      Guangzhou_Route_1: ["Guangzhou Port", "Colombo Port", "Port of Aden", "Port of Alexandria", "Port of Algiers", "Port of Freetown", "Tema Port"], 
      Yiwu_Route_1: ["Ningbo – Zhoushan Port, Yiwu", "Jeddah Islamic Port", "Port Said (Suez Canal)", "Port of Tripoli", "Port of Tangier Med", "Port of Conakry", "Tema Port"],
      Guangzhou_Route_2: ["Guangzhou Port", "Colombo Port", "Port of Tunis", "Port of Nouakchott", "Port of Bissau", "Port of Abidjan", "Tema Port"],
      Guangzhou_Route_3: ["Guangzhou Port", "Port of Aden", "Port of Alexandria", "Port of Tangier Med", "Port of Dakar", "Port of Monrovia", "Tema Port"],
      Yiwu_Route_2: ["Ningbo – Zhoushan Port, Yiwu", "Colombo Port", "Suez Port (Port Tawfiq)", "Port of Algiers", "Port of Las Palmas", "Port of Banjul", "Tema Port"],
    };
  
    const statusOptions = ["All","Pending", "In Transit", "Delivered"]; 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [permission,setPermission] = useState(false)
     const [selectedRoute, setSelectedRoute] = useState(null);
     const [selectedCountry, setSelectedCountry] = useState(null);
    const [shipmentStatus, setShipmentStatus] = useState(null);
    const[cbmRate,setCbmRate] = useState(null)
    const[containerNumber,setContainerNumber] = useState()
    const [shipmentOrders,setShipmentOrders] = useState([])
    
    const [eta,setEta] = useState()
    const[isEdit,setIsEdit]= useState(false)
    const [loadingDate,setLoadingDate] = useState()
    const [creatingOrder,setCreatingOrder]= useState(false);
   
    const [orderInfo,setOrderInfo] = useState(
      {
        fullname:"",
        email:"",
        container_id:""
      }
    )

    const [items, setItems] = useState([
      { description:"Unclassified", trackingNo: "",cbm:"",ctn:""}
  ]);

  const handleInputChange = (index, field, event) => {
    const { value } = event.target;
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  
    
  useEffect(() => {
  
      

      socket.emit("fetchContainers", (response) => {
        if (response.status === "ok") {
          console.log(response.containers)
          setContainers(response.containers);
        } else {
          setError(response.message);
        }
        setLoading(false);
      });
  
  
  }, []); // No dependencies needed

    useEffect(() => {
        // Fetch initial container list
        
    },[])

    useEffect(() => {
      localStorage.setItem("lastVisitedTab", "/containers");
    }, []);

  useEffect(() => {
    socket.on("connect",()=>{
        console.log("connected to container page")
    })

    socket.on("newContainerAdded",(data)=>{
      message.success("new container added")
      setContainers(prev => [data,...prev])
    })

    socket.on("containersUpdated", (updatedContainers) => {
        setContainers(updatedContainers);
      });

    socket.on("containerCreated",(data)=>{
        setContainers(prev => [data,...prev])
    })

    socket.on("containerUpdated", (updatedContainer) => {
      setContainers((prev) => [...prev, updatedContainer]);
    });

    

    socket.on("receive",(data)=>{
      setCreatingOrder(false)
      
      message.success("New order")
      console.log("order data",data)
    })

    socket.on("connect_error", (err)=>{
          console.log(err)
           if (err.message.includes("Refresh token expired")) {
                          
                            setVisible(true)
                        
                      
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

    socket.on("disconnect", (reason) => {
        console.log(reason);
      });

    return () => {
      socket.off("connect")
      socket.off("containerUpdated");
      socket.off("containersUpdated");
      socket.off("containerCreated")
      socket.off("get_container")
      socket.off("connect_error")
      socket.off("disconnect")
    };
  }, [socket]);

  useEffect(() => {
    socket.on("ordersByShipment", ({ shipmentId, orders }) => {
      if (shipmentId === selectedShipmentId) {
        setShipmentOrders(orders);
        setIsModalOpen(true);
      }
    });
  
    return () => socket.off("ordersByShipment");
  }, [selectedShipmentId]);

  useEffect(() => {
    socket1.on("connect",()=>{
        console.log("connected to container page")
    })
    socket1.on("receive",(data)=>{
      setCreatingOrder(false)
      
      message.success("New order")
      console.log("order data",data)
    })

    socket1.on("newContainerAdded",(data)=>{
      message.success("new container added")
      setContainers(prev => [data,...prev])
    })

    socket1.on("orderRemovedFromContainer", ({ orderId } ) => {
      message.success("1 shipment removed from container"); 
      setContainers(prevContainers =>
        prevContainers.map(container => ({
          ...container,
          assignedOrders: container.assignedOrders.filter(order => order.orderId !== orderId)
        }))
      );
    });

    socket1.on("updatedShipment", (data)=>{
      message.success("Shipment updated")
      setContainers(prev =>
        prev.map(item =>{
            const updated = data.find(list =>  list._id === item._id)

             return updated ? {...item,...updated} : item;
        })
      )
    })

    socket1.on("new",(data)=>{
      message.success("New shipment added")
      setContainers((prev) => 
        prev.map((container) => {
          const updatedShipment = data.find((newItem) => newItem._id === container._id);
          return updatedShipment ? { ...container, ...updatedShipment } : container;
        })
      );
      console.log(data)
    })

    socket1.on("delete_container",(containerId)=>{
      setContainers((prev) => {
        
         const fliteredContainer= prev.filter((container) => container._id !== containerId);
          return fliteredContainer 
        
     });
     
    })

    socket1.on("disconnect",(reason)=>{
         console.log(reason)
    })


    return()=>{
      socket1.off("connect")
      socket1.off("receive")
      socket1.off("new")
      socket1.off("diconnect")
    }

  },[socket1])


  
      

  const handleRouteChange = (route) => {
    setSelectedRoute(route);
    setSelectedCountry(null); // Reset country selection when route changes
  };

  const handleSave = () => {
    if ( !selectedCountry || !shipmentStatus || !containerNumber || !cbmRate || !eta || !loadingDate) {
      message("All fields are required");
      return;
    }

    // Emit the data to the server
    
    socket.emit("createContainer", {
      
      containerNumber:containerNumber,
      loadingDate: loadingDate,
      eta:eta,
      cbmRate: parseFloat(cbmRate),
      route: selectedRoute,
      port: selectedCountry,
      status: shipmentStatus,
    },(response)=>{
      if (response.status === "error") {
        message.error(response.message);
      } else{
        message.success(response.message)
      }
         
      })
    

    setIsEdit(false);
  };

 
   
    
    const [containerId,setContainerIds] = useState(null)
     const [isEditContainer,setIsEditContainer] = useState(false)

    const editShipment =()=>{

      if ( !selectedCountry || !shipmentStatus ) {
        message("All fields are required");
        return;
      }
      console.log("Sending update:", {
        containerId,
        selectedRoute,
        selectedCountry,
        shipmentStatus,
      });
        socket.emit("editOrderStatus",{containerId,selectedRoute,selectedCountry,shipmentStatus},(response)=>{
          if (response.status === "ok") {
            toast.success(response.message);
            setIsEditContainer(false)
            const data= response.data;
            setContainers(prev =>
              prev.map(item =>{
                  const updated = data.find(list =>  list._id === item._id)

                   return updated ? {...item,...updated} : item;
              })
            )
          } else {
            toast.error(response.message);
          }})
    }

  
     

     const handleEditContainer = () => {
      setIsEditContainer(true);
     }

     function deleteContainer(containerId){
        socket1.emit("deleteContainer",containerId,(response)=>{
            if(response.status==="ok"){
              message.success("Container deleted")
            }else{
               message.error(response.message)
            }
        })
     }
  

  // Columns for the table
  const columns = [
    
    { 
      title: "Container Number",
      dataIndex: "containerNumber",
      key: "containerNumber",
      render:(text,record)=> (
        <Space>
        <p>{text}</p>
        <Copy size={15} onClick={() => navigator.clipboard.writeText(record.containerNumber)} />
        </Space>
      ) },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Pending..." ? "orange" : status === "In Transit" ? "blue" : status === "Delivered" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: "Route", dataIndex: "route", key: "route" },
    { title: "Port", dataIndex: "port", key: "port" },
    {
      title: "CBM Rate",
      dataIndex: "cbmRate",
      key: "cbmRate",
      render: (cbmRate) => `$${cbmRate.toFixed(2)}`,
    },
    {
      title: "Loading Date",
      dataIndex: "loadingDate",
      key: "loadingDate",
      render: (loadingDate) => new Date(loadingDate).toLocaleDateString()
      },
    {
      title: "ETA",
      dataIndex: "eta",
      key: "eta",
      render: (eta) => new Date(eta).toLocaleDateString(),
    },
    {
      title: "Assigned Shipments",
      key: "assignedOrders",
      render: (_, orders) => (
        <div>
          {orders.assignedOrders.length > 0 ? (
            <div className="flex gap-px">
              <Tag style={{ float: "left" }}>{orders.assignedOrders.length}</Tag>
              <button
  onClick={() => {
    const shipmentId = orders._id;
    setSelectedShipmentId(shipmentId);
    set_modal_open(true);
    socket.emit("getOrdersByShipment", shipmentId);
  }}
  className=" px-2 text-xs  bg-purple-200 border-1 border-purple-300 hover:bg-purple-700 text-stone-500 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200"
>
  
  View 
</button>

            </div>
          ) : (
            <Tag color="gray">No shipments</Tag>
          )}
        </div>
      )
    }
    ,
    {
      title: "Actions",
      key: "actions",
      render: (_,container) =>
        <div style={{ display: "flex", gap: "3px" }}>
  

  <Button 
    size="small" 
    type="default" 
    style={{fontSize:"12px",border:"none"}}
    onClick={() => {
      handleEditContainer();
      setContainerIds(container._id);
    }}
  >
    <Edit size={18}/>
  </Button>

  <Button 
    size="small" 
    type="danger" 
    onClick={()=> deleteContainer(container._id)}
  >
    <Trash2 style={{ color:"red"}} size={18}/>
  </Button>
</div>
,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    return shipmentOrders.filter(order =>
      [order.tracking_no, order.Status, order.location]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, shipmentOrders]);

  const AssignedShipments= [
    {
      title: "Tracking No",
      dataIndex: "tracking_no",
      key: "tracking_no",
      render: text => <strong>{text}</strong>,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "CBM",
      dataIndex: "cbm",
      key: "cbm",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: status => {
        const color =
          status === "Delivered"
            ? "green"
            : status === "in-Transit"
            ? "blue"
            : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
  ];



  return (
    <Layout style={{paddingTop:"100px"}}
      className='layout-shift  w-full bg-stone-100 lg:w-[80%] '>
     
     <div style={{marginInline:"auto",marginBottom:"12px"}} className="flex flex-col w-[90%] mb-3  sm:flex-row justify-between items-center gap-4  px-4 py-3 bg-white rounded-2xl shadow-sm border border-purple-300">
  <button
    onClick={() => setIsEdit(true)}
    className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-400 transition-all text-sm font-medium"
  >
    Add Container
  </button>

  <input
    type="text"
    placeholder="Search by Container Number..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onPaste={(e) => setSearch(e.clipboardData.getData("text"))}
    className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
   

   <Modal
  title="📦 Orders in this Shipment"
  open={modal_open}
  onCancel={() => set_modal_open(false)}
  footer={null}
  centered
  width={900}
>
  <Space direction="vertical" style={{ width: "100%" }}>
        <Search
          placeholder="Search by tracking number, status, or location"
          allowClear
          enterButton={<SearchOutlined />}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {filteredOrders.length > 0 ? (
          <Table
            columns={AssignedShipments}
            dataSource={filteredOrders.map(order => ({
              ...order,
              key: order._id,
            }))}
            pagination={{ pageSize: 5 }}
            bordered
          />
        ) : (
          <Empty description="No orders match your search." />
        )}
      </Space>
</Modal>
    <Modal
  title="Add container"
  open={isEdit}
  onCancel={() => setIsEdit(false)}
  footer={null}
  styles={{ maxHeight: "60vh", overflowY: "auto" }} // 🔥 Scrollable body
>
  <Form layout="vertical">
    {/* All form content wrapped in one scrollable area */}

    <Form.Item
      label="Container Number"
      name="containerNumber"
      rules={[{ required: true, message: "Please enter container number!" }]}
    >
      <Input
        placeholder="Enter Container Number"
        type="number"
        value={containerNumber}
        onChange={(e) => setContainerNumber(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      label="Loading Date"
      name="loadingDate"
      rules={[{ required: true, message: "Please select a loading date!" }]}
    >
      <DatePicker
        style={{ width: "100%" }}
        value={loadingDate}
        onChange={(date) => setLoadingDate(date)}
        format="YYYY-MM-DD"
      />
    </Form.Item>

    <Form.Item
      label="ETA (Estimated Time of Arrival)"
      name="eta"
      rules={[{ required: true, message: "Please select ETA!" }]}
    >
      <DatePicker
        style={{ width: "100%" }}
        value={eta}
        onChange={(date) => setEta(date)}
        format="YYYY-MM-DD"
      />
    </Form.Item>

    <Form.Item
      label="CBM Rate"
      name="cbmRate"
      rules={[{ required: true, message: "Please enter CBM rate!" }]}
    >
      <Input
        type="number"
        step="0.01"
        value={cbmRate}
        onChange={(e) => setCbmRate(e.target.value)}
        placeholder="Enter CBM Rate"
      />
    </Form.Item>

    <Form.Item label="Select Route">
      <Select
        style={{ width: "100%", height: "40px" }}
        placeholder="Select Route"
        value={selectedRoute}
        onChange={handleRouteChange}
      >
        {Object.keys(routes).map((route) => (
          <Option key={route} value={route}>
            Route {route}
          </Option>
        ))}
      </Select>
    </Form.Item>

    {selectedRoute && (
      <Form.Item label={`Select Port in Route ${selectedRoute}`}>
        <Select
          style={{ width: "100%", height: "40px" }}
          onChange={(country) => setSelectedCountry(country)}
          placeholder="Select Port"
          value={selectedCountry}
        >
          {routes[selectedRoute].map((country) => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Select>
      </Form.Item>
    )}

    <Form.Item label="Update Status">
      <Select
        style={{ width: "100%" }}
        onChange={(status) => setShipmentStatus(status)}
        placeholder="Select Status"
        value={shipmentStatus}
      >
        {statusOptions.map((status) => (
          <Option key={status} value={status}>
            {status}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </Form>

  {/* 🔒 Fixed Footer */}
  <div style={{ position: "sticky", bottom: 0, background: "#fff", paddingTop: "12px" }}>
    <Button
      type="primary"
      style={{ width: "100%", height: "40px",background:"var(--purple)" }}
      onClick={handleSave}
      disabled={!selectedRoute || !selectedCountry || !shipmentStatus}
    >
      Save Changes
    </Button>
  </div>
</Modal>

    

  {/* Edit Container Modal */}
  <Modal title="Edit container" open={isEditContainer} onCancel={() => setIsEditContainer(false)} footer={null}>
     <Form layout="vertical"> 
      <div style={{ marginBottom: "16px" }}>
      <Text strong>Select Route:</Text>
      <Select
        style={{ width: "100%", height: "40px", marginTop: "5px" }}
        placeholder="Select Route"
        value={selectedRoute}
        onChange={handleRouteChange}
      >
        {Object.keys(routes).map((route) => (
          <Option key={route} value={route}>
             {route}
          </Option>
        ))}
      </Select>
    </div>
        


        {/* Select Country (Only if Route is selected) */}
        {selectedRoute && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
              Select Country in Route {selectedRoute}:
            </label>
            <Select
              style={{ width: "100%",height:"40px" }}
              onChange={(country) => setSelectedCountry(country)}
              placeholder="Select Country"
              value={selectedCountry}
            >
              {routes[selectedRoute].map((country) => (
                <Select.Option key={country} value={country}>
                  {country}
                </Select.Option>
              ))}
            </Select>
          </div>
        )}

        {/* Select Shipment Status (Applies to all selected shipments) */}
        <div style={{ marginBottom: "15px" }}>
      <Text strong>Update Status:</Text>
      <Select
        style={{ width: "100%", marginTop: "5px" }}
        onChange={(status) => setShipmentStatus(status)}
        placeholder="Select Status"
        value={shipmentStatus}
      >
        {statusOptions.map((status) => (
          <Option key={status} value={status}>
            {status}
          </Option>
        ))}
      </Select>
    </div>

     <Button type="primary" style={{ marginTop: "10px",height:"40px", width: "100%",background:"var(--purple)" }}
      disabled={!selectedRoute || !selectedCountry || !shipmentStatus}
      htmlType="submit"
      onClick={editShipment}
      >Save change</Button>
      </Form>

      

      
    </Modal>

      <Content style={{ padding: "10px 0",width:"90%",marginInline:"auto" }}>
        <Row gutter={[16, 16]}>
          {/* Container Page Title */}
          <Col span={24}>
            <Card title="Containers Overview" style={{border:"1px solid #ddd"}}>
              <Table
                columns={columns}
                dataSource={containers}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 1200 }} // Makes the table horizontally scrollable
                title={() => (
                  <Space>
                    <SearchOutlined />
                    <span>Search Containers</span>
                  </Space>
                )}
                // You can add more functionality like filtering and sorting here
              />
            </Card>
          </Col>
        </Row>
      </Content>

      <SessionExpiredModal visible={visible}/>
    </Layout>
  );
};

export default ContainerPage;
