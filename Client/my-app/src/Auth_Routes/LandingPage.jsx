import {useRef, useState, useEffect} from "react"
import { Card,Table, Col, Row,Button, Typography, Space, Avatar,  Rate  } from 'antd';
import { Link } from "react-router-dom"
import { SafetyOutlined, TeamOutlined, CheckCircleOutlined,LeftOutlined, RightOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Plane, Ship,TrendingUp, ShoppingCart, Home, PackageCheck } from "lucide-react";
import "./LandingPage.css"
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
      icon: <SafetyOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      description: 'Our platform is trusted by thousands of companies worldwide for its reliability and performance.',
    },
    {
      title: 'Global Partners',
      icon: <GlobalOutlined style={{ fontSize: '32px', color: '#13c2c2' }} />,
      description: 'We collaborate with top logistics and tech partners to ensure seamless operations.',
    },
    {
      title: 'Accuracy Guaranteed',
      icon: <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      description: 'Our system ensures accurate tracking and reporting with real-time data insights.',
    },
    {
      title: 'Dedicated Support Team',
      icon: <TeamOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
      description: '24/7 support team always ready to assist with any queries or issues.',
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
    visible: (i: number) => ({
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
    <div className="py-12 px-4 md:px-16 bg-gray-50">
     <div className="reviews flex justify-around flex-col items-center border-[1px] border-stone-300 bg-stone-100 bg-gradient-to-t from-stone-200 via-stone-100 to-stone-200 py-7 rounded-xl md:flex-row">
       <h1 className="font-extrabold text-5xl md:w-[300px]">
        Discover Our Range of Services.
       </h1>
       <div
        className=" text-center  md:w-[200px] "
        
      >
        
        <p className="text-sm text-gray-600">
          Whether you're shipping across town or across the globe, our tailored logistics solutions are designed to make your journey smooth, efficient, and worry-free. Let’s get your shipment moving with confidence.
        </p>
        <Link to="/Signup">
        <Button
          type="primary"
          size="large"
          className="mt-6 bg-purple-600 text-sm hover:bg-purple-700 border-none text-white rounded-xl px-4 py-2"
        >
          Get Started
        </Button>
        </Link>
      </div>
    </div>

    <div className="relative py-12 px-6 bg-gray-50">
      <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        Browse Our Logistics Services
      </Title>

      {/* Scroll Buttons */}
      <Button
        disabled={!canScrollLeft}
        onClick={() => handleScroll("left")}
        style={{ position: "absolute", top: "50%", left: 10, zIndex: 10 }}
        shape="circle"
      >
       <LeftOutlined/> 
      </Button>
      <Button
        disabled={!canScrollRight}
        onClick={() => handleScroll("right")}
        style={{ position: "absolute", top: "50%", right: 10, zIndex: 10 }}
        shape="circle"
      >
        <RightOutlined/>
      </Button>

      {/* Scrollable Services */}
      <div
        ref={containerRef}
        className="services flex overflow-x-auto no-scrollbar  gap-4 px-10"
        style={{ scrollBehavior: "smooth", paddingBottom: 10 }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="min-w-[260px] flex-shrink-0  rounded-lg p-4 bg-white"
            whileHover={{ scale: 1.03 }}
          >
            <Card
              bordered={false}
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

    <button className="bg-purple-200 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 border-purple-400 border-[1px] text-purple-500 text-sm rounded-2xl mx-auto px-4 py-2 hover:bg-purple-400 transition duration-300 ease-in-out ">View More...</button>

    <div className="p-6 bg-white rounded shadow">
    <div className="flex justify-between">
      <h2 className="text-lg font-semibold mb-4">Our Affordable Logistics Rates</h2>
      <TrendingUp />
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>

       <div className="reviews py-16 px-6 md:px-20 bg-white">
      <Title level={2} className="text-center mb-10">Reviews from Users Like You</Title>
      
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
        <Title level={2} className="text-center mb-8">
          Why Choose Us
        </Title>

        <Row gutter={[24, 24]}>
          {trustData.map((item, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={index}>
              <motion.div custom={index} variants={fadeIn}>
                <Card bordered hoverable className="h-full shadow-md rounded-lg">
                  <Space direction="vertical" size="middle" align="center" className="w-full">
                    {item.icon}
                    <Title level={4} className="text-center">{item.title}</Title>
                    <Paragraph className="text-center">{item.description}</Paragraph>
                  </Space>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </div>
  )
}
export default LandingPage