import React,{useState,useMemo,useEffect,useRef} from 'react'
import {useSearchParams,useNavigate} from "react-router-dom"
import "./Tracking.css"
import io from "socket.io-client"
import { message,Empty,Modal,Spin } from "antd"
import {toast} from "react-toastify"
import { Package } from 'lucide-react';
import {route1,route2,route3,route4,route5} from "../Data/RouteData"
import  ShipIcon  from "../icons/Truck.svg"
import  MapShipIcon  from "../icons/CargoShip.svg"
import  Ship2Icon  from "../icons/image.svg"
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
  const [isModalOpen,setIsModalOpen]= useState(false)
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [loading, setLoading] = useState(true);

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
  setCountry(data?.shipmentId?.country || "")
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
      }else{
       toast.error(response.message)
      }
  })
    console.log(`Sent track_id to backend: ${track_id}`);
  }
}, [track_id]);

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
          
          className="w-full"
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
          
        <div  className="ship" style={{position:"relative"}}><div  style={{ position: "absolute",top:"-40px", left: `${xPosition-3}px` ,width:"fit-content"}}><Package/></div>  
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
       
          <div style={{display:"flex",gap:"5px",width:"fit-content",marginInline:"auto",paddingBlock:"10px"}}><a href='#Map' ><button className='route_button flex gap-1'><Package size={24} /> ROUTE MAP <RightCircleFilled style={{color:"var(--purple)",marginLeft:"10px"}}/> </button></a> <button onClick={() => handleOpen()} className=" text-white bg-purple-500 h-10 px-3 rounded-xl">More Info</button></div>
        
          <Modal
        title="⛴ Port Stay Durations"
        open={isMoreInfo}
        onCancel={() => setIsMoreInfo(false)}
        footer={null}
        centered
        width={700}
      >

{loading ? (
          <div className="flex items-center justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
        <div
              
              className="border border-gray-200 rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{routesMap[route][0].countryPort}</h3>
              <p className="text-gray-600">{routesMap[route][0].country}</p>
              <span className="text-sm text-blue-600 mt-2">🕒 {routesMap[route][0].duration}</span>
            </div>

            <div
              
              className="border border-gray-200 rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{routesMap[route][1].countryPort}</h3>
              <p className="text-gray-600">{routesMap[route][1].country}</p>
              <span className="text-sm text-blue-600 mt-2">🕒 {routesMap[route][1].duration}</span>
            </div>

            <div
              
              className="border border-gray-200 rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{routesMap[route][2].countryPort}</h3>
              <p className="text-gray-600">{routesMap[route][2].country}</p>
              <span className="text-sm text-blue-600 mt-2">🕒 {routesMap[route][2].duration}</span>
            </div>

            <div
              
              className="border border-gray-200 rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{routesMap[route][3].countryPort}</h3>
              <p className="text-gray-600">{routesMap[route][3].country}</p>
              <span className="text-sm text-blue-600 mt-2">🕒 {routesMap[route][3].duration}</span>
            </div>

            <div
              
              className="border border-gray-200 rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{routesMap[route][4].countryPort}</h3>
              <p className="text-gray-600">{routesMap[route][4].country}</p>
              <span className="text-sm text-blue-600 mt-2">🕒 {routesMap[route][4].duration}</span>
            </div>

            <div
              
              className="border border-gray-200 rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{routesMap[route][5].countryPort}</h3>
              <p className="text-gray-600">{routesMap[route][5].country}</p>
              <span className="text-sm text-blue-600 mt-2">🕒 {routesMap[route][5].duration}</span>
            </div>
          
        </div>
        <div className="text-sm text-gray-500 mt-2 border-t pt-4">
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
        <div><Package/></div>
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
            "line-width": 3, // Line thickness
          }}
        />
      </Source>

     

<NavigationControl position="top-right" />
      {/* Add Popup or other components here */}
    </Map>  
    </div>


    {showButton && (
        <button
          className="back-to-top"
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