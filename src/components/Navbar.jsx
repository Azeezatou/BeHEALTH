import React from 'react'
// import { Link } from 'react-router-dom'
import Logo from "../assets/Images/BeHealth.png"


function Navbar() {
  return (
    <nav className=' flex justify-between p-5 font-poppins'>
        <div className='flex items- gap-2'>
            <img src={Logo} alt='BeHealth Logo' className='h-8 w-8' />
            <h1 className='text-2xl font-semibold text-black' > <span className='text-[#D7499A]'>Be</span>Health</h1>
        </div>
        <div className='space-x-6 text-black text-xl'>
          <a href='' className='hover:text-white active:text-white'>Home</a>
          <a href='' className='hover:text-white active:text-white'>Latest News</a>
          <a href='' className='hover:text-white active:text-white'>About Us</a>
          <a href='' className='hover:text-white active:text-white'>FAQs</a>
        </div>
        <div className='space-x-4 text-white font-poppins'>
            <button className='rounded-md bg-[#666666] px-3 py-1 hover:bg-transparent hover:border hover:border-white'>Sign Up</button>
            <button className='rounded-md bg-[#D7499A] px-3 py-1 hover:bg-transparent hover:border hover:border-white'>Donate</button>
        </div>
    </nav>
  )
}

export default Navbar