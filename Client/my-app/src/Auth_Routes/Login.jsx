import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios'
import Warning_icon from '../icons/Warning_icon'

const Login = () => {
    axios.defaults.withCredentials = true;
    const [formData,setFormData]= useState({
        email:"",
        password:"",
       });
    const[validation,seValidation] =useState("")
       const navigate= useNavigate()
       const handSubmit = async(e)=>{
        e.preventDefault();
        try{
          await axios.post("http://localhost:4000/login",{formData})
          .then(res=>{
            switch (res.data.message ){
                case "Logged in as a company":
                localStorage.setItem('accesstoken',res.data.accessToken)
                Swal.fire({
                    title:"Logged in successful",
                    icon:"success",
                    timer:2000
                });
                seValidation("")
                navigate('/Trends');
                break;
                case "Logged in as an individual":
                  localStorage.setItem('accesstoken',res.data.accessToken)
                  navigate('/Login');
                  Swal.fire({
                    title:"Logged in successful",
                    icon:"success",
                    timer:2000
                });
                seValidation("")
                navigate('/Trends');
                  break;
                case "invalid password":
                    seValidation("Invalid password")
                break; 
                default:
                  break;
            } 
        })
          .catch(err=>{
            seValidation("Invalid email address")
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
    <div>
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
                         {validation==="" ?"":<Warning_icon size={18}/>} {validation} 
                    </div>
                    <div className='flex mx-auto w-[78%] justify-between items-center'>
                    <section className='flex items-center'>
                        <input type='checkbox' />
                        <label className='font-medium text-sm'>Stay logged in</label>
                    </section>
                        <Link to={"/forgetPassword"} className='text-blue-500 font-medium text-sm'>Forget Password?</Link>
                    </div>
                    
                    <input type='submit' value={"Login"} className="h-[40px] rounded-md text-white font-medium bg-green-400 w-[78%] mx-auto "></input>
                    
                    
                    <div className='w-[78%] mx-auto'><Link to={"/SignUp"} className='text-blue-500 font-medium hover:underline decoration-2 active:underline decoration-2'>Create Account</Link> instead.</div>
                    </div>
                </form>
            </section>
        </div>
    </div>
  )
}

export default Login