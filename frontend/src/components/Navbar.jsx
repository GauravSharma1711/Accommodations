import React from 'react'

const Navbar = () => {
  return (
    <nav className=' flex justify-between items-center h-12 leading-12 p-8 '>
        <div  className=' w-7/12 flex items-center gap-12'>

        <a href='/' className='flex items-center gap-3'>
  <img className='h-6 w-6' src='/logo.png' alt='Logo' />
  <span className='hidden md:block font-semibold text-2xl leading-4'>
  Accommodation
</span>

</a>


<a href="" className='hidden lg:block '>Home</a>
<a href="" className='hidden lg:block '>About</a>
<a href="" className='hidden lg:block '>Contact</a>
<a href="" className='hidden lg:block '>Agents</a>

        </div>


<div className="w-4/12 p-7 flex items-center justify-end gap-2 bg-[#fcf5f3] leading-8 h-full
">

    <a href="" className=' px-6 m-1 hidden lg:block'>SignUp</a>
    <a href="" className=' bg-[#fece51] px-4 m-1 hidden lg:block'>SignIn</a>
    <img src="/menu.png" alt="" className=' flex justify-center items-center lg:hidden h-10 w-10' />
        </div>
    </nav>
  )
}

export default Navbar