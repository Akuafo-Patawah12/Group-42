import {useState} from "react"
import { motion } from "framer-motion";
import { ShoppingCart, PackageCheck, Globe, ShieldCheck,ChevronDown } from "lucide-react";

export default function Procurement() {
  const [activeTab, setActiveTab] = useState(0);
  const features= [
    {
      icon: <ShoppingCart className="h-8 w-8 text-purple-600" />,
      title: "Sourcing Experts",
      desc: "Our team sources top-quality products from verified global suppliers.",
    },
    {
      icon: <PackageCheck className="h-8 w-8 text-purple-600" />,
      title: "Quality Assurance",
      desc: "We inspect and verify all goods to ensure they meet your standards.",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Global Reach",
      desc: "We manage procurement from multiple international markets seamlessly.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-purple-600" />,
      title: "Risk Management",
      desc: "We handle supplier vetting, contracts, and compliance for you.",
    },
  ]
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-[url('/images/procurement-bg.jpg')] bg-cover bg-center h-[80vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Simplified <span className="text-purple-400">Procurement</span> Solutions
          </h1>
          <p style={{marginBlock:"20px"}} className="text-lg md:text-xl mb-6">
            We handle the complexities of sourcing and procurement so you don’t have to. Fast, secure, and efficient.
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-full text-white font-medium transition">
            Start Sourcing
          </button>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <h2 style={{margin:"40px auto"}} className="text-2xl w-fit md:text-3xl font-bold text-yellow-700 mb-10">Why Choose Our Procurement Service?</h2>
      <section className="py-20 px-6 flex gap-4 w-full md:px-20 bg-purple-50">
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
       
          
          
            
              <motion.div
               
                className="bg-white rounded-2xl w-full shadow-md p-6 text-center border hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex justify-center mb-4">{features[activeTab].icon}</div>
                <h3 className="text-xl font-semibold mb-2">{features[activeTab].title}</h3>
                <p className="text-gray-600">{features[activeTab].desc}</p>
              </motion.div>
           
          
        
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div style={{marginInline:"auto"}} className="max-w-5xl mx-auto text-center">
          <h2 style={{marginBottom:"20px"}} className="text-4xl font-bold mb-10 text-gray-800">How Our Procurement Works</h2>
          <section className="flex flex-col gap-4 lg:flex-row">
          <img src="/images/procurement.jpg" alt="procurement_img" className="w-1/2 h-auto rounded-2xl"/>
          <div className="grid grid-cols-1 w-1/2 items-center place-items-center  gap- 3 text-left">
            
              <motion.div
                
                className="bg-purple-100 w-full p-6 rounded-xl border border-purple-200 shadow-sm"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-lg font-semibold text-purple-800 mb-2">1. Submit Your Request</h4>
                <p className="text-gray-700 text-sm">Let us know what products or services you need. Be as specific as possible.</p>
              </motion.div>
              <div className="relative w-2 h-[40px] bg-stone-400"><ChevronDown size={30} className="absolute z-4 text-stone-400 -bottom-[70%] left-1/2 -translate-1/2"/></div>
              <motion.div
                
                className="bg-purple-100 w-[95%] p-6 rounded-xl border border-purple-200 shadow-sm"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-lg font-semibold text-purple-800 ">2. We Source & Quote</h4>
                <p className="text-gray-700 text-sm ">Our team finds the best suppliers, negotiates pricing, and provides a transparent quote.</p>
              </motion.div>
              <div className="relative w-2 h-[40px] bg-stone-400"><ChevronDown size={30} className="absolute z-4 text-stone-400 -bottom-[70%] left-1/2 -translate-1/2"/></div>
              <motion.div
                
                className="bg-purple-100 w-full p-6 rounded-xl border border-purple-200 shadow-sm"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-lg font-semibold text-purple-800 ">3. Delivery & Handover</h4>
                <p className="text-gray-700 text-sm">Once approved, we handle purchasing, inspection, and delivery to your location.</p>
              </motion.div>
            
          </div>
          </section>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-16 px-6 md:px-20 bg-purple-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 style={{marginBlock:"16px"}} className="text-3xl md:text-4xl font-bold mb-4">Procure With Confidence</h2>
          <p style={{marginInline:"auto"}} className="text-lg max-w-2xl mx-auto">
            Your business deserves stress-free procurement. We bring efficiency, transparency, and reliability to every step of the process.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
