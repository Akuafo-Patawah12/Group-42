import React,{lazy,Suspense,useState} from 'react'
import Header from '../Components/HeaderAndSidebar';
import Loading from "../icons/Loading"
import CustomerSidebar from '../Components/CustomerSidebar';
import Notification from "../Components/Notification"
import { Routes,Route } from 'react-router-dom';
import UserProfile from '../Pages/UserProfile';
import CustomerMobileSidebar from '../Components/CustomerMobileSidebar';


const Overview= lazy(()=> import("../Pages/Overview"))
const Invoice= lazy(()=> import("../Pages/Invoice"))
const Settings= lazy(()=>import('../Pages/Settings'))
const Tracking= lazy(()=>import('../Pages/Tracking'))
const ItemList = lazy(()=>import("../Pages/ItemList"))
const ProductList= lazy(()=> import ("../Pages/MarketPlaces/PoductList"))
 
 

const CustomersLayout=()=>{
     const [open, setOpen] = useState(false);
      const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
          const toggleDrawer = () => setOpenMobileSidebar(!open);
    return(
        <div style={{backgroundColor: "#f5f5f4"}} className="bg-stone-100 h-full">  
            <Header open={open} setOpen={setOpen} toggleDrawer={toggleDrawer}/>
            <CustomerSidebar />
              
                  
                  <CustomerMobileSidebar toggle={[openMobileSidebar, setOpenMobileSidebar]}/>
            <Notification open={open} setOpen={setOpen}/>
            <Routes>
             <Route path='/Tracking' element={<Suspense fallback={<Loading />}>
                  <Tracking />
             </Suspense>} />

             <Route path='/MarketPlace' element={<Suspense fallback={<Loading />}>
             <ProductList />
             </Suspense>} />

             <Route path='/MarketPlace/product_list' element={<Suspense fallback={<Loading />}>
             <ItemList/>
             </Suspense>} />

          <Route path="/Profile" element={<Suspense fallback={<Loading />}>
                  <UserProfile />
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