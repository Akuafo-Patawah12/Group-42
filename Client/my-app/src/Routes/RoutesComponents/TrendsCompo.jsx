import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import React,{useState,useEffect} from 'react'
import {jwtDecode} from "jwt-decode"
import axios from 'axios'
import { storage } from "../../firebase"
import { v4 } from "uuid"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import io from "socket.io-client"
import PostLoader from '../../icons/PostLoader';

const TrendsCompo = () => {
    const socket= io("http://localhost:5000");
    
    const [caption, setCaption] = useState();
    const[urls,setUrls] = useState()
  const [posts, setPosts] = useState([
    
  ]);
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

  const fetchPosts = async() => {
    try{
    const response = await axios.get('http://localhost:5000/emit-posts');
    setPosts(response.data)
    }catch(err){
        console.error(err)
    }
      };

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
            
            
        }
    },[])

    const [loadingProgress, setLoadingProgress] = useState(false);
    axios.defaults.withCredentials = true;
    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/emit-posts');
            const totalData = response.data.length;
          
          // Fetch data sequentially
          for (let i = 0; i < totalData; i++) {
            // Update the state to add the new item
            setPosts(prevData => [...prevData, response.data[i]]);
            // Update the loading progress
            setLoadingProgress(true);
            // Simulate delay for sequential loading
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          setLoadingProgress(false)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
      
      

    


        
        const [image, setImage] = useState(null);
        const [progress, setProgress] = useState(0);
      
        const handleChange = e => {
          if (e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }
       const[snap,setSnap]= useState([])
        const sendPost = (e) => {
            e.preventDefault()
          if (!image) return;
      
          const storageRef = ref(storage, `images/${image.name + v4()}`);
          
          uploadBytes(storageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
            setSnap(snapshot)
            getDownloadURL(snapshot.ref).then((url) => {
                
              setUrls(url)
            }).catch((error) => {
              console.error('Error getting download URL', error);
            });
          
       
                
              });
              socket.emit('sendPost',{id:userId,caption,urls});
        setCaption("")
        fetchPosts();
            }
          
        
        
    
  return (
    <div className='mt-[30px] '>
        {snap.map((item,index)=>(<div key={index}>{item}</div>))}
        <div className='grid grid-cols-3 gap-3'>
        {posts.map((post, index) => (
          <div key={index} className='border-2 w-[250px]'>{post.caption}
          <div className='flex justify-around'><LikeOutlined />
          <p className='text-sm'><CommentOutlined /> Comments</p></div>
          </div>
          
        ))}
        {loadingProgress ? (<PostLoader/>):""}
      </div>
      <form onSubmit={sendPost}>
        <input type="file"
        
          onChange={handleChange}
        className='border-2 border-blue-400'
        />
      <textarea
        
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className='border-2 border-blue-400'
      />
      <button type='submit' className='border-2 border-green-300'>Post</button>
      </form>
    </div>
  )
}

export default TrendsCompo