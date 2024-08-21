import React from 'react'

const TrendPostPopup = (props) => {
  return (

    <>
         {props.popUp && <div  className='fixed inset-0 bg-black/40 backdrop-blur-custom z-[78]'>
        {/*pop up menu */}
        <div  ref={props.reference} className=' fixed w-\[80%] h-[70%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] w-[80%] bg-white rounded-lg md:w-[50%] lg:w-[30%]'>
         <div className='border-b-2 h-[60px] font-bold text-xl '>Create Post.</div>
         <section onDragOver={(e)=>e.preventDefault()} className='h-[40%]'>
          <img ref={props.picRef}  alt="select_image" className='corner-only'></img>
         </section>
      <form onSubmit={props.send} className='outline-[2px] outline-dashed outline-[#15e148] w-4/5 mx-auto shadow-[30px] flex justify-around  '>
    
        
      <textarea 
        
        value={props.cap}
        onChange={(e) => props.setCaption(e.target.value)}
        className='border-2 border-blue-400 rows-span-2 max-h-[150px]'
      />
      <section> 
      <label className='rounded-xl flex justify-center items-center bg-blue-400 h-[40px] w-[100px] pointer'>
      <input type="file"
        onChange={props.handleChange}
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
    </>
  )
}

export default TrendPostPopup