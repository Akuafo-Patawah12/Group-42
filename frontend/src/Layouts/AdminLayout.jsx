
import { Route, Routes,useLocation } from 'react-router-dom'

import React,{lazy, Suspense,useState} from "react"


import Loading from '../icons/Loading'
import {AnimatePresence} from "framer-motion"
import Header from '../Components/HeaderAndSidebar';
import Notification from "../Components/Notification"
import Sidebar from '../Components/Sidebar';
const Clients= lazy(()=> import('../Pages/Admin/Clients'));
const ViewIndividualOrder= lazy(()=>import( '../Pages/ViewIndividualOrder'))
import AdminMobileSidebar from "../Components/AdminMobileSidebar"

const Settings= lazy(()=>import('../Pages/Settings'));
const Dashboard= lazy(()=> import('../Pages/Dashboard'));
const Shipments= lazy(()=> import('../Pages/Admin/Shipments')) 
 
const ContainerPage= lazy(()=> import('../Pages/Admin/ContainerPage')) 
const Shipment= lazy(()=>import('../Pages/Shipment'))  

const Notify = lazy(()=> import("../Pages/Notification"))



const LayoutBundle = () => {
  const location= useLocation()
  const [open, setOpen] = useState(false);

    const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
    const toggleDrawer = () => setOpenMobileSidebar(!open);
  
  return (
    <div style={{backgroundColor: "#f5f5f4"}} >
      <Header open={open} setOpen={setOpen} toggleDrawer={toggleDrawer}/>
      <Sidebar />
      <AdminMobileSidebar toggle={[openMobileSidebar, setOpenMobileSidebar]}/>
      <Notification open={open} setOpen={setOpen}/>
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>
      
             <Route path='/Notification' element={<Suspense fallback={<Loading />}>
                  <Notify /> 
             </Suspense>} />
             <Route path='/containers' element={<Suspense fallback={<Loading />}>
                  <ContainerPage /> 
             </Suspense>} />
             
             <Route path='/Shipment' element={<Suspense fallback={<Loading />}>
                  <Shipment />
             </Suspense>} />
             <Route path='/Shipments/View_Shipments/:id' element={<Suspense fallback={<Loading />}>
                  <ViewIndividualOrder />
             </Suspense>} />
             <Route path='/Shipments' element={<Suspense fallback={<Loading />}>
                  <Shipments/>
             </Suspense>} />
             
             <Route path='/Dashboard' element={<Suspense fallback={<Loading />}>
                  <Dashboard />
             </Suspense>} />

             <Route path='/Users' element={<Suspense fallback={<Loading />}>
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