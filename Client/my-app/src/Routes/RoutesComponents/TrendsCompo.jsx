import {  EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
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
    const[category,setCategory] = useState("")
      const [price, setPrice] = useState("");
      const [isPremium, setIsPremium] = useState(false);
      const [selectedCategory, setSelectedCategory] = useState("");
    
    
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const[likes,setLikes]= useState({})
  const[like,setLike]=useState(false)


  useEffect(() => {
    const token =localStorage.getItem("accesstoken")
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
        console.log("the user id is ",userId)
        // Notify the server that this user is online
     socket.emit("userOnline", decodedToken.id);

     
     socket.emit("checkStatus", decodedToken.id, (response) => {
       setStatus(response); // Update state with the online status and last active
     });
    
     return () => {
      socket.disconnect();
    };  
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  },[]);
  


  //Image Upload to firebase
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
    
      socket.emit('sendPost',{id:userId,caption,category,img_vid:url,selectedCategory,price,isPremium}); //emit post including image url to the web server
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
          console.log(" this is my post data", data)
          fetchData(data);
      };

      // Attach event listener for 'getPost'
      socket.on('getPost', handlePostData);

      // Cleanup function to remove the event listener
      return () => {
          socket.off('getPost', handlePostData);
      };
    },[])


    //Loading effect after api call
    const [loadingProgress, setLoadingProgress] = useState(false);
    axios.defaults.withCredentials =true;
    
    const [hasFetched, setHasFetched] = useState(false);
      const fetchData = async (postData) => {
        console.log(postData)
        try {
              const data= shuffleArray(postData);
            const totalData = data.length;
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
    
      
      //Reshuffle carts after every page reload
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          // Generate a random index between 0 and i
          const j = Math.floor(Math.random() * (i + 1));
      
          // Swap elements at index i and j
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      
        //Handling button filter query
      const handleClick = (id) => {
        // Update the query parameter when the button is clicked
        navigate(`/Customer/Trends?similar_for=#${id}`);
      };

      const viewProduct= (id,category) =>{
        const encodedCategory = encodeURIComponent(category);
        navigate(`/Customer/Trends/Items?similar_for=${id}&category=${encodedCategory}`);
      }
       

    
  
      //Select image from file explorer
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

    const[loader,setLoader]= React.useState(true)
  const handleImageLoad = () => {
    setLoader(false);
  };
  
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onlineFunction = () => {
      setOnline(true);
    };
    
    const offlineFunction = () => {
      setOnline(false);
    };
  
    window.addEventListener("online", onlineFunction);
    window.addEventListener("offline", offlineFunction);
  
    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("online", onlineFunction);
      window.removeEventListener("offline", offlineFunction);
    };
  }, []);


  
  const [status, setStatus] = useState({ isOnline: false, lastActive: null });

  


  





  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Groceries",
    "Sports & Outdoor",
    "Books & Stationery",
    "Toys & Baby Products",
    "Automotive",
    "Industrial & Business Supplies",
    "Pet Supplies",
    "Mobile & Computer Accessories",
    "Appliances",
    "Jewelry",
    "Art & Collectibles",
    "Travel & Luggage",
    "Tools & Hardware",
    "Event & Party Supplies",
    "Digital Products",
    "Eco-Friendly Products",
    "Luxury Items",
    "DIY & Crafts",
    "Gaming",
  ];

  const getTimeDifference = () => {
    const now = new Date(); // Current time in local timezone
    const past = new Date(); // Parse timestamp
    const diffInSeconds = Math.floor((now - past) / 1000); // Difference in seconds
    console.log("Now:", now); // Log the current date
  console.log("Past:", past); // Log the parsed timestamp

    if (diffInSeconds < 1) {
      return "online"; // Handle future timestamps gracefully
    }
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`; // Less than 1 minute
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`; // Less than 1 hour
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`; // Less than 1 day
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`; // Less than 1 month
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months}mo ago`; // Less than 1 year
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years}y ago`; // More than 1 year
    }
  };
  
              
  return (
    <main className='pt-[20px]  '>
      {sendAlert ?<div className='absolute top-20 z-99 left-[50%] font-medium bg-stone-300 rounded-lg px-[40px] py-2 translate-x-[-50%] translate-y-[-50%]'>Creating post...</div>:null}
      <div className="bg-white rounded-lg mt-[70px] mx-auto w-[90%] shadow-md p-4 flex  sm:flex-row items-center justify-between gap-4">
      {/* Filter Dropdown */}
      <div className="flex items-center w-full sm:w-auto">
        <label htmlFor="filter" className="text-gray-700 font-medium mr-2">
          Filter:
        </label>
        <input
          list="categories"
          id="filter"
          placeholder="Select category"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <datalist id="categories" onClick={(e)=> handleClick(e.target.value)}>
          <option value="Electronics" />
          <option value="Clothing" />
          <option value="Shoes" />
          <option value="Home Appliances" />
          <option value="Books" />
        </datalist>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full sm:w-auto flex-grow sm:flex-grow-0">
        <input
          type="text"
          placeholder="Search for items..."
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={()=> handleClick("Shirt")} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* Add Items Button */}
      <button onClick={()=>setOpenDialog(true)} className="bg-[var(--purple)] text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full sm:w-auto">
        Add Items
      </button>
    </div>

  <div className="flex gap-3 overflow-x-auto mx-auto mt-3 w-[90%]" style={{scrollbarWidth:"none"}}>
     {
       categories.map((item,index)=>(
        <button key={index} onClick={()=> handleClick(item)} className='p-3 rounded bg-slate-200 whitespace-nowrap'>{item}</button>
       ))
     }
  </div>
        
        <div>{status.lastActive}</div>
        <div>{getTimeDifference(status.isOnline)}</div>
       
          {/*list the post one after the order using the map function*/}
        <TrendsPosts posts={[...posts]}  setLike={setLike}  viewProduct={viewProduct}
        likePost={likePost} loading={loadingProgress}  onLineProps={[online,setOnline]} loaders={[loader,setLoader,handleImageLoad]} />
      

      {/* create a post popup menu*/}
      
     {openDialog &&<TrendPostPopup
         reference={popRef}
         send={sendPost}
         picRef={pic}
         cap={caption}
        handleChange={handleChange}
        popUp={openDialog}
        setOpenDialog={setOpenDialog}
        price={[price, setPrice]}
         premium={[isPremium, setIsPremium]}
        selectCat={[selectedCategory,setSelectedCategory]}
        setCaption={setCaption}
        setCategory={setCategory}
         
   />} 
  
    </main>
  )
}

export default TrendsCompo