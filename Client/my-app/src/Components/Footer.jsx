import React from "react"
import "./Footer.css"
import { Link } from "react-router-dom"
import { ReactComponent as SvgIcon } from "../icons/svgl_svg_format_2.svg"
import { ReactComponent as Tiktok } from "../icons/Tiktok.svg"
import { ReactComponent as Facebook } from "../icons/Facebook.svg";
import { ReactComponent as Youtube } from "../icons/Youtube.svg"
import { ReactComponent as Instagram } from "../icons/Instagram.svg"

const Footer=()=>{

    const h3={fontSize:"18px",fontWeight:"500",color:"#111"}
    return(
        <footer className="bg-stone-800 pt-10 ">
            <main className="grid grid-cols-3 w-[95%] mx-auto sm:gap-4">
                <section className=" col-span-3 md:col-span-1 lg:col-span-1">
                    <SvgIcon className="translate-y-[-30px] translate-x-[-10px]"/>
                    <p className="text-md text-gray-50" > Your reliable logistics provider specializing in seamless transportation.</p>
                    <div className="flex gap-1">
                    <a href="https://www.instagram.com/sfghanalogistic?igsh=bnlyd3R2d3FyN2du"  target="_blank" rel="noopener noreferrer"><Instagram /> </a>
          <a href="https://www.youtube.com/@SFGhanaLogistics" target="_blank" rel="noopener noreferrer"><Youtube /></a>
          <a href="https://www.facebook.com/profile.php?id=61560412809015&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><Facebook /> </a>
          <a href="https://t.me/sfghanalogistics" target="_blank" rel="noopener noreferrer"> </a>
          <a href="https://www.tiktok.com/@sfghanalogistics" target="_blank" rel="noopener noreferrer">
          <Tiktok />
          </a>
                       
                       
                       
                       
                    </div>
                </section>
                <section className="flex  justify-start items-start gap-2" style={{color:"#333"}}>
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

            <div className="mt-8 border-t-2 py-4 flex justify-between w-[95%] mx-auto">
                <p className="text-sm font-medium text-gray-300">© 2025| SFG Logistics.</p>
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