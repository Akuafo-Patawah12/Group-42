import React from 'react'
import {Link} from "react-router-dom"
import "./Services.css"



import  ProcurementIcon from "../icons/Procurement"

import  Clearance from "../icons/Clearance"

import { color } from 'framer-motion'
import SeaFreight from '../icons/SeaFreight.jsx'
import AirFreightIcon from '../icons/AirFreight.jsx'
const Services = () => {


    const h3={fontSize:"1rem",fontWeight:"500",lineHeight:"2rem",marginInline:"auto",width:"fit-content"}
    const seemore={textDecoration:"underline",color:"var(--purple)"}

    const svg={marginInline:"auto"}
  return (
    <div>
        <section className="relative bg-gradient-to-r from-white via-stone-300 to-white w-full h-[400px] overflow-hidden">
  {/* Image 1 */}
  <img
    src="../images/Air.jpg"
    alt="Image 1"
    className="absolute object-cover z-20 top-0 left-0 w-[30%] h-[40%] border-b-[7px] border-white"
  />

  {/* Image 2 */}
  <img
    src="../images/Air2.jpg"
    alt="Image 2"
    className="absolute object-cover z-10 bottom-0 left-0 w-[40%] h-[80%] border-t-[7px] border-r-[7px] border-white"
  />

  {/* Image 3 */}
  <img
    src="../images/Sea.jpg"
    alt="Image 3"
    className="absolute object-cover top-0 right-0 w-[30%] h-[49%] bg-blue-600"
  />

  {/* Image 4 */}
  <img
    src="../images/accessories.jpg"
    alt="Image 4"
    className="absolute object-cover bottom-0 right-0 w-[30%] h-[49%] bg-amber-900"
  />

  {/* Image 5 */}
  <img
    src="../images/Air.jpg"
    alt="Image 5"
    className="absolute object-cover top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[39%] h-[60%] bg-purple-600"
  />

  {/* Image 6 */}
  <img
    src="../images/Air.jpg"
    alt="Image 6"
    className="absolute object-cover bottom-0 left-[40%] w-[29.5%] h-[39%] bg-orange-500"
  />

  {/* Overlay */}
  <div className="absolute z-30 w-full h-full bg-black/50 flex items-center justify-center">
    <a href="/" className="text-white font-bold text-xl">Home /</a><span style={{marginLeft:"5px"}} className="text-purple-600 font-bold text-xl">Services</span>
  </div>
</section>

<h2  style={{marginBlock:"50px 20px"}} className="text-3xl md:text-4xl font-semibold text-gray-700 text-center mt-12 mb-10">
  Fast & Affordable <span className="text-purple-600">Services</span> For You.
</h2>
<p style={{margin:"30px auto"}} className="font-bold text-center max-w-[350px]">Quick, reliable, and affordable logistics solutions tailored for your business.</p>

<section style={{marginInline:"auto"}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10 max-w-7xl mx-auto">

  <div className="bg-white shadow-lg border border-purple-200 rounded-xl p-6 flex flex-col items-center text-center">
    <SeaFreight className="w-10 h-10 mb-4 text-purple-600" />
    <h3 className="text-lg font-semibold text-gray-800 mb-2">Sea Freight</h3>
    <p className="text-sm text-gray-600">
      SF Ghana Logistics provides reliable and cost-effective Sea Freight Services for bulk shipments over long distances. 
      <Link to="/Services/SeaFreight" className="text-purple-600 font-medium ml-1">See more...</Link>
    </p>
  </div>

  <div className="bg-white shadow-lg border border-purple-200 rounded-xl p-6 flex flex-col items-center text-center">
    <AirFreightIcon className="w-10 h-10 mb-4 text-purple-600" />
    <h3 className="text-lg font-semibold text-gray-800 mb-2">Air Freight</h3>
    <p className="text-sm text-gray-600">
      Fast, secure, and efficient transport for high-priority or time-sensitive shipments. 
      <Link to="/Services/AirFreight" className="text-purple-600 font-medium ml-1">See more...</Link>
    </p>
  </div>

  

  <div className="bg-white shadow-lg border border-purple-200 rounded-xl p-6 flex flex-col items-center text-center">
    <ProcurementIcon className="w-10 h-10 mb-4 text-purple-600" />
    <h3 className="text-lg font-semibold text-gray-800 mb-2">Procurement Training</h3>
    <p className="text-sm text-gray-600">
      Free training to enhance procurement and sourcing skills for businesses. 
      <Link to="/Services/Procurement" className="text-purple-600 font-medium ml-1">See more...</Link>
    </p>
  </div>

  <div className="bg-white shadow-lg border border-purple-200 rounded-xl p-6 flex flex-col items-center text-center">
    <Clearance className="w-5 h-5 mb-4 text-purple-600" />
    <h3  className="text-lg font-semibold text-gray-800 ">Container Clearance</h3>
    <p  className="text-sm text-gray-600">
      Hassle-free customs clearance and flexible credit options for efficient logistics.
      <Link to="/Services/Clearance" className="text-purple-600 font-medium ml-1">See more...</Link>
    </p>
  </div>

  
</section>

{/* Image & Marketplace section */}
<div style={{marginTop:"80px",marginInline:"auto"}} className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-20 px-4 md:px-10 max-w-7xl mx-auto">
  <div className="w-full lg:w-1/2">
    <img src="../images/3d-render-freight-container-forklift.jpg" alt="Freight container" className="w-full " />
  </div>
  <div className="w-full lg:w-1/2">
    <img src="../images/online-purchase-payment-commerce-concept-transformed.jpeg" alt="e-commerce" className="w-full rounded-xl shadow-md mb-4" />
    <h3 style={{marginBlock:"8px"}} className="text-lg font-semibold text-gray-800 mb-2">Third Party Marketplace</h3>
    <p style={{marginBottom:"8px"}} className="text-sm text-gray-600">
      Connect buyers and sellers with secure transactions, powerful tools, and easy navigation to empower small businesses with a seamless e-commerce experience.
    </p>
  </div>
</div>

    </div>

  )
}

export default Services