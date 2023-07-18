import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Categories from './Categories';
import 'react-tooltip/dist/react-tooltip.css'
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import { Updatecars } from './Updatecars';
import { CheckCircleIcon } from '@heroicons/react/outline';



const Carcard = (props) => {


  const [openForm, setOpenForm] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const username = props.username ? props.username : ''


  const svg = props.type == "electric" ? <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>

  const handleDelete = async () => {
    setSnackbarOpen(true);
    const access_token = window.localStorage.getItem('user_token')
    const response = await fetch(`http://localhost:8080/deleteVehicle/${props.id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    const data = await response.text();
    window.location.reload();
  }

  const localuser = window.localStorage.getItem('username')

  const handleAccept = async () => {
    const access_token = window.localStorage.getItem('user_token')
    const response = await fetch(`http://localhost:8080/updateVehicle/`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...props.updateVehicleData, vehicleStatus: 'accepted' })

    });
    const data = await response.text();
    window.location.reload();
  }
  console.log(props)

  let buttonCondition

  if (props.user == 'admin') {
    buttonCondition =
      <div>
        {props.history.location.pathname.split("/")[2] !== "request" ?
          <div>
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <button onClick={() => setOpenForm(true)} className='px-10 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>Update</button>
               
              </div>
              <div>
                <button type="button" onClick={handleDelete} className='px-10 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>
                  Delete</button>

              </div>
            </div>

            <div className="mt-4">
              <Link to={`/admin/adminReview?id=${props.id}`}><button className='px-10 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>Check Reviews</button></Link>
            </div>

          </div>


          : <div className="mt-4">
            <button onClick={handleAccept} className='px-10 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>Accept</button>
          </div>

        }
      </div>
  }


  else if (props.username == localuser) {
    buttonCondition = <div>
      <div className='flex flex-row justify justify-between'>
        <div>
          <button onClick={() => setOpenForm(true)} className='px-10 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>Update</button>
        </div>
        <div>
          <button type="button" onClick={handleDelete} className='px-10 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>Delete</button>
          <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleSnackbarClose}
                >
                  <MuiAlert onClose={handleSnackbarClose} severity="success">
                    Vehicle deleted successfully.
                  </MuiAlert>
                </Snackbar>
        </div>
      </div>
    </div>
  } else {
    buttonCondition = <Link to={`/app/checkout?id=${props.id}`}>
      {/**passing vehicle id to used in checkout page */}
      <div className='grid grid-cols-2 gap-x-2'>

        <div>
          {!props.booked ?
            <button className='px-5 py-2 rounded-full w-full bg-[#f9a826] hover:bg-white hover:text-[#f9a826] border-[#f9a826]'>Book Now</button> :
            <button disabled className='px-8 py-2 rounded-full w-full text-slate-500 bg-white border-slate-400 hover:text-slate-500 '>Book Now</button>
          }
        </div>

      </div>

    </Link>

  }

  let checkCondition

  if (props.booked) {
    checkCondition = <h6 className=' px-2 bg-red-500 rounded-full text-white'>Booked</h6>
  } else if (props.status == "pending") {
    checkCondition = <h6 className=' px-2 bg-yellow-300 rounded-full text-white  text-sm'>Pending</h6>
  } else {
    checkCondition = <h1 className='hidden'>Not booked</h1>
  }


  return (


    <div className=''>
      <div className='shadow-2xl rounded-lg px-4 py-2 '>


        <img className='h-[150px] w-auto' src={props.img} />

        <div className='' >
          <div className='flex flex-row justify justify-between'>
            <div>
              <h3 className='text-xl '>{props.title}</h3>
            </div>
            <div>
              {checkCondition}
            </div>
          </div>
          <div className='flex flex-row py-3 my-2 gap-x-40'>
            <div>
              <h2 className='text-lg font-medium -mt-3'>Rs.{props.price}/Day</h2>
            </div>

            <div className='-mt-4'>

              {props.addedByUser && !["prabeshdace"].includes(username)?
                <Tooltip title={username}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />

                    </svg></div></Tooltip> :
                <h1 className='hidden'>no logo</h1>
              }

            </div>

          </div>
          <div className='-mt-5 flex flex-row justify-between'>
            <Rating name="read-only" precision={0.1} value={parseFloat(props.vehicleRating)} readOnly />

            <h6 className='ml-4 text-gray-500'>{props.reviews} reviews</h6>



          </div>

          <div className='flex flex-row gap-x-2 mt-2'>
            <div className='flex flex-col '>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className='text-sm'>
                {props.seats} seats
              </div>
            </div>

            <div className='flex flex-col'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              <div className='ml-4 text-sm'>
                {props.ac}
              </div>
            </div>

            <div className='flex flex-col'>
              {svg}
              <div className='ml-2 text-sm'>
                {props.source}
              </div>
            </div>

            <div className='flex flex-col'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 border rounded-2xl bg-gray-100 text-blue-500 mr-3 px-3 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <div className='ml-2 text-sm'>
                {props.transmission}
              </div>
            </div>
          </div>
          <div className='my-4'>
            {
              buttonCondition
            }
            {openForm && <Updatecars vehicleData = {props} id={props.id} onClose={() => setOpenForm(false)} />}

          </div>
        </div>
      </div>

    </div>



  )
}

export default Carcard