import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-stone-100">

        <div className='relative h-[400px]'>
                <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                        Contact Us
                </section>
            </div>

      <div className="container mx-auto my-5 p-6 max-w-3xl bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-[var(--purple)] mb-6">
          Contact SFG Logistics
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Reach out to us for any inquiries or logistics support. We’re here to help!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Message</label>
                <textarea
                  placeholder="Enter your message"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--purple)] text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h2>
            <p className="text-gray-600 mb-4">
              If you prefer, you can also contact us directly using the details below.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="bg-purple-200 text-[var(--purple)] p-2 rounded-full mr-3">
                  📞
                </span>
                <span> 020 811 6360 / 053 948 0433</span>
              </li>
              <li className="flex items-center">
                <span className="bg-purple-200 text-[var(--purple)] p-2 rounded-full mr-3">
                  ✉️
                </span>
                <span>sfghanalogistics24@gmail.com</span>
              </li>
              <li className="flex items-center">
                <span className="bg-purple-200 text-[var(--purple)] p-2 rounded-full mr-3">
                  📍
                </span>
                <span>George Bush Highway, Dzorwulu, Accra-Ghana </span>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-2">Follow Us:</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-[var(--purple)] hover:text-blue-800 transition"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-[var(--purple)] hover:text-blue-800 transition"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-[var(--purple)] hover:text-blue-800 transition"
                >
                  Youtube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
