import React,{useState,useEffect,useRef} from 'react'
import {AimOutlined,BulbOutlined} from "@ant-design/icons"
import "./About.css"

const About = () => {
    const parentRef= useRef(null)
    const childRef1= useRef(null)
    const childRef2= useRef(null)
    

    const [index,setIndex] = useState(0)
    useEffect(()=>{
        const child= [childRef1.current,childRef2.current]
        const childLeft = child[index].offsetLeft;
        parentRef.current.scrollTo({
          left: childLeft,
          behavior: "smooth" // Add smooth scrolling
        });
    },[index])
  return (
    <div>

     <h1 className="text-3xl w-fit font-extrabold mx-auto">About us</h1>
     <section style={{width:"80%",marginInline:"auto",paddingBottom:"40px"}} className="about_org">
            <p style={{textAlign:"justify",fontSize:"15px"}} className="about_p">
                Established in February 2019, Shun Feng Ghana Logistics (SFGL) has rapidly grown into one of 
                West Africa's most trusted logistics providers, specializing in the efficient and seamless shipping 
                of goods between Ghana and China. With our core values rooted in reliability, transparency, and 
                customer satisfaction, we are committed to upholding our motto: "Whatever the load, we carry 
                it." 
            </p>
        </section>

    <div className='relative h-[400px] w-4/5 overflow-hidden rounded-xl mx-auto mt-10'>
        <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                
           </section>
    </div>
           
        
        <div className='flex justify-around'>
        <div className='w-[40%]'>
        
        <section style={{display:"flex",gap:"5px",marginBlock:"30px 5px"}}>
            <button onClick={()=> setIndex(0)} className='bg-purple-200 p-3 rounded'><AimOutlined style={{color:"var(--purple)"}}/> Mission</button>
            <button onClick={()=> setIndex(1)} className='bg-purple-200 p-3 rounded'><BulbOutlined style={{color:"var(--purple)"}}/>Vission</button>
        </section>
        
        <section ref={parentRef} style={{ border:"1px solid #ddd",borderRadius:"5px" }} className="parent">
             <div ref={childRef1} className="child">
                <p style={{width:"95%",marginInline:"auto",fontSize:"15px"}}>
                 Our mission is to provide innovative and efficient logistics solutions that bridge the gap between 
                Ghana and China, delivering superior customer satisfaction through reliability, timely delivery, 
                and professional handling of all shipments.
                </p> 
             </div>
             <div ref={childRef2} className="child">
              <p style={{width:"95%",marginInline:"auto",fontSize:"15px"}}>
                To be the leading logistics provider between Ghana and China, recognized for our commitment 
                to excellence, innovation, and customer-focused solutions. 
              </p>
             </div>
        </section>

        <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Integrity and Transparency</li>
              <li>Customer-Centric Approach</li>
              <li>Innovation and Excellence</li>
              <li>Sustainability and Responsibility</li>
            </ul>
          </section>
        </div>
       
        
        <div className='w-[40%]'>
        <video
        src="../images/world planet and trucks delivery service animation_preview.mp4"
        autoPlay
        muted
        style={{ width: "100%", height:"auto" }}
      />
        </div>
        </div>
        </div>
        
  )
}

export default About