import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';



import axios from 'axios'
import WarningIcon from '../icons/Warning_icon'


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
       const handleSubmit = async()=>{
        
        
        try{
            setLoader(true)  //display button loader after clicking login button to submit form
          await axios.post("http://localhost:4000/Login",{formData})   //making an API request from web server
          .then(res=>{

            
            switch (res.data.message) {
                case "Logged in as a company":
                    // Store the access token in local storage
                    localStorage.setItem('user', res.data.user_name);
                    localStorage.setItem('accesstoken', res.data.accessToken);  /*receiving access token from server and 
                    
                    storing token into browsers local storage*/
            
                    // Show success message with SweetAlert2
                    toast.success("Login successful!");
                    
            
                    // Clear validation message
                    seValidation("");
                    setLoader(false)  //After the API succeeds hidden login button loader
            
                    // Navigate to the Trends page
                    navigate('/L/Dashboard');//Navigate to this /Trends path after login succeeds
                    break;
            
                case "Logged in as an individual":
                    // Show success message with SweetAlert2
                    localStorage.setItem('user', res.data.user_name);
                    localStorage.setItem('accesstoken', res.data.accessToken);
                    toast.success("Login successful!");
            
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
        message.error(
            "Oops,system down",
         
         ); 
        console.log(e)
       } 
    }
    const[togglePassword,setTogglePassword]= useState(false)
    function pass_to_text(){
         setTogglePassword(!togglePassword)
    }

    
  return (
    
        <div className='flex justify-center w-full items-center h-screen bg-gray-100 '>

            <section className=' relative border-[1px]  w-full  overflow-hidden bg-white border-stone-300 shadow-2xl flex items-center flex-col h-full lg:flex-row gap-2 '>
                
                <div className='w-full   h-full  lg:overflow-hidden'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>

                <Form
  onFinish={handleSubmit}
  className="form w-[95%] border-l-2 border-r-2 border-stone-300 h-auto items-center justify-center absolute h-full pt-6 bg-white z-2 lg:w-[40%] top-0 right-[5%]"
>
   
  <div className="flex flex-col gap-4 mt-5 items-center" style={{marginTop:"30px"}}>
  <div className="w-[80px] h-[80px]  border-2 border-purple-500 overflow-hidden p-3 mx-auto mt-7 rounded-full"><img src="../images/sfgl_logo.jpg" alt="logo" /></div>
    <Typography.Title level={5} className="mx-auto mt-2  !mb-0">
      SF Ghana Logistics.
    </Typography.Title>

    <Typography.Text className="font-bold text-gray-600 w-[73%] mx-auto text-center">
    Streamlining your logistics and marketing needs — welcome to smarter supply chain solutions.
    </Typography.Text>

    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
      className="w-[73%] mx-auto"
    >
      <Input
        placeholder="Enter email"
        className="h-[35px]"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    </Form.Item>

    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
      className="w-[73%] mx-auto"
    >
      <Input.Password
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeInvisibleOutlined /> : <EyeOutlined />
        }
        className="h-[35px]"
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        visibilityToggle={{
          visible: togglePassword,
          onVisibleChange: pass_to_text,
        }}
      />
    </Form.Item>

    <div className="flex w-[78%] text-md font-small text-red-400 items-center mx-auto">
      {validation === '' ? '' : <WarningIcon size={18} />} {validation}
    </div>

    <div className="flex mx-auto w-[73%] justify-between items-center">
      <Form.Item name="rememberMe" valuePropName="checked" noStyle>
        <Checkbox
          checked={formData.rememberMe}
          onChange={(e) =>
            setFormData({ ...formData, rememberMe: e.target.checked })
          }
        >
          <span className="font-medium text-sm ">Stay logged in</span>
        </Checkbox>
      </Form.Item>

      <Link
        to="/forgetPassword"
        className="text-purple-500 font-medium text-sm"
        style={{color:"var(--purple)"}}
      >
        Forget Password?
      </Link>
    </div>

    <Form.Item className="w-[73%] mx-auto">
      <Button
        type="primary"
        htmlType="submit"
        disabled={loader}
        className=" w-full "
        style={{background:"var(--purple)", height:"40px"}}
        loading={loader}
      >
        Login
      </Button>
    </Form.Item>

    <div className="w-[78%] mx-auto text-center">
      <Link
        to="/SignUp"
        style={{color:"var(--purple)"}}
        className=" font-medium hover:underline decoration-2 active:underline"
      >
        Create Account
      </Link>{' '}
      instead.
    </div>
  </div>
</Form>

            </section>
        </div>
    
  )
}

export default Login

