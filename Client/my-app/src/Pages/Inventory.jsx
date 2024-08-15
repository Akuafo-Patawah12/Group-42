import React from 'react'
import {motion} from 'framer-motion'
const Inventory = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >Inventry</motion.div>
  )
}

export default Inventory