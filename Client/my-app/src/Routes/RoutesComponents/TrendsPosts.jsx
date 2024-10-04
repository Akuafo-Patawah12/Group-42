import React,{useState,useEffect} from 'react'
import {  ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PostLoader from '../../icons/PostLoader';
import { ImageLoader } from '../../icons/ButtonLoader';
const TrendsPosts = ({loading,loaders,setLike,likePost,onLineProps,posts}) => {
       const[online,setOnline]=onLineProps 
     const[loader,setLoader,handleImageLoad]=loaders 
  
     
  return (
    
    <div className='mt-5 place-items-center grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'> 
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
          <span onClick={likePost(post._id,post.user_id)} className="bg-blue-400 p-2 rounded-lg"><ShoppingCartOutlined onClick={()=> setLike(prev=>!prev)} /> Add to cart</span>
        <section className='ml-3 text-sm'><span className='text-yellow-400'><StarFilled/><StarFilled/><StarFilled/></span>
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