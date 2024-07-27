import React,{useState,useEffect} from 'react'
import Correct from '../icons/Correct';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
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
          if(char >= splitText.length ){
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


  return (
    <div>
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
           <div className={`transition-all border-t-2 flex justify-center items-center flex-col w-full absolute bg-white top-[50px] ${height ? "h-[150px] ":"h-0"} lg:hidden`}>
              <a className={` w-[100px] font-medium ${height ? "block":"hidden"}`}>Home</a>
              <a className={` w-[100px] font-medium ${height ? "block":"hidden"}`}>Services</a>
              <a className={` w-[100px] font-medium ${height ? "block":"hidden"}`}>Review</a>
              <a className={` w-[100px] font-medium ${height ? "block":"hidden"}`}>Contact</a>
              <Link to={"/SignUp"} className={` `}><button className={`btn  w-[100px] font-medium ${height ? "block":"hidden"} overflow-hidden relative isolate border-2 border-green-600 rounded-xl px-4 py-2 mr-3 `}>Sign Up</button></Link>  
        </div>
        </header>
        

        <div className='image aspect-video w-full flex flex-col'>
        <h1 className=' text-white text-3xl font-bold max-w-[350px] mt-[30px] mx-auto lg:mt-[60px]'>
           {text}
        </h1> 
        <p className={` text-white font-bold max-w-[400px] transition-all mt-[10px] mx-auto ${displayP ? "scale-1":"scale-0"}`}>Explore innovative solutions crafted to optimize your supply chain management and enhance overall efficiency.</p>
        </div> 
       
        <div className='flex flex-col justify-center items-center mt-[50px] md:flex-row justify-around  lg:flex-row justify-around '>
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

        <h1 className='max-w-[172px] mx-auto mt-[80px] font-medium text-3xl'>Blog Insight.</h1>

            <div className='grid  grid-col-1 place-items-center gap-y-[40px] mt-4 md:grid-cols-2 lg:grid-cols-3 gap-x-[50px]'>
                <section className='max-w-[300px]'>
                    <h3 className='font-bold text-stone-700 text-2xl mb-3'>Revolutionizing Supply Chain with Advanced Technologies. </h3>
                    <p>Maximize profitability with strategic insights into inventory management and innovative warehouse solutions shared in this post. </p>
                    <div className='flex gap-1 mt-4 font-bold'><div className='size-6 bg-gray-400 rounded-[50%]'><img src='../images/img_3.jpg' alt="three" className='w-full h-full rounded-[50%]'></img></div><p>Simon James</p></div>
                </section>
                <section className='max-w-[300px]'>
                    <h3 className='font-bold text-stone-700 text-2xl mb-3'>Innovative Hardware for Seamless Logistics Management.</h3>
                    <p>Explore hardware solutions tailored for seamless logistics and supply chain management. </p>
                    <div className='flex gap-1 mt-4 font-bold'><div className='size-6 bg-gray-400 rounded-[50%]'><img src='../images/img_2.jpg' alt='2' className='w-full h-full rounded-[50%]'></img></div><p>Jonathan Olertey</p></div>
                </section>
                <section className='max-w-[300px]'>
                   <h3 className='font-bold text-stone-700 text-2xl mb-3'>Maximizing Efficiency in Modern Supply Chain Strategies. </h3>
                   <p>Discover logistics optimization tips and tools to enhance efficiency, reduce costs, and streamline your supply chain operations. </p>
                   <div className='flex gap-1 mt-4 font-bold'><div className='size-6 bg-gray-400 rounded-[50%]'><img src='../images/img_1.jpg' alt='img' className='w-full h-full rounded-[50%]'></img></div><p>Nicholas Asamoah</p></div>
                </section>
            </div>


            <h2 className='font-medium text-4xl bg-blue-300 max-w-[360px] mt-[100px] mx-auto md:max-w-[400px] lg:max-w-[400px]'>Connect with Our Proficient Supply Chain Professionals. </h2>

            <img src='../images/connect.png' alt='connect' className='mx-auto mt-5'></img>

            <div className='flex gap-2 flex-wrap justify-around mt-8 '>
                <section className='max-w-[300px]'>
                    <img src='../images/img_1.jpg' alt='1' className='rounded-3xl w-full h-[300px]'></img>
                    <h6 className='font-medium text-lg mt-2 mb-2'>Patawah Andrew</h6>
                    <h3>Supply Chain Expert</h3>
                </section>
                <section  className='max-w-[300px]'>
                    <img src='../images/img_2.jpg' alt='2' className='rounded-3xl w-full h-[300px]'></img>
                    <h6 className='font-medium text-lg mt-2 mb-2'>David Darko</h6>
                    <h3>Head of Logistics</h3>
                </section>
                <section  className='max-w-[300px]'>
                    <img src='../images/img_3.jpg' alt='3' className='rounded-3xl -full h-[300px]'></img>
                    <h6 className='font-medium text-lg mt-2 mb-2'>Micheal Dei</h6>
                    <h3>Project Manager</h3>
                </section>
            </div>

            <footer className='mt-5 flex justify-around  bg-black  rounded-t-2xl '>
                <h4 className='font-medium text-sm text-white ml-1 sm:ml-1'>©Copyright ©2024 Supply Chain Solutions, Inc. All rights reserved. </h4>
                <div className='font-medium text-sm text-white mr-1 lg:mr-0'>Developed by Micheal Dei, David Nii Darko and Patawah Andrew.</div>
            </footer>
    </div>
  )
}

export default LandingPage