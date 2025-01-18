import {
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar2 = ({popUp2}) => {
  const [openSection, setOpenSection] = useState("");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };


  const icons={color:"#aaa",marginRight:"10px"}
  return (
    <>
    {popUp2 &&<div className="fixed overflow-y-auto w-full z-[30] h-screen mt-[40px]  bg-white p-6 md:hidden lg:hidden">
    <div className="mt-4">

      <ul className="space-y-5">
        <li>
          <Link to={"/"} className="block font-medium text-xl text-stone-700 hover:text-gray-400">
            <HomeOutlined style={icons}/> Home
          </Link>
        </li>
        <li>
          <button
            onClick={() => toggleSection("about")}
            className="block font-medium text-xl w-full text-stone-700 text-left hover:text-gray-400"
          >
            <InfoCircleOutlined style={icons}/>About
          </button>
          {openSection === "about" && (
            <ul className="ml-4 mt-3 space-y-3 border-l-2 border-purple-600 pl-3">
              <li>
                <Link to={"/About_us"} className="block font-medium  hover:text-gray-400">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to={"/About_us"} className="block font-medium  hover:text-gray-400">
                  About Us
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to={"/Contact_Us"} className="block font-medium text-stone-600 text-xl hover:text-gray-400">
            <PhoneOutlined style={icons}/>Contact
          </Link>
        </li>
        <li>
          <button
            onClick={() => toggleSection("services")}
            className="block font-medium text-xl text-stone-600 w-full text-left hover:text-gray-400"
          >
            <AppstoreOutlined style={icons}/>Services
          </button>
          {openSection === "services" && (
            <ul className="ml-4 mt-3 space-y-3 border-l-2 border-purple-600 pl-3">
              <li>
                <Link to={"/Services/AirFreight"} className="block hover:text-gray-400">
                  Air Freight
                </Link>
              </li>
              <li>
                <Link to={"/Services/SeaFreight"} className="block hover:text-gray-400">
                  Sea Freight
                </Link>
              </li>
              <li>
                <Link to={"/Services/Procurement"} className="block hover:text-gray-400">
                  Procurement
                </Link>
              </li>
              <li>
                <Link to={"/Services/Groupage"} className="block hover:text-gray-400">
                  Groupage
                </Link>
              </li>
              <li>
                <Link to={"/Services/Marketing"} className="block hover:text-gray-400">
                  Shop with us
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            onClick={() => toggleSection("more")}
            className="block font-medium text-xl w-full text-stone-600 text-left hover:text-gray-400"
          >
            <MoreOutlined style={icons}/>More
          </button>
          {openSection === "more" && (
            <ul className="ml-4 mt-3 space-y-2 border-l-2 border-purple-600 pl-3">
              <li>
                <Link to={"/More/FAQs"} className="block hover:text-gray-400">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to={"/Orders"} className="block hover:text-gray-400">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link to={"/More/Gallery"} className="block hover:text-gray-400">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to={"/More/Privacy"} className="block hover:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
      </div>}
      </>
  );
};

export default Sidebar2;
