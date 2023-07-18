import {React, useEffect, useState} from 'react'


const Myvehicles = () => {
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
    return <div className='grid grid-cols-3'>
                       
                    <div className='mx-6 my-8 flex flex-row gap-x-80'>
                        <div className=''>
                            <h1 className='text-xl'>{bookingData[key].vehicle.vehicleName}</h1>
                            <div className='mt-4'>
                                <img className='object-contain h-50 w-auto' src={bookingData[key].vehicle.vehicleImage} />
                            </div>

                            <div className='grid grid-cols-2 gap-x-80 mt-10'>
                                <div className='flex flex-row gap-x-80'>
                                    <div>
                                        <h1 className='text-3xl'>Total</h1>
                                    </div>

                                    <div className='flex justify-between gap-x-10'>
                                        <h1 className='text-3xl'>Rs.{parseInt(bookingData[key].vehicle.vehiclePrice)*days}</h1>
                                   
                                    
                                    <div className='mx-80'>
                                        <button onClick={(evt)=>handleCancleBooking(evt, bookingData[key].id)} className='px-10 py-2  rounded-full'>Delete</button>
                                    </div>
                                    
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <h1 className='text-xl'>BookingDate</h1>
                            <div className='w-full  mt-4'>
                                {bookingData[key].fromDate} - {bookingData[key].toDate}
                            </div>
                        </div>

                        <div>
                            <h1 className='text-xl'>Status</h1>
                            <div className='mt-4'>
                                {today > bookingEnd ? 'Completed' : 'Pending'}
                            </div>
                        </div>
                        
                    </div>
                </div>
    
});
    return (
        <div className='h-screen  my-10 mx-10'>
            <div className=' shadow-2xl  '>
            <h1 className='font-semibold text-2xl '>My Vehicles</h1>

                {displayBooking}

            </div>
        </div>
    )
}

export default Myvehicles