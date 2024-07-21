import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import Swal from "sweetalert2"

const SignUp = () => {
    const [formData,setFormData]= useState({
        username:"",
        email:"",
        account_type:"",
        password:"",
       });

     const navigate= useNavigate()
     
       const handSubmit = async(e)=>{
        e.preventDefault();
        try{
          await axios.post("http://localhost:4000/SignUp",{formData})
          .then(res=>{
            if(res.data.message==="exist") {
                Swal.fire({
                    title:"User already exist",
                    icon:"warning"
                 }); 
            }else{
                 Swal.fire({
                    title:"Sign up successfully",
                    icon:"success"
                 });
                navigate('/Login');
            }
        })
          .catch(err=>{
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
  return (
    <div>
        <div className='flex justify-center items-center h-screen bg-gray-100 '>
            <section className='border-[1px]  bg-white border-stone-300 shadow-2xl flex items-center flex-col h-[480px] lg:flex-row gap-2 h-[420px]'>
                <div className='w-[220px]  h-[60px]  lg:h-full'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>
                <form onSubmit={handSubmit}>
                    <div className=' flex flex-col gap-2 w-[300px]'>
                        <h4 className='mx-auto text-sm font-medium'>SCM SOLUTIONS.</h4>
                        <div className='font-bold text-gray-600 w-[73%] mx-auto'>Welcome to our supply chain solutions.</div>
                    
                    <input type='text' 
                        placeholder='Company or Individual Name' 
                        className='border-[1px] border-stone-400 rounded-sm w-[73%] mx-auto h-[35px]'
                        onChange={(e)=>setFormData({...formData,username: e.target.value})} 
                        ></input>
                    

                    <input type='email'
                        placeholder='Enter email' 
                        className='border-2 border-gray-400 rounded-sm w-[73%] mx-auto h-[35px]'
                        onChange={(e)=>setFormData({...formData,email: e.target.value})} 
                        ></input>
                        
                    <input type='password' 
                        placeholder='Password' 
                        className='border-2 border-gray-400 rounded-sm w-[73%] mx-auto h-[35px]'
                        onChange={(e)=>setFormData({...formData,password: e.target.value})} 
                        ></input>
                    <div className='flex w-[73%] justify-between mx-auto'>
                        <section className="h-[35px] w-[47%] flex gap-1 pl-1 items-center border-2 border-gray-400 rounded-sm ">
                        <input type='radio' 
                            name='select' 
                            id="Personal" 
                            onChange={()=>setFormData({...formData,account_type:"Personal"})} 
                        ></input>
                        <label for="Personal" className='font-medium text-gray-600'>Personal</label>
                        </section>
                        <section className="h-[35px] w-[47%] flex gap-1 pl-1 items-center border-2 border-gray-400 rounded-sm ">
                        <input type='radio' 
                            name='select' 
                            id="Bus" 
                            onChange={()=>setFormData({...formData,auth:"Business"})} 
                        ></input>
                        <label for="Bus" className='font-medium text-gray-600'>Business</label>
                        </section>
                       
                    </div>
                    <input type='submit' value={"Sign Up"} className="h-[35px] bg-green-400 w-[73%] text-white font-medium mx-auto"></input>
                    <div className='w-[73%] mx-auto'>Already signed up? <Link to={"/Login"} className='text-blue-500 font-medium hover:underline decoration-2'>Login</Link></div>
                    </div>
                </form>
            </section>
        </div>
    </div>
  )
}
export default SignUp;