import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Login = () => {
    const [formData,setFormData]= useState({
        email:"",
        password:"",
       });

       const navigate= useNavigate()
       const handSubmit = async(e)=>{
        e.preventDefault();
        try{
          await axios.post("http://localhost:4000/login",{formData})
          .then(res=>{
            switch (res.data){
                case "Logged in as a company":
                navigate('/Login');
                Swal.fire({
                    title:"Logged in successful",
                    icon:"success"
                });
                break;
                case "Logged in an individual":
                  navigate('/Login');
                  Swal.fire({
                    title:"Logged in successful",
                    icon:"success"
                });
                  break;
                case "invalid password":
                alert('Invalid password ');
                break; 
                default:
                  break;
            } 
        })
          .catch(err=>{
            alert("invalid email")
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
                        className='border-2 border-gray-400 rounded-sm w-[78%] mx-auto h-[40px]'
                        onChange={(e)=>setFormData({...formData,email: e.target.value})} 
                        ></input>
                    
    
                    <input type='password' 
                        placeholder='Password' 
                        className='border-2 border-gray-400 rounded-sm w-[78%] mx-auto h-[40px]'
                        onChange={(e)=>setFormData({...formData,password: e.target.value})} 
                        ></input>
                    <div className='flex w-[78%] justify-between mx-auto'>
                          
                    </div>
                    <div className='flex mx-auto w-[78%] justify-between items-center'>
                    <section className='flex items-center'>
                        <input type='checkbox' />
                        <label className='font-medium text-sm'>Stay logged in</label>
                    </section>
                        <a className='text-blue-500 font-medium text-sm'>Forget Password?</a>
                    </div>
                    
                    <input type='button' value={"Login"} className="h-[40px] text-white font-medium bg-green-400 w-[78%] mx-auto "></input>
                    
                    
                    <div className='w-[78%] mx-auto'><Link to={"/SignUp"} className='text-blue-500 font-medium hover:underline decoration-2'>Create Account</Link> instead.</div>
                    </div>
                </form>
            </section>
        </div>
    </div>
  )
}

export default Login