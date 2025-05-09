
import React,{lazy,useState,useRef,useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css';


import AdminLayout from './Layouts/AdminLayout';
import CustomersLayout from './Layouts/CustomersLayout';

import PageNotFound from './Routes/PageNotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import General from './Layouts/General';




function App() {

  

        

       
        
        
  return (
    <div className="App">
          <ToastContainer position="top-right" autoClose={3000} />
   
         <Routes>
        

            

            
          <Route path="/*" element={<General/>} /> 
          <Route path="/L/*" element={<AdminLayout/>} />
          <Route path="/Customer/*" element={<CustomersLayout/>} />
          <Route path='*' element={<PageNotFound/>} />
         </Routes>
         
    </div>
  );
}

export default App;