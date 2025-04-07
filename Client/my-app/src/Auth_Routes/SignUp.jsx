import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Form, Input, Button, Radio, Typography } from 'antd';


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
          await axios.post("http://localhost:4000/SignUp",{formData})
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
        <div className='flex  justify-center items-center h-screen bg-gray-100 '>
            <section className='relative w-full border-[1px] rounded-xl bg-white border-stone-300 shadow-2xl  h-full  '>
                <div className='w-full  h-full  lg:overflow-hidden'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>
                <Form
  onFinish={handSubmit}
  className="form w-[95%] border-l-2 border-r-2 border-stone-300 items-center absolute h-full bg-white   z-2 lg:w-[40%] top-0 right-[5%]"
>
  <div className="flex flex-col gap-4">
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

    {/* Account Type */}
    <Form.Item className="w-[73%] mx-auto">
      <Radio.Group
        className="w-full flex justify-between"
        onChange={(e) =>
          setFormData({ ...formData, account_type: e.target.value })
        }
        value={formData.account_type}
      >
        <Radio value="Personal" className="w-[47%] border-2 border-gray-400 rounded-md pl-2 py-1">
          <span className="text-gray-600 font-medium">Personal</span>
        </Radio>
        <Radio value="Business" className="w-[47%] border-2 border-gray-400 rounded-md pl-2 py-1">
          <span className="text-gray-600 font-medium">Business</span>
        </Radio>
      </Radio.Group>
    </Form.Item>

    {/* Submit Button */}
    <Form.Item className="w-[73%] mx-auto">
      <Button
        type="primary"
        htmlType="submit"
        disabled={loader}
        loading={loader}
        className="h-[35px] w-full bg-[var(--purple)]hover:bg-purple-300 transition duration-300 ease-in-out"
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
    </div>
  )
}
export default SignUp;