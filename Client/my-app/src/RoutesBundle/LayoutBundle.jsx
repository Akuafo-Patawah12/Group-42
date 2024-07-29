
import { Route, Routes } from 'react-router-dom'

import React,{lazy, Suspense} from "react"
import PageNotFound from '../Routes/PageNotFound'

import Loading from '../icons/Loading'
import Header, { Sidebar } from '../Routes/HeaderAndSidebar';
const LazyTrends= lazy(()=> import("../Routes/Trends"))
const Notify = lazy(()=> import("../Routes/Notification"))



const LayoutBundle = () => {
  
  
  return (
    <div>
      <Header />
      <Sidebar />
      <Routes>
      <Route path='*' element={<PageNotFound/>} />
             <Route path='/Trends' element={<Suspense fallback={<Loading />}>
             <LazyTrends />
             </Suspense>}/>
             <Route path='/Notification' element={<Suspense fallback={<Loading />}>
                  <Notify /> 
             </Suspense>} />
      </Routes>
        
    </div>
  )
}

export default LayoutBundle