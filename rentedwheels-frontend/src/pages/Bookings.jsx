import {React, useEffect, useState} from 'react'


const Bookings = () => {
    const [bookingData, setbookingData]= useState([])
    
    async function getbookingData() {    
        const id = window.localStorage.getItem('id')
        const access_token = window.localStorage.getItem('user_token')
        const response=  await fetch(`http://localhost:8080/getBookingByUserId/${id}`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${access_token}`,
        },})
        const data = await response.json()
        setbookingData(data)
    }
    useEffect(() => {
        getbookingData()
    },[])
    function date_to_day(begin, end) {
        var date1 = new Date(begin);
        var date2 = new Date(end);

        // To calculate the time difference of two dates
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Days
    }
    
    const handleCancleBooking = async (evt,id) => {
        const access_token = window.localStorage.getItem('user_token')
        const response = await fetch(`http://localhost:8080/deleteBooking/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        })
        const data = await response.json()
        console.log(data)
        getbookingData()
    }
    
    const displayBooking = Object.keys(bookingData).map((key) =>{
    const days= date_to_day(bookingData[key].fromDate, bookingData[key].toDate)
    const today= new Date()
    const bookingEnd= new Date(bookingData[key].toDate)
    return <div className='grid grid-cols-4  gap-x-20 shadow-[1px_4px_20px_10px_#00000024] p-20 mx-10'>
                       
                    
                        <div className=''>
                            <h1 className='text-xl'>{bookingData[key].vehicle.vehicleName}</h1>
                            <div className='mt-4'>
                                <img className='object-contain h-50 w-auto' src={bookingData[key].vehicle.vehicleImage} />
                            </div>

                            <div className='grid grid-cols-2 gap-x-20 mt-10'>
                                <div className='flex flex-row gap-x-20'>
                                    <div>
                                        <h1 className='text-3xl'>Total</h1>
                                    </div>

                                    <div className='flex justify-between gap-x-10'>
                                        <h1 className='text-3xl'>Rs.{parseInt(bookingData[key].vehicle.vehiclePrice)*days}</h1>
                                   
                                    
                                    <div className='mx-80'>

                                    </div>
                                    
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <h1 className='text-xl'>Booking Date</h1>
                            <div className='w-full  mt-4'>
                                {bookingData[key].fromDate} - {bookingData[key].toDate}
                            </div>
                        </div>

                        <div>
                            <h1 className='text-xl'>Status</h1>
                            <div className='mt-4'>
                                <div className='w-[100px] border-2 rounded-full bg-gray-200 flex items-center justify-center'>
                                {bookingData[key].bookingStatus}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-xl'>Action</h1>
                            <div className='w-full  mt-4 '>
                            <button onClick={(evt)=>handleCancleBooking(evt, bookingData[key].id)} className='p-2  rounded-full'>Cancel Booking</button>
                            </div>
                        </div>
                        
                    </div>
                
    
});
    return (
        <div className=''>
           <h1 className='font-semibold text-2xl px-10 mb-10 mt-10'>My Bookings</h1>

                {displayBooking}

            </div>
        
    )
}

export default Bookings