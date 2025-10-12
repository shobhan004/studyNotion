import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import './App.css';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyCourses from './pages/MyCourses';
import WebDevelopment from './pages/WebDevelopment';
import Courses from './pages/Courses';
import Cart from './pages/Cart';
import LocomotiveScroll from 'locomotive-scroll';
import Footer from './components/common/Footer';


// import SignUp from '../../New folder (4)/notion/src/components/SignUp'
// import Loginform from '../../New folder (4)/notion/src/components/Loginform'

function App() {
  const scroll = new LocomotiveScroll();
  return (
    <div>
    <Navbar></Navbar>
      <Routes>
       <Route path='/' element = {<Home></Home>}></Route>
       <Route path='/login' element = {<Login></Login>}></Route>
       <Route path='/signup' element ={<SignUp></SignUp> }></Route>
       <Route path='/forget' element = {<ForgotPassword></ForgotPassword>}></Route>
       <Route path='/update-password/:token' element = {<UpdatePassword></UpdatePassword>}></Route>
       <Route path='/aboutUs' element = {<About></About>}></Route>
       <Route path="/contactUs" element={<Contact></Contact>}></Route>
       <Route path='/dashboard' element ={<Dashboard></Dashboard>}>
       <Route path='myprofile' element = {<MyProfile></MyProfile>}></Route>
       <Route path='mycourses' element = {<MyCourses></MyCourses>}></Route>
       </Route>
       <Route path='/webdevelopment' element ={<WebDevelopment/>}></Route>
       <Route path='/courses' element = {<Courses></Courses>}></Route>
       <Route path='/cart' element = {<Cart></Cart>}></Route>
      </Routes>
      <Footer></Footer>
      <Toaster position="top-center" />
    </div>
  )
}

export default App
