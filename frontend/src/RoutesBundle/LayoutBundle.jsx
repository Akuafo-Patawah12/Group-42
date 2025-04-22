
import { Route, Routes,useLocation } from 'react-router-dom'

import React,{lazy, Suspense,useState} from "react"


import Loading from '../icons/Loading'
import {AnimatePresence} from "framer-motion"
import Header from '../Components/HeaderAndSidebar';
import Notification from "../Components/Notification"
import Sidebar from '../Components/Sidebar';
const Clients= lazy(()=> import('./../Pages/Clients'));
const ViewIndividualOrder= lazy(()=>import( '../Pages/ViewIndividualOrder'))


const Settings= lazy(()=>import('../Pages/Settings'));
const Dashboard= lazy(()=> import('./../Pages/Dashboard'));
const Orders= lazy(()=> import('../Pages/Orders')) 
 
const ContainerPage= lazy(()=> import('../Pages/ContainerPage')) 
const Shipment= lazy(()=>import('../Pages/Shipment'))  

const Notify = lazy(()=> import("../Routes/Notification"))



const LayoutBundle = () => {
  const location= useLocation()
  const [open, setOpen] = useState(false);
  
  return (
    <div style={{backgroundColor: "#f5f5f4"}}>
      <Header open={open} setOpen={setOpen}/>
      <Sidebar />
      <Notification open={open} setOpen={setOpen}/>
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>
      
             <Route path='/Notification' element={<Suspense fallback={<Loading />}>
                  <Notify /> 
             </Suspense>} />
             <Route path='/containers' element={<Suspense fallback={<Loading />}>
                  <ContainerPage /> 
             </Suspense>} />
             
             <Route path='/Shipments' element={<Suspense fallback={<Loading />}>
                  <Shipment />
             </Suspense>} />
             <Route path='/Orders/View_Order/:id' element={<Suspense fallback={<Loading />}>
                  <ViewIndividualOrder />
             </Suspense>} />
             <Route path='/Orders' element={<Suspense fallback={<Loading />}>
                  <Orders />
             </Suspense>} />
             
             <Route path='/Dashboard' element={<Suspense fallback={<Loading />}>
                  <Dashboard />
             </Suspense>} />

             <Route path='/Clients' element={<Suspense fallback={<Loading />}>
                  <Clients />
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