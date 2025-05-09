import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import {
  Ship,
   Globe,
   Clock,
   ShieldCheck,
   Quote,
   MapPin, CircleDot
 } from "lucide-react";


 
// Animated counter component
function AnimatedCounter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}





export default function SeaFreight() {
  const [activeTab, setActiveTab] = useState(0);
  const features = [
    {
      title: "Global Reach",
      description:
        "We connect you to destinations across the world with our extensive air freight network.",
      icon: Globe,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Speed & Reliability",
      description:
        "Fast transit times and reliable delivery schedules to meet your business needs.",
      icon: Clock,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Secure Handling",
      description:
        "Professional cargo handling and monitoring to ensure your shipment's safety.",
      icon: ShieldCheck,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];
  const ActiveIcon = features[activeTab].icon;
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative  text-white">
        <img src="/images/seafreight_hero_pic.jpg"  alt="sea_hero" className="w-full h-auto"/>
        <div className="absolute flex items-center justify-center inset-0 bg-black/30" >
        <motion.div
          className="relative z-10 max-w-4xl text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{marginBlock:"16px"}} className="text-4xl md:text-6xl font-bold mb-4">
            Reliable & Efficient{" "}
            <span className="text-purple-700">Sea Freight</span> Services
          </h1>
          <p style={{marginBlock:"24px"}} className="text-lg md:text-xl mb-6">
            From port to port or door to door, we ensure safe and timely delivery
            of your cargo across the globe.
          </p>
          <button className="bg-purple-700 hover:bg-blue-600 px-6 py-3 rounded-full text-white font-medium transition">
            Get a Quote
          </button>
        </motion.div>
        </div>
      </section>

      {/* CBM Rate Info */}
      <section className="relative bg-gradient-to-br from-purple-100 to-purple-200 rounded-b-[10%] py-20 px-6 md:px-20">
        <div className=" max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
            Sea Freight Solutions
          </h2>
          <p style={{marginInline:"auto",marginBlock:"32px"}} className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            We offer reliable and cost-effective sea freight services across
            international waters. Whether it's Full Container Load (FCL) or Less
            than Container Load (LCL), we’ve got you covered.
          </p>

          <div style={{marginInline:"auto",marginBlock:"32px"}} className="bg-white rounded-2xl border-2 border-purple-300 shadow-md p-6 md:p-10 text-left max-w-3xl mx-auto">
            <h3 style={{marginBlock:"16px"}} className="text-2xl font-semibold text-purple-800 mb-4">
              Important Note:
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-medium text-purple-600">CBM rates</span> (Cost
              per Cubic Meter) may vary depending on the container size, route,
              and cargo type. Our team ensures full transparency and helps you
              get the most competitive rate for your shipment.
            </p>

            <div style={{marginTop:"24px"}} className=" p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-purple-800 font-medium">
                Your shipments are in{" "}
                <span className="font-bold">safe and reliable hands</span>. From
                port to port, we handle every detail with care and precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{marginInline:"auto"}} className="py-20 bg-gray-50 w-fit">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 style={{marginBlock:"16px"}} className="text-3xl font-bold text-gray-800 mb-4">
          Why Choose Our Air Freight Services?
        </h2>
        <p style={{marginBlock:"16px",marginInline:"auto"}} className="text-gray-600 max-w-2xl mx-auto mb-10">
        Our sea freight solutions are reliable, secure, and cost-effective. With global port access, expert handling, and end-to-end tracking, we ensure your cargo is delivered safely and efficiently across international waters.
        </p>

        {/* Tabs */}
        <section style={{marginInline:"auto"}}  className="flex justify-center items-center gap-4 lg:w-[90%]">
        <div className="flex flex-col justify-center w-full gap-3 mb-10">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                index === activeTab
                  ? "bg-purple-600 text-white shadow"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-blue-50"
              }`}
            >
              {feature.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8 transition-all duration-500">
          <div
            style={{marginInline:"auto"}}
            className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6 text-3xl ${features[activeTab].color}`}
          >
            <ActiveIcon size={32} />
          </div>
          <h3 style={{marginBlock:"12px"}} className="text-2xl font-semibold text-gray-800 mb-3">
            {features[activeTab].title}
          </h3>
          <p className="text-gray-600">{features[activeTab].description}</p>
        </div>
        </section>
      </div>
      
    </section>

      {/* Stats Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-12">
            Trusted by Clients Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Shipments Delivered", value: 32000 },
              { label: "Countries Covered", value: 65 },
              { label: "Years Experience", value: 15 },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-5xl font-bold text-purple-300 mb-2">
                  <AnimatedCounter target={stat.value} />
                  {stat.label === "Countries Covered" ? "+" : ""}
                </div>
                <p className="text-lg font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
