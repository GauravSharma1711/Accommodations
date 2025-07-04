// components/Navbar.js
import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  
    const {currentUser} = useContext(AuthContext);

  const [open, SetOpen] = useState(false);


  return (
    <nav className='flex justify-between items-center h-[60px] md:h-[80px] lg:h-[100px] leading-12 p-4 md:p-8'>
      <div className='flex items-center gap-4 md:gap-6 lg:gap-12'>
        <a href='/' className='flex items-center gap-2 md:gap-3'>
          <img className='h-6 w-6 md:h-8 md:w-8' src='/logo.png' alt='Logo' />
          <span className='hidden md:block font-semibold text-xl md:text-2xl leading-tight'>
            Accommodation
          </span>
        </a>

        <div className='hidden lg:flex space-x-4'>
        <Link to={'/'} className='hover:text-gray-600'>Home</Link>

        <Link to={ currentUser ? '/users' : '/login' } className='hover:text-gray-600'>users</Link>

          
          
          <Link to={'/agent'} className='hover:text-gray-600'>Agents</Link>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 md:gap-4">
        <div className="hidden lg:flex space-x-4">
          {
            currentUser ?
          (<div className=' flex items-center font-bold gap-4'>
            <img className=' h-12 w-12 rounded-full' src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <div className='relative h-10 w-14'>
  <Link
    className='absolute top-0 left-0 h-10 w-14 rounded-md bg-amber-500 flex items-center justify-center text-white font-semibold'
    to={'/profile'}
  >
    Profile
  </Link>
 
</div>
          </div>)
              :
         ( 
          <>
          <Link to={'/signup'} className='px-4 py-2 hover:text-gray-600'>SignUp</Link>
          <Link to={'/login'} className='bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1'>SignIn</Link>
          </>
          )
          }
        </div>
        <button
          onClick={() => SetOpen((prev) => !prev)}
          className='lg:hidden focus:outline-none'
        >
          <img src="/menu.png" alt="Menu" className='h-8 w-8 cursor-pointer' />
        </button>

        <div
          className={`fixed top-0 right-0 bg-black text-white h-screen w-3/4 max-w-sm z-30
            transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className='p-8 flex flex-col gap-8 font-extrabold leading-loose'>
            <div className='flex justify-end'>
              <button onClick={() => SetOpen(false)} className='focus:outline-none text-gray-400 hover:text-gray-100'>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <a href="" className='hover:text-amber-500'>Home</a>
            <a href="" className='hover:text-amber-500'>About</a>
            <a href="" className='hover:text-amber-500'>Contact</a>
            <a href="" className='hover:text-amber-500'>Agents</a>
            <a href="" className='hover:text-amber-500'>SignIn</a>
            <a href="" className='hover:text-amber-500'>SignUp</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar