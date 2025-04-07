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
<div className="mt-5 w-[95%] shadow-md py-5 px-[3%] rounded-lg bg-white mx-auto columns-1 md:columns-2 lg:columns-3 space-y-4">
    {posts.map((post, index) => ( 
       

        <div key={index} className='relative w-[250px] border-2 bg-white border-purple-500 mt-4 shadow-sm rounded-2xl overflow-hidden break-inside-avoid   hover:shadow-2xl'>
          <section className=' absolute top-2 z-40 size-8 rounded-[50%] border-2 border-[var(--purple)] bg-gray-400 font-medium grid place-items-center ml-3 '>{post?.username[0]}</section>
          <section className='flex justify-center items-center  bg-stone-100 w-full'>
                {loader&& <div className='h-[200px] flex items-center justify-center'><ImageLoader /></div>}
                {online?
                <LazyLoadImage  
                   src={post.img_vid} 
                   alt={post.caption} 
                   effect="blur" 
                   afterLoad={handleImageLoad}
                   
                   style={{height:"100%"}}
                   onError={console.log("failed to upload image")}
                />:<div className='absolute'><ImageLoader /></div>
                }
          </section>
          <div className=" bg-gradient-to-r from-white via-gray-200 to-white w-full">

          <div className=' mt-1 flex flex-col w-[85%] mx-auto '>
            <span className='font-medium text-xs bg-stone-200 w-[80px]'>#{post.category}</span>
            <span className='text-sm text-stone-500'>{post.caption}</span>
          </div>
        <div className='flex items-center justify-around py-6'>
          <button onClick={()=> viewProduct(post._id,post.category)} className="bg-[var(--purple)] px-2 py-1 rounded-lg"><ShoppingCartOutlined onClick={()=> {
            setLike(prev=>!prev);
             
            }} /> 
            <span className="ml-1 text-white text-sm">Add to cart</span>
          </button>
        <section className='ml-3 text-sm flex flex-col items-end gap-1 h-[50px] '>
        <div className="flex items-center space-x-1 ">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < item.rating ? "gold" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3 text-yellow-500 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.888a1 1 0 00-1.176 0l-3.97 2.888c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"
              />
            </svg>
          ))}
        </div>
        <br/>
        <span className="text-sm">${post.price}</span>
        </section>
        </div>
        </div>
        </div>
      ))}
      {loading ? (<PostLoader />):""} 
        
    </div>}
    </>
  )
}

export default TrendsPosts