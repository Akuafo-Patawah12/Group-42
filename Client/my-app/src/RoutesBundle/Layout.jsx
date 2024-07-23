import React,{useEffect,lazy} from 'react'
import LandingPage from "../Auth_Routes/LandingPage"
import { Route, Routes } from 'react-router-dom'
import SignUp from '../Auth_Routes/SignUp'
import Login from '../Auth_Routes/Login'
import ForgetPassword from '../Auth_Routes/ForgetPassword'

const LazyTrends= lazy(() => import('../Routes/Trends'));

const Layout = () => {
  
  
  return (
    <div>
      
      <Routes>
      
          <Route path='/' element={<LandingPage/>} />
          <Route path='/SignUp' element={<SignUp/>}  />
          <Route path='/Login' element={<Login/>} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path='/Trends' element={<LazyTrends />} />
          
        
      </Routes>
        
    </div>
  )
}

export default Layout