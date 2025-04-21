import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Form, Input, Button, Radio, Typography,message } from 'antd';


import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import Warning_icon from '../icons/Warning_icon'
import ButtonLoader from '../icons/ButtonLoader';

const SignUp = () => {
    const [formData,setFormData]= useState({
        username:"",
        email:"",
        account_type:"Personal",
        password:"",
       });

     const navigate= useNavigate()
     const[loader,setLoader] =useState(false)
       const[validation,setValidation] =useState("")
       const handSubmit = async()=>{
        
        try{
            setLoader(true)
          await axios.post("http://localhost:4000/SignUp",{formData})
          .then(res=>{
            if(res.data.message==="exist") {
                setValidation("Email already exist") 
                setLoader(false)
            }else{
                setValidation("")
                message.success(
                    "Sign up successfully",
                   );
                 setLoader(false)
                navigate('/Login');
            }
        })
          .catch(err=>{
            setLoader(false)
            message.error(
               "Oops,system down",
                ); 
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
    
        <div className='flex  justify-center items-center h-[110vh] bg-gray-100 '>
            <section className='relative border-[1px]  w-full  overflow-hidden bg-white border-stone-300 shadow-2xl flex items-center flex-col h-full lg:flex-row gap-2 '>
            <div className='w-full   h-full  lg:overflow-hidden'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>
                <Form
  onFinish={handSubmit}
  className="form w-[95%] border-l-2 border-r-2 border-stone-300 items-center justify-center absolute h-full pt-6 bg-white z-2 lg:w-[40%] top-0 right-[5%]"
>
<div className="flex flex-col gap-4 mt-5 items-center" style={{marginTop:"30px"}}>
<div className="w-[80px] h-[80px]  border-2 border-purple-500 overflow-hidden p-3 mx-auto mt-7 rounded-full"><img src="../images/sfgl_logo.jpg" alt="logo" /></div>
    <Typography.Title level={5} className="mx-auto mt-5 !mb-0">
      SF Ghana Logistics.
    </Typography.Title>

    <Typography.Text className="font-bold text-gray-600 w-[73%] mx-auto text-center">
      Welcome to our supply chain solutions.
    </Typography.Text>

    {/* Company or Individual Name */}
    <Form.Item
      name="username"
      rules={[{ required: true, message: 'Please enter your name!' }]}
      className="w-[73%] mx-auto"
    >
      <Input
        placeholder="Company or Individual Name"
        className="h-[35px]"
        onChange={(e) =>
          setFormData({ ...formData, username: e.target.value })
        }
      />
    </Form.Item>

    {/* Email */}
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please enter your email!' }]}
      className="w-[73%] mx-auto"
    >
      <Input
        type="email"
        placeholder="Enter email"
        className="h-[35px]"
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
    </Form.Item>

    {/* Password */}
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please enter your password!' }]}
      className="w-[73%] mx-auto"
    >
      <Input.Password
        placeholder="Password"
        className="h-[35px]"
        iconRender={(visible) =>
          visible ? <EyeInvisibleOutlined /> : <EyeOutlined />
        }
        visibilityToggle={{
          visible: togglePassword,
          onVisibleChange: pass_to_text,
        }}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />
    </Form.Item>

    {/* Validation Message */}
    <div className="flex w-[73%] text-md font-small text-red-400 items-center mx-auto">
      {validation === '' ? '' : <Warning_icon size={18} />} {validation}
    </div>

  

    {/* Submit Button */}
    <Form.Item className="w-[73%] mx-auto">
      <Button
        type="primary"
        htmlType="submit"
        disabled={loader}
        loading={loader}
        className="h-[35px] w-full bg-[var(--purple)] hover:bg-purple-300 transition duration-300 ease-in-out"
        style={{background:"var(--purple)"}}
      >
        Sign Up
      </Button>
    </Form.Item>

    {/* Already have an account? */}
    <div className="w-[73%] mx-auto text-center">
      Already signed up?{' '}
      <Link
        to="/Login"
        className="text-blue-500 font-medium hover:underline decoration-2"
      >
        Login
      </Link>
    </div>
  </div>
  
</Form>

            </section>
        </div>
    
  )
}
export default SignUp;