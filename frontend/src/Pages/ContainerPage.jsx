import React, { useState, useEffect,useMemo,useRef } from "react";
import { Layout,Form,Modal,Input,DatePicker, Table, Card, Row, Col, Tag, Space,message, Button,Select ,Typography,Spin} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { Edit, Trash2 } from "lucide-react";

import io from "socket.io-client"


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
    const [filterStatus, setFilterStatus] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [permission,setPermission] = useState(false)
     const [selectedRoute, setSelectedRoute] = useState(null);
     const [selectedCountry, setSelectedCountry] = useState(null);
    const [shipmentStatus, setShipmentStatus] = useState(null);
    const[cbmRate,setCbmRate] = useState(null)
    const[containerNumber,setContainerNumber] = useState()
    
    const [eta,setEta] = useState()
    const[isEdit,setIsEdit]= useState(false)
    const [loadingDate,setLoadingDate] = useState()
    const [creatingOrder,setCreatingOrder]= useState(false);
    const [assignedOrder_id,setAssignedOrder_id]= useState([])
    const [containerid,setContainerId] = useState(null)
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
          if (err.message.includes("404: Refresh token not found")) {
            setTimeout(()=>{
            setIsModalOpen(true)
          },1000)
        
         }else if(err.message.includes("403: Unauthorized")) {
            setTimeout(()=>{
            setPermission(true)
          },1000)
            
         } else if (err.message.includes("401: Invalid refresh token")) {
            setTimeout(()=>{
              setIsModalOpen(true)
            },1000)
          }
        else if(err.message.includes("No cookies found")){
          setTimeout(()=>{
          setIsModalOpen(true)
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

  const [isModalVisible3, setIsModalVisible3] = useState(false);

  const handleOpen3 = () => setIsModalVisible3(true);
  const handleClose3 = () => setIsModalVisible3(false);
  

  const validateForm = () => {
    // Check if any orderInfo field is empty
    for (const key in orderInfo) {
      if (!orderInfo[key].trim()) {
        message.warning(`Please fill in the ${key.replace("_", " ")}`);
        return false;
      }
    }
  
    // Validate each item in the items array
    for (let i = 0; i < items.length; i++) {
      const { trackingNo, cbm, ctn } = items[i];
  
      if (!trackingNo.trim()) {
        message.warning(`Tracking number is required for item ${i + 1}`);
        return false;
      }
  
      if (!cbm.trim() || isNaN(cbm) || Number(cbm) <= 0) {
        message.warning(`Valid CBM is required for item ${i + 1}`);
        return false;
      }
  
      if (!ctn.trim() || isNaN(ctn) || Number(ctn) <= 0) {
        message.warning(`Valid CTN is required for item ${i + 1}`);
        return false;
      }
    }
  
    return true;
  };
  
   
    const handleSubmit1 = () => {
      if (!validateForm()) return;
     
      setCreatingOrder(true)
      setTimeout(()=>{
        socket1.emit("createOrder",{items,...orderInfo},(response) => {
          if (response.status === "ok") {
            setCreatingOrder(false)
            handleClose3()
            

          } else {
            setCreatingOrder(false)
            message.error(response.message);
          }})
      },1000)
      
    };

    function editOrderStatus(){
        socket1.emit("editOrderStatus",{containerId,selectedRoute,selectedCountry,shipmentStatus},(response)=>{
          if (response.status === "ok") {
            message.success(response.message);
            setIsEditContainer(false)
            const data= response.data;
            setContainers(prev =>
              prev.map(item =>{
                  const updated = data.find(list =>  list._id === item._id)

                   return updated ? {...item,...updated} : item;
              })
            )
          } else {
            message.error(response.message);
          }})
    }

  
     const [containerId,setContainerIds] = useState(null)
     const [isEditContainer,setIsEditContainer] = useState(false)

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
    
    { title: "Container Number", dataIndex: "containerNumber", key: "containerNumber" },
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
      render: (_,orders) =>
         <div >
        {orders.assignedOrders.length > 0 ? (
          
          <>
          <Tag style={{float:"left"}}>{orders.assignedOrders.length}</Tag> 
          
          </>
        ) : (
          <Tag color="gray">No shipments</Tag>
        )}
       
        </div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_,container) =>
        <div style={{ display: "flex", gap: "3px" }}>
  <Button 
    size="small" 
    type="primary" 
    onClick={() => {
      handleOpen3();
      setOrderInfo({ ...orderInfo, container_id: container._id });
    }}
  >
    Add Order
  </Button>

  <Button 
    size="small" 
    type="default" 
    style={{fontSize:"12px"}}
    onClick={() => {
      handleEditContainer();
      setContainerIds(container._id);
    }}
  >
    <Edit />
  </Button>

  <Button 
    size="small" 
    type="danger" 
    onClick={()=> deleteContainer(container._id)}
  >
    <Trash2 style={{ color:"red"}}/>
  </Button>
</div>
,
    },
  ];



  return (
    <Layout style={{marginTop:"100px"}}
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


    <Modal title="Add container" open={isEdit} onCancel={() => setIsEdit(false)} footer={null}>
      <Form layout="vertical">
        
        {/* Select Route */}
        <div style={{ marginBottom: "15px" }}>
        

        {/* Container Number Input */}
        <Form.Item
          label="Container Number"
          name="containerNumber"
          value={containerNumber}
          onChange={(e)=> setContainerNumber(e.target.value)}
          rules={[{ required: true, message: "Please enter container number!" }]}
        >
          <Input placeholder="Enter Container Number" type="number" />
        </Form.Item>

        <Form.Item label="Loading Date" name="loadingDate" rules={[{ required: true, message: "Please select a loading date!" }]}>
        <DatePicker 
          style={{ width: "100%" }} 
          value={loadingDate} 
          onChange={(date) => setLoadingDate(date)}
          format="YYYY-MM-DD"
        />
      </Form.Item>

      {/* ETA Input */}
      <Form.Item label="ETA (Estimated Time of Arrival)" name="eta" rules={[{ required: true, message: "Please select ETA!" }]}>
        <DatePicker 
          style={{ width: "100%" }} 
          value={eta} 
          onChange={(date) => setEta(date)}
          format="YYYY-MM-DD"
        />
      </Form.Item>

      <Form.Item label="CBM Rate" name="cbmRate" rules={[{ required: true, message: "Please enter CBM rate!" }]}>
        <Input type="number" step="0.01" value={cbmRate} onChange={(e)=> setCbmRate(e.target.value)} placeholder="Enter CBM Rate" />
      </Form.Item>

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
            Route {route}
          </Option>
        ))}
      </Select>
    </div>
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
      </Form>

      

      <Button type="primary" style={{ marginTop: "10px",height:"40px", width: "100%" }} 
      onClick={ handleSave  }
      disabled={!selectedRoute || !selectedCountry || !shipmentStatus}>
        Save Changes
      </Button>
    </Modal>
    

  {/* Edit Container Modal */}
  <Modal title="Edit container" open={isEditContainer} onCancel={() => setIsEditContainer(false)} footer={null}>
     <Form>
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

     <Button type="primary" style={{ marginTop: "10px",height:"40px", width: "100%" }}
      disabled={!selectedRoute || !selectedCountry || !shipmentStatus}
      onClick={editOrderStatus}>Save change</Button>
      </Form>

      

      
    </Modal>

      <Content style={{ padding: "10px 50px" }}>
        <Row gutter={[16, 16]}>
          {/* Container Page Title */}
          <Col span={24}>
            <Card title="Containers Overview" bordered={false}>
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
    </Layout>
  );
};

export default ContainerPage;
