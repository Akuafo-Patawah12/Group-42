import { Card, Form, Input, Button, Typography,InputNumber } from 'antd';
import { useState } from 'react';
import { Star } from 'lucide-react';
import {toast} from "react-toastify"
import {useLocation,useNavigate} from "react-router-dom"
const { Title, Text, Link } = Typography;
import axios from "../api/api"


const VerificationPage = ({ resendCode }) => {
  const [code, setCode] = useState('');
  const [loader,setLoader] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('auth_user');
  async function verify(){
    setLoader(true)
    try{
    const res = await axios.post("/verify_otp",{id,code})
    toast.success("Verified")
    if (res.data.message === "Verified user") {
      localStorage.setItem('user', res.data.user_name);
      localStorage.setItem('accesstoken', res.data.accessToken);
      navigate("/Customer/Overview");
      setLoader(false)
    } else if (res.data.message === "Verified admin") {
      localStorage.setItem('user', res.data.user_name);
      localStorage.setItem('accesstoken', res.data.accessToken);
      navigate("/L/Dashboard");
      setLoader(false)
    } else {
      toast.error("Unexpected response");
      setLoader(false)
    }
    }catch(err){
      console.log(err)
      setLoader(false);
      switch (err.response.status) {
        case 429:
            
            
            toast.error(err.response.data.message)
            break;
            
        case 404:
       
            
            toast.error(err.response.data.message)
            
            break;
    

            case 400:
         
            
            toast.error(err.response.data.message)
          
            break;
    
        case 500:
           
            toast.error(err.response.data.message)
            break;
    
        default:
            break;
    }
    

    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50">
    <div className='w-full absolute   h-full  lg:overflow-hidden'>
                    <img src='../images/welcome.jpg' className='h-full w-full object-cover object-center' alt='sign'></img>
                </div>
                <Card
        title={<Title level={5} style={{ marginBottom: 0 ,textAlign:"center",position:"relative"}}>SFGL SOLUTIONS</Title>}
        variant="outlined"
        className="w-[350px] shadow-2xl"
      >
        <div className="text-center mb-4">
          <Title level={4}>Verify Your Email</Title>
          
        </div>
        <div style={{marginInline:"auto"}} className="w-[80px] h-[80px]  border-2 border-purple-500 overflow-hidden p-3 mx-auto mt-7 rounded-full"><img src="../images/sfgl_logo.jpg" alt="logo" /></div>
        <Form layout="vertical" onFinish={verify}>
          <Form.Item
            label="Verification Code"
            name="code"
            rules={[
              { required: true, message: 'Please enter the code' },
              { len: 6, message: 'Code must be 6 digits' },
            ]}
          >
            <InputNumber
              placeholder="e.g. XXX-XXX"
              maxLength={6}
              controls={false} // hides up/down arrows
              stringMode
              onChange={(value) => {
                const stringValue = value?.toString() || "";
                if (/^\d{0,6}$/.test(stringValue)) {
                  setCode(stringValue);
                }
              }}
              onBeforeInput={(e) => {
                if (/\D/.test(e.data)) {
                  e.preventDefault(); // block non-digit before it's typed
                }
              }}
              size="large"
              style={{width:"100%"}}
            />
          </Form.Item>
          <p style={{marginBottom:"20px"}} className="flex items-center gap-1 bg-purple-100 p-2 text-center text-xs font-semibold rounded-lg border border-purple-300">
            <Star size={13} style={{color:"var(--purple)"}}/> Enter the 6-digit code sent to your email.
          </p>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loader} block style={{background:"var(--purple)"}}>
             {loader ? "Verifying":"Verify"} 
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text type="secondary" >Didn’t receive a code? </Text>
          <Link onClick={resendCode} style={{color:"var(--purple)"}}>Resend</Link>
        </div>
      </Card>
    </div>
  );
};

export default VerificationPage;
