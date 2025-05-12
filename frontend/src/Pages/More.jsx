import React from "react";

const More = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 lg:px-24">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        More
      </h2>
      <p style={{marginBlock:"20px"}} className="text-center text-gray-600 mb-12">
      Logistics services ensure the smooth flow of goods from one point to another, optimizing supply chain efficiency
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div style={{marginInline:"auto",marginBottom:"20px"}} className="flex justify-center items-center bg-blue-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-truck text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Get A Quote</h3>
          
        </div>
        {/* Feature 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div style={{marginInline:"auto",marginBottom:"20px"}} className="flex justify-center items-center bg-green-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-dollar-sign text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">FAQs</h3>
          <p className="text-gray-600">
            Get competitive rates without compromising on quality.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div style={{marginInline:"auto",marginBottom:"20px"}} className="flex justify-center items-center bg-yellow-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-headset text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy Policy</h3>
          <p className="text-gray-600">
            Our team is available around the clock to assist you.
          </p>
        </div>
        {/* Feature 4 */}
        <div className="bg-white shadow-lg rounded-lg px-5 py-7 text-center hover:shadow-xl transition duration-300">
          <div style={{marginInline:"auto",marginBottom:"20px"}} className="flex justify-center items-center bg-red-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-globe text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Gallery</h3>
          <p className="text-gray-600">
            We provide services across borders with a global network of partners.
          </p>
        </div>
        
        
      </div>
    </div>
  );
};

export default More;
