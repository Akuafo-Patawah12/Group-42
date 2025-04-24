import React,{useEffect,useState,useMemo} from "react"
import {useSearchParams,useNavigate} from "react-router-dom"
import { Modal, Input, Button } from "antd";
import io from "socket.io-client"
import { Link } from "lucide-react";
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
                <div className="rounded-full bg-purple-500 text-white flex items-center justify-center w-8 h-8">A</div>
                <span className="font-medium text-sm">Andrew Patawah</span>
              </div>
              <button title="View profile">
                <EyeFilled className="text-lg text-purple-500 hover:text-purple-700" />
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
                <div className="flex gap-3 text-2xl text-purple-600">
                <a href={post?.website_url}  target="_blank" rel="noopener noreferrer"><Link className="w-5 h-5 text-purple-600" /></a>
                </div>
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
    
      {/* Related Products Section */}
      <div style={{marginBlock:"30px"}} className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h1 style={{marginBlock:"16px"}} className="text-lg font-semibold mb-4">Products in "Books & Stationery"</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="border-2 border-purple-400 bg-white rounded-2xl p-4 hover:shadow-xl transition-all">
                <div className="bg-stone-100 h-[200px] rounded-lg overflow-hidden flex justify-center items-center">
                  <LazyLoadImage
                    src={product.img_vid}
                    alt={product.caption}
                    effect="blur"
                    className="object-contain h-full"
                    onError={() => console.log("failed to upload image")}
                  />
                </div>
                <div className="mt-3 space-y-2">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-medium bg-stone-200 px-2 py-1 inline-block rounded">
                    #{product.category}
                  </span>
                  <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 inline-block rounded">
                    {product?.product_condition || "Condition Unknown"}
                  </span>
                </div>
                  <p className="text-sm text-stone-600">{product.caption}</p>
                  <div className="text-right font-bold text-purple-700">₵{product.price}</div>
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