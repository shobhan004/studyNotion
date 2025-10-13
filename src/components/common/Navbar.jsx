import React, { useEffect } from 'react'
import studynotion from "../../assets/Images/download.png";
import NavButtons from '../NavButtons';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis'; 
import { FaAngleDown } from "react-icons/fa6";
import ProfileDropDown from './ProfileDropDown';
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();
   const{addedCount } = useSelector((state) => state.cart);
   console.log(addedCount);
    const{user} = useSelector((state) => state.profile );
    const{token} = useSelector((state) => state.auth );
    const{totalItems} = useSelector((state) => state.cart );
    const isLanding = location.pathname === '/';
    const navigate  = useNavigate();
//     Example:

// Agar URL hai https://example.com/ → location.pathname = '/'

// Agar URL hai https://example.com/login → location.pathname = '/login'
   
 

//   const [sublinks , setSublinks] = useState([]);

//   const fetchSubLinks = async() =>{
//     try{
//        const result = await apiConnector("GET" ,categories.CATEGORIES_API );
//        console.log("printing sublinks result" , result);
//        setSublinks(result.data.data);
//     }catch(err){
//      console.log(err);
//     }
//   }

//   useEffect(() =>{
//  fetchSubLinks();
//   },[])


  return (
    <div>
       <nav className={`bg-zinc-800 shadow-lg  backdrop-blur-md  w-full  py-2.5  z-50 ${isLanding  ? "bg-transparent" : "bg-purple-700 pb-2" } absolute top-0 left-0}`} >
      <div className="w-[70%] mx-auto  gap-4 flex items-center justify-between">
        <img src={studynotion} className="w-[180px]"></img>
        <div className="z-40 flex gap-7 ">
        <NavButtons linkto={"/"}  > Home</NavButtons>
        {/* <div className='flex items-center group relative'>
          <div className="text-white font-montserrat font-medium p-3">Catalog</div>
          <div className='text-white'><FaAngleDown /></div>
          <div className=' z-40 absolute top-full left-0 w-[300px] bg-gray-400 text-black rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2 shadow-lg'>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Course 1</a>
    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Course 2</a>
    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Course 3</a>
    {/* {
        subLinks.map((current , index) =>{
            return(
                <Link to={current.link}>
                    <p>{current.title}</p>
                </Link>
            )
        })
    } */}

     {/* <div className='absolute mt-2 -top-5 left-2.5 translate-x-[78px] bg-gray-400 h-6 w-6   rotate-45 '></div>
          </div>
         
        </div> */} 
        <div className='flex  relative items-center text-white font-montserrat font-medium '>
        <div className=' flex items-center gap-1 text-white font-montserrat font-semibold mt-0 cursor-pointer'>
         <span onClick={() => navigate("/courses")} className='text-white font-medium'>Courses</span>
        {/* <RiArrowDropDownLine  className='text-3xl'/> */}
        </div>
        
        
        {/* <div className='absolute z-50 top-full  flex flex-col rounded-lg gap-1.5 px-6 py-2 bg-white shadow-md scale-y-0 group-hover:scale-y-100 origin-top duration-200'>
        <Link to={"/webdevelopment"} className='text-black font-roboto font-medium hover:bg-gray-400 transition-all p-2 hover:rounded-md'>Web Developement</Link>
        <Link to={"/webdevelopment"} className='text-black font-roboto font-medium  hover:bg-gray-400 transition-all p-2 hover:rounded-md'>JavaScript</Link>
        <Link to={"/webdevelopment"} className='text-black font-roboto font-medium  hover:bg-gray-400 transition-all p-2 hover:rounded-md'>C++</Link>
        <Link to={"/webdevelopment"} className='text-black font-roboto font-medium  hover:bg-gray-400 transition-all p-2 hover:rounded-md'> HTML</Link>
        </div> */}
        
        
        </div>
        
        <NavButtons linkto={"/aboutUs"} >About Us</NavButtons>
        <NavButtons linkto={"/contactUs"} >Contact Us</NavButtons>
      </div>
        <div className="flex gap-4 items-center">

        {
            token === null && (
        <Link to={"/login"}>
        <div className=" bg-gradient-to-r from-orange-500 to-orange-700 text-white font-montserrat font-medium p-3 rounded-lg hover:text-orange-600 hover:from-white hover:to-white hover:shadow-lg hover:border-orange-500"
       >Log In</div>
        </Link>
            )

        }
        
        {
            token === null && (
             <Link to={"/signup"}>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white font-montserrat font-medium  p-3 rounded-lg hover:text-orange-600 hover:from-white hover:to-white  hover:border-orange-500 ">Sign Up</div>
              </Link>
            )
        }
        {
            token != null && (
                <ProfileDropDown></ProfileDropDown>
            )
        }
        
       <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
      <IoCartOutline size={30} className='text-white'/>
      {addedCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {addedCount}
        </span>
      )}
    </div>

        </div>
      </div>
     </nav>
    </div>
  )
}

export default Navbar
