import React,{useEffect,useState,useMemo} from "react"
import {useSearchParams,useNavigate} from "react-router-dom"
import { Modal, Input, Button } from "antd";
import io from "socket.io-client"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { EyeFilled, FacebookOutlined, LeftOutlined, WechatOutlined, WhatsAppOutlined } from "@ant-design/icons";
import RefIcon from "@ant-design/icons/lib/icons/ArrowRightOutlined";

const ItemList=()=>{

  const [searchParams] = useSearchParams();
  const[isQuery,setQuery] = useState()
  const[isCategory,setCategory] = useState("")
  const [sender,setSender] = useState(false)
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [Error, setIsError] = useState("");

  const socket = useMemo(() =>io("http://localhost:4000",{
    transports: ['websocket'],
  }),[]) 

  useEffect(() => {
    const postId= searchParams.get("similar_for"); // Extract postId from the query string

    if (postId) {
      socket.emit("getPost", postId); // Emit the event to fetch the post

      // Listen for the response
      socket.on("postData",(data) => {
        if (data.error) {
          setError(data.error); // Handle error from server
        } else {
          setPost(data); // Set post data
        }
      });
    }

    // Cleanup on unmount
    return () => {
      socket.off("postData");
    };
  }, [searchParams]);

  useEffect(() => {
    const category = searchParams.get("category"); // Category to filter by
    const decodedCategory = decodeURIComponent(category); // Decode back to original

  console.log(decodedCategory); // Output: "Books & Stationery
    socket.emit("getProductsByCategory", decodedCategory); // Emit event to fetch products
console.log(category)
    // Listen for the response
    socket.on("categoryProducts", (data) => {
      if (data.error) {
        setError(data.error); // Handle errors
      } else {
        setProducts(data); // Set fetched products
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("categoryProducts");
    };
  }, []);
  
  if (error) return <p>Error: {error}</p>;
  if (Error) return <p>Error: {Error}</p>;
  

  function showEmailSender(){
    setSender(prev => !prev)
  }

  const handleOk = () => {
    setSender(false);
  };

  const handleCancel = () => {
    setSender(false);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page
  } 
    return(
        <div className='w-full px-[5%] bg-stone-100 pt-24 lg:w-[80%] ml-auto'>
            <div className="flex justify-between">
            <button  onClick={handleGoBack} className="p-2 bg-stone-400 rounded-lg mb-3"><LeftOutlined /> Back</button>
            <h3 className="font-bold text-2xl">Products Overview</h3>
            </div>
            {post ? (
        <div  className='flex relative border-[1px] bg-white border-purple-200  shadow-sm rounded-xl overflow-hidden  hover:shadow-2xl '>

          <section className='flex justify-center items-center h-[300px] bg-stone-100 w-full '>
                
                <LazyLoadImage  
                   src={post.img_vid} 
                   alt={post.caption} 
                   effect="blur" 
                   
                   height={300}
                   style={{height:"100%"}}
                   onError={console.log("failed to upload image")}
                />
          </section>
          <div className=" bg-gradient-to-r px-[2.5%] py-3 gap-3 flex flex-col from-white via-gray-200 to-white w-full">
            <div className=" p-3 bg-white rounded flex  border-2 border-purple-400 ">
              <section className="flex justify-between items-center w-full">
                 <button className="rounded-[50%] text-white bg-purple-500 size-7">A</button>
                 <span className="font-medium text-sm">Andrew Patawah</span>
                 <button title="View profile"><EyeFilled/></button>
                 
              </section>
              

            </div>

            

              <div className=" p-3 bg-white flex rounded  border-2 border-purple-400 ">
              <section>
              <span className='font-medium text-xs bg-stone-200 w-[80px]'>Category <RefIcon/> #{post.category}</span>
              <div><h3>Price</h3><h3>${post.price} <span className="p-1 bg-purple-100 rounded-lg">negotiable</span></h3></div>
              <div className="mt-2">
                <h3 className="font-medium text-sm">Product description</h3>
              <span className='text-sm text-stone-500 pl-2 border-l-2 ml-2 border-purple-400'>{post.caption}</span>
              </div> 
              </section>
            </div>


            <div className=" p-3 bg-white border-2 rounded border-purple-400 ">
              <h3 className="font-medium mb-2 text-sm">Social media handles</h3>
              <section className="flex justify-between">
                 
                 <span className="flex gap-2"><FacebookOutlined className="text-2xl"/><WhatsAppOutlined className="text-2xl"/><WechatOutlined className="text-2xl"/></span>
                 <button className="bg-[var(--purple)] p-2 text-sm rounded text-white" onClick={showEmailSender}>Send mail</button>
                 
              </section>
              </div>
          </div>
        </div>
      
      ) : (
        <p>Loading post...</p>
      )}

      
      <Modal 
        title="Contact Us" 
        open={sender} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
      >
        <form className="flex flex-col gap-3">
          <Input type="email" placeholder="Enter your email" className="py-2 px-3" />
          <Input.TextArea rows={5} placeholder="Enter your message here" className="py-2 px-3" />
          <Button type="primary" className="bg-purple-500 text-white" block>
            Send
          </Button>
        </form>
      </Modal>
      <div className='mt-5 shadow-md w-full py-5 rounded-lg bg-white' >
      <h1 className="text-2xl font-bold mb-4">Products in "Books & Stationery"</h1>
      {products.length > 0 ? (
        <div className="mt-5 w-[95%] shadow-md py-5 px-[3%] rounded-lg bg-white mx-auto columns-1 md:columns-2 lg:columns-3 space-y-4">
          {products.map((product,index) => (
            <div key={index} className='relative w-[250px] border-2 bg-white border-purple-500 mt-4 shadow-sm rounded-2xl overflow-hidden break-inside-avoid   hover:shadow-2xl'>
            <section className='flex justify-center items-center bg-stone-100 w-full'>
                
                <LazyLoadImage  
                   src={product.img_vid} 
                   alt={product.caption} 
                   effect="blur" 
                   
                   style={{height:"100%"}}
                   onError={console.log("failed to upload image")}
                />
          </section>
          <div className=" bg-gradient-to-r from-white via-gray-200 to-white w-full">

          <div className=' mt-1 flex flex-col w-[85%] mx-auto '>
            <span className='font-medium text-xs bg-stone-200 w-[80px]'>#{product.category}</span>
            <span className='text-sm text-stone-500'>{product.caption}</span>
          </div>
        <div className='flex items-center justify-around h-[100px]'>
          
       
        
        <br/>
        <span>${product.price}</span></div>
        </div>
        </div>
          
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>

        </div>
    )
}

export default ItemList