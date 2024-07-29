import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import React,{useState,useEffect} from 'react'
import {getCookie} from "./Utils"
import {jwtDecode} from "jwt-decode"
import axios from 'axios'
import io from "socket.io-client"
const TrendsCompo = () => {
    const socket= io("http://localhost:4000");
    const [post, setPost] = useState({
        caption:"",
        img_vid:""
    });
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token =localStorage.getItem("accesstoken")
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); 
       
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected to server")
            
        });
        

        socket.on('disconnect',(reasons)=>{
            console.log(reasons)
          })
        return()=>{
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receivePost');
        }
    },[post])

    const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:4000/posts');
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      fetchPosts();

    const sendPost = (e) => {
        e.preventDefault()
        socket.emit('sendPost',{id:userId,...post});
        setPost({caption:"",img_vid:""});
        fetchPosts();
      };

  return (
    <div className='mt-[150px] '>
        <div className='flex flex-col'>
        {posts.map((post, index) => (
          <div key={index} className='border-2 w-[250px]'>{post.caption}
          <div className='flex justify-around'><LikeOutlined />
          <p className='text-sm'><CommentOutlined /> Comments</p></div>
          </div>
          
        ))}
      </div>
      <form onSubmit={sendPost}>
        <input type="text"
        value={post.img_vid}
          onChange={(e)=>setPost({...post,img_vid:e.target.value})}
        className='border-2 border-blue-400'
        />
      <textarea
        
        value={post.caption}
        onChange={(e) => setPost({...post,caption:e.target.value})}
        className='border-2 border-blue-400'
      />
      <button type='submit' className='border-2 border-green-300'>Post</button>
      </form>
    </div>
  )
}

export default TrendsCompo