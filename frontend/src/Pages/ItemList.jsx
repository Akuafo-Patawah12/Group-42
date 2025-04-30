import React,{useEffect,useState,useMemo} from "react"
import {useSearchParams,useNavigate} from "react-router-dom"
import { Modal, Input, Button } from "antd";
import io from "socket.io-client"
import axios from "../api/api"
import { Link, BadgeCheck } from "lucide-react";
import {toast} from "react-toastify"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { EyeFilled, ShoppingCartOutlined, LeftOutlined, WechatOutlined, WhatsAppOutlined } from "@ant-design/icons";
import RefIcon from "@ant-design/icons/lib/icons/ArrowRightOutlined";

const ItemList=()=>{

  const [searchParams] = useSearchParams();

 
  const [sender,setSender] = useState(false)
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [Error] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    marketer_email: ""
  });


  console.log("this email",post?.user_id?.email)
  useEffect(() => {
    if (post?.user_id?.email) {
      setFormData(prev => ({
        ...prev,
        marketer_email: post.user_id.email
      }));
    }
  }, [post]);

  const [loading, setLoading] = useState(false);

  const socket = useMemo(() =>io("http://localhost:4000",{
    transports: ['websocket'],
  }),[]) 

  useEffect(() => {
    const postId= searchParams.get("similar_for"); // Extract postId from the query string

    if (postId) {
      socket.emit("getPost", postId); // Emit the event to fetch the post

      // Listen for the response
      socket.on("postData",(data) => {
        console.log(data)
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
  }, [socket, searchParams]); // Added socket to dependencies

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


  

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSend = async () => {
    if (!formData.email.trim() || !formData.message.trim()) {
      toast.warning("Please fill out both fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("/marketing-mail", formData);
  
      // Optional: You can check response status if needed
      if (response.status === 200) {
        await new Promise((res) => setTimeout(res, 1000)); // Simulate slight delay
        toast.success("Message sent successfully!");
        setFormData({ email: "", message: "" });
        handleOk(); // Close modal
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Send message error:", error);
      toast.error(error.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };
  

  const item={rating: 4}
    return(
      <div style={{paddingTop:"100px"}}
          className='layout-shift  w-full bg-stone-100 px-3 lg:w-[80%] px-0 '>
      <div style={{marginBlock:"0 24px"}} className="flex items-center justify-between ">
        <button onClick={handleGoBack} className="flex items-center gap-2 px-3 py-2 bg-stone-300 hover:bg-stone-400 rounded-lg shadow-sm">
          <LeftOutlined /> <span className="text-sm font-bold">Back</span>
        </button>
        <h3 className="text-xl font-semibold text-stone-800">Product Overview</h3>
      </div>
    
      {post ? (
        <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white border border-purple-200 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
          {/* Product Image */}
          <section className="flex justify-center items-center w-full lg:w-1/2 bg-stone-100 rounded-xl overflow-hidden">
            <LazyLoadImage
              src={post.img_vid}
              alt={post.caption}
              effect="blur"
              className="object-contain h-[300px] w-full"
              onError={() => console.log("failed to upload image")}
            />
          </section>
    
          {/* Product Info */}
          <div className="flex flex-col gap-5 w-full lg:w-1/2">
            {/* Owner Info */}
            <div className="flex items-center justify-between bg-white border-2 border-purple-400 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-500 text-white flex items-center justify-center w-8 h-8">{post.user_id.username[0]}</div>
                <span className="font-medium text-sm">{post.user_id.username} <br/> <span className="text-xs">Joined since {new Date(post.user_id?.createdAt).toLocaleString()}</span></span>
              </div>
              <button title="View profile">
                < BadgeCheck className="text-lg text-purple-500 hover:text-purple-700" />
              </button>
            </div>
    
            {/* Category & Description */}
            <div className="bg-white border-2 border-purple-400 rounded-xl px-4 py-3 space-y-3">
              <span className="text-xs font-medium bg-stone-200 inline-block px-2 py-1 rounded">Category <RefIcon /> #{post.category}</span>
              <div>
                <h3 className="font-medium text-sm">Price</h3>
                <h3 className="text-lg font-semibold text-purple-600">${post.price} <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">Negotiable</span></h3>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Product Description</h3>
                <p className="text-xs font-medium text-stone-500 border-l-4 pl-3 border-purple-400">{post.caption}</p>
              </div>
            </div>
    
            {/* Social Handles */}
            <div className="bg-white border-2 border-purple-400 rounded-xl px-4 py-3">
              <h3 className="text-sm font-medium mb-2">Social Media Handles</h3>
              <div className="flex items-center justify-between">
                {post.website_url && (
                         <a
                           href={post.website_url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center text-xs text-purple-600 hover:underline gap-1"
                         >
                           <Link size={14} /> Visit Website
                         </a>
                       )}
                <button onClick={showEmailSender} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
                  Send Mail
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 my-10">Loading post...</p>
      )}
    
      {/* Email Modal */}
      <Modal
      title="Contact Us"
      open={sender}
      onOk={handleSend}
      onCancel={handleCancel}
      footer={null}
    >
      <form className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={{paddingBlock:"5px"}}
          className="py-4 px-3"
        />
        <Input.TextArea
          name="message"
          rows={5}
          placeholder="Enter your message here"
          value={formData.message}
          onChange={handleChange}
          className="py-2 px-3"
        />
        <Button
          type="primary"
          style={{background:" var(--purple)",paddingBlock:"4px"}}
          className=" py-3 text-white"
          block
          disabled={formData.message==="" || formData.email===""}
          onClick={handleSend}
          loading={loading}
        >
          Send
        </Button>
      </form>
    </Modal>
    
      {/* Related Products Section */}
      <div style={{marginBlock:"30px"}} className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h1 style={{marginBlock:"16px"}} className="text-lg font-semibold mb-4">Products in "Books & Stationery"</h1>
        {products.length > 0 ? (
          <div className=" w-full shadow-md py-5  rounded-lg bg-white columns-1 grid-gap-2 md:columns-2 lg:columns-3 space-y-4">
            {products.map((product, index) => (
              <div key={index} style={{marginBottom:"16px"}} className="relative w-full  border-2 border-purple-500 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden break-inside-avoid md:w-[270px]">
                <div className="bg-stone-100 min-h-[200px] rounded-lg overflow-hidden flex justify-center items-center">
                  <LazyLoadImage
                    src={product.img_vid}
                    alt={product.caption}
                    effect="blur"
                    className="object-contain h-full"
                    onError={() => console.log("failed to upload image")}
                  />
                  
                </div>
                <div className="w-full px-4 py-3 bg-gradient-to-r from-white via-gray-100 to-white">
                    {/* Category */}
                    <div className="mb-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Category</span>
                      <div style={{marginTop:"4px"}} className="inline-block mt-1 bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                        #{product.category}
                      </div>
                    </div>
                
                    {/* Description */}
                    <div className="mb-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Description</span>
                      <p className="text-xs font-medium text-gray-700 mt-1">{product.caption}</p>
                    </div>
                
                    {/* Actions */}
                    <div style={{marginTop:"16px"}} className="flex items-center justify-between ">
                      {/* Add to Cart */}
                      <button
                        
                        className="bg-purple-600 hover:bg-purple-700 transition text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-2"
                      >
                        <ShoppingCartOutlined />
                        <span>View Product</span>
                      </button>
                
                      {/* Rating & Price */}
                      <div className="flex flex-col items-end">
                        <div className="flex space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              fill={i < item.rating ? "gold" : "none"}
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-yellow-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.888a1 1 0 00-1.176 0l-3.97 2.888c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-800 mt-1">₵{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No products found in this category.</p>
        )}
      </div>
    </div>
    
    )
}

export default ItemList