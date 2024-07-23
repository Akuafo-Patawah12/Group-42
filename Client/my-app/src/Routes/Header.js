import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='fixed w-full h-[60px] top-0 z-1 flex justify-around bg-blue-400'>
        <h5>SCMS</h5>
        <nav className='flex gap-3'>
          <Link to={"/"} >
             <button>Trends</button>
          </Link>
          <Link to={"/"} >
             <button>NewsFlash</button>
          </Link>
        </nav>
    </header>
  )
}

export default Header