import abstract from '../assets/abstract.jpg';
import wave from '../assets/wave.png'
import avatar from '../assets/avatar.svg'
import unlock from '../assets/unlock.svg'
import signup from '../assets/signup.svg'
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useRef } from 'react';
import { equalsTo } from 'khalti-checkout-web';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Signup = ({ history }) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const comparePassword=useRef(null)
  const { register, handleSubmit, formState: { errors },watch} = useForm();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  comparePassword.current=watch("password","")
 
  
  useEffect(() => {
    async function getToken() {
    const response=  await fetch(`http://localhost:8080/api/login?username=barca123&password=123456`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      
      
      
      })

      console.log('response', response)
      
      const data = await response.json()
      console.log(data)
      
      window.localStorage.setItem("token",data.access_token)

    }
    getToken()
  }, [])


  const handleChange = (evt, placeholder) => {
    switch (placeholder) {
      case 'firstName':
        setFirstName(evt.target.value);
        break;
      case 'lastName':
        setLastName(evt.target.value);
        break;
      case 'email':
        setEmail(evt.target.value);
        break;
      case 'dob':
        setDob(evt.target.value);
        break;
      case 'password':
        setPassword(evt.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(evt.target.value);
        break;
      default: break;
    }
  }

  const registerUser = async (data,evt) => {
   
    
    const sendData =
    {
      address: '',
      emailAddress: data.email,
      fullName: `${data.firstName} ${data.lastName}`,
      password: data.password,
      phoneNumber: '',
      pickupOutlet: '',
      citizenshipAttachment: '',
      admin: false,
      deleted: false,
      username: data.email.split('@')[0]
    }


    const token = window.localStorage.getItem('token')

    console.log(token)

    const response = await fetch('http://localhost:8080/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(sendData)

    
    })
   
    const {ERROR_MSG} = await response.json()
    
    if(ERROR_MSG) {alert("Email already exists.")}
    else{
      setSnackbarOpen(true);
      setTimeout(() => {
        history.push('/app/signin')
      }, 600);
      
    }
    
    
  }



  return (
    <div className='my-20'> 

      <div className='w-full h-screen  flex flex-col justify-center items-center  lg:grid  lg:grid-cols-2'>
        <img className='fixed hidden lg:block inset-0 h-screen object-cover  z-[-1]' src={wave} />
        <img className='hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto ' src={signup} />

        <div className="w-1/2 h-screen flex flex-col justify-center items-center" >
         
          <h1 className='text-4xl md:text-3xl mt-10 lg:text-4xl font-bold mb-4'>Sign Up</h1>
          <h2 className='mb-5 text-gray-500 text-sm md:text-lg lg:text-md'>Already have an account? <a className='text-[#f9a826]' href='/app/signin'>LogIn</a></h2>
         
          <form onSubmit={handleSubmit(registerUser)} id="signUp" className='w-full flex flex-col justify-center items-center '>
            <div className='flex justify-center'>
              <img className='w-md h-[100px] mb-5' src={avatar} />
            </div>
            <div class="w-full mb-2 border-b border-[#f9a826]">



              <label class="block text-gray-700 text-sm font-bold mb-2 relative" for="username"></label>

              <input class="appearance-none bg-transparent border-none rounded w-full py-2 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                type="text"
                placeholder="First Name"
                onChange={(evt) => handleChange(evt, 'firstName')}
                {...register("firstName",
                  { required: true })} />

            </div>
            <div className='mb-6'>
              {errors.firstName && <p className='text-red-500 italic'>Enter the first name</p>}
            </div>




            <div class="w-full mb-2 border-b border-[#f9a826]">



              <label class="block text-gray-700 text-sm font-bold mb-2 relative" for="username"></label>

              <input class="appearance-none bg-transparent border-none rounded w-full py-2 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                type="text"
                placeholder="Last Name"
                onChange={(evt) => handleChange(evt, 'lastName')}
                {...register("lastName",
                  { required: true })} />

            </div>
            <div className='mb-6'>
              {errors.lastName && <p className='text-red-500 italic'>Enter the last name</p>}
            </div>


            <div class="w-full mb-2 border-b border-[#f9a826]">



              <label class="block text-gray-700 text-sm font-bold mb-2 relative" for="username"></label>

              <input
            className='appearance-none bg-transparent border-none rounded w-full py-2 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='text'
            placeholder='Email'
            {...register('email', {
              required: 'Please enter your email.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address.',
              },
            })}
          />


            </div>
            <div className='mb-6'>
            {errors.email && <p className='text-red-500 italic'>{errors.email.message}</p>}
            </div>



            <div class="w-full mb-2 border-b border-[#f9a826]">

              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">

              </label>
              <input
            className='appearance-none bg-transparent border-none rounded w-full py-2 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='Password'
            {...register('password', {
              required: 'Please enter your password.',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                message:
                  'Password must be 6-15 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.',
              },
            })}
          />
          
            </div>
            <div className='mb-6'>
            {errors.password && <p className='text-red-500 italic'>{errors.password.message}</p>}
            </div>

            <div class="w-full mb-2 border-b border-[#f9a826]">

              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">

              </label>
              <input class=" appearance-none bg-transparent border-none rounded w-full py-2 px-7 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                onChange={(evt) => handleChange(evt, 'confirmPassword')}
                {...register("confirmPassword",
                  {
                    required: 'Please enter your password',
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                    validate: (value)=>{
                      console.log(value, comparePassword.current,"Check")
                      return value===comparePassword.current
                    }
                  })} />
            </div>
            <div className='mb-6'>
              {errors.confirmPassword && <p className='text-red-500 italic'>Password does not match</p>}
            </div>

            <div class="flex items-center justify-between relative flex-col">
              <button form='signUp' class="bg-[#f9a826] hover:bg-white hover:text-[#f9a826] font-bold w-full  py-2 mr-5 mb-4 rounded-full focus:outline-none focus:shadow-outline border-[#f9a826] text-xl lg:px-20" type="submit">
                Sign Up
              </button>

            </div>
            <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success">
          Email sent! Please verify your email.
        </MuiAlert>
      </Snackbar>

          </form>
          <p class="text-center text-gray-500 text-xs mt-5">
            &copy;2022 Rented Wheels. All rights reserved.
          </p>
        </div>

      </div>
    </div>

  )
}
export default Signup;