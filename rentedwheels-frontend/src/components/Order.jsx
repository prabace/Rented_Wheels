import React from 'react'
import raptor from '../assets/ford-raptor.jpg'
import ConstructionIcon from '@mui/icons-material/Construction';
import SpeedIcon from '@mui/icons-material/Speed';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

import Review from './Review';
import profile from '../assets/profile.svg'
import Rating from '@mui/material/Rating';
import { useState, useEffect } from 'react';



const Order = (props) => {

    const [submitted, setSubmitted] = useState(false)
    const [rating,setRating]= useState(0)
    const [comment,setComment]= useState('')
    const [reviews, setReviews] = useState([])
    const [vehicle, setVehicle] = useState({})



    async function getReviews() {
        const access_token = window.localStorage.getItem('user_token')
        const response = await fetch(`http://localhost:8080/ratings/${props.id}`, {
          method: "GET",
          headers:{
            'Authorization':`Bearer ${access_token}`
          }
        });
        const data = await response.json();
        setReviews(data)
        return
      }
    async function getVehicle() {
        const access_token = window.localStorage.getItem('user_token')
        const response = await fetch(`http://localhost:8080/getVehicle/${props.id}`, {
          method: "GET",
          headers:{
            'Authorization':`Bearer ${access_token}`
          }
        });
        const data = await response.json();
        setVehicle(data)
        return
      }
    useEffect(() => {
        getReviews()
        getVehicle()
      }, [props.id])

    const handleSubmit=async (evt)=>{
        const userID=parseInt(window.localStorage.getItem('id'))
        const vehicleID=parseInt(props.id)
        evt.preventDefault()
        const sendData={
            rating:rating,
            comment:comment
        }

        const access_token = window.localStorage.getItem('user_token')

        const response = await fetch (`http://localhost:8080/rate/${userID}/${vehicleID}?comment=${comment}&rating=${rating}`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        })
        const data= await response.text()
        if(data==='Rated'){
            const response1=await fetch(`http://localhost:8080/rating/${props.id}`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
            })
            const data1= await response1.text()
            const vehicleReview= parseInt(vehicle.vehicleReview)+1
            const response = await fetch (`http://localhost:8080/updateVehicle`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    ...vehicle,
                    vehicleRating:data1,
                    vehicleReview:vehicleReview,
                })
            })
            const data2= await response.json()
        }
        console.log(data)
        setRating(0)
        setComment('')
        await getReviews()
        return
    }


    return (
        <div className=''>
            <div className=''>
                <div className='mx-4 flex flex-row justify justify-between mt-4'>
                    <p className='text-2xl font-semibold'>{props.vehicleName}</p>
                    
                </div>
                
                <div className='flex justify justify-center'>

                    <img className='w-auto h-[250px] lg:h-[200px]' src={props.vehicleImage} />
                </div>
                <div className='flex flex-row justify-between mx-2 my-4'>
        <h2 className='mt-4 text-2xl font-medium'>Total</h2>
        {
            !isNaN(props.days)&&
            <h2 className='flex flex-row text-2xl font-medium' href='#'>Rs.{props.vehiclePrice * props.days}</h2>

        }
      </div>
                <div className='flex flex-row'>


                    <div className='flex flex-row shadow-2xl my-8 px-4 py-2 w-1/3 rounded-2xl'>
                        <div className='flex flex-col '>

                            <div className='text-gray-600 text-md '>
                                Max.Power
                            </div>
                            <div className='mt-3 font-bold text-lg text-[#f9a826]'>
                                {props.maxPower}
                            </div>
                            <div className='text-gray-500'>
                                hp
                            </div>

                        </div>
                        <div className='my-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto hidden lg:block text-[#f9a826]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                    </div>
                    <div className='flex flex-row shadow-2xl mx-2 my-8 px-4 py-2 w-1/3 rounded-2xl'>
                        <div className='flex flex-col '>

                            <div className='text-gray-600 text-md '>
                                Acceleration
                            </div>
                            <div className='mt-3 font-bold text-lg text-[#f9a826]'>
                                {props.accelerationTime}
                            </div>
                            <div className='text-gray-500'>
                                sec
                            </div>

                        </div>
                        <div className=' my-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto hidden lg:block text-[#f9a826]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className='flex flex-row shadow-2xl mx-2 my-8 px-4 py-2 w-1/3 rounded-2xl'>
                        <div className='flex flex-col '>

                            <div className='text-gray-600 text-md'>
                                TopSpeed
                            </div>
                            <div className='mt-3 font-bold text-lg text-[#f9a826]'>
                                {props.topSpeed}
                            </div>
                            <div className='text-gray-500'>
                                mph
                            </div>

                        </div>
                        <div className=' my-10 '>
                            <svg xmlns="http://www.w3.org/2000/svg" class=" h-10 w-auto hidden lg:block text-[#f9a826]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>

                </div>
                <div className='mx-2 my-5'>
                    <h2 className='text-xl'> Give reviews and ratings</h2>
                </div>
                <form id="review_form" onSubmit={handleSubmit}>
                <div className='mx-2 flex grid-cols-2'>
                    <div>
                        <img className='w-20 h-12' src={profile} />
                    </div>
                    <div className='flex flex-col'>
                        <Rating name="half-rating" defaultValue={rating} onChange={(evt,value)=> setRating(value)}/>
                        <div className='flex flex-row'>
                            <textarea className='rounded-lg  border-slate-200 w-[400px]'
                                placeholder="What's your feedback"
                                value={comment}
                                onChange={(evt)=> setComment(evt.target.value)}
                            />
                        </div>
                        <div className='flex flex-row '>
                            <button type='submit' form="review_form" className='px-6 py-2 my-2 rounded-full bg-[#f9a826] border-[#f9a826] hover:text-[#f9a826]'>Submit</button>
                        </div>

                    </div>

                </div>
                </form>
                <div>
                <div className=' mx-2 my-5'>
                     <h1 className='text-3xl font-medium px-4 my-8'>Reviews</h1>
                    {
                        Object.keys(reviews).map((key) => 
                        <Review ratings={reviews[key].ratings} comment={reviews[key].comment} 
                        username={reviews[key].userName}
                        ratingDate={reviews[key].ratingDate}
                        />)

                    }
                </div>
                </div>



            </div>
        </div>

    )
}

export default Order