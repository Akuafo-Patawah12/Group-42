import { motion } from "framer-motion";
import { ShoppingCart, PackageCheck, Globe, ShieldCheck } from "lucide-react";

export default function Procurement() {
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
            Simplified <span className="text-yellow-400">Procurement</span> Solutions
          </h1>
          <p className="text-lg md:text-xl mb-6">
            We handle the complexities of sourcing and procurement so you don’t have to. Fast, secure, and efficient.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-full text-white font-medium transition">
            Start Sourcing
          </button>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 md:px-20 bg-yellow-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-10">Why Choose Our Procurement Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShoppingCart className="h-8 w-8 text-yellow-600" />,
                title: "Sourcing Experts",
                desc: "Our team sources top-quality products from verified global suppliers.",
              },
              {
                icon: <PackageCheck className="h-8 w-8 text-yellow-600" />,
                title: "Quality Assurance",
                desc: "We inspect and verify all goods to ensure they meet your standards.",
              },
              {
                icon: <Globe className="h-8 w-8 text-yellow-600" />,
                title: "Global Reach",
                desc: "We manage procurement from multiple international markets seamlessly.",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-yellow-600" />,
                title: "Risk Management",
                desc: "We handle supplier vetting, contracts, and compliance for you.",
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
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-gray-800">How Our Procurement Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {[
              {
                step: "1. Submit Your Request",
                detail: "Let us know what products or services you need. Be as specific as possible.",
              },
              {
                step: "2. We Source & Quote",
                detail: "Our team finds the best suppliers, negotiates pricing, and provides a transparent quote.",
              },
              {
                step: "3. Delivery & Handover",
                detail: "Once approved, we handle purchasing, inspection, and delivery to your location.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-yellow-100 p-6 rounded-xl border border-yellow-200 shadow-sm"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">{item.step}</h4>
                <p className="text-gray-700">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-16 px-6 md:px-20 bg-yellow-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Procure With Confidence</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Your business deserves stress-free procurement. We bring efficiency, transparency, and reliability to every step of the process.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
