import React from "react";

const AirFreight = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-24">
    <div className='relative h-[400px]'>
                <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Air Freight Services
                </h1>
                </section>
            </div>
      {/* Page Header */}

      <header className="text-center mb-12">
        
        <p className="text-gray-600 text-lg">
          Delivering your goods with speed, reliability, and care across the globe.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Our Air Freight Services?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Our air freight solutions are designed to provide you with fast, secure, and flexible delivery options for your cargo. With an extensive global network, real-time tracking, and professional handling, we ensure that your shipments are delivered on time and in perfect condition. Whether you're shipping small parcels or large cargo, we have the expertise to meet your needs.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-blue-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-plane-departure text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h3>
          <p className="text-gray-600">
            We connect you to destinations across the world with our extensive air freight network.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-green-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-clock text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Speed & Reliability</h3>
          <p className="text-gray-600">
            Fast transit times and reliable delivery schedules to meet your business needs.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-yellow-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-shield-alt text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Handling</h3>
          <p className="text-gray-600">
            Professional cargo handling and monitoring to ensure your shipment's safety.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What Our Clients Say
        </h2>
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Their air freight services are outstanding! Our shipments arrived on time, and the team was incredibly professional throughout the process."
            </p>
            <p className="mt-4 text-right text-gray-800 font-semibold">- Jane Doe, Logistics Manager</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Fast, reliable, and secure! I highly recommend their air freight solutions for anyone looking for premium logistics services."
            </p>
            <p className="mt-4 text-right text-gray-800 font-semibold">- John Smith, CEO of ABC Corp</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center bg-blue-500 text-white py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
        <p className="text-lg mb-6">
          Get in touch with us today and experience the best air freight services.
        </p>
        <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Get a Quote
        </button>
      </section>
    </div>
  );
};

export default AirFreight;
