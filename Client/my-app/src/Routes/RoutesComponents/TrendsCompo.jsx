import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import React,{useState,useEffect} from 'react'
import io from "socket.io-client"
const TrendsCompo = () => {
    const socket= io("http://localhost:4000",{
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });
    const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected to server")
            
        });
        socket.on('receivePost',(info)=>{
            setPosts((prevPosts) => [...prevPosts,info]);
          });
        socket.on('disconnect',(reasons)=>{
            console.log(reasons)
          })
        return()=>{
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receivePost');
        }
    },[posts,post])
    const sendPost = (e) => {
        e.preventDefault()
        socket.emit('sendPost',post);
        setPost('');
      };

  return (
    <div className='mt-[150px] '>
        <div className='flex flex-col'>
        {posts.map((post, index) => (
          <div key={index} className='border-2 w-[250px]'>{post}
          <div className='flex justify-around'><LikeOutlined />
          <p className='text-sm'><CommentOutlined /> Comments</p></div>
          </div>
          
        ))}
      </div>
      <form onSubmit={sendPost}>
      <textarea
        
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className='border-2 border-blue-400'
      />
      <button type='submit' className='border-2 border-green-300'>Post</button>
      </form>
    </div>
  )
}

export default TrendsCompo