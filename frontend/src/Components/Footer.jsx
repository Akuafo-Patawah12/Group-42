import React from "react"
import "./Footer.css"
import { Link } from "react-router-dom"
import {
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined
 
} from '@ant-design/icons';

const Footer=()=>{

    
    return(
        <footer  className="bg-stone-800">
            <main style={{marginInline:"auto",paddingBlock:"100px"}} className="grid grid-cols-3 w-[95%]  sm:gap-4">
                <section className=" col-span-3  md:col-span-1 lg:col-span-1">
                    <img src="/images/sfgl_logo.jpg" style={{width:"40px",marginBottom:"20px"}} alt="logo" className=" rounded-full "/>
                    <p className="text-md text-gray-50" > Your reliable logistics provider specializing in seamless transportation.</p>
                    <div style={{marginBlock:"20px"}} className="flex gap-1 ">
                    <a href="https://www.instagram.com/sfghanalogistic?igsh=bnlyd3R2d3FyN2du"  target="_blank" rel="noopener noreferrer"><InstagramOutlined style={{color:"#eee",fontSize:"20px"}}/> </a>
          <a href="https://www.youtube.com/@SFGhanaLogistics" target="_blank" rel="noopener noreferrer"><YoutubeOutlined style={{color:"#eee",fontSize:"20px"}}/></a>
          <a href="https://www.facebook.com/profile.php?id=61560412809015&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><FacebookOutlined style={{color:"#eee",fontSize:"20px"}}/> </a>

          <a href="https://www.tiktok.com/@sfghanalogistics" target="_blank" rel="noopener noreferrer">
          <TikTokOutlined style={{color:"#eee",fontSize:"20px"}}/>
          </a>
                       
                       
                       
                       
                    </div>
                </section>
                <section style={{alignItems:"flex-start",color:"#333"}} className="flex  justify-start  gap-2" >
                <div className="mx-auto flex flex-col gap-2 text-gray-300 text-sm">
                    <h3 className="text-md font-medium text-gray-100">Services</h3>
                    <Link to={"/Services/AirFreight"}  >Air Freight</Link>
                    <Link to={"/Services/Seafreight"}  >Sea Freight</Link>
                    <Link to={"/Services/Door2door"}  >Door to door delivery</Link>
                    <Link to={"/Services/Groupage"}  >Groupage</Link>
                    <Link to={"/Services/Procurement"}  >Free Procurement</Link>
                    </div>
                </section>
                <section className="flex flex-col  gap-2">
                <div className="mx-auto flex flex-col gap-2 text-gray-300 text-sm">
                    <h3  className="text-md font-medium text-gray-100">Quick Links</h3>
                    <Link  >Get a quote</Link>
                    <Link   to={"/More/FAQs"}>FAQs</Link>
                    <Link   to={"/More/Privacy_&_Policy"}>Privacy Policy</Link>
                    <Link   to={"/More/Privacy_&_Policy"}>Terms of use</Link>
                    </div>
                </section>
            </main>

            <div className="mt-8 border-t-2 py-4 flex justify-between w-[95%] mx-auto" style={{marginInline:"auto"}}>
                <p className="text-sm font-medium text-gray-300">© {new Date().getFullYear()} | SFG Logistics.</p>
                <nav className="text-gray-300">
                     <Link className="pr-2 text-sm">Terms & Conditions</Link>
                    <Link to={"/About_us"} className="px-2 border-l-2 border-stone-500 text-sm">About</Link>
                    <Link to={"/Contact_us"} className="pl-2 border-l-2 border-stone-500 text-sm">Contact</Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer