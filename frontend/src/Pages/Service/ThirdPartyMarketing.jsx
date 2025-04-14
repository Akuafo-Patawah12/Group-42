import React from "react";

const ThirdPartyMarketing = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-24">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Third-Party Marketing Services
        </h1>
        <p className="text-gray-600 text-lg">
          Empower your business with our reliable third-party marketing solutions.
        </p>
      </header>

      {/* Introduction Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What Are Third-Party Marketing Services?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Third-party marketing involves leveraging external expertise and resources to promote your business effectively. Our services focus on connecting your brand with the right audience through strategic partnerships, campaigns, and tailored marketing solutions.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-blue-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-network-wired text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Extensive Network
          </h3>
          <p className="text-gray-600">
            Access a broad network of partners and resources to amplify your brand reach.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-green-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-bullseye text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Targeted Campaigns
          </h3>
          <p className="text-gray-600">
            Reach your ideal audience through customized marketing strategies.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center items-center bg-yellow-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
            <i className="fas fa-chart-line text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Measurable Results
          </h3>
          <p className="text-gray-600">
            Track your campaign's success with real-time data and analytics.
          </p>
        </div>
      </section>

      {/* Services Offered Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Third-Party Marketing Services Include:
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-3">
          <li>Partner Collaboration for Market Expansion</li>
          <li>Social Media Marketing Campaigns</li>
          <li>Email and Content Marketing</li>
          <li>Affiliate Marketing Programs</li>
          <li>Performance Analytics and Reporting</li>
        </ul>
      </section>

      {/* Case Studies Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Campaign for XYZ Retail
            </h3>
            <p className="text-gray-600">
              Partnered with XYZ Retail to execute a social media campaign that
              increased their online sales by 30%.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Launching ABC Product
            </h3>
            <p className="text-gray-600">
              Supported the launch of ABC's new product with targeted email
              marketing, resulting in a 20% growth in customer base.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center bg-blue-500 text-white py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Boost Your Marketing Today</h2>
        <p className="text-lg mb-6">
          Contact us to learn more about how our third-party marketing services
          can help grow your business.
        </p>
        <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Get a Quote
        </button>
      </section>
    </div>
  );
};

export default ThirdPartyMarketing;
