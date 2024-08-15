import React from 'react'
import {motion} from "framer-motion"
const Product = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >Product</motion.div>
  )
}

export default Product