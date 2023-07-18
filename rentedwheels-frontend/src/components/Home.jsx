import sane from '../assets/sane.png'
import { React, useEffect } from 'react';

function Home() {

  // useEffect(() => {
  //   async function getToken() {
  //   const response=  await fetch(`http://localhost:8080/api/login?username=barca123&password=123456`, {
  //       method: "POST",
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //     },
      
      
      
  //     })

  //     console.log('response', response)
      
  //     const data = await response.json()
  //     console.log(data)
      
  //     window.localStorage.setItem("token",data)

  //   }
  //   getToken()
  // }, [])




   

  return (
    

    <div className=' w-full h-screen static '>
       <img className=' w-full h-full object-cover hidden lg:block ' src={sane} />
       <div className='w-full h-full mt-20 absolute top-0 flex flex-col justify-center text-left md:text-6xl lg:text-5xl text-4xl font-semibold font-body text-black p-9 mx-5 '>
        <h1>Easy and fast way</h1>
        <h1>to rent your car</h1>
        <div className='w-full font-light my-7 text-lg text-slate-500 md:text-xl justify-center flex flex-col lg:justify-end py-5'>
        <p className='w-full md:max-w-[75%] lg:max-w-[75%] xl:max-w-[40%]'>
          Rented Wheels is the most used vehicle rental service in Nepal. Based on ratings and reviews from real users. Rented Wheels is the top-ranked vehicle rental service company. If you are planning to rent a car you cant trust us.
        </p>  
        <div className='py-10 font-sembold'>
        <button className='px-7 py-4 rounded-full bg-[#f9a826] border-[#f9a826] hover:text-[#f9a826]'><a href="/app/cars">Rent a Vehicle</a></button>
        </div>
        
        </div>
    </div>
   </div>
 
 
   
  )
}

export default Home;