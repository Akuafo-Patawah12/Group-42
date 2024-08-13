import React,{lazy,Suspense} from 'react'
import Header from '../Components/HeaderAndSidebar';

import CustomerSidebar from '../Components/CustomerSidebar';
import { Routes,Route } from 'react-router-dom';
import Loading from "../icons/Loading"
const CustomerGoods= lazy(()=>import('../Pages/CustomerGood'))  
 

const CustomersLayout=()=>{
    return(
        <div>  
            <Header/>
            <CustomerSidebar />
            <Routes>
             <Route path='/Products' element={<Suspense fallback={<Loading />}>
                  <CustomerGoods />
             </Suspense>} />
             
             </Routes>
             
            
        </div>
    )
}
export default CustomersLayout;