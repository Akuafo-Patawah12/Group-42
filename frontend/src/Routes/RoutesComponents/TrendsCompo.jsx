import {  LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import React,{useState,useEffect,useRef,useMemo} from 'react'
import {jwtDecode} from "jwt-decode"
import {useNavigate,useSearchParams} from 'react-router-dom';
import {Input,AutoComplete,Empty,Button } from 'antd'
import axios from 'axios'
import { storage } from "../../firebase"
import { v4 } from "uuid"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import io from "socket.io-client"
import TrendPostPopup from './TrendPostPopup';
import TrendsPosts from './TrendsPosts';


const TrendsCompo = () => {

 
  const socket = useMemo(() =>io("http://localhost:4000",{
    transports: ['websocket'],credentials: true
  }),[])
    const navigate= useNavigate()
    const [caption, setCaption] = useState('');
    const[category,setCategory] = useState("")
      const [price, setPrice] = useState("");
      const [isPremium, setIsPremium] = useState(false);
  
    
    
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
 
  
  const [filteredOptions, setFilteredOptions] = useState(posts);


  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read category & search term from URL
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filteredPosts,setFilteredPosts] = useState([])

  useEffect(() => {
    // Update URL whenever category or search changes
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (searchTerm) params.set("search", searchTerm);
    setSearchParams(params);

    // Filter posts based on search & category
    const filtered = posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm, posts, setSearchParams, setFilteredPosts]);

  // Handle category button click
  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  // Handle search input changes
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value) {
      setFilteredOptions(
        categories.filter((category) =>
          category.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredOptions([]);
    }
  };

  const scrollRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Adjust scroll speed
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Detect if at the start or end
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setIsStart(scrollRef.current.scrollLeft === 0);
        setIsEnd(
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth - 5
        );
      }
    };
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
  
        console.log("the user id is ", decodedToken.id); // use decodedToken.id instead
  
        // Notify the server that this user is online
        socket.emit("userOnline", decodedToken.id);
  
        // Check status immediately
        socket.emit("checkStatus", decodedToken.id, (response) => {
          setStatus(response);
        });
  
        
        
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);
  
  


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
    

    
    useEffect(()=>{
      socket.emit("refreshPost","call refresh")
    },[])

    
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected to server")
            
        });
        

        socket.on('receivePost',(data)=>{
          // Update the state by adding the new post to the existing posts
          setPosts(prevPosts => [data,...prevPosts,]);
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
      
        
      const viewProduct= (id,category) =>{
        const encodedCategory = encodeURIComponent(category);
        navigate(`/Customer/Trends/Items?similar_for=${id}&category=${encodedCategory}`);
      }
       

    
  
      //Select image from file explorer
        const [imagePreview,setImagePreview] = useState(null)
        const [image, setImage] = useState(null);
      let pic=useRef()
      const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
          setImage(file);
          const objectUrl = URL.createObjectURL(file);
          
          setImagePreview(objectUrl)
          pic.current.src = imagePreview;
        }
      };
    
      const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        handleFile(file);
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
    
      const handleChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
      };

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

   

    // Handle input change
    

    const [loadedImages, setLoadedImages] = useState({});
  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };
  


    


  
  const [status, setStatus] = useState({ isOnline: false, lastActive: null });

  


  





  const categories = [
    "All",
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
      <div style={{marginInline:"auto",marginTop:"70px"}} className="bg-white rounded-lg  w-[95%] shadow-md p-4 flex  sm:flex-row items-center justify-between gap-4">
      
      

      {/* Search Bar */}
      <div className="flex items-center w-full sm:w-auto flex-grow sm:">
      <AutoComplete
      options={filteredOptions.map((item) => ({
  value: item,
  label: (
    <div className="flex items-center gap-2">
      <SearchOutlined size={16} className="text-purple-600" />
      <span>{item}</span>
    </div>
  )
}))}

        onSelect={(value) => setSearchTerm(value)}
        onSearch={handleSearch}
        value={searchTerm}
        className="w-full"
        notFoundContent={<Empty description="No results found" />} // Ant Design No Results SVG
      >
        <Input
          placeholder="Search categories..."
          allowClear
          prefix={<SearchOutlined className="text-gray-400 text-lg" />}
          size="large"
          style={{ height: "40px" }}
        />
      </AutoComplete>
      
        
      </div>

      {/* Add Items Button */}
      <button onClick={()=>setOpenDialog(true)} className="bg-[var(--purple)] text-white  leading-4 text-xs h-[40px]  rounded-xl border-2 border-stone-300 hover:bg-green-600 w-[180px] md: text-sm ">
        Add Product
      </button>
    </div>

    <div style={{marginInline:"auto",marginTop:"12px"}} className="relative flex items-center gap-2 w-[95%]  ">
      {/* Left Scroll Button */}
      <Button
        icon={<LeftOutlined />}
        onClick={() => scroll("left")}
        className={`border-2 border-gray-300 text-gray-600 transition ${
          isStart ? "opacity-30 cursor-not-allowed" : "opacity-80"
        }`}
        disabled={isStart}
      />

      {/* Scrollable Category Buttons */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto flex-nowrap w-full px-2"
          style={{
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
            position: "relative",
          }}
        >
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item)}
              style={{fontSize:"13px"}}
              className={`px-3 py-[6px] whitespace-nowrap  font-medium rounded-xl border-2 ${
                selectedCategory === item
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-stone-200 border-stone-300"
              } lg:py-2 px-4`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Fade effect (Left) */}
        {!isStart && (
          <div className="absolute left-[-4px] top-[-5px] h-[120%] w-10 bg-gradient-to-r from-[#eee] via-white to-transparent pointer-events-none" />
        )}
        
        {/* Fade effect (Right) */}
        {!isEnd && (
          <div className="absolute right-[-4px] top-[-5px] h-[120%] w-10 bg-gradient-to-l from-[#eee] via-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Right Scroll Button */}
      <Button
        icon={<RightOutlined />}
        onClick={() => scroll("right")}
        className={`border-2 border-gray-300 text-gray-600 transition ${
          isEnd ? "opacity-30 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isEnd}
      />
    </div>
        
        
       
          {/*list the post one after the order using the map function*/}
        <TrendsPosts posts={[...filteredPosts]}  viewProduct={viewProduct}
         loading={loadingProgress}  loadedImages={loadedImages} loaders={[handleImageLoad]} />
      

      {/* create a post popup menu*/}
      
     {openDialog &&<TrendPostPopup
         reference={popRef}
         send={sendPost}
         picRef={pic}
         cap={caption}
         image={image}
         handleDragOver={handleDragOver}
         handleDrop={handleDrop}
        handleChange={handleChange}
        popUp={openDialog}
        setOpenDialog={setOpenDialog}
        price={[price, setPrice]}
        imagePreview={imagePreview}
         premium={[isPremium, setIsPremium]}
        selectCat={[selectedCategory,setSelectedCategory]}
        setCaption={setCaption}
        setCategory={setCategory}
         
   />} 
  
    </main>
  )
}

export default TrendsCompo