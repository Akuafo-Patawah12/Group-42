import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Box as BoxIcon,
  Phone as PhoneIcon,
  MoreHorizontal as MoreIcon,
} from 'lucide-react';

const { Sider } = Layout;

const Sidebar2 = ({ popUp2 }) => {
  const [openSection, setOpenSection] = useState([]);

  const toggleSection = (section) => {
    setOpenSection(
      openSection.includes(section) ? openSection.filter(s => s !== section) : [...openSection, section]
    );
  };

  const icons = { color: "#aaa", marginRight: "10px" };

  return (
    <>
      {popUp2 && (
        <Layout  >
        <Sider
        width={80+"%"}

        className="site-layout-background"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          paddingTop:"40px",
          backgroundColor: '#fff',
          overflow: 'auto',
          width: 300, // Set the width to 80% of the screen
        }}
      >
            <div style={{ padding: '16px 24px', backgroundColor: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                {/* Home Link */}
                <Menu.Item key="home" icon={<HomeIcon style={icons} />}>
                  <Link to="/">Home</Link>
                </Menu.Item>

                {/* About Section */}
                <Menu.SubMenu
                  key="about"
                  icon={<InfoIcon style={icons} />}
                  title="About"
                  onTitleClick={() => toggleSection('about')}
                >
                  {openSection.includes('about') && (
                    <>
                      <Menu.Item key="about-us">
                        <Link to="/About_us">Why Choose Us</Link>
                      </Menu.Item>
                      <Menu.Item key="about-details">
                        <Link to="/About_us">About Us</Link>
                      </Menu.Item>
                    </>
                  )}
                </Menu.SubMenu>

                {/* Contact Link */}
                <Menu.Item key="contact" icon={<PhoneIcon style={icons} />}>
                  <Link to="/Contact_Us">Contact</Link>
                </Menu.Item>

                {/* Services Section */}
                <Menu.SubMenu
                  key="services"
                  icon={<BoxIcon style={icons} />}
                  title="Services"
                  onTitleClick={() => toggleSection('services')}
                >
                  {openSection.includes('services') && (
                    <>
                      <Menu.Item key="air-freight">
                        <Link to="/Services/AirFreight">Air Freight</Link>
                      </Menu.Item>
                      <Menu.Item key="sea-freight">
                        <Link to="/Services/SeaFreight">Sea Freight</Link>
                      </Menu.Item>
                      <Menu.Item key="procurement">
                        <Link to="/Services/Procurement">Procurement</Link>
                      </Menu.Item>
                      <Menu.Item key="groupage">
                        <Link to="/Services/Groupage">Groupage</Link>
                      </Menu.Item>
                      <Menu.Item key="shop-with-us">
                        <Link to="/Services/Marketing">Shop with us</Link>
                      </Menu.Item>
                    </>
                  )}
                </Menu.SubMenu>

                {/* More Section */}
                <Menu.SubMenu
                  key="more"
                  icon={<MoreIcon style={icons} />}
                  title="More"
                  onTitleClick={() => toggleSection('more')}
                >
                  {openSection.includes('more') && (
                    <>
                      <Menu.Item key="faqs">
                        <Link to="/More/FAQs">FAQs</Link>
                      </Menu.Item>
                      <Menu.Item key="get-quote">
                        <Link to="/Orders">Get a Quote</Link>
                      </Menu.Item>
                      <Menu.Item key="gallery">
                        <Link to="/More/Gallery">Gallery</Link>
                      </Menu.Item>
                      <Menu.Item key="privacy-policy">
                        <Link to="/More/Privacy">Privacy Policy</Link>
                      </Menu.Item>
                    </>
                  )}
                </Menu.SubMenu>
              </Menu>
            </div>
            {/* Copyright */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                textAlign: 'center',
                fontSize: '12px',
                color: '#aaa',
              }}
            >
              <p>&#169; 2025 group 42.</p>
            </div>
          </Sider>
        </Layout>
      )}
    </>
  );
};

export default Sidebar2;
