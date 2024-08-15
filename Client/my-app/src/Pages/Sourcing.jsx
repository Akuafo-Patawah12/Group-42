import React from 'react'
import {motion} from "framer-motion"
const Sourcing = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >Sourcing</motion.div>
  )
}

export default Sourcing