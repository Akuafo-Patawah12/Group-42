import React,{useState,useEffect} from 'react'
import {  ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PostLoader from '../../icons/PostLoader';
import { ImageLoader } from '../../icons/ButtonLoader';
const TrendsPosts = ({loading,loaders,setLike,likePost,onLineProps,posts}) => {
       const[online,setOnline]=onLineProps 
     const[loader,setLoader,handleImageLoad]=loaders 
   const item={rating: 4}
     
  return (
    
    <div className='mt-5 w-[90%] shadow-md py-5 rounded-lg bg-white place-items-center mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'> 
    {posts.map((post, index) => ( 
       

        <div key={index} className='relative border-[1px] bg-white border-stone-200 shadow-sm rounded-2xl overflow-hidden w-[250px] hover:shadow-2xl'>
          <section className=' absolute top-2 z-40 size-6 rounded-[50%] border-2 border-green-400 bg-gray-400 font-medium grid place-items-center ml-3 '>{post?.username[0]}</section>
          <section className='flex justify-center items-center h-[200px] bg-stone-100 w-full'>
                {loader&& <div className='absolute'><ImageLoader /></div>}
                {online?
                <LazyLoadImage  
                   src={post.img_vid} 
                   alt={post.caption} 
                   effect="blur" 
                   afterLoad={handleImageLoad}
                   height={200}
                   style={{height:"100%"}}
                   onError={console.log("failed to upload image")}
                />:<div className='absolute'><ImageLoader /></div>
                }
          </section>
          <div className=" bg-gradient-to-r from-white via-gray-200 to-white w-full">

          <div className=' mt-1 flex flex-col w-[85%] mx-auto '>
            <span className='font-medium text-xs bg-stone-200 w-[80px]'>#Clothings</span>
            <span className='text-sm text-stone-500'>{post.caption}</span>
          </div>
        <div className='flex items-center justify-around h-[100px]'>
          <span onClick={likePost(post._id,post.user_id)} className="bg-[var(--purple)] p-2 rounded-lg"><ShoppingCartOutlined onClick={()=> setLike(prev=>!prev)} /> <span className="text-white">Add to cart</span></span>
        <section className='ml-3 text-sm'>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < item.rating ? "gold" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-yellow-500"
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
        <span>$8.00</span></section></div>
        </div>
        </div>
      ))}
      {loading ? (<PostLoader />):""} 
        
    </div>
  )
}

export default TrendsPosts