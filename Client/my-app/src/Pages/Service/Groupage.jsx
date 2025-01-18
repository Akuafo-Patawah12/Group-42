import React from "react";
import { Link } from "react-router-dom";

const Groupage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-24">
    <div className='relative h-[400px]'>
                <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Groupage Services
                </h1>
                </section>
            </div>
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Groupage Services
        </h1>
        <p className="text-gray-600 text-lg">
          Delivering cost-effective and reliable solutions for consolidated shipments.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What Are Groupage Services?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Groupage services, also known as less-than-container load (LCL) shipping, allow businesses to consolidate smaller shipments into one container. This reduces costs and ensures efficiency, making it an ideal choice for companies with smaller cargo that needs to be transported securely and reliably.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white border-t-2 border-purple-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-blue-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-boxes text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Cost-Effective
          </h3>
          <p className="text-gray-600">
            Share container space with other shipments and reduce transportation costs.
          </p>
        </div>

        <div className="bg-white border-t-2 border-purple-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-green-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-cogs text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Flexible Solutions
          </h3>
          <p className="text-gray-600">
            Tailored shipping schedules to match your cargo requirements.
          </p>
        </div>

        <div className="bg-white border-t-2 border-purple-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-yellow-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-shield-alt text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Secure Handling
          </h3>
          <p className="text-gray-600">
            Professional handling ensures the safety and integrity of your shipment.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          How Does It Work?
        </h2>
        <ol className="list-decimal list-inside text-gray-600 leading-relaxed space-y-4">
          <li>
            <strong>Booking:</strong> Submit your shipping details and get a custom quote.
          </li>
          <li>
            <strong>Consolidation:</strong> Your cargo is combined with other shipments heading to the same destination.
          </li>
          <li>
            <strong>Transport:</strong> The container is transported to the destination using our reliable logistics network.
          </li>
          <li>
            <strong>Delivery:</strong> Your cargo is safely unloaded and delivered to its final destination.
          </li>
        </ol>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Client Testimonials
        </h2>
        <div className="space-y-6">
          <div className="bg-white border-t-2 border-purple-200 shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Their groupage services helped us save significantly on shipping costs without compromising on delivery times. Highly recommended!"
            </p>
            <p className="mt-4 text-right text-gray-800 font-semibold">- Sarah Johnson, Operations Manager</p>
          </div>
          <div className="bg-white border-t-2 border-b-5 border-purple-200 shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Excellent service! Our goods were handled professionally, and the team ensured timely delivery."
            </p>
            <p className="mt-4 text-right text-gray-800 font-semibold">- Michael Lee, Business Owner</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center bg-blue-500 text-white py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Start Your Shipment Today.</h2>
        <p className="text-lg mb-6">
          Get in touch with us and experience seamless and affordable groupage services.
        </p>
        <Link to={"/Orders"} className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Get a Quote
        </Link>
      </section>
    </div>
  );
};

export default Groupage;
