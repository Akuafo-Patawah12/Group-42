import React from 'react'
import {motion} from "framer-motion"

import TrendsCompo from './RoutesComponents/TrendsCompo'

const Trends = () => {

  

  return (
    
      
         
         <motion.div 
         initial={{ opacity: 0, perspective: 1000, rotateY: -90,y:100 }}
         animate={{ opacity: 1, perspective: 1000, rotateY: 0 ,y:0}}
         exit={{ opacity: 0,y:100}}
            className='w-full bg-stone-100  lg:w-[80%] ml-auto'>

          
            <TrendsCompo />
       
         </motion.div>
     
    
  )
}

export default Trends