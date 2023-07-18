import React from 'react'

import { storage, db } from './../utils/firebaseConfig'
import { useState, useEffect } from 'react';


export const Updatecars = ({ onClose, id }) => {



    const [image, setImage] = useState(null);
    const [viewFile, setViewFile] = useState(null);

    const [vehicleName, setVehicleName] = useState('')
    const [vehicleNumber, setVehicleNumber] = useState('')
    const [vehiclePrice, setVehiclePrice] = useState('')
    const [vehicleType, setVehicleType] = useState('Luxury')
    const [ac, setAc] = useState('')
    const [transmissionType, settransmissionType] = useState('')
    const [source, setSource] = useState('')
    const [power, setPower] = useState('')
    const [speed, setSpeed] = useState('')
    const [acceleration, setAcceleration] = useState('')
    const [seats, setSeats] = useState('')
    const [status, setStatus] = useState('')
    
    const [imageChanged,setImageChanged]= useState(false)
    const [vehicleInfo, setvehicleInfo] = useState('')



    
    useEffect(() => {
        async function getVehicle() {
            const access_token = window.localStorage.getItem('user_token')
        const response=  await fetch(`http://localhost:8080/getVehicle/${id}`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${access_token}`,
          },
          
          
          
          })
          
          const data = await response.json()

          setvehicleInfo(data)
          setVehicleName(data.vehicleName)
          setVehicleNumber(data.vehicleNumber)
          setVehiclePrice(data.vehiclePrice)
          setVehicleType(data.vehicleType)
          setStatus(data.vehicleStatus)
          setAc(data.ac)
          settransmissionType(data.autoManual)
          setSource(data.fuelElectric)
          setPower(data.maxPower)
          setSpeed(data.topSpeed)
          setAcceleration(data.accelerationTime)
          setSeats(data.seats)
          setViewFile(data.vehicleImage)
        }
        getVehicle()
       
      }, [id])

    


    const handleChange = (evt, placeholder) => {
        switch (placeholder) {
            case 'vehicleName':
                setVehicleName(evt.target.value);
                break;
            case 'vehicleNumber':
                setVehicleNumber(evt.target.value);
                break;
            case 'vehiclePrice':
                setVehiclePrice(evt.target.value);
                break;
            case 'vehicleType':
                setVehicleType(evt.target.value);
                break;
            case 'ac':
                setAc(evt.target.value);
                break;
            case 'transmissionType':
                settransmissionType(evt.target.value);
                break;
            case 'source':
                setSource(evt.target.value);
                break;
            case 'power':
                setPower(evt.target.value);
                break;
            case 'speed':
                setSpeed(evt.target.value);
                break;
            case 'acceleration':
                setAcceleration(evt.target.value);
                break;
            case 'seats':
                setSeats(evt.target.value);
                break;

            default: break;
        }
    }



    const handleImageChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImageChanged(true)
            setImage(e.target.files[0]);
            setViewFile(URL.createObjectURL(e.target.files[0]))
            console.log(image)
        }

    }

    const handleUpload = async (evt) => {
        evt.preventDefault();
        if(imageChanged){
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => {
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then((async(url) => {
                            const admin  = window.localStorage.getItem('admin')?? false
                            const sendData =
                            {
                                id: id,
                                booked: false,
                                fuelElectric: source,
                                ac: ac,
                                type: "",
                                seats: seats,
                                vehicleName: vehicleName,
                                vehicleType: vehicleType,
                                vehicleRating: 0,
                                vehicleReview: 0,
                                vehicleStatus: status,
                                vehiclePrice: vehiclePrice,
                                vehicleNumber:vehicleNumber,
                                addedByUser: admin? false:true ,
                                autoManual:transmissionType,
                                maxPower:power,
                                topSpeed:speed,
                                vehicleImage:url,
                                accelerationTime:acceleration,
    
                            }
                            console.log(sendData)
                            const access_token = window.localStorage.getItem('user_token')
                            
                            const response = await fetch(`http://localhost:8080/updateVehicle`,
                            {
                               method: "PUT", 
                               headers: {'Content-Type':'application/json',
                               'Authorization': `Bearer ${access_token}`,
                            },
                               body:JSON.stringify(sendData)
                            })
                            const addVehicle = await response.json();
    
                            console.log(addVehicle)
    
                            onClose()
                           window.location.reload()
                            return null
                        }))
                }
            );
        }else{
            const admin  = window.localStorage.getItem('admin')?? false
                            const sendData =
                            {
                                id: id,
                                booked: false,
                                fuelElectric: source,
                                ac: ac,
                                type: "",
                                seats: seats,
                                vehicleName: vehicleName,
                                vehicleType: vehicleType,
                                vehicleRating: 0,
                                vehicleReview: 0,
                                vehicleStatus: status,
                                vehiclePrice: vehiclePrice,
                                vehicleNumber:vehicleNumber,
                                addedByUser: admin? false:true ,
                                autoManual:transmissionType,
                                maxPower:power,
                                topSpeed:speed,
                                vehicleImage:viewFile,
                                accelerationTime:acceleration,
    
                            }
            console.log(sendData)
            const access_token = window.localStorage.getItem('user_token')
            
            const response = await fetch(`http://localhost:8080/updateVehicle`,
            {
               method: "PUT", 
               headers: {'Content-Type':'application/json',
               'Authorization': `Bearer ${access_token}`,
            },
               body:JSON.stringify(sendData)
            })
            const addVehicle = await response.json();

            console.log(addVehicle)

            onClose()
           window.location.reload()
            return null
        }
    }


    return (
        <div className='w-[100%] h-[100%] flex fixed bg-slate-200/90  top-0 justify-center items-center z-40 left-0'>
            <div className="">
               
                <div className="w-[100%] ">
                <form onSubmit={handleUpload} class="bg-white shadow-md rounded px-10 py-4 w-[600px] h-[450px]  overflow-y-auto" id="addVehicle" >
                    <div className="-mt-4 mb-6 flex justify-end">
                <p onClick={onClose}>X</p>
                </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            Vehicle Name
                        </label>
                        <input onChange={(evt) => handleChange(evt, 'vehicleName')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Vehicle Name"
                            value={vehicleName}
                            />

                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Vehicle Number
                        </label>
                        <input onChange={(evt) => handleChange(evt, 'vehicleNumber')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Vehicle Number" 
                            value={vehicleNumber}
                            />

                    </div>
                    <div className='grid grid-cols-2 gap-x-10'>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Vehicle Price
                            </label>
                            <input onChange={(evt) => handleChange(evt, 'vehiclePrice')} 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="username" 
                            type="text" 
                            placeholder="Vehicle Price"
                            value={vehiclePrice}
                            />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Vehicle Type
                            </label>
                            <select onChange={(evt) => handleChange(evt, 'vehicleType')} defaultValue={vehicleType} id="sel" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="Luxury">Luxury</option>
                                <option value="Two-Wheelers">Two-Wheelers</option>
                                <option value="Sports">Sports</option>
                                <option value="Off-Road">Off-Road</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            AC
                        </label>
                        <div className='grid grid-cols-2'>
                            <div>
                                <input onChange={(evt) => handleChange(evt, 'ac')} 
                                type="radio" 
                                name="ac" 
                                value={ac} />
                                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">AC</label>
                            </div>
                            <div>
                                <input onChange={(evt) => handleChange(evt, 'ac')} className='' type="radio" name="ac" value={ac} />
                                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">N/A</label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >
                            Transmission Type
                        </label>
                        <div className='grid grid-cols-2'>
                            <div>
                                <input onChange={(evt) => handleChange(evt, 'transmissionType')} 
                                type="radio" 
                                name="transmission"
                                 value={transmissionType} />
                                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Auto</label>
                            </div>
                            <div>
                                <input onChange={(evt) => handleChange(evt, 'transmissionType')} 
                                className='' 
                                type="radio" 
                                name="transmission" 
                                value={transmissionType} 
                                />
                                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Manual</label>
                            </div>
                        </div>

                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Source
                        </label>
                        <div className='grid grid-cols-2'>
                            <div>
                                <input onChange={(evt) => handleChange(evt, 'source')} 
                                type="radio" 
                                name="source" 
                                value={source} 
                                />
                                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fuel</label>
                            </div>
                            <div>
                                <input onChange={(evt) => handleChange(evt, 'source')} 
                                className='' 
                                type="radio" 
                                name="source" 
                                value={source}
                                />
                                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Electric</label>
                            </div>
                        </div>

                    </div>

                    <div className='grid grid-cols-2 gap-x-10'>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="power">
                                MaxPower
                            </label>
                            <input onChange={(evt) => handleChange(evt, 'power')} 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="username" 
                            type="text" 
                            placeholder="Max.Power" 
                            value={power}
                            />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="speed">
                                TopSpeed
                            </label>
                            <input onChange={(evt) => handleChange(evt, 'speed')} 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="username"
                             type="text" 
                             placeholder="Top Speed" 
                             value={speed}
                             />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-x-10'>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="acceleration">
                                Acceleration Time
                            </label>
                            <input onChange={(evt) => handleChange(evt, 'acceleration')} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="username" 
                            type="text" 
                            placeholder="Acc.Time" 
                            value={acceleration}
                            />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="seats">
                                Seats
                            </label>
                            <input onChange={(evt) => handleChange(evt, 'seats')} 
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="username" 
                            type="text" 
                            placeholder="No. of seats" 
                            value={seats}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col mb-6'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'> Car Image </label>
                        <div className='flex flex-row justify-between'>
                            <div>
                                <input type="file" onChange={handleImageChange}></input>
                                {viewFile && <img src={viewFile} />}
                            </div>

                        </div>
                    </div>



                    <div class="flex items-center justify-between">
                        <button type="Submit" form='addVehicle' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                            Confirm
                        </button>

                    </div>
                </form>
                </div>
                <p class="text-center text-gray-500 text-xs mt-4">
                    &copy;2022 Rentedwheels. All rights reserved.
                </p>
            </div>
        </div>
    )
}


