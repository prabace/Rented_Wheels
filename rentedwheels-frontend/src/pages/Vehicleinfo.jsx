import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Info from '../components/Info'
import raptor from '../assets/raptor.jpg'
import Bikecard from '../components/Bikecard'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Vehicleinfo = ({ location, history }) => {

  const [vehicleData, setvehicleData] = useState([])
  const [similarData, setsimilarData] = useState([])
  const [allVehicleData, setAllVehicleData] = useState([])
  const [close, setClose] = useState(false)

  const [snackbarOpen, setSnackbarOpen] = useState({
    snackbarOpen:true,
    vertical: 'top',
    horizontal: 'center'
  });

  const { vertical, horizontal, open } = snackbarOpen;

  const handleSnackbarClose = () => {
    setSnackbarOpen({
      snackbarOpen:false,
      vertical: 'top',
     horizontal: 'center'
    });
    setClose(true)
  };



  async function getVehicles() {
    const access_token = window.localStorage.getItem('user_token')
    const response = await fetch(`http://localhost:8080/getVehicle/${location.search.slice(4)}/`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    const data = await response.json();

    setvehicleData(data)

  }

  async function getAllVehicles() {
    const access_token = window.localStorage.getItem('user_token')
    const response = await fetch(`http://localhost:8080/getVehicles`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    const data = await response.json();

    setAllVehicleData(data)

  }

  async function getSimilarVehicles() {
    // const access_token = window.localStorage.getItem('user_token')
    const response = await fetch(`http://localhost:8000/similar/${location.search.slice(4)}/`, {
      method: "GET",
      headers: {
        // 'Authorization':`Bearer ${access_token}`
      }

    });
    const datas = await response.json();
    const vehicleIDs = Object.keys(datas).map(keys => datas[keys].vehicleId)
    setsimilarData(vehicleIDs)


  }

  useEffect( () => {
   
     getVehicles()


   
     getAllVehicles()

   
     getSimilarVehicles()
  }, [])

  console.log(similarData)



  const display = Object.keys(
    allVehicleData
  ).filter(keys => similarData.includes(allVehicleData[keys].id)).map(keys => <Bikecard price={allVehicleData[keys].vehiclePrice}
    type={allVehicleData[keys].vehicleType}
    title={allVehicleData[keys].vehicleName}
    reviews={allVehicleData[keys].vehicleReview}
    value={allVehicleData[keys].vehicleRating}
    id={allVehicleData[keys].id}
    img={allVehicleData[keys].vehicleImage}
    vehicleRating={allVehicleData[keys].vehicleRating}
    vehicleReview={allVehicleData[keys].vehicleReview}
    seats={allVehicleData[keys].seats}
    ac={allVehicleData[keys].ac}
    source={allVehicleData[keys].fuelElectric}
    transmission={allVehicleData[keys].autoManual}
    history = {history}
  />)



  return (
    <div className='px-20 py-20'>
    <div className='absolute top-10'>
    {(vehicleData.booked && !close) &&
    <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleSnackbarClose}
        key={vertical + horizontal}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="error">
          Vehicle booked. Please visit later.
        </MuiAlert>
      </Snackbar>
    }
    </div>


      <Info {...vehicleData} />

      <div>
        <h1>Vehicles You May Like</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 relative gap-x-8 gap-y-28 px-4 pt-12 sm:pt-20'>
        {display}
      </div>

    </div>
  )
}

export default Vehicleinfo