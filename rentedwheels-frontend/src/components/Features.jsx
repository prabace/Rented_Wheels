import React from 'react'

export default function Features() {
  return (
    

    <div className='w-full  mt-56'>
        <h1 className='text-4xl text-center font-bold'>Why Choose Rented Wheels?</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black'>
            <div className='bg-white rounded-xl shadow-2xl'>
                <div className='p-20 '>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 text-[#f9a826]" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                    </svg>
                <h3 className='text-3xl lg:text-xl mt-5 font-semibold'>Fast & Easy Booking</h3>
                <p className='mt-5'>Book your vehicle online or offline. Follow the easy process to book your vehicle online. Or just call us any time from anywhere.</p>
                <button className='px-5 py-3 mt-5 rounded-full bg-[#f9a826] border-[#f9a826] hover:text-[#f9a826]'><a href="/app/cars">Book Now</a></button>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-2xl'>
                <div className='p-20'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 text-[#f9a826]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <h3 className='lg:text-xl mt-5 font-semibold'>Extensive Vehicle Choices</h3>
                <p className='mt-5'>We provide wide range of different varities of vehciles. Choose one that suits you the best.</p>
                <button className='px-5 py-3 mt-5 rounded-full bg-[#f9a826] border-[#f9a826] hover:text-[#f9a826]'><a href="/app/cars">Expore Options</a></button>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-2xl'>
                <div className='p-20'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12  text-[#f9a826]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
                </svg>
                <h3 className='text-3xl lg:text-xl mt-5 font-semibold'>Satisfied Costumers</h3>
                <p className='mt-5'>We have 10,000+ happy costumers and it's increasing. View our review section to get their feedback about our service.</p>
                <button className='px-5 py-3 mt-5 rounded-full bg-[#f9a826] border-[#f9a826] hover:text-[#f9a826]'>Check Reviews</button>
                </div>
            </div>

        </div>
    </div>

  )
}