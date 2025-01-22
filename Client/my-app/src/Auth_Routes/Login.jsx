import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios'
import WarningIcon from '../icons/Warning_icon'
import ButtonLoader from '../icons/ButtonLoader';

const Login = () => {
    axios.defaults.withCredentials = true;   //this allow us to send token safely to the browser's cookies
    const [formData,setFormData]= useState({
        email:"",
        password:"",
        rememberMe:false
       });
       const[loader,setLoader] =useState(false)
    const[validation,seValidation] =useState("")
       const navigate= useNavigate()
       const handSubmit = async(e)=>{
        e.preventDefault();
        
        try{
            setLoader(true)  //display button loader after clicking login button to submit form
          await axios.post("http://localhost:5000/Login",{formData})   //making an API request from web server
          .then(res=>{

            
            switch (res.data.message) {
                case "Logged in as a company":
                    // Store the access token in local storage
                    localStorage.setItem('accesstoken', res.data.accessToken);  /*receiving access token from server and 
                    storing token into browsers local storage*/
            
                    // Show success message with SweetAlert2
                    Swal.fire({
                        title: "Logged in successful as Business account",
                        icon: "success",
                        timer: 2000     //close popup alert after 2 seconds
                    });
                    
            
                    // Clear validation message
                    seValidation("");
                    setLoader(false)  //After the API succeeds hidden login button loader
            
                    // Navigate to the Trends page
                    navigate('/L/Dashboard');//Navigate to this /Trends path after login succeeds
                    break;
            
                case "Logged in as an individual":
                    // Show success message with SweetAlert2
                    localStorage.setItem('accesstoken', res.data.accessToken);
                    Swal.fire({
                        title: "Logged in successful as an Individual",
                        icon: "success",
                        timer: 2000
                    });
            
                    // Clear validation message
                    seValidation(""); 
                    setLoader(false)  //hidden button loader
                    // Navigate to the Trends page
                    navigate('/Customer/Overview');
                    break;
            
                default:
                      console.log("Oops,something when wrong")
                    break;
            }
            
        })
          .catch(err=>{
            switch (err.response.status) {
                case 429:
                    seValidation("Too many attempts");
                    setLoader(false);
                    console.error('Response error:', err.response.data);
                    break;
                    
                case 404:
                    seValidation("Email does not exist");
                    setLoader(false);
                    console.log('Email not found:', err.response.data);
                    break;
            
                case 401:
                    seValidation("Invalid credentials");
                    setLoader(false);
                    console.log('Invalid credentials:', err.response.data);
                    break;
            
                case 500:
                    seValidation("Server error");
                    setLoader(false);
                    console.log('Server error:', err.response.data);
                    break;
            
                default:
                    break;
            }
            
        })
    }catch(e){
        Swal.fire({
            title:"Oops,system down",
            icon:"error"
         }); 
        console.log(e)
       } 
    }
    const[togglePassword,setTogglePassword]= useState(false)
    function pass_to_text(){
         setTogglePassword(!togglePassword)
    }

    
  return (
    
        <div className='flex justify-center mt-[40px] w-full items-center h-screen bg-gray-100 '>

            <section className=' relative border-[1px]  w-full  overflow-hidden bg-white border-stone-300 shadow-2xl flex items-center flex-col h-full lg:flex-row gap-2 '>
                
                <div className='w-full  h-[130px]  lg:h-full overflow-hidden'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>

                <form onSubmit={handSubmit} className="w-[40%] border-l-2 border-r-2 border-stone-300 items-center absolute h-full bg-white top-0 right-[5%] z-2">
                    <div className=' flex flex-col gap-4 '>
                        <h4 className='mx-auto mt-10 text-sm font-medium'>SCM SOLUTIONS.</h4>
                        <div className='font-bold  text-gray-600 w-[73%] mx-auto'>Welcome to our supply chain solutions.</div>
                    
                    

                    <input type='email'
                        placeholder='Enter email' 
                        className='border-2 border-gray-400 rounded-md px-2 py-6 text-lg w-[73%] mx-auto h-[35px]'
                        onChange={(e)=>setFormData({...formData,email: e.target.value})} 
                        required={true}
                        ></input>
                    
                  
                    <div className='relative mx-auto w-[73%]'>   
                                        <input type={togglePassword? 'text':'password'}  
                                            placeholder='Password' 
                                            className='border-2 border-gray-400 rounded-md px-2 py-6 text-lg w-full  h-[35px]'
                                            onChange={(e)=>setFormData({...formData,password: e.target.value})}
                                            required={true} 
                                            ></input>
                                            <div className='absolute right-2 top-[6px]' onClick={pass_to_text}>{togglePassword? <EyeInvisibleOutlined /> : <EyeOutlined />}</div>
                                            </div>

             <div className='flex w-[78%] text-md font-small  text-red-400 items-center mx-auto'>
                    {validation==="" ?"":<WarningIcon size={18}/>} {validation} 
             </div>

                <div className='flex mx-auto w-[73%] justify-between items-center'>
                    <section className='flex items-center'>
                        <input type='checkbox'
                           checked={formData.rememberMe}
                           onChange={(e) => setFormData({...formData,rememberMe:e.target.checked})}
                        />
                        <label className='font-medium text-sm'>Stay logged in</label>
                    </section>
                        <Link to={"/forgetPassword"} className='text-blue-500 font-medium text-sm'>Forget Password?</Link>
                </div>
                                   {/*if the button loader is visible the login button will be disabled */}
                <button type='submit' disabled={loader? true: false} className="h-[35px] flex py-6 text-lg justify-center items-center gap-2 bg-[var(--purple)] w-[73%] rounded-md text-white font-medium mx-auto"><p>Login</p>{loader? <ButtonLoader/>:""}</button>
                    
                    
                    <div className='w-[78%] mx-auto'><Link to={"/SignUp"} className='text-blue-500 font-medium hover:underline decoration-2 active:underline '>Create Account</Link> instead.</div>
                </div>
            </form>
            </section>
        </div>
    
  )
}

export default Login

