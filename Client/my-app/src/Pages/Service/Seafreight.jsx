import React from "react";

const SeaFreight = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-24">
    <div className='relative h-[400px]'>
                <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Sea Freight Services
                </h1>
                </section>
            </div>
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sea Freight Services</h1>
        <p className="text-gray-600 text-lg">
          Affordable and reliable sea freight solutions for global cargo transportation.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Our Sea Freight Services?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Our sea freight services are designed to provide flexible and cost-effective shipping options for businesses of all sizes. With a strong global network and expertise in maritime logistics, we ensure your cargo reaches its destination safely and on time. From full container loads (FCL) to less-than-container loads (LCL), we offer tailored solutions to meet your shipping needs.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-blue-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-ship text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Coverage</h3>
          <p className="text-gray-600">
            Seamlessly connect to major ports worldwide for efficient cargo transport.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-green-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-dollar-sign text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Cost-Effective</h3>
          <p className="text-gray-600">
            Competitive pricing for both small and large shipments, ensuring value for money.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-yellow-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-box-open text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Options</h3>
          <p className="text-gray-600">
            From full container loads (FCL) to less-than-container loads (LCL), choose the option that suits your needs.
          </p>
        </div>
      </section>

      {/* Services Offered Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Sea Freight Services Include:
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-3">
          <li>Full Container Load (FCL) Shipping</li>
          <li>Less-than-Container Load (LCL) Shipping</li>
          <li>Port-to-Port and Door-to-Door Services</li>
          <li>Customs Clearance and Documentation</li>
          <li>Real-Time Tracking of Shipments</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Client Testimonials</h2>
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Their sea freight services were exceptional! They provided timely updates, and our goods arrived in perfect condition."
            </p>
            <p className="mt-4 text-right text-gray-800 font-semibold">- Emily Clark, Import Manager</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Affordable and efficient! We saved significantly on shipping costs while ensuring safe delivery."
            </p>
            <p className="mt-4 text-right text-gray-800 font-semibold">- Liam Carter, Business Owner</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center bg-blue-500 text-white py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Ship by Sea?</h2>
        <p className="text-lg mb-6">
          Get in touch with us today and enjoy reliable sea freight solutions tailored to your needs.
        </p>
        <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Get a Quote
        </button>
      </section>
    </div>
  );
};

export default SeaFreight;
