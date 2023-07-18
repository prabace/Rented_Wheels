import React, {useState, useEffect} from 'react'
import raptor from '../assets/tesla.jpg'

const Vehiclehistory = () => {

    const [bookings, setBookings] = useState('')
    const access_token = window.localStorage.getItem('user_token')
    const localUser = window.localStorage.getItem('username')

    function date_to_day(begin, end) {
        var date1 = new Date(begin);
        var date2 = new Date(end);

        // Calculate today's date
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        // // Check if the selected date is before today
        // if (date1 < today || date2 < today) {
        //     return -1; // Return -1 to indicate an invalid date
        // }

        // To calculate the time difference of two dates
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Days
    }



    async function getBookings(access_token) {
        const response = await fetch(`http://localhost:8080/getBookings`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        const data = await response.json();

        setBookings(data)

    }

    useEffect(() => { 
            getBookings(access_token)
    })

    console.log(bookings)

    const display = Object.keys(bookings).filter(keys=>bookings[keys].vehicle.username===localUser)
    .map(keys=><div className=''>
  
       <div className='px-10 mb-4 border-2 rounded-2xl mx-10 shadow-2xl'>
    
        <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-row gap-x-10 py-4'>
               <img alt="logo" className='object-cover w-[100px] rounded-full h-[100px]' src={bookings[keys].vehicle.vehicleImage}/>

                <div className='flex flex-col gap-y-2 '>
                <div className='flex flex-row gap-x-4'>
                     <div className='text-[#B3B5B4] font-semibold'>{bookings[keys].vehicle.vehicleName}</div>
                     {/* <div className='bg-[#5EA4A3] font-semibold text-white px-3 rounded-2xl'>new!</div>
                     <div className='bg-[#313938] font-semibold text-white px-3 rounded-2xl'>featured</div> */}
                </div>
                
                <div className='text-lg text-[#313938] font-bold'> 
                {bookings[keys].firstName} {bookings[keys].lastName}
                </div>
                
                <div className=' text-[#B3B5B4] flex flex-row gap-x-4'>
                     <div>booked for {date_to_day(bookings[keys].fromDate, bookings[keys].toDate)} days</div>
                     <div>.</div>
                     <div>{bookings[keys].city} -&gt; {bookings[keys].destination}</div>
                </div>
            </div>
            </div>

            

            <div className='flex flex-row gap-x-4 items-end justify-end'>
                
                <div className='border-2 px-3 rounded-2xl bg-[#F0FAF7] font-semibold text-[#80A8A5]'>{bookings[keys].vehicleDispatched?"Dispatched":"Idle"}</div>
                <div className='border-2 px-3 rounded-2xl bg-[#F0FAF7] font-semibold text-[#80A8A5]'>{bookings[keys].bookingStatus}</div>
            </div>
        </div>
        </div>
        
       </div>)
   
  return (
    
    <div className='h-full mt-10 '>
      <div className='px-10 mb-10'>
    <h1 className='text-2xl'>Your Vehicle Status</h1>
    </div>
    <div className='mb-4'>
            {display}
    </div>
        </div>
    

  )
}

export default Vehiclehistory