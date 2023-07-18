import React from 'react'

import Carcard from '../components/Carcard';
import Categories from '../components/Categories';
import raptor from '../assets/ford-raptor.jpg'
import prado from '../assets/prado.jpg'


import scorpio from '../assets/scorpio.jpeg'
import mustangy from '../assets/mustangy.png'
import { useState, useEffect } from 'react';
import { useFormControlUnstyledContext } from '@mui/base';
import { keys } from '@mui/system';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import RemoveRoadIcon from '@mui/icons-material/RemoveRoad';
import Sliders from '../components/Sliders';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
function Cars() {
  const [value] = React.useState();
  const [vehicleData, setvehicleData] = useState([])

  const [sliderValue, setSliderValue] = useState([0, 500])
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(6)


  const handleChange = (event, newValue) => {
    setSliderValue(newValue)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }
  useEffect(() => {
    async function getVehicles() {
      const access_token = window.localStorage.getItem('user_token')
      const response = await fetch(`http://localhost:8080/getVehicles`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      const data = await response.json();

      setvehicleData(data)

    }
    getVehicles()
  }, [])

  console.log(vehicleData);

  const localusername = window.localStorage.getItem("username")

  //const [ data, setData ] = useState('')

  const display = Object.keys(
    vehicleData
  ).filter(function (el) {
    return (
      (filter === "" ||
        vehicleData[el].vehicleName
          .toLowerCase()
          .includes(filter.toLowerCase())) &&
      (sliderValue[0] === 0 || vehicleData[el].vehiclePrice >= sliderValue[0]) &&
      (sliderValue[1] === 0 || vehicleData[el].vehiclePrice <= sliderValue[1])
      &&
      vehicleData[el].vehicleStatus !== "pending"
      &&
      vehicleData[el].username !== localusername
    )
  }).map(keys => <Link to={`/app/carinfo?id=${vehicleData[keys].id}`}><Carcard
    price={vehicleData[keys].vehiclePrice}
    type={vehicleData[keys].vehicleType}
    username={vehicleData[keys].username}
    title={vehicleData[keys].vehicleName}
    reviews={vehicleData[keys].vehicleReview}
    value={vehicleData[keys].vehicleRating}
    addedByUser={vehicleData[keys].addedByUser}
    status={vehicleData[keys].vehicleStatus}
    id={vehicleData[keys].id}
    img={vehicleData[keys].vehicleImage}
    vehicleRating={vehicleData[keys].vehicleRating}
    booked={vehicleData[keys].booked}
    seats={vehicleData[keys].seats}
    ac={vehicleData[keys].ac}
    source={vehicleData[keys].fuelElectric}
    transmission={vehicleData[keys].autoManual}
  /> </Link>)

  console.log(vehicleData)
  /*Categories.map(el =>
  
       <Card price={el.price}
              type={el.type}
              title={el.title}
              img={el.img}
                 /> 
  )
  */

  const [select, setSelect] = useState("default")

  const filteredData = Object.keys(vehicleData).filter(function (el) {
    return (
      (vehicleData[el].vehicleType === select) &&
      (filter === "" ||
        vehicleData[el].vehicleName
          .toLowerCase()
          .includes(filter.toLowerCase())) &&
      (sliderValue[0] === 0 || vehicleData[el].vehiclePrice >= sliderValue[0]) &&
      (sliderValue[1] === 0 || vehicleData[el].vehiclePrice <= sliderValue[1])
      &&
      vehicleData[el].vehicleStatus !== "pending"
      &&
      vehicleData[el].username !== localusername
    )

  })
  const filteredCard = filteredData.map(keys =>
    <Carcard
      price={vehicleData[keys].vehiclePrice}
      type={vehicleData[keys].vehicleType}
      addedByUser={vehicleData[keys].addedByUser}
      username={vehicleData[keys].username}
      title={vehicleData[keys].vehicleName}
      img={vehicleData[keys].vehicleImage}
      id={vehicleData[keys].id}
      status={vehicleData[keys].vehicleStatus}
      vehicleRating={vehicleData[keys].vehicleRating}
      booked={vehicleData[keys].booked}
      seats={vehicleData[keys].seats}
      ac={vehicleData[keys].ac}
      source={vehicleData[keys].fuelElectric}
      transmission={vehicleData[keys].autoManual}
    />

  )

  console.log(filteredData)

  const filteredDisplay = select != 'default' ? filteredCard : display

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = filteredDisplay.slice(firstPostIndex, lastPostIndex)


  return (
    <div className='mx-20 my-20 '>

      <div className='flex flex-row justify-between -mt-10'>
        <div className='mx-10' >
          <h2 className='text-2xl'>Choose Your Vehicle</h2>
        </div>

        <div className='-mt-4'>
          <Filter handleFilter={handleFilter} filter={filter} />
        </div>

      </div>
      <div className='flex justify-between'>





        <div className='flex flex-row mx-4 gap-x-2'>
          <div className=' px-2 py-2 flex flex-col justify justify-center'>
            <div>
              <ElectricCarIcon className='mt-1' sx={{ fontSize: 40 }} onClick={() => setSelect((prev) => { return prev === 'Electric' ? 'default' : 'Electric' })} />
            </div>
            <div>
              <h3> Electric</h3>
            </div>
          </div>

          <div className=' px-2 py-2 flex flex-col justify justify-center'>
            <div>
              <AirportShuttleIcon sx={{ fontSize: 40 }} onClick={() => setSelect((prev) => { return prev === 'Sports' ? 'default' : 'Sports' })} />
            </div>
            <div>
              <h3> Sports </h3>
            </div>
          </div>
          <div className=' px-2 py-2 flex flex-col justify justify-center'>
            <div>
              <TwoWheelerIcon sx={{ fontSize: 40 }} onClick={() => setSelect((prev) => { return prev === 'Two-Wheelers' ? 'default' : 'Two-Wheelers' })} />
            </div>
            <div>
              <h3> Bikes </h3>
            </div>
          </div>

          <div className=' px-2 py-2 flex flex-col justify justify-center'>
            <div>
              <AirlineSeatReclineExtraIcon sx={{ fontSize: 40 }} onClick={() => setSelect((prev) => { return prev === 'Luxury' ? 'default' : 'Luxury' })} />
            </div>
            <div>
              <h3> Luxury </h3>
            </div>
          </div>

          <div className=' px-2 py-2 flex flex-col justify justify-center'>
            <div>
              <RemoveRoadIcon sx={{ fontSize: 40 }} onClick={() => setSelect((prev) => { return prev === 'Off-road' ? 'default' : 'Off-road' })} />
            </div>
            <div>
              <h3>Off-road</h3>
            </div>
          </div>

        </div>

        <div className='mx-20 my-6 flex flex-row gap-x-8'>
          <div>
            Range:
          </div>
          <div className='-mt-1'>
            <Sliders handleChange={handleChange} sliderValue={sliderValue} />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 relative gap-x-8 gap-y-28 px-4 pt-12 sm:pt-20  '>
        {currentPosts}
      </div>
      <div className='w-[100%] mt-20 grid grid-cols-2 '>
        <div>
          Pages
        </div>
        <div className='flex justify justify-end'>
          <Pagination totalPosts={filteredDisplay.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>


    </div>
  )
}

export default Cars