import React from "react";

const Procurement = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-24">
    <div className='relative h-[400px]'>
                <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Free Procurement Services
                </h1>
                </section>
            </div>
      {/* Page Header */}
      <header className="text-center mb-12">
        
        <p className="text-gray-600 text-lg">
          Cost-effective procurement solutions to meet your business needs at no extra cost.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What Are Free Procurement Services?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Free Procurement Services help businesses source, purchase, and manage the goods or services they need without incurring additional charges. We manage the entire procurement process efficiently, saving you both time and money, allowing you to focus on other core areas of your business.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-blue-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-dollar-sign text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Cost-Free Solutions
          </h3>
          <p className="text-gray-600">
            Get the procurement services you need without any additional costs or hidden fees.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-green-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-clipboard-check text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Streamlined Process
          </h3>
          <p className="text-gray-600">
            Our experienced team simplifies the entire procurement process, ensuring timely deliveries and consistent quality.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-yellow-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-check-circle text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Quality Assurance
          </h3>
          <p className="text-gray-600">
            We ensure the procurement of only high-quality products that meet your business's standards.
          </p>
        </div>
      </section>

      {/* Services Offered Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Free Procurement Services Include:
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-3">
          <li>Source and Procure Products/Services from Trusted Vendors</li>
          <li>Negotiation with Suppliers for Competitive Pricing</li>
          <li>Ensure Timely Deliveries with Real-Time Updates</li>
          <li>Supplier Evaluation and Selection</li>
          <li>Comprehensive Vendor Management</li>
        </ul>
      </section>

      {/* Case Studies Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Procurement for ABC Corporation
            </h3>
            <p className="text-gray-600">
              Successfully handled procurement for ABC Corporation, securing high-quality office supplies at a significantly reduced cost.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Procurement for XYZ Logistics
            </h3>
            <p className="text-gray-600">
              Managed procurement for XYZ Logistics, ensuring timely and efficient sourcing of vehicle parts and equipment for their fleet.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center bg-blue-500 text-white py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Maximize Your Business Potential with Free Procurement.</h2>
        <p className="text-lg mb-6">
          Let us handle your procurement needs, saving you time and money. Contact us today for a customized solution.
        </p>
        <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Get a Quote
        </button>
      </section>
    </div>
  );
};

export default Procurement;
