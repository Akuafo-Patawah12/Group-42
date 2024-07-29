import logo from './logo.svg';
import React,{lazy} from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css';

import ForgetPassword from './Auth_Routes/UpdatePassword'
import UpdatePassword from './Auth_Routes/UpdatePassword'
import Loading from "./icons/Loading"
import LayoutBundle from './RoutesBundle/LayoutBundle';
const LandingPage= lazy(()=> import("./Auth_Routes/LandingPage"))
const Login= lazy(()=> import('./Auth_Routes/Login'))
const SignUp= lazy(()=> import('./Auth_Routes/SignUp'))



function App() {
  return (
    <div className="App">
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
          <Route path="/UpdatePassword/:id" element={<UpdatePassword/>} />
          <Route path="/*" element={<LayoutBundle/>} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
         </Routes>
    </div>
  );
}

export default App;
