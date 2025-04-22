import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function DoorToDoor() {

  const questions = [
    "Wondering how to get goods delivered right to your doorstep?",
    "Curious about customs clearance in door-to-door shipping?",
    "Not sure what documents are needed for home delivery?",
    "Want to know how long door-to-door delivery takes?",
  ];

  const answer =
    "Our Door-to-Door service ensures your goods are picked up from the supplier and delivered directly to your address. We handle everything—from pickup, customs clearance, documentation, to last-mile delivery—so you don’t have to worry about a thing. Fast, reliable, and fully tracked.";

  return (
    <div className="bg-white text-gray-800">
    <div className="absolute top-0 w-full h-[400px] bg-purple-500"></div>
      {/* Hero */}
      <section style={{marginInline:"auto",marginTop:"100px"}} className="relative  h-[80vh] w-[90%] bg-[url('/images/delivery-truck.svg')] bg-contain bg-center bg-no-repeat flex items-center justify-center text-white md:w-[70%]">
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          className="relative z-10 text-center max-w-3xl px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Door-to-Door <span className="text-yellow-400">Delivery</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            From pickup to final destination — we manage every step so you don’t have to.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-full text-white font-medium transition">
            Schedule Pickup
          </button>
        </motion.div>
      </section>


      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
  

<svg width="12" height="400" viewBox="0 0 12 400" xmlns="http://www.w3.org/2000/svg" className="absolute top-45 left-8 md:hidden ">
  <defs>
    <pattern id="longRopePattern" patternUnits="userSpaceOnUse" width="12" height="40">
      <path
        d="M6 0 Q10 10 6 20 Q2 30 6 40"
        stroke="var(--purple)"
        strokeWidth="3"
        fill="none"
      />
    </pattern>
  </defs>
  <rect width="12" height="700" fill="url(#longRopePattern)" />
</svg>

<svg width="12" height="400" viewBox="0 0 12 400" xmlns="http://www.w3.org/2000/svg" className="absolute top-45 right-8 md:hidden ">
  <defs>
    <pattern id="longRopePattern" patternUnits="userSpaceOnUse" width="12" height="40">
      <path
        d="M6 0 Q10 10 6 20 Q2 30 6 40"
        stroke="var(--purple)"
        strokeWidth="3"
        fill="none"
      />
    </pattern>
  </defs>
  <rect width="12" height="700" fill="url(#longRopePattern)" />
</svg>


      <div></div>
      <h2 style={{marginBlock:"50px"}} className="text-3xl font-bold text-center text-purple-700 mb-16">
        Common Questions About Door-to-Door Shipments
      </h2>

      {/* Desktop Layout */}
      <div className="hidden  md:grid grid-cols-5 gap-4 relative min-h-[500px] ">
        {/* Left questions */}
        <div className="flex flex-col gap-24 items-start col-span-1">
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-xl p-4 shadow w-60 text-sm font-medium text-gray-700">
            {questions[0]}
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-xl p-4 shadow w-60 text-sm font-medium text-gray-700">
            {questions[1]}
          </div>
        </div>

        {/* Answer in center */}
        <div className="col-span-3 flex justify-center items-center relative">
          <div className="bg-white border border-purple-100 rounded-2xl shadow-xl p-6 w-[350px] text-center transition duration-300 ease-in-out hover:shadow-2xl z-10">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Answer</h3>
            <p className="text-sm text-gray-700">{answer}</p>
          </div>

          {/* Curved SVG Lines */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            {/* Left to center */}
            <path d="M 100 40 C 220 40, 300 150, 390 250" stroke="#9333ea" strokeWidth="2" fill="none" />
            <path d="M 100 290 C 220 290, 300 300, 390 300" stroke="#9333ea" strokeWidth="2" fill="none" />
            {/* Right to center */}
            <path d="M 880 40 C 760 40, 670 150, 580 250" stroke="#9333ea" strokeWidth="2" fill="none" />
            <path d="M 880 290 C 760 290, 670 300, 580 300" stroke="#9333ea" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Right questions */}
        <div className="flex flex-col gap-24 items-end col-span-1">
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-xl p-4 shadow w-60 text-sm font-medium text-gray-700 text-right">
            {questions[2]}
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-xl p-4 shadow w-60 text-sm font-medium text-gray-700 text-right">
            {questions[3]}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-6 isolate">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="bg-purple-50 border-l-4 border-purple-400 rounded-xl p-4 shadow text-sm font-medium text-gray-700"
          >
            {q}
          </div>
        ))}

        <div className="bg-white border border-purple-100 rounded-2xl shadow-xl p-6 text-center transition duration-300 ease-in-out hover:shadow-2xl">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">Answer</h3>
          <p className="text-sm text-gray-700">{answer}</p>
        </div>
      </div>
    </section>

      <div className="relative isolate  bg-purple-100 text-white px-6 py-8 text-center  ">
      <div className="max-w-6xl mx-auto text-center">
          <h2 style={{marginBlock:"40px"}} className="text-4xl md:text-5xl font-bold text-purple-700 mb-10">
            Why Door-to-Door?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="h-8 w-8 text-yellow-600" />,
                title: "End-to-End Logistics",
                desc: "We handle everything — pickup, transit, customs, and drop-off.",
              },
              {
                icon: <Clock className="h-8 w-8 text-yellow-600" />,
                title: "Time-Saving",
                desc: "No need to manage multiple logistics vendors. We streamline it all.",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-yellow-600" />,
                title: "Secure Handling",
                desc: "Your package is treated with care through every stage of delivery.",
              },
              {
                icon: <MapPin className="h-8 w-8 text-yellow-600" />,
                title: "Live Tracking",
                desc: "Get real-time updates from pickup to doorstep.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 text-center border hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

  {/* Smooth 2-wave SVG */}
  <svg
    className="absolute -z-1 bottom-0 left-0 w-full h-[150px]"
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0,60 C360,120 1080,0 1440,60 L1440,100 L0,100 Z"
      fill="white"
    />
  </svg>
</div>




      
      

      {/* How it Works */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {[
              {
                step: "1. Book Pickup",
                detail: "Schedule a pickup from your location with our simple form or app.",
              },
              {
                step: "2. We Collect & Transport",
                detail: "Our delivery partner arrives, collects your item, and ships it securely.",
              },
              {
                step: "3. Delivered to Doorstep",
                detail: "We handle customs clearance and drop the package right to the recipient’s door.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm"
                whileHover={{ y: -5 }}
              >
                <h4 style={{marginBlock:"8px"}} className="text-lg font-semibold text-purple-800 mb-2">
                  {item.step}
                </h4>
                <p className="text-gray-700">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6 md:px-20 bg-yellow-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Reliable. Hassle-Free. Guaranteed.
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Join thousands who trust our door-to-door service for fast, worry-free deliveries across the globe.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
