import React from 'react'
import axios from "../api/api"
import {  Card, Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';


const ForgetPassword = () => {
  const { Title, Text } = Typography;
  const [email,setEmail]= React.useState("");

  const handSubmit = async()=>{
    
    try{
      await axios.post("/forgetPassword",{email})
      .then(res=>{
        console.log(res)
        toast.success(
          "SFGL sent a reset link to your email.",
          )
      })
      .catch(err=>{
        console.log(err)
        toast.error("Failed to send reset link")
      })
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className='h-screen relative flex items-center justify-center'>
      <div className='w-full absolute   h-full  lg:overflow-hidden'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>
                <div className="flex items-center justify-center min-h-[250px] bg-gray-50 border-2 border-purple-300">
      <Card
        title={<Title level={5} style={{ marginBottom: 0 ,textAlign:"center",position:"relative"}}>SFGL SOLUTIONS</Title>}
        bordered
        className="w-[350px] shadow-2xl"
      >
      <div style={{marginInline:"auto"}} className="w-[80px] h-[80px]  border-2 border-purple-500 overflow-hidden p-3 mx-auto mt-7 rounded-full"><img src="../images/sfgl_logo.jpg" alt="logo" /></div>
        <Text strong style={{ display: 'block', marginBottom: 16 ,marginInline:"auto",width:"fit-content"}}>
          Regain Access to Your Account
        </Text>
        <Form layout="vertical" onFinish={handSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input 
              placeholder="Enter email" 
              onChange={(e) => setEmail(e.target.value)}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              style={{ backgroundColor: 'var(--purple)' }} 
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </div>
  )
}

export default ForgetPassword