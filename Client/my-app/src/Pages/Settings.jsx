import React from 'react'
import {motion } from "framer-motion"
const Settings = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >Settings</motion.div>
  )
}

export default Settings