import React, { useState } from 'react';
import Rating from 'react-rating';
import { courses } from '../data/Courses';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import '../App.css';
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/apis';
import toast from 'react-hot-toast';
import {setaddedCount} from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const Courses = () => {
  const dispatch = useDispatch();
 const { ADD_TO_CART_API } = courseEndpoints;
  // const [courseCount , setCourseCount] = useState(0);
 const cartHandler = async (course) => {
    // Get the token right before the API call
 const token = localStorage.getItem("token"); 
console.log("Frontend token:", token);

    // Optional: Add a check to prevent the API call if the user isn't logged in
 if (!token) {
 toast.error("Please log in to add items to your cart.");
 return; // Exit the function early
 }

 try {
 
 const response = await apiConnector(
 "POST",
 ADD_TO_CART_API,
{ 
        courseData: {
            id:  course.id,
            title: course.title,
            description: course.description,
            price: course.price,
            image: course.image,
            rating: course.rating
          }
 },
 {
 Authorization: `Bearer ${token}`
 }
 );

   if (!response.data.success) {
    throw new Error(response?.data?.message || "Failed to add course");
   }
      
      dispatch(setaddedCount(response?.data?.count));
  toast.success("Course Added Successfully");
 
 } catch (error) {
 console.log(error);
 toast.error(error.message || "Something went wrong. Please try again.");
    
 } 

 };

return (
 <div className='w-full pt-10 pb-20'>
 <div className='w-[83%] mt-[77px] mx-auto min-h-screen p-1.5 grid grid-cols-3 gap-5'>
 {courses.map((current, index) => (
 <div key={index} className='flex flex-col gap-4 rounded-xl shadow-xl p-3.5 overflow-hidden hover:shadow-2xl hover:shadow-black group duration-200'>
 <img src={current.image} className='duration-200 group-hover:scale-110' alt={current.title} />
 <h1 className='text-black text-3xl font-roboto font-semibold'>{current.title}</h1>
 <p className='font-montserrat text-black font-medium'>{current.description}</p>
 <div className='flex items-center justify-between'>
 <div className='flex justify-center items-center gap-2'>
    <Rating
initialRating={current.rating}
 emptySymbol={<span className="text-gray-400 text-3xl">☆</span>}
 fullSymbol={<span className="text-yellow-500 text-3xl">★</span>}
 fractions={2}
 readonly
 />
  <p className='text-xl text-red-500 font-semibold'>{current.rating}</p>
 </div>

 
 <div className='flex items-center text-lg font-semibold'><FaIndianRupeeSign />{current.price}</div>
 </div>
 <div className='flex justify-center'>
 
 <button
 className=" relative bg-gradient-to-t from-orange-400 border to-orange-700 px-32 py-3 rounded-full text-white flex items-center gap-2 hover:from-white hover:to-white hover:text-orange-600  hover:border-orange-600"
 onClick={() => cartHandler(current)}
 >
 Add To Cart
         
 <IoCartOutline />
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
};

export default Courses;