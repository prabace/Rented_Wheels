import React from 'react'
import Success from '../assets/success.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Approved = () => {
  return (
    <div className='w-full h-screen fixed mt-20'>
        <div className=' flex flex-col justify justify-center items-center'>
        <div>
        <img src={Success}/>
        </div>
        <div>
            <h1>Congratulations! Your email has been successfully verified.</h1>
        </div>
        <div className='mt-4'>
          <Link to = "/app/signin">  <button className='p-2'>Jump to Login</button></Link>
        </div>
        </div>
    </div>
  )
}

export default Approved