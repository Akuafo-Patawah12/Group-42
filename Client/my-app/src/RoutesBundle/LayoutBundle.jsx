
import { Route, Routes } from 'react-router-dom'

import React,{lazy, Suspense} from "react"


import Loading from '../icons/Loading'
import Header, { Sidebar } from '../Routes/HeaderAndSidebar';
const Sourcing= lazy(()=>import('../Pages/Sourcing')) 
const Settings= lazy(()=>import('../Pages/Settings'));
const Dashboard= lazy(()=> import('../Pages/Dashboard'));
const Warehousing= lazy(()=>import('../Pages/Warehousing'));
const Logistics= lazy(()=> import('../Pages/Logistics')) 
const Inventory= lazy(()=>import('../Pages/Inventory'))  
const LazyTrends= lazy(()=> import("../Routes/Trends"))
const Notify = lazy(()=> import("../Routes/Notification"))



const LayoutBundle = () => {
  
  
  return (
    <div >
      <Header />
      <Sidebar />
      <Routes>
      
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
        
    </div>
  )
}

export default LayoutBundle