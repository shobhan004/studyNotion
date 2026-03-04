import React, { useState, useEffect } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoCartOutline, IoStar } from "react-icons/io5";
import { FiUsers } from 'react-icons/fi';
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/apis';
import toast from 'react-hot-toast';
import { setaddedCount } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Courses = () => {
  const dispatch = useDispatch();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", "courseEndpoints.GET_ALL_COURSE_API");
        if (res.data.success) {
          setAllCourses(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Could not load courses");
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const cartHandler = async (e, course) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in First");
      return;
    }

    // 1. Loading toast start karo aur uski ID save karo
    const toastId = toast.loading("Adding to cart...");
    
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/course/addToCart", 
        {
          courseData: {
            id: course._id,
            courseName: course.courseName,
            price: course.price,
            thumbnail: course.thumbnail,
          }
        },
        { Authorization: `Bearer ${token}` }
      );

      if (response.data.success) {
        dispatch(setaddedCount(response.data.count)); 
        // 🚀 PRO TWEAK: Naya toast banane ki jagah, loading wale ko hi update kar do
        toast.success("Added to cart successfully", { id: toastId });
      }
      
    } catch (error) {
      console.error("Cart error:", error);
      
      // Backend se jo error aayi hai ("Already enrolled" ya "Already in cart") wo nikalo
      const errorMessage = error.response?.data?.message || "Could not add to cart";
      
      // 🚀 PRO TWEAK: Loading wale toast ko laal rang ke error toast me badal do
      toast.error(errorMessage, { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">
        Loading courses...
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-[#F8FAFC] pt-24 pb-20'>
      <div className='max-w-7xl mx-auto px-6 md:px-8'>
        
        {/* Sleek Header */}
        <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Explore Premium Courses
            </h1>
            <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
              Enhance your skills with industry-standard curriculum. Handcrafted for developers, by developers.
            </p>
        </div>

        {/* Courses Grid - Professional UI */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {allCourses.map((course) => (
            <Link key={course._id} to={`/course/${course._id}`} className="group outline-none">
              <div className="flex flex-col h-full bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-300 transition-all duration-300">
                
                {/* Thumbnail Section */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-slate-100 bg-slate-50">
                  <img 
                    src={course.thumbnail} 
                    alt={course.courseName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  />
                  {/* Subtle Elegant Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-md shadow-sm border border-slate-200/50">
                      {course.category?.name || "Bestseller"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-3 text-xs font-medium text-slate-500">
    
                     <span className="flex items-center gap-1.5">
                        <FiUsers size={14} className="text-slate-400"/> {course.studentsEnrolled?.length || 0} Students
                     </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-800 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.courseName}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                    {course.courseDescription}
                  </p>

                  {/* Footer: Price & Action */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex items-center text-lg font-bold text-slate-900 tracking-tight">
                       <FaIndianRupeeSign size={15} className="mr-0.5 text-slate-400"/>
                       {course.price}
                    </div>

                    <button 
                      onClick={(e) => cartHandler(e, course)}
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      aria-label="Add to cart"
                    >
                      <IoCartOutline size={20} />
                    </button>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Courses;