import {useRef, useState, useEffect} from "react"
import { Card,Table, Col, Row,Button, Typography, Space, Avatar,  Rate  } from 'antd';
import { Link } from "react-router-dom"
import { SafetyOutlined, TeamOutlined, CheckCircleOutlined,LeftOutlined, RightOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Plane, Ship,TrendingUp,PackagePlus,Megaphone,Package, ShoppingCart, UserPlus, Home, PackageCheck,Truck, HomeIcon, StarIcon, ChevronLeft, ChevronRight  } from "lucide-react";
import "./LandingPage.css"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const { Title, Paragraph } = Typography



const LandingPage = () => {

  const reviews = [
    {
      name: 'Akuafo Patawah',
      comment: 'Absolutely amazing! Fast delivery and top-notch customer service.',
      rating: 5,
      img:"../images/Me.jpg"
    },
    {
      name: 'David Nii Darko',
      comment: 'The tracking system is accurate and easy to use. Highly recommend!',
      rating: 4,
      img:"../images/img_3.jpg"
    },
    {
      name: 'Linda Okoro',
      comment: 'Great experience from start to finish. I’ll definitely use this service again.',
      rating: 5,
      img:"../images/img_2.jpg"
    },
    {
      name: 'Micheal Edem Dei',
      comment: 'Customer support responded quickly and solved my issue efficiently.',
      rating: 4,
      img:"../images/s.jpg"
    },
    {
      name: 'David Nii Darko',
      comment: 'The tracking system is accurate and easy to use. Highly recommend!',
      rating: 4,
      img:"../images/img_3.jpg"
    },
    {
      name: 'David Nii Darko',
      comment: 'The tracking system is accurate and easy to use. Highly recommend!',
      rating: 4,
      img:"../images/img_3.jpg"
    },
  ];
  
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const trustData = [
    {
      title: 'Trusted by Thousands',
      icon: <SafetyOutlined style={{ fontSize: '23px', color: '#722ed1' }} />,
      
    },
    {
      title: 'Global Partners',
      icon: <GlobalOutlined style={{ fontSize: '23px', color: '#13c2c2' }} />,
      
    },
    {
      title: 'Accuracy Guaranteed',
      icon: <CheckCircleOutlined style={{ fontSize: '23px', color: '#52c41a' }} />,
      
    },
    {
      title: 'Dedicated Support Team',
      icon: <TeamOutlined style={{ fontSize: '25px', color: '#faad14' }} />,
      
    },
  ];


  const services = [
    {
      title: "Air Freight",
      icon: <Plane size={40} color="#a855f7" />,
      description: "Fast and reliable air cargo delivery across the globe.",
    },
    {
      title: "Sea Freight",
      icon: <Ship size={40} color="#3b82f6" />,
      description: "Cost-effective sea shipping for all container sizes.",
    },
    {
      title: "Procurement",
      icon: <ShoppingCart size={40} color="#10b981" />,
      description: "Hassle-free purchasing and sourcing of goods worldwide.",
    },
    {
      title: "Door to Door",
      icon: <Home size={40} color="#f59e0b" />,
      description: "Direct delivery from supplier to your doorstep with no stress.",
    },
    {
      title: "Container Clearance",
      icon: <PackageCheck size={40} color="#ef4444" />,
      description: "Swift and seamless customs clearance for your containers.",
    },
  ];
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };




  const columns = [
    {
      title: "Charge Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];
  
  const data = [
    {
      key: "1",
      type: "CBM Rate",
      rate: "¥450",
      currency: "RMB",
      remarks: "Sea freight per cubic meter",
    },
    {
      key: "2",
      type: "RMB to Local Rate",
      rate: "₵1.60",
      currency: "GHS",
      remarks: "Conversion from RMB to GHS",
    },
    {
      key: "3",
      type: "Air Freight Rate",
      rate: "¥75/kg",
      currency: "RMB",
      remarks: "Air shipping rate per kg",
    },
    {
      key: "4",
      type: "Door-to-Door Delivery",
      rate: "₵150",
      currency: "GHS",
      remarks: "Within Accra/Tema",
    },
    {
      key: "5",
      type: "Warehousing Fee",
      rate: "₵25",
      currency: "GHS",
      remarks: "Per day after 5 days",
    },
  ];

  const shipments = [
    { name: 'Jan', Shipments: 400 },
    { name: 'Feb', Shipments: 700 },
    { name: 'Mar', Shipments: 600 },
    { name: 'Apr', Shipments: 900 },
    { name: 'May', Shipments: 750 },
  ];

  const images = [
    "/images/slider1.jpg",
    "/images/Slider4.jpg",
    "/images/Seaport.jpg",
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // auto-slide every 5s
    return () => clearInterval(interval);
  }, []);

  
  
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollAmount = 300;
  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const amount = direction === "left" ? -scrollAmount : scrollAmount;
      container.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const checkScroll = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.offsetWidth < container.scrollWidth
      );
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);
 
  return(
    <div className="pb-12  px-2  bg-gray-50">

<div className="grid grid-cols-4 grid-rows-2 gap-4">
  {/* First image: spans 2 columns */}
  <img
    src="/images/img_2.jpg"
    alt="Image 1"
    className="col-span-2 w-full h-48 object-cover rounded-md"
  />

  {/* Normal images */}
  <img
    src="/images/img_3.jpg"
    alt="Image 2"
    className="w-full h-48 object-cover rounded-md"
  />
  <img
    src="/images/procurement.jpg"
    alt="Image 3"
    className="w-full h-48 object-cover rounded-md"
  />

  {/* Normal images */}
  <img
    src="/images/Slider4.jpg"
    alt="Image 4"
    className="w-full h-48 object-cover rounded-md"
  />
  <img
    src="/images/Air2.jpg"
    alt="Image 5"
    className="w-full h-48 object-cover rounded-md"
  />

  {/* Last image: spans 2 columns */}
  <img
    src="/images/Air.jpg"
    alt="Image 6"
    className="col-span-2 w-full h-48 object-cover rounded-md"
  />
</div>



    <div className="flex flex-col">
      <section className="w-full bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-6">
            Looking for a Trusted Partner in Logistics?
          </h1>
          <p className="text-gray-600 text-md mb-6">
            Shun Feng Ghana Logistics provide seamless, reliable, and scalable logistics solutions tailored to your business needs.
            Whether it's freight forwarding, warehousing, or last-mile delivery — we're here to make your supply chain smarter and faster.
          </p>
          <div className="flex items-center gap-4 py-6">
      {/* Avatars */}
      <div className="relative h-9 w-36">
        <img src="/images/Air.jpg" alt="air" className="size-8 border-2 border-white rounded-full absolute left-0 z-10" />
        <img src="/images/Air2.jpg" alt="air2" className="size-8 border-2 border-white rounded-full absolute left-5 z-20" />
        <img src="/images/Air2.jpg" alt="air2" className="size-8 border-2 border-white rounded-full absolute left-10 z-30" />
        <img src="/images/Air.jpg" alt="air" className="size-8 border-2 border-white rounded-full absolute left-[60px] z-40" />
      </div>

      {/* Star Rating and Text */}
      <div>
        <div className="flex gap-1 text-yellow-500">
          <StarIcon size={14} fill="currentColor" />
          <StarIcon size={14} fill="currentColor" />
          <StarIcon size={14} fill="currentColor" />
          <StarIcon size={14} fill="currentColor" />
        </div>
        <p className="text-sm text-gray-600">2k+ Trusted Partners</p>
      </div>
    </div>
    <button className='welcome_button'><Link to={"/signup"} className='welcome_butt'><span>GET STARTED</span>
    <div className='liquid'></div></Link></button>
        </div>

        <div  className="barchart flex-1 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shipments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Shipments" fill="var(--purple)" radius={[4, 4, 0, 0]} barSize={20}/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",alignItems:"center",gap:"2", marginTop: '10px',marginInline:"auto",width:"fit-content", fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
           <section className="size-3 bg-purple-400"></section><p>Delivered Shipments</p>
      </div>
        </div>
      </div>
    </section>
      <section> </section>
    </div>

    

    <div className="py-14 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-8 px-6 md:px-16 my-16">

  {/* 1. Image Slider */}
  <div className="col-span-1 row-span-1">
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} className="w-full flex-shrink-0 object-cover h-64 sm:h-80" />
        ))}
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">
        <ChevronRight />
      </button>

      <div className="flex justify-center gap-2 py-3 bg-white">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-purple-600' : 'bg-gray-300'}`}
          ></button>
        ))}
      </div>
    </div>
  </div>

  {/* 2. Marketing Section */}
  <div className="col-span-1 row-span-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl px-6 py-10 shadow-lg text-white flex flex-col justify-center">
    <img
      src="/images/digital_marketing.jpg"
      alt="Marketing"
      className="w-full max-w-full mx-auto rounded-xl shadow-2xl mb-6"
    />
    <h2 style={{marginBlock:"20px"}} className="text-2xl font-bold text-center mb-4">Boost Your Brand While We Move Your Cargo</h2>
    <p style={{marginBlock:"20px"}} className="text-gray-100 text-center">
      More than logistics—gain access to built-in tools, analytics, and marketing exposure to grow your business.
    </p>
    <button  className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full mt-6 mx-auto hover:bg-gray-100 transition">
      Learn More
    </button>
  </div>

  {/* 3. How It Works */}
  <div className="how_it_works bg-gradient-to-r from-purple-100 to-white rounded-3xl px-6 py-10 shadow-lg text-center ">
    <h2 style={{marginBlock:"20px"}} className="text-2xl font-bold mb-6 text-gray-800">How It Works</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {[
        { title: '1. Register', icon: <UserPlus/>, desc: 'Create an account to access tools instantly.' },
        { title: '2. Request a Shipment', icon: <PackagePlus/>, desc: 'Book air, sea, or door-to-door delivery.' },
        { title: '3. Promote Your Business', icon: <Megaphone/>, desc: 'Reach new customers with our tools.' },
        { title: '4. Track & Deliver', icon: <Package/>, desc: 'Monitor your shipments in real-time.' }
      ].map(({ title, icon, desc }, i) => (
        <div key={i} className="flex flex-col items-center">
          {icon}
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm text-center">{desc}</p>
        </div>
      ))}
    </div>
  </div>

</div>

  




     

    <div className="reviews relative bg-purple-500 py-20 px-6 rounded-2xl">
      <h2  style={{ textAlign: "center", marginBottom: 32,fontWeight:"700",color:"white", fontSize:"30px" }}>
        Browse Our Logistics Services
      </h2>
      <p style={{margin: "30px auto",}} className="text-gray-200 text-center mt-2 max-w-3xl mx-auto">
      Reliable logistics for your business—air, sea, door-to-door delivery, and warehousing—swift and secure, worldwide.
</p>

      {/* Scroll Buttons */}
      <Button
        disabled={!canScrollLeft}
        onClick={() => handleScroll("left")}
        className="transition"
        style={{ position: "absolute", top: "50%", left: 10, zIndex: 10 }}
        shape="circle"
      >
       <LeftOutlined/> 
      </Button>
      <Button
        disabled={!canScrollRight}
        onClick={() => handleScroll("right")}
        className="transition"
        style={{ position: "absolute", top: "50%", right: 10, zIndex: 10 }}
        shape="circle"
      >
        <RightOutlined/>
      </Button>

      {/* Scrollable Services */}
      <div
        ref={containerRef}
        className=" services flex overflow-x-auto no-scrollbar  gap-4 px-10"
        style={{ scrollBehavior: "smooth", paddingBottom: 10 }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="min-w-[260px] flex-shrink-0  rounded-lg p-4 bg-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.03 }}
          >
            <Card
              variant={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                minHeight: 200,
              }}
              className="border-purple-300 border-[1px]"
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                {service.icon}
                <Title level={4} style={{ margin: 0 }}>{service.title}</Title>
              </div>
              <Paragraph style={{ color: "#555" }}>{service.description}</Paragraph>
            </Card>
          </motion.div>
        ))}
      </div>

    </div>
    
    

    <div style={{marginTop:"80px"}} className="p-6 bg-white rounded shadow">
    <div className="flex justify-between">
      <h2 className="text-lg font-semibold mb-4">Our Affordable Logistics Rates</h2>
      <TrendingUp />
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>

       <div className=" py-16 px-6 md:px-20 bg-purple-100">
      <Title level={2} className="text-center mb-10">Reviews from Users Like You</Title>
      <p style={{margin:"20px auto"}} className="max-w-[350px] text-md text-center font-bold text-stone-700">Real feedback from customers who trust and rely on our logistics services.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Card className="h-full shadow-md rounded-lg hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <Avatar size="large" src={review.img} style={{border:"3px solid #a855f7"}} />
                <div>
                  <Title level={5} style={{ marginBottom: 0 }}>{review.name}</Title>
                  <Rate disabled defaultValue={review.rating} style={{ transform: 'scale(0.8)', transformOrigin: 'left' }}/>
                </div>
              </div>
              <Paragraph>"{review.comment}"</Paragraph>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.3 }}>
        <Title level={2} className="text-center " style={{marginBlock:"30px"}}>
          Why Choose Us
        </Title>

        

        <div className="flex gap-5 flex-col p-7 lg:flex-row">
          <section className="w-full md:w-1/2 p-8 bg-gray-50 rounded-lg shadow-md">
  <h1 className="text-4xl font-bold text-gray-900 mb-4">
    34k+ <br /> Satisfied Customers
  </h1>
  <p style={{marginBlock:"20px"}} className="text-gray-700 mb-6">
    Our commitment to quality and customer service has helped us to serve over 34,000 customers worldwide.
    We strive to deliver outstanding products with exceptional support.
  </p>
  <ul className="mb-6 space-y-2 text-md">
    <li className="flex items-center  gap-2">
      <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
      Outstanding Quality
    </li>
    <li className="flex items-center gap-2">
      <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
      Exceptional Support
    </li>
    <li className="flex items-center gap-2">
      <span className="inline-block w-3 h-3 bg-purple-500 rounded-full"></span>
      Fast & Reliable Delivery
    </li>
  </ul>
  <div style={{marginTop:"40px"}} className="flex items-center mt-5">
      {/* Truck Icon */}
      <div className="p-2 bg-purple-200 rounded-lg">
      <Truck className="text-4xl text-purple-600" />
      </div>

      {/* Long Arrow */}
      <div className="flex items-center mx-4 flex-grow relative">
        {/* Horizontal line */}
        <div style={{marginInline:"auto"}} className="w-[95%] h-0.5 bg-gray-400"></div>
        {/* Arrowhead positioned at the right end of the line */}
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2">
          <svg
            className="w-6 h-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Home Icon */}
      <div className="p-2 bg-purple-200 rounded-lg">
      <HomeIcon className="text-4xl text-purple-600" />
      </div>
    </div>
</section>

          <section className=" lg:w-1/2">
         
          
          <div className="flex flex-col gap-4 ">
          {trustData.map((item, index) => (
            
              <motion.div key={index} custom={index} variants={fadeIn} initial="hidden" animate="visible">
            <div className={`h-full shadow-md rounded-2xl p-3 ${index!==1 ? "bg-white":"bg-purple-500"}`}>
              <div className="w-full flex gap-3 items-center">
                <p className="text-3xl p-2 rounded-full bg-stone-200 mr-4">{item.icon}</p>
                <h2 level={4} className="mb-0 text-md text-stone-700 font-bold">{item.title}</h2>
              </div>
            </div>
          </motion.div>
            
          ))}
        </div>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
export default LandingPage