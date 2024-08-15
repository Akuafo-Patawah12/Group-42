
import { Route, Routes,useLocation } from 'react-router-dom'

import React,{lazy, Suspense} from "react"


import Loading from '../icons/Loading'
import {AnimatePresence} from "framer-motion"
import Header, { Sidebar } from '../Components/HeaderAndSidebar';
const Sourcing= lazy(()=>import('../Pages/Sourcing')) 
const Settings= lazy(()=>import('../Pages/Settings'));
const Dashboard= lazy(()=> import('../Pages/Dashboard'));
const Warehousing= lazy(()=>import('../Pages/Warehousing'));
const Logistics= lazy(()=> import('../Pages/Logistics')) 
const Inventory= lazy(()=>import('../Pages/Inventory'))  
const LazyTrends= lazy(()=> import("../Routes/Trends"))
const Notify = lazy(()=> import("../Routes/Notification"))



const LayoutBundle = () => {
  const location= useLocation()
  
  return (
    <div >
      <Header />
      <Sidebar />
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>
      
             <Route path='/Trends' element={<Suspense fallback={<Loading />}>
             <LazyTrends />
             </Suspense>}/>
             <Route path='/Notification' element={<Suspense fallback={<Loading />}>
                  <Notify /> 
             </Suspense>} />
             <Route path='/Logistics' element={<Suspense fallback={<Loading />}>
                  <Logistics /> 
             </Suspense>} />
             
             <Route path='/Inventory' element={<Suspense fallback={<Loading />}>
                  <Inventory />
             </Suspense>} />
             <Route path='/Warehousing' element={<Suspense fallback={<Loading />}>
                  <Warehousing/>
             </Suspense>} />
             <Route path='/Dashboard' element={<Suspense fallback={<Loading />}>
                  <Dashboard />
             </Suspense>} />
             <Route path='/Sourcing' element={<Suspense fallback={<Loading />}>
                  <Sourcing />
             </Suspense>} />
             <Route path='/Settings' element={<Suspense fallback={<Loading />}>
                  <Settings />
             </Suspense>} />
      </Routes>
      </AnimatePresence> 
    </div>
  )
}

export default LayoutBundle