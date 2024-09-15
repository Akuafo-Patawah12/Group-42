import {  PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import React,{useState,useEffect,useRef,useMemo} from 'react'
import {jwtDecode} from "jwt-decode"
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { storage } from "../../firebase"
import { v4 } from "uuid"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import io from "socket.io-client"
import PostLoader from '../../icons/PostLoader';
import TrendPostPopup from './TrendPostPopup';
import TrendsPosts from './TrendsPosts';


const TrendsCompo = () => {

 
  const socket = useMemo(() =>io("http://localhost:5000",{
    transports: ['websocket'],credentials: true
  }),[])
    const navigate= useNavigate()
    const [caption, setCaption] = useState('');
    
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const[likes,setLikes]= useState({})
  const[like,setLike]=useState(false)


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
  },[]);
  
  const [sendAlert,setSendAlert]=useState(false)
  const sendPost = async(e) => {
    e.preventDefault()
    if(!image) return;  /*if there's no image selected don't process with the rest of the functionalities */
    setSendAlert(true)
    setCaption("") //empty caption input field after making a post
    pic.current.src=""
    try{
  const storageRef = ref(storage, `images/${image.name + v4()}`); //setting the path for the chosen image
 
 const snapshot= await uploadBytes(storageRef, image) //upload image to file server and grab a snap shot
    console.log('Uploaded a blob!', snapshot);
       
  const url=await  getDownloadURL(snapshot.ref) //get image reference and download the url from file server(firebase)
      console.log('File available at', url);
    
      socket.emit('sendPost',{id:userId,caption,img_vid:url}); //emit post including image url to the web server
      setSendAlert(false)
    
 
}catch(e){
  console.error(e)
}   
    } 
    

    function likePost(postId,userId){
       
       socket.emit(like?"like":"dislike",{post_id:postId,user_id:userId})
       
    }
    useEffect(()=>{
      socket.emit("refreshPost","call refresh")
    },[])

    const[postData,setPostData]=useState()
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected to server")
            
        });
        

        socket.on('receivePost',(data)=>{
          // Update the state by adding the new post to the existing posts
          setPosts(prevPosts => [data,...prevPosts,]);
        })
        socket.on("getLikes",(data)=>{
            setLikes(data)
        })
        socket.on("getDislikes",(data)=>{
          setLikes(data)
        })
        
        socket.on('disconnect',(reasons)=>{
            console.log(reasons)
          })
          socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
            localStorage.removeItem('accesstoken');
            navigate('/Login');
        });
        
        return()=>{
            socket.off('receivePost')
            socket.off("getlikes")
            socket.off("getDilikes")
            socket.off('connect');
            socket.off('disconnect');
                 
        }
    },[socket,navigate])


    useEffect(() => {
        // Listen for 'getPost' event from the server
        
        const handlePostData = (data) => {
          fetchData(data);
      };

      // Attach event listener for 'getPost'
      socket.on('getPost', handlePostData);

      // Cleanup function to remove the event listener
      return () => {
          socket.off('getPost', handlePostData);
      };
    },[])

    const [loadingProgress, setLoadingProgress] = useState(false);
    axios.defaults.withCredentials =true;
    
    const [hasFetched, setHasFetched] = useState(false);
      const fetchData = async (postData) => {
        try {
           
            const totalData = postData.length;
          if(!hasFetched){
          // Fetch data sequentially
          for (let i = 0; i < totalData; i++) {
            // Update the state to add the new item
            setPosts(prevData => [...prevData, postData[i]]);
            // Update the loading progress
            setLoadingProgress(true);
            // Simulate delay for sequential loading
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          setHasFetched(true);
          setLoadingProgress(false)
        }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      
      

    
  
      
        const [image, setImage] = useState(null);
      let pic=useRef()
        const handleChange = e => {
          if (e.target.files[0]) { //allowing users to access file which can be images/pdf/video/audio from file explorer
            setImage(e.target.files[0]);  //store the selected image in image variable
              pic.current.src= URL.createObjectURL(e.target.files[0]); 
          }
        }

        useEffect(() => {
          

          
          const handleDrop = (event) => {
              event.preventDefault();
              event.stopPropagation();
  
              const files = event.dataTransfer.files;
              if (files.length > 0) {
                  const file = files[0];
                  setImage(file);
                  pic.current.src = URL.createObjectURL(file);
              }
          };
  
          const currentPic = pic.current;
          if (currentPic) {
              
              currentPic.addEventListener('drop', handleDrop);
          }
  
          // Clean up event listener on component unmount
          return () => {
              if (currentPic) {
                  currentPic.removeEventListener('drop', handleDrop);
                  
              }
          };
      }, []);

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

    const [inputValue, setInputValue] = useState('');
    // Predefined options for the datalist
    const Options = [
        "#All",
        "#Clothings",
        "#Electricals",
        "#Machinery"
    ];

    // Handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
              
  return (
    <main className='pt-[20px]  '>
      {sendAlert ?<div className='absolute top-20 z-99 left-[50%] font-medium bg-stone-300 rounded-lg p-1 translate-x-[-50%] translate-y-[-50%]'>Creating post...</div>:null}
        <div className='flex w-4/5 justify-between gap-3 h-[40px] ml-[5%] mt-[80px] overflow-hidden rounded-2xl lg:w-4/5'>
        <input
                id="activity"
                list="activities"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Filter by activity"
                style={{
                    width: '110px',
                    padding: '6px',
                    border: '2px solid  #a8a29e',
                    borderRadius: '16px',
                    fontSize: '16px',
                    color: '#333',
                    
                }}
            />
            <datalist id="activities" className='bg-stone-400'>
                {Options.map((Option, index) => (
                    <option key={index} value={Option} />
                ))}
            </datalist>
            <div className='relative w-[400px]'>
            <input type='text'
             placeholder='Search..'
            className='w-full h-full px-3 rounded-2xl border-2 border-stone-400' ></input>
            <span className='absolute top-[50%] text-center leading-8 -translate-x-[20%] -translate-y-[50%] right-0 bg-green-300 size-8 rounded-[50%]'>
              <SearchOutlined />
              </span>
            </div>
          <button onClick={()=>setOpenDialog(true)} className='float-right'>
            <span className='h-[38px] bg-green-300 block px-2 rounded-l-2xl '><PlusCircleOutlined />Add items</span> 
          </button>
        </div>
       
          {/*list the post one after the order using the map function*/}
        <TrendsPosts posts={[...posts]}  setLike={setLike} likePost={likePost} loading={loadingProgress} />
      

      {/* create a post popup menu*/}
     <TrendPostPopup
         reference={popRef}
         send={sendPost}
         picRef={pic}
         cap={caption}
        handleChange={handleChange}
        popUp={openDialog}
        setCaption={setCaption}
          
   /> 
    </main>
  )
}

export default TrendsCompo