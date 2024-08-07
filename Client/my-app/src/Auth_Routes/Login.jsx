import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios'
import WarningIcon from '../icons/Warning_icon'
import ButtonLoader from '../icons/ButtonLoader';

const Login = () => {
    axios.defaults.withCredentials = true;   //this allow us to send token safely to the browser's cookies
    const [formData,setFormData]= useState({
        email:"",
        password:"",
       });
       const[loader,setLoader] =useState(false)
    const[validation,seValidation] =useState("")
       const navigate= useNavigate()
       const handSubmit = async(e)=>{
        e.preventDefault();
        
        try{
            setLoader(true)  //display button loader after clicking login button to submit form
          await axios.post("http://localhost:5000/login",{formData})   //making an API request from web server
          .then(res=>{
            switch (res.data.message) {
                case "Logged in as a company":
                    // Store the access token in local storage
                    localStorage.setItem('accesstoken', res.data.accessToken);  /*receiving access token from server and 
                    storing token into browsers local storage*/
            
                    // Show success message with SweetAlert2
                    Swal.fire({
                        title: "Logged in successful",
                        icon: "success",
                        timer: 2000     //close popup alert after 2 seconds
                    });
            
                    // Clear validation message
                    seValidation("");
                    setLoader(false)  //After the API succeeds hidden login button loader
            
                    // Navigate to the Trends page
                    navigate('/Trends');//Navigate to this /Trends path after login succeeds
                    break;
            
                case "Logged in as an individual":
                    // Show success message with SweetAlert2
                    Swal.fire({
                        title: "Logged in successful",
                        icon: "success",
                        timer: 2000
                    });
            
                    // Clear validation message
                    seValidation("");
                    setLoader(false)  //hidden button loader
                    // Navigate to the Trends page
                    navigate('/Trends');
                    break;
            
                case "invalid password":
                    // Set validation message for invalid password
                    seValidation("Invalid password");
                    setLoader(false)
                    break;
            
                case "invalid email":
                    // Set validation message for invalid email
                    seValidation("Invalid email");
                    setLoader(false)
                    break;
            
                default:
                    
                    break;
            }
            
        })
          .catch(err=>{
            
            seValidation("Server Error")
            setLoader(false)
            console.log(err)
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
    
        <div className='flex justify-center items-center h-screen bg-gray-100'>

            <section className='border-[1px]  bg-white border-stone-300 shadow-2xl flex items-center flex-col h-[480px] lg:flex-row gap-2 h-[420px]'>
                
                <div className='w-[220px]  h-[130px]  lg:h-full'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>

                <form onSubmit={handSubmit}>
                    <div className=' flex  flex-col gap-2 w-[300px]'>
                        <h4 className='mx-auto text-sm font-medium'>SCM SOLUTIONS.</h4>
                        <div className='font-bold text-gray-600 w-[78%] mx-auto'>Welcome to our supply chain solutions.</div>
                    
                        <input type='email'
                        placeholder='Enter email' 
                        className='border-2 border-gray-400 rounded-md w-[78%] mx-auto h-[40px]'
                        onChange={(e)=>setFormData({...formData,email: e.target.value})} 
                        required={true}
                        ></input>
                    
                   <div className='relative mx-auto w-[78%]'>
                    <input type={togglePassword? 'text':'password'} 
                        placeholder='Password' 
                        className='border-2 border-gray-400 rounded-md w-full  h-[40px]'
                        onChange={(e)=>setFormData({...formData,password: e.target.value})}
                        required={true} 
                        ></input>
                     <div className='absolute right-3 top-2' onClick={pass_to_text}>{togglePassword? <EyeInvisibleOutlined /> : <EyeOutlined />}</div>
                    </div>

             <div className='flex w-[78%] text-md font-small  text-red-400 items-center mx-auto'>
                    {validation==="" ?"":<WarningIcon size={18}/>} {validation} 
             </div>

                <div className='flex mx-auto w-[78%] justify-between items-center'>
                    <section className='flex items-center'>
                        <input type='checkbox' />
                        <label className='font-medium text-sm'>Stay logged in</label>
                    </section>
                        <Link to={"/forgetPassword"} className='text-blue-500 font-medium text-sm'>Forget Password?</Link>
                </div>
                                   {/*if the button loader is visible the login button will be disabled */}
                <button type='submit' disabled={loader? true: false} className="h-[40px] flex justify-center items-center rounded-md text-white gap-2 font-medium bg-green-400 w-[78%] mx-auto "><p>Login</p>{loader? <ButtonLoader/>:""}</button>
                    
                    
                    <div className='w-[78%] mx-auto'><Link to={"/SignUp"} className='text-blue-500 font-medium hover:underline decoration-2 active:underline decoration-2'>Create Account</Link> instead.</div>
                </div>
            </form>
            </section>
        </div>
    
  )
}

export default Login