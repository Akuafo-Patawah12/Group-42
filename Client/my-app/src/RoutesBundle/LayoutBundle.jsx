
import { Route, Routes } from 'react-router-dom'
import ForgetPassword from '../Auth_Routes/ForgetPassword'
import React,{lazy} from "react"
const LandingPage= lazy(()=> import("../Auth_Routes/LandingPage"))
const Login= lazy(()=> import('../Auth_Routes/Login'))
const SignUp= lazy(()=> import('../Auth_Routes/SignUp'))

const LazyTrends= lazy(() => import('../Routes/Trends'));

const LayoutBundle = () => {
  
  
  return (
    <div>
      
      <Routes>
      
          <Route path='/' element={<React.Suspense fallback={"Loading"}>
               <LandingPage/>
            </React.Suspense>} />
          <Route path='/SignUp' element={<React.Suspense fallback={"Loading"}>
          <SignUp/>
          </React.Suspense>}  />
          <Route path='/Login' element={<React.Suspense fallback={"Loading"}>
            <Login/>
          </React.Suspense>} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path='/Trends' element={<LazyTrends />} />
          
        
      </Routes>
        
    </div>
  )
}

export default LayoutBundle