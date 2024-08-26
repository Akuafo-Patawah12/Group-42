import React,{lazy,Suspense} from 'react'
import Header from '../Components/HeaderAndSidebar';

import CustomerSidebar from '../Components/CustomerSidebar';
import { Routes,Route } from 'react-router-dom';
import Loading from "../icons/Loading"
const Tracking= lazy(()=>import('../Pages/Tracking'))
 
 

const CustomersLayout=()=>{
    return(
        <div>  
            <Header/>
            <CustomerSidebar />
            <Routes>
             <Route path='/Tracking' element={<Suspense fallback={<Loading />}>
                  <Tracking />
             </Suspense>} />
             
             
             </Routes>
             
            
        </div>
    )
}
export default CustomersLayout;