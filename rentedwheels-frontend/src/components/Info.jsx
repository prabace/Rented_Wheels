import React, { useState, useEffect } from 'react'
import raptor from '../assets/raptor.jpg'
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'



const Info = (props) => {

  const [vehicle, setVehicle] = useState({})


console.log(props)


  return (
    <div className='py-5 flex justify justify-center items-center'>


      <div className='h-[100%] w-screen grid grid-cols-2 gap-x-40'>




        <div className='flex flex-col  gap-y-4 py-6'>
          <div>
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-3xl'>{props.vehicleName}</h1>
            </div>
            <div>
              <Rating name="read-only" precision={0.1} value={parseFloat(props.vehicleRating)} readOnly />
            </div>
          </div>
          <div>
            <p className='text-gray-500'>
              The {props.vehicleName} also offers a spacious and comfortable interior, equipped with advanced technology and safety features. With a standard and quality engine along with {props.autoManual} transmission, it makes for a durability and quality you would want.
            </p>
          </div>
          <div className='flex flex-row gap-x-2 mt-2'>
            <div className='flex flex-col '>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className='text-sm text-gray-400'>
                {props.seats} seats
              </div>
            </div>

            <div className='flex flex-col '>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              <div className='ml-4 text-sm text-gray-400'>
                {props.ac}
              </div>
            </div>

            <div className='flex flex-col'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className='ml-2 text-sm text-gray-400'>
                {props.fuelElectric}
              </div>
            </div>


            <div className='flex flex-col'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <div className='ml-2 text-sm text-gray-400'>
                {props.autoManual}
              </div>
            </div>
          </div>
          <div>
            <Link to={`/app/checkout?id=${props.id}`}>
              <div>
                {!props.booked ?
                  <button className='px-5 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>Book Now</button> :
                  <button disabled className='px-8 py-2 rounded-full w-full text-slate-500 bg-white border-slate-400 hover:text-slate-500 '>Book Now</button>
                }
              </div>
            </Link>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <img className=' rounded-2xl' src={props.vehicleImage} />
        </div>
      </div>

    </div>
  )
}

export default Info