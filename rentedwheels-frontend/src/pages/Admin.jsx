import React from 'react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { Link } from 'react-router-dom'

import profile from '../assets/profile.svg'
import { useState } from 'react'

const Admin = ({history}) => {
   const [admin, setAdmin] = useState(JSON.parse(window.localStorage.getItem('admin'))|| false)
   !admin && history.push('/app/signin') 

  const [user, setUser] = useState(window.localStorage.getItem('signedIn') || false)
  const [userName, setuserName] = useState(window.localStorage.getItem('username') || '')
  window.onstorage=()=>{
    setUser(window.localStorage.getItem('signedIn'))
    setuserName(window.localStorage.getItem('username'))
    setAdmin(JSON.parse(window.localStorage.getItem('admin'))||false)
}

  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  const [open, setOpen] = useState(false)
  const handleAvatar = () => setOpen(!open)
  const handleLogOut = () => {
    window.localStorage.removeItem('signedIn')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('user_token')
    window.localStorage.removeItem('admin')
    setAdmin(false)
    setUser(false)
    history.push('/app/home')
  }

 
 return (



<div className="w-screen h-[80px] drop-shadow-lg relative z-10 ">
            <div className="px-2 flex justify-between items-center w-full h-full">

                <h1 className="font-bold mx-4 text-3xl md:text-3xl xl:text-5xl">RENTED WHEELS.</h1>
                <ul className="hidden lg:flex items-center">
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/addCars">Garage</Link>
                    </li>
                    <li>
                        <Link to="/admin/request">Requests</Link>
                    </li>
                    
                </ul>


                <div className="hidden lg:flex mx-16">
                    {!user && <div>
                        <Link to="/app/signin">
                            <button className="bg-transparent hover:bg-indigo-600 hover:text-white lg:px-8 py-3 text-black mr-4 rounded-full">
                                Sign In
                            </button>
                        </Link>
                        <Link to="/app/signup">
                            <button className="px-8 py-3 rounded-full">
                                Sign Up
                            </button>
                        </Link>
                    </div>}


                    {user && <div className="ml-10 mr-10 px-8  " onClick={handleAvatar}>
                        <img className="h-[50px] w-[100px]" src={profile} />


                        <ul className={!open ? 'hidden' : 'absolute mt-3  bg-white rounded-2xl px-4 py-4'} >
                        <div className="text-[#f9a826]">
                            {userName}
                        </div>
                           
                            <li onClick={handleLogOut} className="hover:bg-gray-200 w-full">Log Out</li>


                        </ul>

                    </div>}
                </div>
                <div className="lg:hidden block" onClick={handleClick}>
                    {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}

                </div>
            </div>

            <ul className={!nav ? 'hidden' : 'absolute bg-white w-full px-8 text-center  lg:hidden'} >
                <li className=" w-full">Home</li>
                <li className=" w-full">About</li>
              
                <div className="flex flex-col my-4">
                    <button className="bg-transparent text-indigo-600 px-7 py-3 mb-3 ">
                        <a href="/signin">Sign In</a>
                    </button>
                    <button className="px-7 py-3">Sign Up</button>
                </div>
            </ul>
            <div>



            </div>

         
    
                        
    
        </div>
  )
}

export default Admin