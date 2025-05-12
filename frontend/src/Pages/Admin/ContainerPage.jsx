import React, { useState, useEffect,useMemo,useRef } from "react";
import { Layout,Form,Modal,Input,DatePicker, Table, Card, Row, Col,Empty, Tag, Space, Button,Select ,Typography,Spin} from "antd";
import { Chip, IconButton, Tooltip,Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


import { SearchOutlined } from '@ant-design/icons';
import { Edit, Trash2,Copy } from "lucide-react";
import {toast} from "react-toastify"
import SessionExpiredModal from "../../Components/SessionExpiredModal";
import io from "socket.io-client"
import { jwtDecode } from "jwt-decode";
const { Search } = Input;
const { Content } = Layout;
   const { Option } = Select;
const { Text } = Typography;

const ContainerPage = () => {
  // Sample data for containers (can be fetched from an API or database)
   const accesstoken = localStorage.getItem('accesstoken');
   const decode = jwtDecode(accesstoken);
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

  const socket2 = useMemo(() =>io("http://localhost:4000/notify",{
         transports: ['websocket'],credentials: true
       }),[]) 
  
    React.useEffect(()=>{
       socket2.on("connect",()=>{
          console.log("web socket is active")
          
          socket2.emit('getUnreadNotifications', decode?.id);
       })
      },[socket2])

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

  

  const routes = [
  {
    name: "Guangzhou_Route_1",
    ports: [
      { name: "Guangzhou Port", country: "China" },
      { name: "Colombo Port", country: "Sri Lanka" },
      { name: "Port of Aden", country: "Yemen" },
      { name: "Port of Alexandria", country: "Egypt" },
      { name: "Port of Algiers", country: "Algeria" },
      { name: "Port of Freetown", country: "Sierra Leone" },
      { name: "Tema Port", country: "Ghana" }
    ]
  },
  {
    name: "Yiwu_Route_1",
    ports: [
      { name: "Ningbo – Zhoushan Port, Yiwu", country: "China" },
      { name: "Jeddah Islamic Port", country: "Saudi Arabia" },
      { name: "Port Said (Suez Canal)", country: "Egypt" },
      { name: "Port of Tripoli", country: "Libya" },
      { name: "Port of Tangier Med", country: "Morocco" },
      { name: "Port of Conakry", country: "Guinea" },
      { name: "Tema Port", country: "Ghana" }
    ]
  },
  {
    name: "Guangzhou_Route_2",
    ports: [
      { name: "Guangzhou Port", country: "China" },
      { name: "Colombo Port", country: "Sri Lanka" },
      { name: "Port of Tunis", country: "Tunisia" },
      { name: "Port of Nouakchott", country: "Mauritania" },
      { name: "Port of Bissau", country: "Guinea-Bissau" },
      { name: "Port of Abidjan", country: "Côte d'Ivoire" },
      { name: "Tema Port", country: "Ghana" }
    ]
  },
  {
    name: "Guangzhou_Route_3",
    ports: [
      { name: "Guangzhou Port", country: "China" },
      { name: "Port of Aden", country: "Yemen" },
      { name: "Port of Alexandria", country: "Egypt" },
      { name: "Port of Tangier Med", country: "Morocco" },
      { name: "Port of Dakar", country: "Senegal" },
      { name: "Port of Monrovia", country: "Liberia" },
      { name: "Tema Port", country: "Ghana" }
    ]
  },
  {
    name: "Yiwu_Route_2",
    ports: [
      { name: "Ningbo – Zhoushan Port, Yiwu", country: "China" },
      { name: "Colombo Port", country: "Sri Lanka" },
      { name: "Suez Port (Port Tawfiq)", country: "Egypt" },
      { name: "Port of Algiers", country: "Algeria" },
      { name: "Port of Las Palmas", country: "Spain" },
      { name: "Port of Banjul", country: "The Gambia" },
      { name: "Tema Port", country: "Ghana" }
    ]
  }
];

  
    const statusOptions = ["All","Pending", "In Transit", "Delivered"]; 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [permission,setPermission] = useState(false)
     const [selectedRoute, setSelectedRoute] = useState(null);
     const [selectedCountry, setSelectedCountry] = useState(null);
     const [selectedPort, setSelectedPort] = useState(null); // New state
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
  
    socket.on("container_deleted",(data)=>{
        setContainers(prev =>
           prev.filter(container => container._id !== data)
        )
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
      toast.error("All fields are required");
      return;
    }

    // Emit the data to the server
    
    socket.emit("createContainer", {
  containerNumber,
  loadingDate,
  eta,
  cbmRate: parseFloat(cbmRate),
  route: selectedRoute,
  port: selectedPort, // ✅ Now sending port name
  country: selectedCountry,
  status: shipmentStatus,
}, (response) => {
  if (response.status === "error") {
    toast.error(response.message);
  } else {
    toast.success(response.message);
  }
});

    

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
          console.log("updated",response)
          if (response.status === "ok") {
            toast.success("Updated successfull");
            setIsEditContainer(false)
            const updated = response.data;

            setContainers(prev =>
              prev.map(item =>
                item._id === updated._id ? { ...item, ...updated } : item
              )
            );
          } else {
            toast.error(response.message);
          }})
    }

  
     

     const handleEditContainer = () => {
      setIsEditContainer(true);
     }

     function deleteContainer(containerId){
        socket.emit("deleteContainer",containerId,(response)=>{
            if(response.status==="ok"){
              toast.success(`Container ${response.data} deleted`)
            }else{
               toast.error(response.message)
            }
        })
     }
    
     function sort(){

    
     setFilteredContainers(
      containers.filter((container) =>
        container.containerNumber.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }
  // Columns for the table
  const columns = [
    {
      field: 'containerNumber',
      headerName: 'Container Number',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>{params.value}</span>
          <Tooltip title="Copy">
            <IconButton
              size="small"
              onClick={() => navigator.clipboard.writeText(params.row.containerNumber)}
            >
              <Copy size={16} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const color =
          params.value === 'Pending...'
            ? 'warning'
            : params.value === 'In Transit'
            ? 'info'
            : params.value === 'Delivered'
            ? 'success'
            : 'error';
        return <Chip label={params.value} color={color} size="small" />;
      },
    },
    { field: 'route', headerName: 'Route', width: 130 },
    { field: 'port', headerName: 'Port', width: 130 },
    {
      field: 'cbmRate',
      headerName: 'CBM Rate',
      width: 120,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: 'loadingDate',
      headerName: 'Loading Date',
      width: 130,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'eta',
      headerName: 'ETA',
      width: 130,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'assignedOrders',
      headerName: 'Assigned Shipments',
      width: 200,
      renderCell: (params) => {
        const orders = params.value;
        return orders && orders.length > 0 ? (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' ,height:"100%"}}>
  <Chip label={orders.length} color="default" size="small" />
  <button
    onClick={() => {
      setSelectedShipmentId(params.row._id);
      set_modal_open(true);
      socket.emit('getOrdersByShipment', params.row._id);
    }}
    style={{
      fontSize: '0.75rem',
      backgroundColor: '#ddd6fe',
      border: '1px solid #c4b5fd',
      color: '#4b5563',
      fontWeight: 600,
      height: '24px', // Matches MUI small Chip height
      padding: '0 10px',
      borderRadius: '8px',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 1,
    }}
    className="hover:bg-purple-700 hover:text-white"
  >
    View
  </button>
</div>

        ) : (
          <Chip label="No shipments" color="default" size="small" />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' ,height:"100%"}}>
          <IconButton
            size="small"
            onClick={() => {
              handleEditContainer();
              setContainerIds(params.row._id);
            }}
          >
            <Edit size={18} />
          </IconButton>
          <IconButton size="small" onClick={() => deleteContainer(params.row._id)}>
            <Trash2 size={18} style={{ color: 'red' }} />
          </IconButton>
        </div>
      ),
    },
  ];
  

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
    onChange={(e) =>{ 
      sort()
      setSearch(e.target.value)
    }}
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
  title={<h2 style={{ textAlign: 'center', fontWeight: '600' }}>Add Container</h2>}
  open={isEdit}
  onCancel={() => setIsEdit(false)}
  footer={null}
  centered
  style={{ borderRadius: "16px" }}
  bodyStyle={{ maxHeight: "60vh", overflowY: "auto", padding: "24px" }}
>
  <Form layout="vertical">
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

    <Form.Item label="Select Route" required>
      <Select
  style={{ width: "100%", height: "40px", marginTop: "5px" }}
  placeholder="Select Route"
  value={selectedRoute}
  onChange={handleRouteChange}
>
  {routes.map((route) => (
    <Option key={route.name} value={route.name}>
      {route.name}
    </Option>
  ))}
</Select>
</Form.Item>

{selectedRoute && (
  <>
    <Form.Item label={`Select Country in ${selectedRoute}`} required>
      <Select
        style={{ width: "100%" }}
        placeholder="Select Country"
        value={selectedCountry}
        onChange={(country) => {
          setSelectedCountry(country);
          setSelectedPort(null); // Reset port on country change
        }}
      >
        {[...new Set(
          routes
            .find((route) => route.name === selectedRoute)
            ?.ports.map((port) => port.country)
        )].map((country) => (
          <Select.Option key={country} value={country}>
            {country}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>

    {selectedCountry && (
      <Form.Item label={`Select Port in ${selectedCountry}`} required>
        <Select
          style={{ width: "100%" }}
          placeholder="Select Port"
          value={selectedPort}
          onChange={setSelectedPort}
        >
          {routes
            .find((route) => route.name === selectedRoute)
            ?.ports.filter((port) => port.country === selectedCountry)
            .map((port) => (
              <Select.Option key={port.name} value={port.name}>
                {port.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    )}
    
      
      </>
    )}
    

    <Form.Item label="Update Status" required>
      <Select
        style={{ width: "100%" }}
        placeholder="Select Status"
        value={shipmentStatus}
        onChange={setShipmentStatus}
      >
        {statusOptions.map((status) => (
          <Select.Option key={status} value={status}>
            {status}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  </Form>

  {/* Fixed Footer Button */}
  <div style={{
    position: "sticky",
    bottom: "-30px",
    background: "#fff",
    padding: "16px 0",
    marginTop: "12px",
    borderTop: "1px solid #f0f0f0"
  }}>
    <Button
      type="primary"
      block
      style={{ background: "var(--purple)", height: "40px", fontWeight: 500 }}
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
  {routes.map((route) => (
    <Option key={route.name} value={route.name}>
      {route.name}
    </Option>
  ))}
</Select>

{selectedRoute && (
  <>
    <Form.Item label={`Select Country in ${selectedRoute}`} required>
      <Select
        style={{ width: "100%" }}
        placeholder="Select Country"
        value={selectedCountry}
        onChange={(country) => {
          setSelectedCountry(country);
          setSelectedPort(null); // Reset port on country change
        }}
      >
        {[...new Set(
          routes
            .find((route) => route.name === selectedRoute)
            ?.ports.map((port) => port.country)
        )].map((country) => (
          <Select.Option key={country} value={country}>
            {country}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>

    {selectedCountry && (
      <Form.Item label={`Select Port in ${selectedCountry}`} required>
        <Select
          style={{ width: "100%" }}
          placeholder="Select Port"
          value={selectedPort}
          onChange={setSelectedPort}
        >
          {routes
            .find((route) => route.name === selectedRoute)
            ?.ports.filter((port) => port.country === selectedCountry)
            .map((port) => (
              <Select.Option key={port.name} value={port.name}>
                {port.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    )}
  </>
)}

</div>

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
            <DataGrid
                rows={filteredContainers}
                columns={columns}
                getRowId={(row) => row._id}
                pageSizeOptions={[5]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5, page: 0 } }
                }}
                
                density="comfortable"
                sx={{
                  // Horizontal scroll equivalent
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f3f4f6',
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#f9fafb',
                  },
                }}
                slots={{
                  toolbar: () => (
                    <Box display="flex" alignItems="center" p={1} gap={1}>
                      <SearchOutlined fontSize="small" />
                      <Typography variant="body1" fontWeight={500}>
                        Search Containers
                      </Typography>
                    </Box>
                  ),
                }}
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
