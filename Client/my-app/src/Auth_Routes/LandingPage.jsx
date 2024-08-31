import React,{useState,useEffect} from 'react'
import Correct from '../icons/Correct';
import {Link} from 'react-router-dom'
import LandCompo from "./LandCompo"


const LandingPage = () => {
    const [text,setText] = useState("")
    let display;
    useEffect(() => {
        // Accessing the DOM element inside useEffect to ensure it exists after rendering
        let newText="Optimize Your Supply Chain Operations Today."
        let splitText=newText.split("") ;
        let char=0-1;
        const intervalId = setInterval(() => {
            char++; 
          splitText?.includes(splitText[char]) ?
          
            // Add the next character from greetingsElement if it's not already in text
               setText(prevText =>prevText + splitText[char])
          :
            setText(prevText => prevText);

            if(char >= splitText.length){
             clearInterval(intervalId);
             display=true;
          }
          

        }, 50);
            // Cleanup function to clear the interval when component unmounts
            return () => clearInterval(intervalId);
      },[]);
    
      const[displayP,setDisplayP]= useState(false)
      let count=0;
      useEffect(()=>{
        
            const intervalId = setInterval(() => {
                count++ //increment count by 1 every 1000 milliseconds
                setDisplayP(true) //this is the function that set displayP to true
           },1000)
           if(count===1){
            clearInterval(intervalId);
         }
        return () => clearInterval(intervalId);
      })
       const data=[
        {
            h3:"Logistics Management ",
            p:"Discover a broad selection of logistics solutions tailored to optimize your supply chain processes.",
            bg:"bg-stone-100",
            icon:"../images/icon_1.png"
        },
        {
            h3:"Inventory Solutions ",
            p:"Optimize storage with our state-of-the-art warehousing facilities and management systems.",
            bg:"bg-yellow-100",
            icon:"../images/icon_2.png"
        }, {
            h3:"Warehousing Solutions",
            p:"Experience seamless distribution with our efficient, timely, and cost-effective shipping and receiving services.",
            bg:"bg-purple-100",
            icon:"../images/icon_3.png"
        }, {
            h3:"Transport Network",
            p:"Experience uninterrupted distribution with our reliable, punctual, and cost-effective shipping and receiving services.",
            bg:"bg-stone-100",
            icon:"../images/icon_4.png"
        }
       ]
        
       const[height,setHeight]= useState(false)
       function toggleHeight(){
          setHeight(!height)
       }
    const links=[{innerText:"Home"},{innerText:"Service"},{innerText:"Review"},{innerText:"Contact"}]

  return (
    <main>
        <header className='w-full h-[60px] relative items-center flex justify-between'>
            <h4 className='ml-3 font-bold'>Supply Chain Solution</h4>
           <nav className=' hidden lg:flex gap-3'>
              <a >Home</a>
              <a>Services</a>
              <a>Review</a>
              <a>Contact</a>
           </nav>
           <Link to={"/SignUp"}><button className='btn overflow-hidden relative isolate border-2 border-green-600 rounded-xl px-4 py-2 mr-3 hidden lg:block'>Sign Up</button></Link>
           <button onClick={toggleHeight} className='block w-[40px] h-[22px] relative lg:hidden'>
              <div className={`absolute w-5 h-1 transition-all border-2 border-green-600 ${height ? "top-2 rotate-45":"top-0"}`}></div>
              <div className={`absolute w-5 h-1 top-2 border-2 border-green-600 ${height ? "hidden":"block"}`}></div>
              <div className={`absolute w-5 h-1 transition-all border-2 border-green-600 ${height ? "top-2 -rotate-45":"top-4"}`}></div>
           </button>
           <div className={`transition-all border-t-2 flex justify-center items-center flex-col w-full absolute bg-white top-[50px] ${height ? "h-screen ":"h-0"} lg:hidden`}>
              {links.map((item,index)=>(<a  key={index} className={` w-[100px] font-medium ${height ? "block":"hidden"}`}>{item.innerText}</a>))}
              
              <Link to={"/SignUp"} className={` `}><button className={`btn  w-[100px] font-medium ${height ? "block":"hidden"} overflow-hidden relative isolate border-2 border-green-600 rounded-xl px-4 py-2 mr-3 `}>Sign Up</button></Link>  
        </div>
        </header>
        

        <div className='image aspect-video w-full flex flex-col'>
        <h1 className=' text-white text-3xl font-bold max-w-[350px] mt-[30px] mx-auto lg:mt-[60px]'>
           {text}
        </h1> 
        <p className={` text-white font-bold max-w-[400px] transition-all mt-[10px] mx-auto ${displayP ? "scale-1":"scale-0"}`}>Explore innovative solutions crafted to optimize your supply chain management and enhance overall efficiency.</p>
        </div> 
       
        <div className='flex flex-col bg-green-50 justify-center items-center py-[50px] md:flex-row justify-around  lg:flex-row justify-around '>
            <div >
                <h1 className='font-medium  text-4xl'>We Offer</h1>
                <ul className='mt-8'>
                    <li className='flex'><Correct /> Efficient Shipping and Receiving</li>
                    
                    <li className='flex'><Correct /> Live Tracking System</li>
                    <li className='flex'><Correct /> High-Tech Inventory Management Solutions</li>
                </ul>
                <button className='mt-5 bg-green-600 font-medium text-white rounded-xl px-4 py-2 mr-3'>Discover More</button>
            </div>

            <div className='max-w-[630px] grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-2'>
            {data.map((item,index)=>(
                <section key={index} className={`w-[330px] p-6 rounded-xl ${item.bg} md:w-[210px] lg:w-[250px]`}>
                <img src={item.icon} alt={index} ></img>
                <h3 className='font-bold'>{item.h3} </h3>
                <p>{item.p}</p>
            </section>))}
            </div>  
           
        </div>

       <LandCompo/>
       
    </main>
  )
}

export default LandingPage