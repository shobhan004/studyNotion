import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { PiShoppingCartFill, PiTagBold, PiBooksBold } from "react-icons/pi";
import { setaddedCount } from '../../slices/cartSlice';
import { BuyCourse } from '../../services/coursePayment';
import { FaRupeeSign } from "react-icons/fa";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { HiLockClosed } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const { GET_ADDED_COURSES, DELETE_COURSE_API } = courseEndpoints;
  const [addedCourses, setAddedCourses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) return;
      const response = await apiConnector("GET", GET_ADDED_COURSES, null, {
        Authorization: `Bearer ${token}`,
      });
      if (response?.data?.success) {
        setAddedCourses(response.data.courses);
        const sum = response.data.courses.reduce((acc, course) => acc + course.price, 0);
        setTotalAmount(sum);
      }
    } catch (error) { 
      console.error("Fetch Cart Error:", error); 
    }
  };

  useEffect(() => { fetchCart(); }, []);

const removeHandler = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      

      


      // Backend request bheji
      const response = await apiConnector("DELETE", "https://studynotion-2-i5wm.onrender.com/api/v1/course/removeFromCart", { courseId }, {
        Authorization: `Bearer ${token}`,
      });

      if (response.data.success) {
        // 🚀 SMART FIX: Backend ke response ka wait karne ki jagah, locally filter kar lo
        const newUpdatedCourses = addedCourses.filter(course => course._id !== courseId);
        
        // Nayi list aur total amount update karo
        setAddedCourses(newUpdatedCourses);
        
        const sum = newUpdatedCourses.reduce((acc, course) => acc + (course.price || 0), 0);
        setTotalAmount(sum);
        
        // Redux cart count update karo
        dispatch(setaddedCount(newUpdatedCourses.length));
        
        toast.success("Item removed from cart");
      }
    } catch (err) { 
      console.error("Remove Error:", err); 
      toast.error("Failed to remove item");
    }
  };

  const handleBuyCourses = () => {

    const token = localStorage.getItem("token");
    const coursesId = addedCourses.map((course) => course._id);
    BuyCourse(token, [coursesId] ,user ,  navigate, dispatch);
  };

  return (
    <div className='w-full min-h-screen bg-slate-50 pt-28 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* --- Minimal Header Section --- */}
        <div className="mb-10 pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {addedCourses.length} {addedCourses.length === 1 ? 'Course' : 'Courses'} in your cart
            </p>
          </div>
        </div>

        {addedCourses.length === 0 ? (
          /* --- Pro Empty State --- */
          <div className='bg-white rounded-2xl py-20 px-6 flex flex-col items-center justify-center border border-slate-200 shadow-sm'>
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <PiShoppingCartFill size={36} className="text-slate-300" />
            </div>
            <h2 className='text-2xl font-semibold text-slate-900 mb-2'>Your cart is empty</h2>
            <p className='text-slate-500 mb-8 text-center max-w-md'>
              Looks like you haven't added anything to your cart yet. Discover your next favorite course!
            </p>
            <button 
              onClick={() => navigate("/courses")} 
              className='flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-sm'
            >
              Browse Courses <FiArrowRight />
            </button>
          </div>
        ) : (
          /* --- Modern Layout --- */
          <div className='flex flex-col lg:flex-row gap-8 items-start'>
            
            {/* 1. Courses List */}
            <div className='w-full lg:w-2/3 flex flex-col gap-4'>
              {addedCourses.map((course, index) => (
                <div key={index} className='bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow duration-200 group'>
                  
                  {/* Image */}
                  <div className="w-full sm:w-48 aspect-video rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                    <img 
                       src={course.thumbnail} 
                       alt={course.courseName} 
                       className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                    />
                  </div>
                  
                  {/* Details */}
                  <div className='flex flex-col flex-1 py-1'>
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                            <PiBooksBold size={14} className="text-blue-500" />
                            {course.category?.name || "Education"}
                        </div>
                        <button 
                            onClick={() => removeHandler(course._id)}
                            className='text-slate-400 hover:text-red-500 transition-colors p-1'
                            title="Remove from cart"
                        >
                            <FiTrash2 size={18} />
                        </button>
                    </div>

                    <h3 className='text-lg font-semibold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors'>
                      {course.courseName}
                    </h3>
                    <p className='text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed'>
                      {course.courseDescription}
                    </p>
                    
                    <div className='mt-auto flex items-center text-lg font-bold text-slate-900'>
                       <FaRupeeSign size={16} className="text-slate-500 mr-0.5" />{course.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Order Summary Card (Clean & Standard) */}
            <div className='w-full lg:w-1/3 sticky top-28'>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  
                  <h2 className='text-xl font-bold text-slate-900 mb-6'>
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 flex items-center">
                        <FaRupeeSign size={12} className="mr-0.5"/>{totalAmount}
                      </span>
                    </div>
                    
                    {/* Coupon Input Area */}
                    <div className="pt-4 border-t border-slate-100">
                       <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-400 transition-colors">
                          <PiTagBold className="text-slate-400" size={20} />
                          <span className="text-sm font-medium text-slate-600 flex-1">Add a coupon</span>
                          <FiArrowRight className="text-slate-400" />
                       </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-base font-bold text-slate-900">Total</span>
                      <span className="text-3xl font-bold text-slate-900 flex items-center tracking-tight">
                        <span className="text-xl text-slate-500 mr-1 font-normal">₹</span>{totalAmount}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={handleBuyCourses}
                    className='w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base transition-colors duration-200 shadow-sm flex items-center justify-center gap-2'
                  >
                    Checkout <FiArrowRight />
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
                     <HiLockClosed size={16} />
                     Secure checkout powered by Razorpay
                  </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;