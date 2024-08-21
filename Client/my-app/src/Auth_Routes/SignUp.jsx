import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import Swal from "sweetalert2"
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import Warning_icon from '../icons/Warning_icon'
import ButtonLoader from '../icons/ButtonLoader';

const SignUp = () => {
    const [formData,setFormData]= useState({
        username:"",
        email:"",
        account_type:"",
        password:"",
       });

     const navigate= useNavigate()
     const[loader,setLoader] =useState(false)
       const[validation,setValidation] =useState("")
       const handSubmit = async(e)=>{
        e.preventDefault();
        try{
            setLoader(true)
          await axios.post("http://localhost:5000/SignUp",{formData})
          .then(res=>{
            if(res.data.message==="exist") {
                setValidation("Email already exist") 
                setLoader(false)
            }else{
                setValidation("")
                 Swal.fire({
                    title:"Sign up successfully",
                    icon:"success",
                    timer:2000
                 });
                 setLoader(false)
                navigate('/Login');
            }
        })
          .catch(err=>{
            setLoader(false)
            Swal.fire({
                title:"Oops,system down",
                icon:"error"
             }); 
            console.log(err)
        })
      }catch(e){
         console.log(e)
        } 
    }
    const[togglePassword,setTogglePassword]= useState(false)
    function pass_to_text(){
         setTogglePassword(!togglePassword)
    }
  return (
    <div>
        <div className='flex justify-center items-center h-screen bg-gray-100 '>
            <section className='border-[1px] rounded-xl bg-white border-stone-300 shadow-2xl flex items-center flex-col h-\[480px] lg:flex-row gap-2 h-[420px]'>
                <div className='w-[220px]  h-[60px]  lg:h-full'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>
                <form onSubmit={handSubmit}>
                    <div className=' flex flex-col gap-2 w-[300px]'>
                        <h4 className='mx-auto text-sm font-medium'>SCM SOLUTIONS.</h4>
                        <div className='font-bold text-gray-600 w-[73%] mx-auto'>Welcome to our supply chain solutions.</div>
                    
                    <input type='text' 
                        placeholder='Company or Individual Name' 
                        className='border-[1px] border-stone-400 rounded-md w-[73%] mx-auto h-[35px]'
                        onChange={(e)=>setFormData({...formData,username: e.target.value})} 
                        required={true}
                        ></input>
                    

                    <input type='email'
                        placeholder='Enter email' 
                        className='border-2 border-gray-400 rounded-md w-[73%] mx-auto h-[35px]'
                        onChange={(e)=>setFormData({...formData,email: e.target.value})} 
                        required={true}
                        ></input>
                     <div className='relative mx-auto w-[73%]'>   
                    <input type={togglePassword? 'text':'password'}  
                        placeholder='Password' 
                        className='border-2 border-gray-400 rounded-md w-full  h-[35px]'
                        onChange={(e)=>setFormData({...formData,password: e.target.value})}
                        required={true} 
                        ></input>
                        <div className='absolute right-2 top-[6px]' onClick={pass_to_text}>{togglePassword? <EyeInvisibleOutlined /> : <EyeOutlined />}</div>
                        </div>
                        <div className='flex w-[73%] text-md font-small text-red-400 items-center mx-auto'>
                         {validation==="" ?"":<Warning_icon size={18}/>} {validation} 
                    </div>
                    <div className='flex w-[73%] justify-between mx-auto'>
                        <section className="h-[35px] w-[47%] flex gap-1 pl-1 items-center border-2 border-gray-400 rounded-md ">
                        <input type='radio' 
                            name='select' 
                            id="Personal" 
                            onChange={()=>setFormData({...formData,account_type:"Personal"})}
                            
                        ></input>
                        <label htmlFor="Personal" className='font-medium text-gray-600'>Personal</label>
                        </section>
                        <section className="h-[35px] w-[47%] flex gap-1 pl-1 items-center border-2 border-gray-400 rounded-md ">
                        <input type='radio' 
                            name='select' 
                            id="Bus" 
                            onChange={()=>setFormData({...formData,account_type:"Business"})} 
                        ></input>
                        <label htmlFor='Bus' className='font-medium text-gray-600'>Business</label>
                        </section>
                       
                    </div>
                    <button type='submit' disabled={loader?true:false} className="h-[35px] flex justify-center items-center gap-2 bg-green-400 w-[73%] rounded-md text-white font-medium mx-auto"><p>Sign Up</p>{loader? <ButtonLoader/>:""}</button>
                    <div className='w-[73%] mx-auto'>Already signed up? <Link to={"/Login"} className='text-blue-500 font-medium hover:underline decoration-2'>Login</Link></div>
                    </div>
                </form>
            </section>
        </div>
    </div>
  )
}
export default SignUp;