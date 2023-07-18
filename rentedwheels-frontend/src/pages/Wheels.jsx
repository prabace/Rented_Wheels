import React from 'react'
import bike from '../assets/bike.png'
import car from '../assets/car.png'

function Wheels() {
  return (
    <div>
        <div  className='w-full h-screen justify-center grid grid-cols-2'>
        <img className='h-screen object-contain max-w-[80%]' src={bike} />
        
        <div className='w-full h-screen bg-red-200 '>
        <img className='h-screen object-contain max-w-[80%] ' src={car} />
        </div>
        </div>
        
    </div>
  )
}

export default Wheels