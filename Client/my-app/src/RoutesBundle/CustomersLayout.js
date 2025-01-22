import React,{lazy,Suspense} from 'react'
import Header from '../Components/HeaderAndSidebar';
import Loading from "../icons/Loading"
import CustomerSidebar from '../Components/CustomerSidebar';
import { Routes,Route } from 'react-router-dom';
import AnalyticsPage from '../Pages/Analytics' ;

const Overview= lazy(()=> import("../Pages/Overview"))
const Invoice= lazy(()=> import("../Pages/Invoice"))
const Settings= lazy(()=>import('../Pages/Settings'))
const Tracking= lazy(()=>import('../Pages/Tracking'))
const ItemList = lazy(()=>import("../Pages/ItemList"))
const LazyTrends= lazy(()=> import ("../Routes/Trends"))
 
 

const CustomersLayout=()=>{
    return(
        <div className="bg-stone-100 h-full">  
            <Header/>
            <CustomerSidebar />
            <Routes>
             <Route path='/Tracking' element={<Suspense fallback={<Loading />}>
                  <Tracking />
             </Suspense>} />

             <Route path='/Trends' element={<Suspense fallback={<Loading />}>
             <LazyTrends />
             </Suspense>} />

             <Route path='/Trends/Items' element={<Suspense fallback={<Loading />}>
             <ItemList/>
             </Suspense>} />

             <Route path='/Analytics' element={
                  <AnalyticsPage/>}
             />
             
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