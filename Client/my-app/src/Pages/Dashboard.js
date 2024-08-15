import React from 'react'
import {motion} from 'framer-motion'
const Dashboard = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >Dashboard</motion.div>
  )
}

export default Dashboard
