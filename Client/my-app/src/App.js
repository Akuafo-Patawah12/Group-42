
import React,{lazy,useState,useRef,useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css';

import ForgetPassword from './Auth_Routes/ForgetPassword'
import UpdatePassword from './Auth_Routes/UpdatePassword'
import LayoutBundle from './RoutesBundle/LayoutBundle';
import CustomersLayout from './RoutesBundle/CustomersLayout';
import AuthLoader from './icons/AuthLoader';
import PageNotFound from './Routes/PageNotFound';
import Header from './Components/Header';
import Footer from './Components/Footer';
import TrackShipmentPopup from './Components/TrackShipmentPopup';
const GalleryPage= lazy(()=> import('./Pages/Gallery'));
const PrivacyPolicyPage= lazy(()=> import('./Pages/Privacy'));
const FAQPage = lazy(()=> import("./Pages/FAQs"));
const About= lazy(()=> import( './Pages/About'));
const Contact= lazy(()=> import('./Pages/Contact'));
const Services= lazy(()=> import('./Pages/Services'));
const LandingPage= lazy(()=> import("./Auth_Routes/LandingPage"))
const Login= lazy(()=> import('./Auth_Routes/Login'))
const SignUp= lazy(()=> import('./Auth_Routes/SignUp'))



function App() {

  
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
  return (
    <div className="App">
    <Header popDetails={[pop1,popUp1,setPopUp1]} rotate={[isRotate,setIsRotate]} setIsOpen={setIsOpen}/>
    <TrackShipmentPopup open={[setIsOpen,isOpen]} trackRef={trackRef}/>
         <Routes>
         <Route path='/' element={<React.Suspense fallback={<AuthLoader/>}>
               <LandingPage/>
            </React.Suspense>} />

            <Route path='/More/FAQs' element={<React.Suspense fallback={<AuthLoader/>}>
               <FAQPage/>
            </React.Suspense>} />

            <Route path='/Services' element={<React.Suspense fallback={<AuthLoader/>}>
               <Services />
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
          <Route path="/*" element={<LayoutBundle/>} />
          <Route path="/Customer/*" element={<CustomersLayout/>} />
          
          <Route path='*' element={<PageNotFound/>} />
         </Routes>
         <Footer />
    </div>
  );
}

export default App;
