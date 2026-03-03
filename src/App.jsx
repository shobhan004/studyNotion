import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom' // 🚀 added useLocation
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
import MyCourses from './components/CourseBuilder/MyCourses';
import Courses from './components/StudentCourses/Courses';
import Cart from './components/StudentCourses/Cart';
import LocomotiveScroll from 'locomotive-scroll';
import Footer from './components/common/Footer';
import CourseDetails from './components/StudentCourses/CourseDetails';
import AddCourse from './components/CourseBuilder/AddCourse';
import EditCourse from './components/CourseBuilder/EditCourse';
import InstructorDashboard from './pages/InstructorDashboard'
import Settings from './pages/Settings';
import CourseBuilderForm from './components/CourseBuilder/CourseBuilderForm';
import EnrolledCourses from './components/StudentCourses/EnrolledCourse';
import ViewCourse from './components/StudentCourses/ViewCourse';

function App() {
  // 🚀 Current location check karne ke liye
  const location = useLocation();

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      
      {/* 🚀 Wrapper div with flex-1 taaki footer hamesha bottom par rahe landing pages pe */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget" element={<ForgotPassword />} />
          <Route path="/update-password/:token" element={<UpdatePassword />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/contactUs" element={<Contact />} />

          {/* 🚀 Dashboard Parent Route */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="instructor" element={<InstructorDashboard />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-courses" element={<MyCourses />} /> 
            <Route path="add-course" element={<AddCourse />} />
            <Route path="edit-course/:courseId" element={<EditCourse />} />
            <Route path="settings" element={<Settings />} />
            <Route path='courseBuilder' element={<CourseBuilderForm/>}/>
            <Route path="enrolled-courses" element={<EnrolledCourses />} />
          </Route>
           <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
           <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/view-course/:courseId" element={<ViewCourse />} />
        </Routes>
      </div>

      {/* 🚀 CONDITION: Agar path dashboard se shuru nahi hota, tabhi Footer dikhao */}
      {/* {!location.pathname.startsWith("/dashboard") && <Footer />} */}
      {/* 🚀 CONDITION UPDATE: Ab Footer "/dashboard" AUR "/view-course" dono pe hide hoga */}
      {!location.pathname.startsWith("/dashboard") && !location.pathname.startsWith("/view-course") && !location.pathname.startsWith("/cart") &&  <Footer />}
      
      <Toaster position="top-center" />
    </div>
  );
}

export default App