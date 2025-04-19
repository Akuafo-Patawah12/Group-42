import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function DoorToDoor() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative h-[80vh] bg-[url('/images/delivery-truck.svg')] bg-contain bg-center bg-no-repeat flex items-center justify-center text-white">
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
