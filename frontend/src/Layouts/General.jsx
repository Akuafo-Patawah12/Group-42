import React,{lazy,useState,useRef,useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import '../App.css';

import ForgetPassword from '../Auth/ForgetPassword'
import UpdatePassword from '../Auth/UpdatePassword'

import AuthLoader from '../icons/AuthLoader';
import PageNotFound from '../Routes/PageNotFound';
import Header from '../Components/Header';
import Sidebar2 from '../Components/Sidebar2';
import Footer from '../Components/Footer';
import TrackShipmentPopup from '../Components/TrackShipmentPopup';
import More from '../Pages/More';
import AirFreight from '../Pages/Service/Airfreight';

import SeaFreight from '../Pages/Service/Seafreight';

import ThirdPartyMarketing from '../Pages/Service/ThirdPartyMarketing';
import Procurement from '../Pages/Service/Procurement';
const GalleryPage= lazy(()=> import('../Pages/Gallery'));
const PrivacyPolicyPage= lazy(()=> import('../Pages/Privacy'));
const FAQPage = lazy(()=> import("../Pages/FAQs"));
const About= lazy(()=> import( '../Pages/About'));
const Contact= lazy(()=> import('../Pages/Contact'));
const Services= lazy(()=> import('../Pages/Services'));
const LandingPage= lazy(()=> import("../Auth/LandingPage"))
const Login= lazy(()=> import('../Auth/Login'))
const SignUp= lazy(()=> import('../Auth/SignUp'))
const General = () => {
    
      
      const[popUp1,setPopUp1]= useState(false)
      const[isRotate,setIsRotate] = useState(false)
            function pop1(){
            
            setPopUp1(prev => !prev)
            }
    
            const [isOpen, setIsOpen] = useState(false);
    
    
            const trackRef= useRef(null)
            
            useEffect(()=>{   //this function allows u to close the popup menu by clicking outside of it.
              let closePop =(event)=>{
                
    
                if(trackRef.current && !trackRef.current.contains(event.target)){
                  setIsOpen(false);
                }
                   /**This function is executed when you click outside the pop up menu in event.js to close it */
              }
              document.addEventListener("mousedown",closePop);
              return()=>{
                document.removeEventListener("mousedown",closePop)
                /**This function is executed when you click outside the sidebar to close it in ToggleSideBar.jsx */
              }
            },[]);
            
            const[popUp2,setPopUp2]= useState(false)
            function pop2(){
            
            setPopUp2(prev => !prev)
            }
  return (
    <div>
        <Header popDetails={[pop1,pop2,popUp1,setPopUp1,popUp2,setPopUp2]}  rotate={[isRotate,setIsRotate]} setIsOpen={setIsOpen}/>
    <TrackShipmentPopup open={[setIsOpen,isOpen]} trackRef={trackRef}/>
    <Sidebar2 popUp2={popUp2} setPopUp1={setPopUp2}/>
         <Routes>
         <Route path='/' element={<React.Suspense fallback={<AuthLoader/>}>
               <LandingPage/>
            </React.Suspense>} />

            <Route path='/More/FAQs' element={<React.Suspense fallback={<AuthLoader/>}>
               <FAQPage/>
            </React.Suspense>} />

            <Route path='/More' element={<React.Suspense fallback={<AuthLoader/>}>
               <More/>
            </React.Suspense>} />

            <Route path='/Services' element={<React.Suspense fallback={<AuthLoader/>}>
               <Services />
            </React.Suspense>} />

            <Route path='/Services/AirFreight' element={<React.Suspense fallback={<AuthLoader/>}>
               <AirFreight />
            </React.Suspense>} />

            

            <Route path='/Services/Procurement' element={<React.Suspense fallback={<AuthLoader/>}>
               <Procurement />
            </React.Suspense>} />

            <Route path='/Services/Marketing' element={<React.Suspense fallback={<AuthLoader/>}>
               <ThirdPartyMarketing />
            </React.Suspense>} />

            
            <Route path='/Services/SeaFreight' element={<React.Suspense fallback={<AuthLoader/>}>
               <SeaFreight />
            </React.Suspense>} />

            <Route path='/Contact_us' element={<React.Suspense fallback={<AuthLoader/>}>
               <Contact />
            </React.Suspense>} />

            <Route path='/More/Gallery' element={<React.Suspense fallback={<AuthLoader/>}>
               <GalleryPage/>
            </React.Suspense>} />

            <Route path='/More/Privacy_&_Policy' element={<React.Suspense fallback={<AuthLoader/>}>
               <PrivacyPolicyPage />
            </React.Suspense>} />

            <Route path='/About_us' element={<React.Suspense fallback={<AuthLoader/>}>
               <About />
            </React.Suspense>} />

          <Route path='/SignUp' element={<React.Suspense fallback={<AuthLoader/>}>
          <SignUp/>
          </React.Suspense>}  />
          <Route path='/Login' element={<React.Suspense fallback={<AuthLoader/>}>
            <Login/>
          </React.Suspense>} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/UpdatePassword/:id" element={<UpdatePassword/>} />
         
          
          <Route path='*' element={<PageNotFound/>} />
         </Routes>
         <Footer />
    </div>
  )
}

export default General