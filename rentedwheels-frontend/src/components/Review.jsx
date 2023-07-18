import React from 'react'
import profile from '../assets/profile.svg'
import Rating from '@mui/material/Rating';

function Review({ratings, comment, ratingDate, username}) {
    const date = new Date(ratingDate)
    const showDate= `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    return (
        <div className=' grid-cols-5 divide-y'>
        <div className='flex grid-cols-2 my-5'>
        <div className='flex flex-row'>
           <img className='w-20 h-12' src={profile} alt="profile-avatar"/>
        </div>
        <div className='flex flex-col'>
            <div>
           <h1> {username}</h1>
           </div>
            <div className='text-sm text-slate-500'>
            <h3>{showDate}</h3>
            </div>
            <div className='mt-4'>
            <Rating name="read-only" value={parseInt(ratings)} readOnly />
            </div>
            <div className='mt-4'>
            <h3>
               {comment}
            </h3>
            </div>
        </div>
    </div>    

        </div>
    )
}

export default Review