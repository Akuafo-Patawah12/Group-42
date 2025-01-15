import React from 'react'
import {Link} from "react-router-dom"
import "./Services.css"


import { ReactComponent as Air} from "../icons/AirFreight.svg"
import { ReactComponent as Procurement} from "../icons/Procurement.svg"
import { ReactComponent as Sea} from "../icons/SeaFreight.svg"
import { ReactComponent as Clearance} from "../icons/Clearance.svg"
import { ReactComponent as Door2door} from "../icons/Door2door.svg"
import { color } from 'framer-motion'
const Services = () => {


    const h3={fontSize:"1.5rem",lineHeight:"2rem",marginInline:"auto",width:"fit-content"}
    const seemore={textDecoration:"underline",color:"var(--purple)"}

    const svg={marginInline:"auto"}
  return (
    <div>
        <section className="mt-[50px] relative bg-stone-200 w-full h-[400px]">
            <img src="../images/Air.jpg" alt="image" className='imag imag_1'></img>
            <img src="../images/Air2.jpg" alt="image" className="imag imag_2"></img>
            <img src="../images/Sea.jpg" alt="image" className="imag imag_3"></img>
            <img src="../images/Procurement.jpg" alt="image" className="imag imag_4"></img>
            <img src="../images/Air.jpg" alt="image" className="imag imag_5"></img>
            <img src="../images/Air.jpg" alt="image" className="imag imag_6"></img>
            <div className="absolute z-30 w-full h-full bg-black opacity-[0.5] flex items-center justify-center">
                <Link className="text-white font-bold text-xl">Home /  </Link>
                <div className="content translate-y-[-45px]">
              <h3>SERVICES.</h3>
              <h3>SERVICES.</h3>
          </div>
            </div>
        </section>

        <p style={{fontSize:"40px"}} className="text-gray-600 text-center mt-10 mb-12">Fast & Affordable <span style={{color:"var(--purple)",fontSize:"40px"}}>Services</span> For You.</p>
       

       <section className="grid grid-cols-1 w-[95%] mx-auto gap-10 mt-6 md:grid-cols-2 lg:grid-cols-3">

       <div >
       <Sea style={svg}/>
       <h3 style={h3}>Sea Freight</h3>
<p>SF Ghana Logistics provides reliable and cost-effective Sea Freight Services for clients with 
large shipments. Whether you’re shipping goods from Ghana to China or vice versa, our sea 
freight solutions are ideal for transporting bulk goods over long distances. <Link to={"/Services/SeaFreight"} style={seemore}>See more...</Link></p>

       </div>
          <div>
          <Air style={svg}/>
          <h3 style={h3}>Air Freight</h3>
            <p>
                Our Air Freight Services are tailored for clients who need fast, reliable, and secure transportation 
                of their goods. Ideal for high-priority or time-sensitive shipments, we ensure your cargo reaches 
                its destination quickly and safely. <Link to={"/Services/AirFreight"} style={seemore}>See more...</Link>
            </p>
          </div>

          <div>
          <Door2door style={svg}/>
          <h3 style={h3}>Door-to-Door Delivery</h3>
            <p>Our Door-to-Door Delivery Service offers a hassle-free solution, managing the entire logistics 
            process from pickup to final delivery.<Link to={"/Services/Door2door"} style={seemore}>See more...</Link></p> 
          </div>

          <div>
          <Procurement style={svg}/>
          <h3 style={h3}>Free Procurement and Sourcing Training</h3>
            <p>Our Free Procurement and Sourcing Training empowers businesses with essential skills for 
            managing logistics, procurement, and international sourcing. This service is designed to help 
            businesses improve their operations without additional cost.<Link to={"/Services/Procurement"} style={seemore}>See more...</Link> </p>
          </div>

          <div>
          <Clearance style={svg}/>
          <h3  style={h3}>Container Clearance</h3>
            <p>SF Ghana Logistics provides seamless Container Clearance Services, managing all customsrelated documentation and ensuring regulatory compliance. To support businesses with their 
            financial needs, we also offer Container Clearance on Credit, allowing flexibility in payments 
            while maintaining efficient logistics operations. <Link to={"/Services/Clearance"} style={seemore}>See more...</Link></p>
          </div>
          
          <div>
          <h3 style={h3}>Groupage Services</h3>
          <p>Our Groupage Services allow businesses with small to medium-sized shipments to save on costs 
                by sharing container space with others. This service is perfect for clients who do not require an 
                entire container but still need reliable and timely delivery.</p>
          </div>
       </section>

     <div className="flex mt-[70px] w-[95%] mx-auto justify-between">
     <div className="w-[45%]">
      <img src="../images/3d-render-freight-container-forklift.jpg" alt='3d' className="w-full"></img>
      </div>
      <div className="w-[45%]">
         
         <img src="../images/online-purchase-payment-commerce-concept-transformed.jpeg" alt="ecom" className='w-full'></img>
         
         <h3  style={h3}>Third Party Marketplace.</h3>
         <p>
         Our platform connects independent sellers with buyers, offering a seamless shopping experience. It features secure transactions, easy navigation, and tools for managing listings, empowering small businesses while providing customers with diverse, high-quality products.
         </p>

         
      </div>
      </div>
    </div>

  )
}

export default Services