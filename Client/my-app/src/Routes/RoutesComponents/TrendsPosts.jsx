import React from 'react'
import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PostLoader from '../../icons/PostLoader';
import ButtonLoader from '../../icons/ButtonLoader';
const TrendsPosts = (props) => {
  const[loader,setLoader]= React.useState(true)
  const handleImageLoad = () => {
    setLoader(false);
  };
  return (
    
    <div className='mt-5 place-items-center grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'> 
    {props.posts.map((post, index) => (  
        <div key={index} className='border-[1px] bg-white border-stone-200 shadow-sm rounded-2xl w-[250px]'>
          <main className='py-3'><section className='size-6 rounded-[50%] border-2 bg-gray-400 font-medium grid place-items-center ml-3 '>{post?.username[0]}</section><section className='ml-3 text-sm'>{post.caption}</section></main>
          <section className='flex justify-center items-center h-[300px] bg-stone-100 w-full'>
                {loader&& <ButtonLoader />}
                <LazyLoadImage  
                   src={post.img_vid} 
                   alt={post.caption} 
                   effect="blur" 
                   afterLoad={handleImageLoad}
                   height={300}
                   style={{height:"100%"}}
                />
            
          </section>
        <div className='flex items-center justify-around h-[50px]'><span onClick={props.likePost(post._id,post.user_id)}><LikeOutlined onClick={()=>props.setLike(prev=>!prev)} /> {post.likesCount}</span>
        <p className='text-sm'><CommentOutlined /> Comments</p></div>
        </div>
      ))}
      {props.loading ? (<PostLoader />):""} 
        
    </div>
  )
}

export default TrendsPosts