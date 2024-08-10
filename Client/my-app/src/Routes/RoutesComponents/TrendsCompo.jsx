import { CommentOutlined, LikeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React,{useState,useEffect,useRef} from 'react'
import {jwtDecode} from "jwt-decode"
import axios from 'axios'
import { storage } from "../../firebase"
import { v4 } from "uuid"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import io from "socket.io-client"
import PostLoader from '../../icons/PostLoader';


const TrendsCompo = () => {
    const socket= io("http://localhost:5000");
    
    const [caption, setCaption] = useState('');
    
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
        socket.on('receivePost',(id,caption,img_vid,username,createdAt)=>{
          const newPost = {
            id,
            caption,
            img_vid,
            username,
            createdAt
          };
        
          // Update the state by adding the new post to the existing posts
          setPosts(prevPosts => [...prevPosts, newPost]);
        })

        socket.on('disconnect',(reasons)=>{
            console.log(reasons)
          })
        return()=>{
            socket.off('receivePost')
            socket.off('connect');
            socket.off('disconnect');
                  
        }
    },[socket])

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
  
       // Cleanup function to prevent memory leaks and handle double invocations
  return () => {
    fetchData(); // or any other cleanup logic you need
  };
    }, []);
      
        const [image, setImage] = useState(null);
      let pic=useRef()
        const handleChange = e => {
          if (e.target.files[0]) { //allowing users to access file which can be images/pdf/video/audio from file explorer
            setImage(e.target.files[0]);  //store the selected image in image variable
              pic.current.src= URL.createObjectURL(e.target.files[0]); 
          }
        }
        
        let img_vid;
        const sendPost = (e) => {
            e.preventDefault()
          if (!image) return;   /*if there's no image selected don't process with the rest of the functionalities */
      
          const storageRef = ref(storage, `images/${image.name + v4()}`); //setting the path for the chosen image
          
          uploadBytes(storageRef, image).then((snapshot) => { //upload image to file server and grab a snap shot
            console.log('Uploaded a blob or file!', snapshot);
      
            getDownloadURL(snapshot.ref).then((url) => { //get image reference and download the url from file server(firebase)
              console.log('File available at', url);
              img_vid=url; //assigning url to img_vid
                // Update state with the image URL
              socket.emit('sendPost',{id:userId,caption,img_vid}); //emit post including image url to the web server
              //setTimeout(fetchPosts,500) // wait for 500 milliseconds before calling this function to fetch posts after posting them
            }).catch((error) => {
              console.error('Error getting download URL', error);
            });
          }).catch((error) => {
            console.error('Error uploading file', error);
          });
              
        setCaption("") //empty caption input field after making a post
        pic.current.src=""   
            } 
            
        /*    const fetchPosts = async() => {
              try{
              const response = await axios.get('http://localhost:5000/emit-posts');//fetching post from Api
              setPosts(response.data)
              }catch(error){
                  console.error(error)
              }
              };   */
                const popRef= useRef(null)
                useEffect(()=>{   //this function allows u to close the popup menu by clicking outside of it.
                  let closePop =(event)=>{
                    if(popRef.current && !popRef.current.contains(event.target)){
                      setOpenDialog(false);
                    }
                       /**This function is executed when you click outside the pop up menu in event.js to close it */
                  }
                  document.addEventListener("mousedown",closePop);
                  return()=>{
                    document.removeEventListener("mousedown",closePop)
                    /**This function is executed when you click outside the sidebar to close it in ToggleSideBar.jsx */
                  }
                },[]);     
    const [openDialog,setOpenDialog]= useState(false)
  return (
    <div className='pt-[20px] '>
        <div className='w-4/5 border-2 border-green-300 h-[40px] mx-auto mt-[80px] overflow-hidden rounded-2xl lg:w-2/5'><button onClick={()=>setOpenDialog(true)} className='float-right'><button className='h-[38px] bg-green-300 block px-2 rounded-l-2xl '><PlusCircleOutlined /> Create Post</button> </button></div>
        <div className='mt-5 place-items-center grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
          {/*list the post one after the order using the map function*/}
        {posts.map((post, index) => (  
          <div key={index} className='border-[1px] bg-white border-stone-200 shadow-sm rounded-2xl w-[250px]'>
            <p className='py-3'><div className='size-6 rounded-[50%] border-2 bg-gray-400 font-medium grid place-items-center ml-3 '>{post?.username[0]}</div><div className='ml-3 text-sm'>{post.caption}</div></p>
            <section className='h-[300px] bg-stone-100 w-full'>
              
                  <img  src={post.img_vid} alt={`img_${index}`} className="h-full mx-auto"></img>
              
            </section>
          <div className='flex items-center justify-around h-[50px]'><LikeOutlined />
          <p className='text-sm'><CommentOutlined /> Comments</p></div>
          </div>
        ))}
        {loadingProgress ? (<PostLoader/>):""}  
      </div>


      {openDialog && <div  className='Css'>
        {/*pop up menu */}
        <div  ref={popRef} className=' fixed w-[80%] h-[70%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[80%] bg-white rounded-lg md:w-[50%] lg:w-[30%]'>
         <div className='border-b-2 h-[60px] font-bold text-xl '>Create Post.</div>
         <section className='h-[40%]'>
          <img ref={pic}  alt="select_image" className='corner-only'></img>
         </section>
      <form onSubmit={sendPost} className='form flex justify-around  '>
    
        
      <textarea 
        
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className='border-2 border-blue-400 rows-span-2 max-h-[150px]'
      />
      <section> 
      <label className='rounded-xl flex justify-center items-center bg-blue-400 h-[40px] w-[100px] pointer'>
      <input type="file"
        onChange={handleChange}
        className=' hidden'
        />
        Select Image
        </label>
      
       <button type='submit'
        className='rounded-xl bg-green-300 h-[40px] w-[100px]'>
          Post
        </button>
        </section>
      </form>
      </div>
      </div>}{/*ending of popup menu */}
    </div>
  )
}

export default TrendsCompo