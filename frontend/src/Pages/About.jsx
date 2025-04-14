import React from 'react'

import {
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
 
} from '@ant-design/icons';
import { CheckCircle, Target, Eye } from "lucide-react";
import "./About.css"

const About = () => {
   
    

    
  return (
    <div>
      <div className="grid grid-cols-1 bg-white md:grid-cols-2 gap-6 p-8 border-2 border-purple-300 rounded-2xl mt-10 max-w-7xl mx-auto bg-white shadow-md">
  {/* Text Section */}
  <section className="flex flex-col justify-center gap-4">
    <h1 className="text-3xl md:text-4xl font-bold text-purple-800">
      Logistics & Marketing — The Perfect Synergy
    </h1>
    <p className="text-gray-700 text-md leading-relaxed">
      At our core, we’re redefining what it means to ship smart and grow fast.
      By combining world-class logistics services with powerful digital marketing tools,
      we empower businesses to move products efficiently and expand their reach simultaneously.
      Whether you’re a growing eCommerce brand or a global enterprise,
      our platform offers the seamless integration you need to streamline shipping,
      boost visibility, and scale with confidence.
    </p>
  </section>

  {/* Image Section */}
  <section className="flex items-center justify-center">
    <img
      src="/images/Logistics.jpg"
      alt="Logistics and Marketing"
      className="rounded-xl  max-w-[90%] h-auto"
    />
  </section>

  {/* Third Section - Full Width on md+ */}
  <section className="md:col-span-2 bg-purple-100 rounded-xl p-6 mt-6">
  <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* Fast Delivery */}
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <h3 className="font-semibold text-lg mb-2">
      <span className="text-purple-600 text-4xl">95%</span><br/>
        Fast Delivery 
      </h3>
      <p className="text-gray-600">We ensure your packages move swiftly across borders.</p>
    </div>

    {/* Marketing Integration */}
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <h3 className="font-semibold text-lg mb-2">
      <span className="text-purple-600 text-2xl">90%</span><br/>
        Marketing Integration 
      </h3>
      <p className="text-gray-600">Promote your business while you ship with ease.</p>
    </div>

    {/* Real-Time Tracking */}
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <h3 className="font-semibold text-lg mb-2">
      <span className="text-purple-600 text-4xl">98%</span><br/>
        Real-Time Tracking 
      </h3>
      <p className="text-gray-600">Know where your goods are at every moment.</p>
    </div>

  </div>
</section>

</div>




<div style={{backgroundColor:"var(--purple)"}} className="reviews flex flex-col mb-6 py-[100px] bg-purple-300 md:flex-row justify-between items-start gap-10 bg-white shadow-lg rounded-2xl p-8 mt-10">
  {/* Why Choose Us */}
  <div className="flex-1 text-center md:text-left">
    <CheckCircle className="mx-auto md:mx-0 text-purple-600 mb-4" size={36} />
    <h3 className="text-2xl font-semibold mb-2">Why Choose Us</h3>
    <p className="text-gray-100">
      We combine cutting-edge logistics with integrated marketing solutions to help businesses move fast and grow faster.
    </p>
  </div>

  {/* Mission */}
  <div className="flex-1 text-center md:text-left">
    <Target className="mx-auto md:mx-0 text-purple-600 mb-4" size={36} />
    <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
    <p className="text-gray-100">
      To empower global trade through seamless delivery systems and smart branding tools, all in one unified platform.
    </p>
  </div>

  {/* Vision */}
  <div className="flex-1 text-center md:text-left">
    <Eye className="mx-auto md:mx-0 text-purple-600 mb-4" size={36} />
    <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
    <p className="text-gray-100">
      To become the leading digital logistics and marketing hub, accelerating the growth of businesses across borders.
    </p>
  </div>
</div>


<div className="bg-purple-50 py-16 px-6 md:px-20 rounded-3xl mt-12 shadow-lg">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
    Meet Our Experienced Team
  </h2>
  <p style={{margin:"20px auto"}} className="font-bold text-stone-700 max-w-[350px] text-center">Meet our expert team, committed to delivering seamless logistics and marketing solutions with precision and care.</p>
  <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
    {/* Team Member 1 */}
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
  <img
    src="/images/Me.jpg"
    alt="Team Member 1"
    style={{ marginInline: "auto" }}
    className="w-30 h-30 object-cover rounded-full mb-4"
  />
  <h3 className="text-xl font-semibold text-gray-800">David Nii Darko</h3>
  <p className="text-purple-600 text-sm mb-2">Logistics Manager</p>
  <p className="text-gray-600 text-sm mb-4">
    10+ years in global shipping coordination, known for flawless execution and rapid deliveries.
  </p>
  <div style={{marginBlock:"15px"}} className="w-full  h-[1px] rounded-full bg-gradient-to-r from-white via-stone-300 to-white"></div>

  {/* Social Media Icons */}
  <div className="flex justify-center gap-4 text-xl ">
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700">
      <LinkedinOutlined />
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className='text-sky-600'>
      <TwitterOutlined />
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">
      <FacebookOutlined />
    </a>
  </div>
</div>

    {/* Team Member 2 */}
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
      <img
        src="/images/Me2.jpg"
        alt="Team Member 2"
        style={{ marginInline: "auto" }}
        className="w-30 h-30 object-cover rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">Micheal Edem Dei</h3>
      <p className="text-purple-600 text-sm mb-2">Marketing Strategist</p>
      <p className="text-gray-600 text-sm">
        Branding expert driving visibility and customer engagement through creative campaigns.
      </p>
      <div style={{marginBlock:"15px"}} className="w-full  h-[1px] rounded-full bg-gradient-to-r from-white via-stone-300 to-white"></div>
        {/* Social Media Icons */}
  <div className="flex justify-center gap-4 text-xl ">
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700">
      <LinkedinOutlined />
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className='text-sky-600'>
      <TwitterOutlined />
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">
      <FacebookOutlined />
    </a>
  </div>
    </div>

    {/* Team Member 3 */}
    <div className="bg-white rounded-xl shadow-md p-6  text-center hover:shadow-xl transition duration-300">
      <img
        src="/images/Patawah.jpg"
        alt="Team Member 3"
        style={{ marginInline: "auto" }}
        className="w-30 h-30 object-cover rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">Patawah Aquafo Andrew</h3>
      <p className="text-purple-600 text-sm mb-2">Operations Lead</p>
      <p className="text-gray-600 text-sm">
        Expert in optimizing workflow and ensuring seamless client support across departments.
      </p>
    <div style={{marginBlock:"15px"}} className="w-full  h-[1px] rounded-full bg-gradient-to-r from-white via-stone-300 to-white"></div>
        {/* Social Media Icons */}
  <div className="flex justify-center gap-4 text-xl ">
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700">
      <LinkedinOutlined />
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className='text-sky-600'>
      <TwitterOutlined />
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">
      <FacebookOutlined />
    </a>
  </div>
    </div>
    
  </div>
</div>

        </div>
        
  )
}

export default About