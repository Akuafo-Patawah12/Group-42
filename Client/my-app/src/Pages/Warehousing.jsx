import React from 'react'
import {motion } from "framer-motion"
const Warehousing = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >Warehousing</motion.div>
  )
}

export default Warehousing