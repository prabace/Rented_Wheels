import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

const Verification = (props) => {

    console.log(props)
    const location = useLocation()
    
    console.log(location)
    
   
        async function verifyUser(uuid, userid, access_token) {
       
        console.log(location.pathname)
        const response=  await fetch(`http://localhost:8080/verify-account?verificationToken=${uuid}&userId=${userid}`, {
            method: "GET",
            headers: {
              Accept: 'application/json',
              'Authorization':`Bearer ${access_token}`

          },


          })
          
          const response2=  await fetch(`http://localhost:8080/getUser/${userid}`, {
            method: "GET",
            headers: {
              Accept: 'application/json',
              'Authorization':`Bearer ${access_token}`

          }


          })
          const userData = await response2.json()
          if(userData.verified){
            props.history.push('/app/approved')
          }else{
            alert("invalid")
          }
         
        }
        
            console.log(props)
    const uuid = location.pathname.split('/')[2]
    const userid = location.pathname.split('/')[3]
    const access_token = window.localStorage.getItem('token')
    console.log(uuid, userid, access_token)
        verifyUser(uuid, userid, access_token).then(
            
            res => console.log(res)
        )
        
    
    //    props.history.push('/app/signin')
      
  return (
    <div>Verification</div>
  )
}

export default Verification