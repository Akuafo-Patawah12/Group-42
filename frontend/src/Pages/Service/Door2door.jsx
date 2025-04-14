import React from "react";

const Door2door = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-24">
    <div className='relative h-[400px]'>
                <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Door To Door Delivery
                </h1>
                </section>
            </div>
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Door-to-Door Delivery Services
        </h1>
        <p className="text-gray-600 text-lg">
          Hassle-free, reliable door-to-door logistics solutions tailored for your needs.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What Are Door-to-Door Services?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Door-to-door delivery services ensure a seamless logistics experience by managing the entire supply chain process, from pickup at your location to delivery at the final destination. With our expertise, we handle every detail so you can focus on growing your business.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-blue-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-truck text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            End-to-End Logistics
          </h3>
          <p className="text-gray-600">
            From pick-up to delivery, we handle the entire journey of your shipment.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-green-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-clock text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Time-Saving
          </h3>
          <p className="text-gray-600">
            Save time with our streamlined process that eliminates the need for multiple providers.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-yellow-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-map-marked-alt text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Nationwide Coverage
          </h3>
          <p className="text-gray-600">
            Deliveries to and from any location, ensuring a broad coverage area.
          </p>
        </div>
      </section>

      {/* Services Offered Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Door-to-Door Services Include:
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-3">
          <li>Pick-Up and Delivery at Your Convenience</li>
          <li>Customs Clearance for International Shipments</li>
          <li>Real-Time Shipment Tracking</li>
          <li>Warehousing and Storage Options</li>
          <li>Flexible Delivery Scheduling</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Client Testimonials</h2>
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Their door-to-door service is top-notch! My shipment was picked up and delivered on time without any hassle."
            </p>
            <p className="mt-4 text-right text-gray-800 font-semibold">- Sarah Johnson, Business Owner</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Excellent service! They handled everything from customs clearance to final delivery. Highly recommend."
            </p>
            <p className="mt-4 text-right text-gray-800 font-semibold">- James Brown, Logistics Manager</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center bg-blue-500 text-white py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Need Hassle-Free Door-to-Door Delivery?</h2>
        <p className="text-lg mb-6">
          Contact us now and experience a smooth, reliable logistics solution tailored to your needs.
        </p>
        <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Get a Quote
        </button>
      </section>
    </div>
  );
};

export default Door2door;
