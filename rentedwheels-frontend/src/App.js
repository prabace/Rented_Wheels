import Navbar from './components/Navbar';
import Home from './components/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import About from './pages/About';
import Wheels from './pages/Wheels';
import Cars from './pages/Cars';
// import Showcase from './components/Showcase';
import Garage from './pages/Garage';
import Checkout from './pages/Checkout';
import Bookings from './pages/Bookings';
import Order from './components/Order';
import Test from './pages/Test';
import Review from './components/Review';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Chart from './components/Chart';
import Khalti from './components/Khalti/Khalti';
import Addcars from './pages/Addcars';
import { Modal } from './components/Modal';
import Sliders from './components/Sliders';
import { Route,Navigate } from 'react-router-dom'
import Features from './components/Features';
import { useEffect } from 'react';
import { Footer } from './components/Footer';
import Adminreview from './pages/Adminreview';
import Users from './pages/Users';
import { Policies } from './components/Policies';
import Request from './pages/Request';
import Myvehicles from './pages/Myvehicles';
import Vehicleinfo from './pages/Vehicleinfo';
import Approved from './pages/Approved';
import Datepicker from './components/Datepicker';
import Verification from './components/Verification';
import Vehiclehistory from './pages/Vehiclehistory';

function App() {
  
  return (


    <div className='App'>

      <main>
        <Route path='/app' >

        <Navbar />
          <Route path="/app/home">
            

            <Home />



            <Features />

            {/* <Showcase /> */}

            <Footer />
          </Route>

          <Route exact path="/app/users"render={(routeProps) => <Users {...routeProps} />} / >
          
       
    

          <Route exact path="/app/signin" render={(routeProps) => <Signin {...routeProps} />} />

          <Route exact path="/app/checkout" render={(routeProps) => <Checkout {...routeProps} />} />
          <Route path="/app/signup" render={(routeProps) => <Signup {...routeProps} />} />
          <Route exact path="/app/about">
            <About />
          </Route>
          <Route exact path="/app/book">
            <Wheels />
            <Route exact path="/app/policies">
            <Policies />
          </Route>
          </Route>
          <Route exact path="/app/cars">
            <Cars />
          </Route>
          
          <Route exact path="/app/approved">
            <Approved />
          </Route>
          <Route exact path="/app/bookings">
            <Bookings />
          </Route>

        


          <Route path="/app/carinfo" render={(routeProps) => <Vehicleinfo {...routeProps} />} />
          <Route exact path="/app/myvehicles">
            <Myvehicles />
          </Route>
          <Route exact path="/app/carhistory">
            <Vehiclehistory/>
          </Route>
          <Route exact path="/app/garage">
            <Garage />
          </Route>
          <Route exact path="/app/date">
            <Datepicker />
          </Route>
          <Route exact path="/app/order">
            <Order />
          </Route>
          <Route exact path="/app/test">
            <Test />
          </Route>
        </Route>
        <Route exact path="/app/review">
          <Review />
        </Route>
       
        <Route exact path="/app/chart">
          <Chart />
        </Route>
        <Route exact path="/app/khalti">
          <Khalti />
        </Route>
      
        <Route exact path="/app/slider">
          <Sliders />
        </Route>

        <Route exact path="/app/modal">
          <Modal />
        </Route>

        <Route>
          <Route path="/admin" render={(routeProps)=> <Admin {...routeProps} />} />
          
          <Route exact path="/admin/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/admin/adminreview" render={(routeProps) => <Adminreview {...routeProps} />}/>
        <Route exact path="/admin/addCars" render={(routeProps) => <Addcars {...routeProps} />}/>
        <Route exact path="/admin/request" render={(routeProps) => <Request {...routeProps} />}/>
        <Route path="/verifyEmail" render={(routeProps) => <Verification {...routeProps} />} />
        </Route>

      </main>

    </div>

  )

}

export default App;
