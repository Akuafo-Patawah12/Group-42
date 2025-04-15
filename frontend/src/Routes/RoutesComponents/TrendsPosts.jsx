import React,{useState,useEffect} from 'react'
import {  ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Empty } from "antd";
import 'react-lazy-load-image-component/src/effects/blur.css';
import PostLoader from '../../icons/PostLoader';
import { ImageLoader } from '../../icons/ButtonLoader';
const TrendsPosts = ({loading,viewProduct,loaders,setLike,likePost,onLineProps,posts}) => {
       const[online,setOnline]=onLineProps 
     const[loader,setLoader,handleImageLoad]=loaders 
   const item={rating: 4}
  
  return (
  <> 
  {posts.length===0? <div className='text-center text-2xl font-bold h-[65svh] flex items-center justify-center'><Empty description="No product found" /></div>:
<div style={{marginInline:"auto",marginTop:"20px"}} className=" w-[95%] shadow-md py-5 px-[2%] rounded-lg bg-white columns-1 grid-gap-2 md:columns-2 lg:columns-3 space-y-4">
    {posts.map((post, index) => ( 
       
<React.Suspense fallback="Loading...">
      <div
  key={index}
  style={{marginBottom:"20px"}}
  className="relative w-full  border-2 border-purple-500 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden break-inside-avoid md:w-[270px]"
>
  {/* Avatar */}
  <section style={{marginBottom:"20px"}} className="absolute top-2 left-3 z-40 size-8 rounded-full border-2 border-purple-500 bg-gray-400 font-semibold text-white grid place-items-center text-sm">
    {post?.username[0]}
  </section>

  {/* Image Section */}
  <section className="flex justify-center items-center bg-stone-100 w-full ">
    { online ? (
      <LazyLoadImage
        src={post.img_vid}
        alt={post.caption}
        effect="blur"
        afterLoad={handleImageLoad}
        className="w-full h-full object-cover"
        onError={() => console.log("failed to upload image")}
      />
    ) : (
      <ImageLoader />
    )}
  </section>

  {/* Info Section */}
  <div className="w-full px-4 py-3 bg-gradient-to-r from-white via-gray-100 to-white">
    {/* Category */}
    <div className="mb-2">
      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Category</span>
      <div style={{marginTop:"4px"}} className="inline-block mt-1 bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
        #{post.category}
      </div>
    </div>

    {/* Description */}
    <div className="mb-2">
      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Description</span>
      <p className="text-xs font-medium text-gray-700 mt-1">{post.caption}</p>
    </div>

    {/* Actions */}
    <div style={{marginTop:"16px"}} className="flex items-center justify-between ">
      {/* Add to Cart */}
      <button
        onClick={() => viewProduct(post._id, post.category)}
        className="bg-purple-600 hover:bg-purple-700 transition text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-2"
      >
        <ShoppingCartOutlined />
        <span>Add to cart</span>
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
        <span className="text-sm font-semibold text-gray-800 mt-1">${post.price}</span>
      </div>
    </div>
  </div>
</div>
 </React.Suspense>

      ))}
      {loading ? (<PostLoader />):""} 
        
    </div>
   
    }
    </>
  )
}

export default TrendsPosts