import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Categories from './Categories'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import raptor from '../assets/ford-raptor.jpg'


const Bikecard = (props) => {

  const svg = props.type == "electric" ? <svg xmlns="http://www.w3.org/2000/svg" class="h-12 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg> : <svg xmlns="http://www.w3.org/2000/svg" class="h-12 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
</svg>

  return (


    <div className='flex grid grid-cols-1'>
   

      <img className='h-[150px] w-auto' src={props.img} />

      <div className='shadow-2xl rounded-lg px-2 py-2' >
        <h3 className='text-xl'>{props.title}</h3>
        <div className='flex flex-row py-3 my-2'>
          <h2 className='text-lg font-medium'>Rs.{props.price}/Day</h2>
        </div>
        <div className='-mt-5 flex flex-row'>
          <Rating name="read-only" value={props.vehicleRating} readOnly />
          <h6 className='ml-4 text-gray-500'>{props.vehicleReview} Reviews</h6>

        </div>
        <Link to={`/app/checkout?id=${props.id}`}>
        <button className='px-5 mt-4 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>Book Now</button> 
        </Link>
      </div>







    </div>



  )
}

export default Bikecard