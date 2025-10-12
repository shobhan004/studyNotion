import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import shopping from '../assets/Images/shopping.png';
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/apis';
import { IoMdRemove } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { PiShoppingCartFill } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { setaddedCount } from '../slices/cartSlice';
import { BuyCourse } from '../services/coursePayment';
import { FaRupeeSign } from "react-icons/fa";

const Cart = () => {
   const {GET_ADDED_COURSES , DELETE_COURSE_API} = courseEndpoints; 
   const [addedCourses , setAddedCourses] = useState([]);
   const [totalAmount , setTotalAmount] = useState(0);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   
   const fetchCart = async() =>{
    try{
      
     const token = localStorage.getItem("token");
      if(!token){
       console.log("token not found");
        }

         
      const response = await apiConnector("GET" ,GET_ADDED_COURSES , null,
        {
          Authorization : `Bearer ${token}`,
        },
      );

      // data is axios wrapper 
      if(!response?.data?.success){
       console.log("courses not found");
             }

      console.log("fetched courses are " , response.data.courses);    
      
      
      setAddedCourses(response?.data?.courses);
const sum = response?.data?.courses.reduce((acc, course) => acc + course.price, 0);
setTotalAmount(sum);
      
    }catch(error){
     console.error("Cart fetch error:", error);
    toast.error("Error fetching cart");
    }
   }
   
   useEffect(() =>{
   fetchCart();
   },[])


   const removeHandler = async(id) =>{
   try{
    const token = localStorage.getItem("token");
   const response = await apiConnector(
      "DELETE", 
      DELETE_COURSE_API, 
      { id }, // body data as second parameter after URL
      {
        Authorization: `Bearer ${token}`, // Direct headers, no nested 'headers' object
      }
    );

     if(!(response).data.success){
      console.log("Removing item failed");
     }
     console.log(response?.data?.updatedCourses);
      setAddedCourses(response?.data?.updatedCourses);
    const sum = response?.data?.updatedCourses.reduce((acc, course) => acc + course.price, 0);
    setTotalAmount(sum);

     dispatch(setaddedCount(response?.data?.count));
     toast.success("Item removed");
    
   }catch(err){
    console.log(err);
   }
   
   }

   const handleBuyCourses =()=>{
    try{
    console.log("buy now clicked");
     const token = localStorage.getItem("token");
    
    BuyCourse(token  , navigate ,dispatch);
    }catch(error){
      console.log(error);
    }
   
   }
    
  return (
    <div className='w-full pt-14 pb-14 '>
    {
      addedCourses.length > 0 ?(<div className='w-full bg-zinc-400 py-14  mt-11  text-zinc-900 '>
      <div className='text-[2rem] max-w-screen-xl font-medium mx-auto px-11 '>ShortListed Courses</div>
    </div>) :""
    }
    
     { addedCourses.length === 0 ? (
           <div className='w-[500px] mx-auto min-h-[400px] flex flex-col gap-2 mt-12  rounded-lg p-16 transform translate-z-3.5 shadow-2xl '>
           <div ><img src={shopping} className='w-[100px] mx-auto'></img></div>
        <h1 className='text-center text-[2rem]  text-zinc-800 font-semibold'>Your Cart is Empty</h1>
        <p className='text-zinc-500 text-center text-[1.5rem] '>Looks like you haven't made your choice yet</p>
        <div className="mx-auto">
         <button onClick={() => navigate("/courses")} className='px-11 py-2.5 border bg-linear-60 bg-zinc-700 rounded-full   hover:bg-white text-white hover:text-zinc-700'>
        Add Courses
        </button>
        </div>
       
        
      </div>
     )

       : (  
        <div className='w-full mx-auto  min-h-screen mt-24 flex flex-col gap-7 pt-5'> 
        <div className=' max-w-screen-xl mx-auto flex gap-10'> 
         <div className='border-3 border-zinc-300 rounded-md'>
           {
          addedCourses.map((current , index) =>{
            return(

              <div className={`p-6 flex  gap-5 ${addedCourses.length > 1 ?"border-b-2 border-zinc-300" :""  } `}>
                <img src={current.image} className='w-[200px] h-[150px]'></img>
                <div className='flex flex-col gap-4 border-r-2 border-zinc-300 pr-3.5'>
                 <p className=' text-2xl text-orange-500 font-semibold'>{current.title}</p>
                <p className='text-xl font-semibold max-w-[400px]'>{current.description}</p>
                </div>
               
                
                
                <div className='flex items-center border-r-2 border-zinc-300 pr-6'>
                  <button className='flex  justify-center gap-2 items-center cursor-pointer text-orange-500' onClick={() =>removeHandler(current.id)}>
                  Remove 
                  <IoMdRemove />
                </button>
                </div> 

                <div className='flex items-center'>
                <p className='text-black font-semibold flex items-center'> <FaRupeeSign /> {current.price}</p>
                </div>
               
                
               
              </div>
            )
          })
         }
         </div>
       
         <div className='shadow-[0_3px_10px_rgb(0,0,0,0.3)] p-7 gap-4 flex flex-col'>
          <h1  className='text-3xl text-zinc-700 font-montserrat font-semibold mt-4'>Total Amount:</h1>
          <p className='text-2xl text-black font-semibold flex items-center'> <FaRupeeSign /> {totalAmount}</p>
          <button className='px-8 py-3 border bg-orange-500 rounded-full text-white hover:text-orange-500 hover:bg-white  hover:border-orange-500' onClick={() =>handleBuyCourses()}>Proceed Checkout</button>
         </div>
        </div>
        
        </div>

       )}
      
     
        
    </div>
  )
}

export default Cart
