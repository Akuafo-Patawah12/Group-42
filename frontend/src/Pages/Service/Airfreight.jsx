import React,{useState} from "react";
import {
   Plane,
   Rocket,
   Package,
   Globe,
   Clock,
   ShieldCheck,
   Quote,
   MapPin, CircleDot
 } from "lucide-react";

const AirFreight = () => {

  const [weight, setWeight] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  

  const [selected, setSelected] = useState("economy");
  
  const [distance, setDistance] = useState(11,400);
  const [cost, setCost] = useState(null);

  const rateMap = {
    economy: 2.5,
    standard: 4.0,
    express: 6.5,
  };

  const labelMap = {
    economy: "Economy",
    standard: "Standard",
    express: "Express",
  };

  const handleCalculate = () => {
    if (!weight || !distance) return;
    const rate = rateMap[selected];
    const total = parseFloat(weight) * parseFloat(distance) * rate;
    setCost(total.toFixed(2));
  };


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

  const rates = [
    {
      title: "Standard Air Freight",
      icon: <Plane className="text-blue-600 w-10 h-10" />,
      description: "Reliable delivery within 3–5 business days. Ideal for general cargo.",
      price: "$4.50 / kg",
    },
    {
      title: "Express Air Freight",
      icon: <Rocket className="text-red-600 w-10 h-10" />,
      description: "Fastest option with delivery in 1–2 business days. Priority handling.",
      price: "$6.20 / kg",
    },
    {
      title: "Economy Air Freight",
      icon: <Package className="text-green-600 w-10 h-10" />,
      description: "Budget-friendly for non-urgent shipments. Delivery in 5–8 days.",
      price: "$3.80 / kg",
    },
  ];

  return (
    <div  className="bg-purple-100 min-h-screen pb-12   ">
       
      {/* Hero Section */}
      <section className="hero relative  text-white ">
      <div className="bg-purple-500 shadow-lg w-[90%] absolute z-50 text-gray-800 bottom-[-50px] left-1/2 -translate-x-1/2 rounded-xl gap-[3px] flex justify-between items-center md:w-[80%] ">
  <div className="w-full p-6 border-t-3 border-purple-500 bg-white flex flex-col items-center rounded-l-xl">
    <MapPin/>
    <span className="text-sm font-medium text-yellow-400">Origin</span>
    <span className="text-sm text-center font-medium  lg:text-lg lg:font-semibold">Guangzhou,<br/>China</span>
  </div>
  
  <div className="w-full p-4 border-b-3  border-purple-500 bg-white flex flex-col items-center">
    <CircleDot/>
    <span className="text-sm font-medium text-yellow-400">Destination</span>
    <span className="text-sm text-center font-medium  lg:text-lg lg:font-semibold">Kotoka Port,<br/>Ghana</span>
  </div>
  
  <div className="w-full p-6 border-t-3 border-purple-500 bg-white flex flex-col items-center rounded-r-xl">
    <MapPin/>
    <span className="text-sm font-medium text-yellow-400">Alternative</span>
    <span className="text-sm text-center font-medium  lg:text-lg lg:font-semibold">Yiwu,<br/>China</span>
  </div>
</div>

        <div style={{marginInline:"auto"}} className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Reliable & Fast <span className="text-yellow-400">Air Freight</span> Services
            </h1>
            <p style={{marginBlock:"24px"}} className="text-lg mb-6 text-blue-100">
              Ship your cargo worldwide with our top-tier air logistics solutions. Guaranteed speed, safety, and satisfaction.
            </p>
            <a
              href="#calculator"
              className="inline-block bg-yellow-400 text-blue-900 font-semibold py-3 px-6 rounded-lg shadow hover:bg-yellow-300 transition"
            >
              Contact us now
            </a>
          </div>

          {/* Right Image & Calculator */}
          <div >
            
            <section style={{marginInline:"auto"}} className="w-[95%] border-3 rounded-lg border-purple-200 px-[5%] py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Air Freight Cost Calculator
      </h2>

      {/* Tab Buttons */}
      <div style={{margin:"30px 0"}} className="flex justify-center gap-4 mb-10">
        {Object.keys(rateMap).map((key) => (
          <button
            key={key}
            onClick={() => {
              setSelected(key);
              setCost(null);
            }}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-200 ${
              selected === key
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-blue-50"
            }`}
          >
            {labelMap[key]}
          </button>
        ))}
      </div>

      {/* Calculator Panel */}
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 transition duration-300">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          {labelMap[selected]} Shipping
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              
              className="w-full px-4 py-2 border border-stone-200 text-black bg-stone-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Distance (km)
            </label>
            <input
  type="number"
  value={distance}
  onChange={(e) => setDistance(e.target.value)}
  className="w-full px-4 py-2 border border-stone-200 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

          </div>
        </div>

        <button
          onClick={handleCalculate}
          style={{marginTop:"20px"}}
          className="bg-purple-600 text-sm text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Calculate Cost
        </button>

        {cost && (
          <div className="mt-6 text-lg font-medium text-green-600">
            Estimated Cost: <span className="font-bold">${cost}</span>
          </div>
        )}
      </div>
    </section>
    </div>
    </div>
      </section>

      {/* Rate Cards Section */}
      <section className=" py-20 px-6" id="rates">
        <div style={{marginInline:"auto"}} className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-600">Air Freight Rates</h2>
          <p style={{marginBlock:"20px"}} className="text-gray-600 font-medium ">
            Choose the option that suits your shipping needs. Transparent pricing. No hidden fees.
          </p>

          <div style={{marginInline:"auto"}} className="grid gap-8 md:grid-cols-3 w-[90%]">
            {rates.map((rate, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div style={{marginBottom:"16px"}} className="flex justify-center mb-4">{rate.icon}</div>
                <h3 style={{marginBottom:"8px"}} className="text-xl font-semibold text-purple-500 mb-2">{rate.title}</h3>
                <p style={{marginBottom:"16px"}} className="text-gray-500 mb-4">{rate.description}</p>
                <div className="text-lg font-bold text-purple-800">{rate.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Page Header */}

      

      {/* Introduction Section */}
      <section style={{marginInline:"auto"}} className="py-10  w-fit">
      <div style={{marginInline:"auto"}} className="max-w-5xl mx-auto text-center px-4">
        <h2 style={{marginBlock:"16px"}} className="text-3xl font-bold text-gray-800 mb-4">
          Why Choose Our Air Freight Services?
        </h2>
        <p style={{marginBlock:"16px",marginInline:"auto"}} className="text-gray-600 max-w-2xl mx-auto mb-10">
          Our air freight solutions are fast, secure, and flexible. With global
          reach, real-time tracking, and expert handling, we ensure your cargo
          arrives safely and on time.
        </p>

        {/* Tabs */}
        <section style={{marginInline:"auto"}}  className="grid justify-center items-center w-full gap-4 grid-cols-1 md:grid-cols-2 md:w-[90%]"
>
        <div className="flex flex-col justify-center w-full gap-3 mb-10 ">
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
        <div className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8 transition-all duration-500 ">
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
      {/* Testimonials Section */}
      <div style={{marginInline:"auto"}} className="flex w-[90%] flex-col md:flex-row ">
      <section className="mb-24  w-full md:px-4">
        <div className="flex flex-col  max-w-5xl mx-auto text-center">
          <h2 style={{marginBottom:"10px"}} className="text-3xl font-bold text-gray-800 ">
            What Our Clients Say
          </h2>

          <div style={{marginBottom:"30px"}} className="grid grid-cols-1 gap-8">
            {[
              {
                quote:
                  "Their air freight services are outstanding! Our shipments arrived on time, and the team was incredibly professional throughout the process.",
                name: "Jane Doe",
                title: "Logistics Manager",
              },
              {
                quote:
                  "Fast, reliable, and secure! I highly recommend their air freight solutions for anyone looking for premium logistics services.",
                name: "John Smith",
                title: "CEO of ABC Corp",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white shadow-md w-full rounded-2xl border border-purple-300 p-6 text-left relative hover:shadow-lg transition duration-300"
              >
                <Quote
                  size={32}
                  className="absolute -top-4 -left-4 text-purple-500 bg-white p-1 rounded-full shadow"
                />
                <p style={{marginBottom:"10px"}} className="text-gray-700 italic leading-relaxed mb-6">
                  “{testimonial.quote}”
                </p>
                <p className="text-right text-gray-800 font-semibold">
                  - {testimonial.name}, <span className="text-sm font-normal text-gray-500">{testimonial.title}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col item-center justify-center text-center bg-gradient-to-r from-indigo-600 to-purple-600  text-white py-16 px-6 rounded-3xl shadow-lg mx-4 md:mx-auto w-full">
        <h2 style={{marginBottom:"16px"}} className="text-4xl font-bold mb-4">Ready to Ship?</h2>
        <p style={{marginBottom:"32px"}} className="text-lg max-w-xl mx-auto mb-8">
          Get in touch with us today and experience the best air freight services tailored to your needs.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-blue-100 transition duration-300">
          Get a Quote
        </button>
      </section>
      </div>
    </div>
  );
};

export default AirFreight;
