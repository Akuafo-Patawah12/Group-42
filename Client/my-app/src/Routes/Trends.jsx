import React from 'react'
import {motion} from "framer-motion"

import TrendsCompo from './RoutesComponents/TrendsCompo'

const Trends = () => {

  

  return (
    
      
         
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full bg-stone-100  lg:w-[80%] ml-auto'>

          
            <TrendsCompo />
       
         </motion.div>
     
    
  )
}

export default Trends