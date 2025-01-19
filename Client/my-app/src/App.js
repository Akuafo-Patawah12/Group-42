
import React,{lazy,useState,useRef,useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css';


import LayoutBundle from './RoutesBundle/LayoutBundle';
import CustomersLayout from './RoutesBundle/CustomersLayout';

import PageNotFound from './Routes/PageNotFound';

import Footer from './Components/Footer';

import General from './RoutesBundle/General';




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
        
        const[popUp2,setPopUp2]= useState(false)
        function pop2(){
        
        setPopUp2(prev => !prev)
        }
  return (
    <div className="App">
   
         <Routes>
        

            

            
          <Route path="/*" element={<General/>} /> 
          <Route path="/L/*" element={<LayoutBundle/>} />
          <Route path="/Customer/*" element={<CustomersLayout/>} />
          <Route path='*' element={<PageNotFound/>} />
         </Routes>
         
    </div>
  );
}

export default App;
