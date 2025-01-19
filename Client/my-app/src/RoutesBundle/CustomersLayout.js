import React,{lazy,Suspense} from 'react'
import Header from '../Components/HeaderAndSidebar';
import Loading from "../icons/Loading"
import CustomerSidebar from '../Components/CustomerSidebar';
import { Routes,Route } from 'react-router-dom';
const Overview= lazy(()=> import("../Pages/Overview"))
const Invoice= lazy(()=> import("../Pages/Invoice"))
const Settings= lazy(()=>import('../Pages/Settings'))
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
             
             <Route path='/Overview' element={<Suspense fallback={<Loading />}>
                  <Overview />
             </Suspense>} />

             <Route path='/Invoice' element={<Suspense fallback={<Loading />}>
                  <Invoice />
             </Suspense>} />

             <Route path='/Settings' element={<Suspense fallback={<Loading />}>
                  <Settings />
             </Suspense>} />
             
             </Routes>
             
            
        </div>
    )
}
export default CustomersLayout;