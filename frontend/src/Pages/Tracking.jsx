import React,{useState,useMemo,useEffect,useRef} from 'react'
import {useSearchParams,useNavigate} from "react-router-dom"
import "./Tracking.css"
import io from "socket.io-client"
import { Empty,Modal,Spin } from "antd"
import {toast} from "react-toastify"
import { Package,MapPin, Clock,Hourglass,Timer } from 'lucide-react';
import {route1,route2,route3,route4,route5} from "../Data/RouteData"
import  ShipIcon  from "../icons/Truck.svg"
import  MapShipIcon  from "../icons/CargoShip.svg"
import  Ship2Icon  from "../icons/image.svg"
import Ship from "../icons/Ship"
import MapShip from '../icons/MapShip'
import { RightCircleFilled,ArrowRightOutlined, UpOutlined ,CheckOutlined  } from '@ant-design/icons'
import Map, { Marker,  NavigationControl,Source,Layer } from "react-map-gl/maplibre";
import 'maplibre-gl/dist/maplibre-gl.css';
import { Form, Input, Button } from "antd";

const Mapbox = () => {

  const parent= useRef(null)
  const socket = useMemo(() =>io("http://localhost:4000/Tracking",{
    transports: ["websocket","polling"],
    withCredentials: true,
  secure: true
  }),[])
  
  const [route,setRoute] = useState("")
  const [country , setCountry] = useState("")
  const [lineGeoJSON, setLineGeoJSON] = useState(null);
  const [setIsModalOpen]= useState(false)
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePortIndex, setActivePortIndex] = useState(null);


  const handleOpen = () => {

    setIsMoreInfo(true);
    setLoading(true);
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds
  };
  
useEffect(()=>{
socket.on('connect',()=>{
    console.log("Connected to server")
})

socket.on('get_item_location',(data)=>{
  console.log("tracking order",data)
  setRoute(data?.shipmentId?.route || "")
  setCountry(data?.shipmentId?.port || "")
})

socket.on("connect_error",(error)=>{
          console.log(error)
          if(error.message.includes("Refresh token expired")){
            setTimeout(()=>{
              setIsModalOpen(true)
            },1000)
          }
        })

socket.on("disconnect", reason => console.log(reason))
return()=>{
socket.off("connect")
socket.off("get_item_location")
socket.off("connect_error")
socket.off("disconnect")

}
},[socket]);


const [searchParams] = useSearchParams();
const trackingId = searchParams.get("tracking_id");

    

      const pRefs = useRef([]);
      
      
      const routesMap = {
        Guangzhou_Route_1: route1,
        Yiwu_Route_1: route2,
        Guangzhou_Route_2: route3,
        Guangzhou_Route_3: route4,
        Yiwu_Route_2: route5,
        
      };
 

      
       
      
      
  
      useEffect(() => {
        if (route && routesMap[route]) {
          const landCoordinates = routesMap[route].map(({ Longitude, Latitude }) => [Longitude, Latitude]);
      
          setLineGeoJSON({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: landCoordinates, // Only land routes
            },
          });
        }
      }, [route]);
      
      

      

      const [xPosition, setXposition] = useState(0);
      const [bound, setBound] = useState(0);
      const [Index,setIndex] = useState(0)
      const [scroll,setScroll] = useState(0)
      
      function Scroll() {
        if (parent.current) {
          const { scrollLeft, scrollTop } = parent.current;
      
          // Check if horizontal scroll changed
          if (scrollLeft !== scroll) {
            setScroll(scrollLeft);
          }
      
          // Prevent vertical scrolling
          if (scrollTop !== 0) {
            parent.current.scrollTop = 0;
          }
        }
      }
      useEffect(() => {
        const element= parent.current
        if (!element) return;
        
        element.addEventListener('scroll', Scroll); // Add scroll event listener
        
        return () => {
          
          element.removeEventListener('scroll', Scroll); // Cleanup on unmount
          
        };
      }, [scroll,xPosition]);
      
      const countRef = useRef(null);
      
      // Function to update bound when the country is found
      const updateBound = () => {
        if (!pRefs.current) return;
      
        pRefs.current.forEach((p) => {
          const foundIndex = pRefs.current.findIndex(p => p && p.innerHTML.trim() === country);
          setIndex(foundIndex);
          setActivePortIndex(foundIndex);
      
          if (p && p.innerHTML.trim() === country) {
            const rect = p.getBoundingClientRect();
            const newBound = Math.round(rect.left + scroll); // Adjust for scroll
            setBound(newBound);
      
            // Immediately update position to match the new bound
            
      
            // Reset animation if already running
            if (countRef.current) clearInterval(countRef.current);
      
            countRef.current = setInterval(() => {
              setXposition((previousNumber) => {
                if (previousNumber === newBound) {
                  clearInterval(countRef.current);
                  return previousNumber;
                }
      
                return previousNumber < newBound ? previousNumber + 1 : previousNumber - 1;
              });
          },10)
          }
          })
          return()=>{
            clearInterval(countRef.current)
          }
          }
      
      
      // Runs when country or index changes
      useEffect(() => {
        updateBound();
      }, [country, Index]);
      
      // Runs when window is resized
      useEffect(() => {
        const handleResize = () => {
          updateBound(); // Ensure updated position on resize
        };
        window.addEventListener("resize", handleResize);
      
        return () => window.removeEventListener("resize", handleResize);
      },[xPosition]);



      const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
      const [showButton, setShowButton] = useState(false); // Show/hide the back-to-top button
    
      // Handle the scroll event
      const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
        if (position > 300) { // Show the button after 300px scroll
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
    
      // Scroll to the top when the button is clicked
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll); // Add scroll event listener
        return () => {
          window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
        };
      }, []);
  
 
  
 const [form] = Form.useForm();

 const [width, setWidth] = useState(window.innerWidth);
 const [containerOffset,setContainerOffset] = useState(0)
 const adjustedLeft = width > 1000 ? `${xPosition - containerOffset}px` : `${xPosition}px`;

 useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);

    const container = document.querySelector(".layout-shift"); // Replace with your actual class
    if (container) {
      const rect = container.getBoundingClientRect();
      setContainerOffset(rect.left); // distance from left edge of screen
    }
  };

  handleResize(); // call it once on mount
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);




 

const navigate = useNavigate();
const track_id = searchParams.get("track_id"); // Get track_id from URL

// Handle search input change
const handleSearch = (e) => {
  console.log(e.target.value); // Log user input
};

// Handle form submission
const handleTrack = (values) => {
  if (values.search) {
    navigate(`?track_id=${values.search}`); // Add tracking ID to URL
  }
};

// Send track_id to backend via Socket.IO when it exists in the URL
useEffect(() => {
  if (track_id) {
   socket.emit("track",track_id,(response)=>{
    if(response.status==="ok"){
       toast.success("Tracking...")
      }else if(response.message==="Shipment is still pending"){
       toast.warning(response.message)
      }else{
        toast.error(response.message)
      }
  })
    console.log(`Sent track_id to backend: ${track_id}`);
  }
}, [socket,track_id]);

function handTrack(){
  if (track_id) {
    socket.emit("track",track_id,(response)=>{
     if(response.status==="ok"){
        toast.success("Tracking...")
       }else{
        toast.error(response.message)
       }
   })
  }
}
  return (
    <>

    <div style={{paddingTop:"100px"}}
          className='layout-shift  w-full bg-stone-100 lg:w-[80%] '>
    <div style={{marginInline:"auto"}} className="bg-white w-[95%]   p-6 rounded-2xl shadow-lg border border-stone-200">
  <h2 className="text-xl flex justify-center gap-2 font-semibold text-center text-gray-700 pb-4 border-b border-stone-300">
  <Package className=" text-gray-600" /> Track Your Shipment
  </h2>

  <section style={{marginTop:"16px"}} className=" flex">
    <Form onFinish={handleTrack} layout="inline" style={{width:"100%"}} className="track_form flex flex-col gap-4 md:flex-row "  >
      <div className="w-full">
      <Form.Item name="search" className=" m-0" style={{width:"100%"}}>
        <Input
          placeholder="Enter Tracking ID..."
          allowClear
          size="large"
          onChange={handleSearch}
          style={{ boxShadow: 'none', border: '1px solid #ccc' }}
          
        />
      </Form.Item>
      </div>
      <div className="w-full">
      <Form.Item className="m-0" style={{width:"100%"}}>
        <Button type="primary" htmlType="submit" size="large" style={{width:"100%",background:"var(--purple)",fontWeight:"semi-bold",fontSize:"14px"}} >
          Track
        </Button>
      </Form.Item>
      </div>
    </Form>
  </section>
</div>

      
    </div>
  
   {routesMap[route] ? <div className=' layout-shift w-full bg-stone-100 lg:w-[80%] '>
        <div className="headline">
        <div className="line_header">SHIPPING ROUTE FROM CHINA TO GHANA.</div>
         
        </div>
        
        <div className="line_map" ref={parent}>
        <div className="line_inner" >
          
        <div  className="ship" style={{position:"relative"}}><div  style={{ position: "absolute",top:"-40px", left: adjustedLeft ,width:"fit-content"}}><Ship/></div>  
         </div>
        <section className="line" style={{position:"relative"}} >
          
        
      {routesMap[route].map((port, index) => (
        <div key={index} className="current_city"  >
        <div className="ship-cont">
      <div
        style={{
          background: "var(--purple)",
          position: "relative",
          height: "30px",
          width: "30px",
          border:"2px solid #444",
          borderRadius:"50%",
        }}
      >
        {pRefs.current[index]?.getBoundingClientRect &&
          pRefs.current[index].getBoundingClientRect().left +
            Math.round(scroll) <=
            xPosition + 10  && (
            <CheckOutlined style={{ position: "relative", top: "0", left: "0" }} />
          )}
      </div>
      <div className="cordinates">
      <p  ref={(el) => (pRefs.current[index] = el)}>
        {port.countryPort} 
      </p>
      <main>{port.country}</main>
      </div>
    </div>

    {/* Insert Arrow After Every Ship-Cont Except the Last One */}
    {index > 0 && index < routesMap[route].length + 2 ? (
      <ArrowRightOutlined className={`arrow arrow_${index + 1}`} />
    ) : null}
  </div>
))}
    

        </section>
        
        
        </div>

        </div>
       
        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
  <a href="#Map">
    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow border hover:shadow-md transition duration-300">
      <Package size={20} className="text-purple-600" />
      <span className="font-medium text-sm text-gray-800">ROUTE MAP</span>
      <RightCircleFilled style={{ color: "var(--purple)" }} />
    </button>
  </a>

  <button
    onClick={handleOpen}
    className="px-4 text-sm font-medium py-2 h-10 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition duration-300 shadow"
  >
    More Info
  </button>
</div>

        
<Modal
  title={
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <MapPin size={18} />
  <Timer size={18} />
  <span>Port Stay Duration</span>
</div>
  }
  open={isMoreInfo}
  onCancel={() => setIsMoreInfo(false)}
  footer={null}
  centered
  width={700}
  bodyStyle={{
    maxHeight: '70vh', // This controls scroll height
    overflowY: 'auto',
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '16px',
  }}
>
  {loading ? (
    <div className="flex items-center justify-center py-10">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {routesMap[route].map((port, index) => {
          const isActive = activePortIndex;
          return (
          <div
            key={index}
            
            className={`border  rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 ease-in-out ${
              index ===isActive ? 'bg-purple-100 border-purple-400' : 'bg-white border-gray-200'
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800">{port.countryPort}</h3>
            <p className="text-gray-500">{port.country}</p>
            <span className="text-sm text-purple-600 mt-2">🕒 {port.duration}</span>
          </div>
          )
        })}
      </div>

      <div style={{marginTop:"10px"}} className="text-sm text-gray-500 mt-6 border-t pt-4">
        <strong>Note:</strong> Port stay durations are estimated. Delays may occur due to weather,
        customs, or operational factors.
      </div>
    </>
  )}
</Modal>


        <div style={{width:"95%",marginInline:"auto"}}>
        <Map
        mapLib={import('maplibre-gl')}
      initialViewState={{
        latitude: routesMap[route][Index].Latitude,
        longitude: routesMap[route][Index].Longitude,
        zoom: 2,
      }}
      style={{ width: "100%", height:"400px",marginTop:"30px" }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      mapboxAccessToken= {import.meta.env.VITE_MAP_API_KEY}
      id="Map"
    >
      <Marker latitude={routesMap[route][Index].Latitude} longitude={routesMap[route][Index].Longitude}>
        <div><MapShip/></div>
      </Marker>

      <Marker longitude={routesMap[route][0].Longitude} latitude={routesMap[route][0].Latitude} color="blue">
        <div>
          <p style={{ fontSize:"12px", color: "blue" }}>{routesMap[route][0].countryPort}</p>
        </div>
      </Marker>
      <Marker longitude={routesMap[route][1].Longitude} latitude={routesMap[route][1].Latitude} color="green">
        <div>
          <p style={{ fontSize: "12px", color: "green" }}>{routesMap[route][1].countryPort}</p>
        </div>
      </Marker>
      <Marker longitude={routesMap[route][2].Longitude} latitude={routesMap[route][2].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{routesMap[route][2].countryPort}</p>
        </div>
      </Marker>

      <Marker longitude={routesMap[route][3].Longitude} latitude={route1[3].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{routesMap[route][3].countryPort}</p>
        </div>
      </Marker>

       <Marker longitude={routesMap[route][4].Longitude} latitude={routesMap[route][4].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{routesMap[route][4].countryPort}</p>
        </div>
      </Marker>

       <Marker longitude={routesMap[route][5].Longitude} latitude={routesMap[route][5].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{routesMap[route][5].countryPort}</p>
        </div>
      </Marker>

      <Marker longitude={routesMap[route][6].Longitude} latitude={routesMap[route][6].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{route1[6].countryPort}</p>
        </div>
      </Marker>

      {/* Add Line */}
      <Source id="line-source" type="geojson" data={lineGeoJSON}>
      
        <Layer
          id="line-layer"
          type="line"
          paint={{
            "line-color": "#8A2BE2", // BlueViolet line color
            "line-width": 2, // Line thickness,
            "line-dasharray": [3, 2], // Dash pattern: [dash length, gap length]
          }}
        />
      </Source>

     

<NavigationControl position="top-right" />
      {/* Add Popup or other components here */}
    </Map>  
    </div>


    {showButton && (
        <button
          className="back-to-top fixed bg-purple-300 bottom-[50px] right-5 z-2 size-7 rounded-full shadow-xl "
          style={{
            borderWidth: `${Math.min(scrollPosition / 10, 100)}%`, // Border grows as you scroll
          }}
          onClick={scrollToTop}
        >
          <UpOutlined />
        </button>
      )}

    </div>: 
     <div style={{paddingBlock:"100px",}}
          className='layout-shift  w-full bg-stone-100 lg:w-[80%] '>
     <Empty description={<span style={{ fontSize: "14px", fontWeight: "500",marginLeft:"-25px" }}>No Data Available</span>} />
     </div>
    }
  
    </>
  )
}

export default Mapbox