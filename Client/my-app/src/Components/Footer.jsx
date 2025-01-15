import React from "react"
import "./Footer.css"
import { Link } from "react-router-dom"
import { ReactComponent as SvgIcon } from "../icons/svgl_svg_format_2.svg"
import { ReactComponent as Tiktok } from "../icons/Tiktok.svg"
import { ReactComponent as Facebook } from "../icons/Facebook.svg";
import { ReactComponent as Youtube } from "../icons/Youtube.svg"
import { ReactComponent as Instagram } from "../icons/Instagram.svg"

const Footer=()=>{

    const h3={fontSize:"17px",fontWeight:"500",color:"#111"}
    return(
        <footer className="bg-purple-200 pt-7 mt-8">
            <main className="grid grid-cols-3 w-[95%] mx-auto sm:gap-4">
                <section className=" col-span-3 md:col-span-1 lg:col-span-1">
                    <SvgIcon />
                    <p style={{fontWeight:"500",color:"#555",fontSize:"18px"}} > Your reliable logistics provider specializing in seamless transportation.</p>
                    <div className="flex gap-1">
                    <a href="https://www.instagram.com/sfghanalogistic?igsh=bnlyd3R2d3FyN2du" target="_blank"><Instagram /> </a>
          <a href="https://www.youtube.com/@SFGhanaLogistics" target="_blank"><Youtube /></a>
          <a href="https://www.facebook.com/profile.php?id=61560412809015&mibextid=ZbWKwL" target="_blank"><Facebook /> </a>
          <a href="https://t.me/sfghanalogistics" target="_blank"> </a>
          <a href="https://www.tiktok.com/@sfghanalogistics" target="_blank" rel="noopener noreferrer">
          <Tiktok />
          </a>
                       
                       
                       
                       
                    </div>
                </section>
                <section className="flex flex-col  gap-2" style={{fontWeight:"500",color:"#444"}}>
                    <h3 style={h3}>Services</h3>
                    <Link>Air Freight</Link>
                    <Link>Sea Freight</Link>
                    <Link>Door to door delivery</Link>
                    <Link>Groupage</Link>
                </section>
                <section className="flex flex-col  gap-2" style={{fontWeight:"500",color:"#444"}}>
                    <h3 style={h3}>Quick Links</h3>
                    <Link>Get a quote</Link>
                    <Link to={"/More/FAQs"}>FAQs</Link>
                    <Link to={"/More/Privacy_&_Policy"}>Privacy Policy</Link>
                    
                </section>
            </main>

            <div className="mt-8 border-t-2 py-4 flex justify-between w-[95%] mx-auto">
                <p>© 2025| SFG Logistics.</p>
                <nav>
                     <Link className="pr-2">Terms & Conditions</Link>
                    <Link to={"/About_us"} className="px-2 border-l-2 border-stone-500">About</Link>
                    <Link to={"/Contact_us"} className="pl-2 border-l-2 border-stone-500">Contact</Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer