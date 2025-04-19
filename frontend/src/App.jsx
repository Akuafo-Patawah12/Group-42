
import React,{lazy,useState,useRef,useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css';


import LayoutBundle from './RoutesBundle/LayoutBundle';
import CustomersLayout from './RoutesBundle/CustomersLayout';

import PageNotFound from './Routes/PageNotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import General from './RoutesBundle/General';




function App() {

  

        

       
        
        
  return (
    <div className="App">
          <ToastContainer position="top-right" autoClose={3000} />
   
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