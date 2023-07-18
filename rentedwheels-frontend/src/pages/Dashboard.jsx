import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Chart from '../components/Chart'

function Dashboard() {
    const [bookings, setBookings] = useState('')
    const [userCount, setuserCount] = useState(0)
    const [vehicleCount, setvehicleCount] = useState(0)
    const [activeButton, setactiveButton] = useState('Request')

    const access_token = window.localStorage.getItem('user_token')

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



    const handleAccept = async (id) => {

        const response = await fetch(`http://localhost:8080/verifyBooking?id=${id}&bookingStatus=Accepted`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        await getBookings(access_token)

    }

    const handleDispatch = async (id) => {

        const response = await fetch(`http://localhost:8080/vehicleDispatchStatusTrue/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        await getBookings(access_token)

    }

    const handleIdle = async (id,vehicleId) => {

        const response = await fetch(`http://localhost:8080/vehicleDispatchStatusFalse/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        const response2 = await fetch(`http://localhost:8080/verifyBooking?id=${id}&bookingStatus=Completed`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        console.log(vehicleId)

        const response3 = await fetch(`http://localhost:8080/changeBookingStatus/${vehicleId.id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        await getBookings(access_token)

    }

    const handleReject = async (id, vehicleId) => {

        const response = await fetch(`http://localhost:8080/verifyBooking?id=${id}&bookingStatus=Rejected`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        console.log(vehicleId)

        const response2 = await fetch(`http://localhost:8080/changeBookingStatus/${vehicleId.id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        await getBookings(access_token)

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

    const bookingCount = Object.keys(bookings).filter(keys => bookings[keys].bookingStatus !== "Rejected")

    useEffect(() => {


        async function getallUsers(access_token) {


            const response2 = await fetch('http://localhost:8080/getUsers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            const result2 = await response2.json()
            setuserCount(result2.length)
        }
        async function getallVehicles(access_token) {


            const response = await fetch(`http://localhost:8080/getVehicles`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            const data = await response.json();
            setvehicleCount(data.length)
        }
        getBookings(access_token)
        getallUsers(access_token)
        getallVehicles(access_token)
    }, [])
    console.log(bookings)

    const Request = Object.keys(bookings).sort((a,b)=>{
        return Date(a.fromDate)-Date(b.fromDate)
    }).filter(keys => bookings[keys].bookingStatus !== "Rejected"&& bookings[keys].bookingStatus !== "Completed").map(keys =>
       
        <div className='h-full w-[100%] mt-10 '>
            <div className=''>
                <div className='px-5 border-2 rounded-2xl mx-4 shadow-2xl'>

                    <div className='grid grid-cols-3 items-center'>
                        <div className='flex flex-row gap-x-10 py-4'>
                            <img alt="logo" className='object-cover w-[100px] rounded-full h-[100px]' src={bookings[keys].vimage} />

                            <div className='flex flex-col gap-y-2 '>
                                <div className='flex flex-row gap-x-4'>
                                    <div className='text-[#B3B5B4] font-semibold'>{bookings[keys].vname}</div>
                                    {/* <div className='bg-[#5EA4A3] font-semibold text-white px-3 rounded-2xl'>new!</div>
                         <div className='bg-[#313938] font-semibold text-white px-3 rounded-2xl'>featured</div> */}
                                </div>

                                <div className='text-lg text-[#313938] font-bold'>
                                    {bookings[keys].bookedBy.emailAddress.split("@")[0]}
                                </div>

                                <div className=' text-[#B3B5B4] flex flex-row gap-x-4 w-[400px]'>
                                    <div>booked for {date_to_day(bookings[keys].fromDate, bookings[keys].toDate)} days</div>
                                    <div>.</div>
                                    <div>{bookings[keys].vnumber}</div>
                                    <div>.</div>
                                    <div>{bookings[keys].destination}</div>
                                </div>
                            </div>
                        </div>

                        <div className='ml-60 flex justify-center items-center rounded-2xl bg-[#F0FAF7] font-semibold text-[#80A8A5]'>
                          {bookings[keys].bookingStatus}
                        </div>



                        <div className='flex flex-row gap-x-4 items-end justify-end'>
                            {bookings[keys].bookingStatus=="Accepted"&& !bookings[keys].vehicleDispatched&&
                            <div className=''>
                                <button 
                                onClick={() => handleDispatch(bookings[keys].id)}
                                className='border-2 px-3 rounded-2xl bg-[#F0FAF7] font-semibold text-[#80A8A5]'>
                                    Dispatch
                                </button>
                            </div>}

                            {bookings[keys].bookingStatus=="Accepted"&&bookings[keys].vehicleDispatched&&
                            <div className=''>
                                <button 
                                onClick={() => handleIdle(bookings[keys].id, bookings[keys].vehicle)}
                                className='border-2 px-3 rounded-2xl bg-[#F0FAF7] font-semibold text-[#80A8A5]'>
                                   Idle
                                </button>
                            </div>}

                            {bookings[keys].bookingStatus === "Pending" &&
                            <div className='flex flex-row gap-x-2'>
                            <div>
                                <svg
                                    onClick={() => handleAccept(bookings[keys].id)}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="green" class="w-6 h-6">

                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>


                            </div>
                            <div>
                                <svg
                                    onClick={() => handleReject(bookings[keys].id, bookings[keys].vehicle)}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="red" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>



                            </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )


    const Trash = Object.keys(bookings).sort((a,b)=>{
        return Date(a.fromDate)-Date(b.fromDate)
    }).filter(keys=>bookings[keys].bookingStatus!=="Accepted").map(keys =>
       
        <div className='h-full w-[100%] mt-10 '>
            <div className=''>
                <div className='px-5 border-2 rounded-2xl mx-4 shadow-2xl'>

                    <div className='grid grid-cols-3 items-center'>
                        <div className='flex flex-row gap-x-10 py-4'>
                            <img alt="logo" className='object-cover w-[100px] rounded-full h-[100px]' src={bookings[keys].vimage} />

                            <div className='flex flex-col gap-y-2 '>
                                <div className='flex flex-row gap-x-4'>
                                    <div className='text-[#B3B5B4] font-semibold'>{bookings[keys].vname}</div>
                                    {/* <div className='bg-[#5EA4A3] font-semibold text-white px-3 rounded-2xl'>new!</div>
                         <div className='bg-[#313938] font-semibold text-white px-3 rounded-2xl'>featured</div> */}
                                </div>

                                <div className='text-lg text-[#313938] font-bold'>
                                    {bookings[keys].bookedBy.emailAddress.split("@")[0]}
                                </div>

                                <div className=' text-[#B3B5B4] flex flex-row gap-x-4 w-[400px]'>
                                    <div>Booked for {date_to_day(bookings[keys].fromDate, bookings[keys].toDate)} days</div>
                                    <div>.</div>
                                    <div>{bookings[keys].vnumber}</div>
                                    <div>.</div>
                                    <div>{bookings[keys].destination}</div>
                                </div>
                            </div>
                        </div>

                        <div className='ml-60 flex justify-center items-center rounded-2xl bg-[#F0FAF7] font-semibold text-[#80A8A5]'>
                          {bookings[keys].bookingStatus}
                        </div>



                        <div className='flex flex-row gap-x-4 items-end justify-end'>
                            {bookings[keys].bookingStatus=="Accepted"&& !bookings[keys].vehicleDispatched&&
                            <div className=''>
                                <button 
                                onClick={() => handleDispatch(bookings[keys].id)}
                                className='border-2 px-3 rounded-2xl bg-[#F0FAF7] font-semibold text-[#80A8A5]'>
                                    Dispatch
                                </button>
                            </div>}

                            {bookings[keys].bookingStatus=="Accepted"&&bookings[keys].vehicleDispatched&&
                            <div className=''>
                                <button 
                                onClick={() => handleIdle(bookings[keys].id, bookings[keys].vehicle)}
                                className='border-2 px-3 rounded-2xl bg-[#F0FAF7] font-semibold text-[#80A8A5]'>
                                   Idle
                                </button>
                            </div>}

                            {bookings[keys].bookingStatus === "Pending" &&
                            <div className='flex flex-row gap-x-2'>
                            <div>
                                <svg
                                    onClick={() => handleAccept(bookings[keys].id)}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="green" class="w-6 h-6">

                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>


                            </div>
                            <div>
                                <svg
                                    onClick={() => handleReject(bookings[keys].id, bookings[keys].vehicle)}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="red" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>



                            </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
    return (
        <div className=' mx-20 my-20 h-screen'>

            <div className=' '>
                <div className='grid grid-cols-1 gap-x-8'>
                <h1 className='font-semibold text-2xl'>Review</h1>
                    <div className='grid grid-cols-3 flex items-center justify-center gap-x-4  rounded-lg p-4'>
                    
                        <div className='shadow-[-1px_1px_11px_1px_#00000024] rounded-lg flex flex-row gap-x-5 justify-center items-center'>
                            <div className='flex flex-col gap-y-8'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-14  ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className='flex flex-col gap-y-8 items-center'>
                                        <div className=' '>
                                            <h2 className='text-2xl'>  Products </h2>
                                        </div>
                                        <div>
                                            <h2 className='text-lg mb-4 bg-orange-200 px-2 rounded-lg '>+{vehicleCount}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className='shadow-[-1px_1px_11px_1px_#00000024] rounded-lg flex flex-row gap-x-5 justify-center items-center'>
                            <div className='flex flex-col gap-y-8 i'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="Blue" className="w-14  ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>

                                </div>
                                <div>
                                    <div className='flex flex-col gap-y-8 items-center'>
                                        <div className=' '>
                                            <h2 className='text-2xl'>  Users </h2>
                                        </div>
                                        <div>
                                            <h2 className='text-lg mb-4 bg-blue-200 px-2 rounded-lg'>+{userCount}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className='shadow-[-1px_1px_11px_1px_#00000024]  rounded-lg flex flex-row gap-x-5 justify-center items-center'>
                            <div className='flex flex-col gap-y-8'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="Green" class="w-14 ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                    </svg>

                                </div>
                                <div>
                                    <div className='flex flex-col gap-y-8 items-center'>
                                        <div className=' '>
                                            <h2 className='text-2xl'>  Orders </h2>
                                        </div>
                                        <div>
                                            <h2 className='text-lg mb-4 bg-green-200 px-2 rounded-lg'>+{bookingCount.length}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>




                    </div>


                </div>

                <div className=' bg-white  rounded-lg mt-12'>
                    <div className=' mx-4 py-4 px-2'>
                        <h1 className='text-2xl font-semibold'>Orders</h1>
                    </div>
                    <div className='mx-4 py-4 px-2 flex flex-row gap-x-4'>
                        <button onClick={()=>setactiveButton("Request")} className='px-2 py-1'>Requests</button>
                        <button  onClick={()=>setactiveButton("Trash")} className='px-2 py-1'>Records</button>
                    </div>
                    {/* <div className='border-2 bg-slate-200  my-5 mx-4 grid grid-cols-8 justify-items-center'>
                        <div className=''>
                            <h1 className='font-semibold'>Id</h1>
                        </div>
                        <div className=''>
                            <h1 className='font-semibold'>Username</h1>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Price</h1>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Payment</h1>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Vehicle Name</h1>
                        </div>

                        <div>
                            <h1 className='font-semibold'>Citizenship</h1>
                        </div>
                        <div>
                            <h1 className='font-semibold'>V.Number</h1>
                        </div>
                        <div>
                            <h1 className='font-semibold'>Status</h1>
                        </div>


                    </div> */}
                    <div className='py-4 px-2'>
                        {activeButton=="Request"?Request:Trash}
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Dashboard


