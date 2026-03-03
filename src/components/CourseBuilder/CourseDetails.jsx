import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../../data/Courses';
import { IoStar, IoTimeOutline,  IoBookOutline , IoGlobeOutline, IoCheckmarkCircle, IoChevronDownOutline } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // ID ke basis par course filter kar rahe hain
    const selectedCourse = courses.find((c) => c.id === parseInt(id));
    setCourse(selectedCourse);
  }, [id]);

  if (!course) return <div className="pt-40 text-center">Loading Course Details...</div>;

  return (
    <div className='w-full min-h-screen bg-white'>
      {/* 1. DARK HERO SECTION */}
      <div className='bg-slate-900 pt-32 pb-20 text-white'>
        <div className='max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12'>
          <div className='lg:col-span-2'>
            <nav className='flex gap-2 text-blue-400 font-bold text-sm mb-6 uppercase tracking-widest'>
              <span>Development</span> / <span>{course.category}</span>
            </nav>
            <h1 className='text-4xl md:text-5xl font-black mb-6 leading-tight'>
              {course.title}
            </h1>
            <p className='text-slate-400 text-lg mb-8 max-w-2xl'>
              {course.description} This is a production-grade course designed to take you from beginner to advanced level.
            </p>
            
            <div className='flex flex-wrap items-center gap-6'>
              <div className='flex items-center gap-2 text-amber-400 font-bold'>
                <span className='text-xl'>{course.rating}</span>
                <div className='flex'><IoStar /><IoStar /><IoStar /><IoStar /><IoStar /></div>
                <span className='text-slate-400 text-sm'>({course.reviews} ratings)</span>
              </div>
              <div className='flex items-center gap-2 text-slate-300'>
                <IoGlobeOutline /> <span>English, Hindi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className='max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 py-16'>
        
        {/* LEFT COLUMN: Course Info */}
        <div className='lg:col-span-2 space-y-12'>
          
          {/* What you'll learn */}
          <div className='border border-slate-200 rounded-3xl p-8 bg-slate-50/50'>
            <h3 className='text-2xl font-black text-slate-900 mb-6'>What you'll learn</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {["Industry standards", "Project-based learning", "Best practices", "Code reviews"].map((item, i) => (
                <div key={i} className='flex items-start gap-3 text-slate-600'>
                  <IoCheckmarkCircle className='text-blue-600 mt-1 flex-shrink-0' size={20}/>
                  <span>Mastering {item} in modern applications.</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Preview (Static for now) */}
          <div>
            <h3 className='text-2xl font-black text-slate-900 mb-6'>Course Content</h3>
            <div className='border border-slate-200 rounded-2xl overflow-hidden'>
               {[1, 2, 3].map((section) => (
                 <div key={section} className='border-b border-slate-200 last:border-0'>
                   <div className='flex justify-between items-center p-5 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors'>
                      <span className='font-bold text-slate-800'>Section {section}: Getting Started</span>
                      <IoChevronDownOutline />
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY SIDEBAR */}
        <div className='relative'>
          <div className='lg:sticky lg:top-32 bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden'>
             <div className='aspect-video bg-slate-200 relative group'>
                {/* Yahan par hum course image ya intro video dalenge */}
                {course.imageType === "svg" ? (
                    <div className='h-full w-full bg-blue-600 flex items-center justify-center text-white font-black'>PREVIEW</div>
                ) : (
                    <img src={course.image} className='w-full h-full object-cover' alt="Preview" />
                )}
                <div className='absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                   <span className='bg-white text-slate-900 px-6 py-2 rounded-full font-bold shadow-xl'>Preview Video</span>
                </div>
             </div>

             <div className='p-8'>
                <div className='flex items-center gap-2 mb-6'>
                    <span className='text-4xl font-black text-slate-900 flex items-center'>
                      <FaIndianRupeeSign size={28}/>{course.price}
                    </span>
                    <span className='text-slate-400 line-through text-lg'>₹{parseInt(course.price) + 2000}</span>
                    <span className='text-green-600 font-bold text-sm'>75% OFF</span>
                </div>

                <div className='space-y-4'>
                   <button className='w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200'>
                      Add To Cart
                   </button>
                   <button className='w-full py-4 border-2 border-slate-900 text-slate-900 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all'>
                      Buy Now
                   </button>
                </div>

                <div className='mt-8 pt-8 border-t border-slate-100 space-y-4 text-sm font-medium text-slate-600'>
                    <div className='flex items-center gap-3'><IoTimeOutline size={18}/> {course.duration} on-demand video</div>
                    <div className='flex items-center gap-3'><IoBookOutline size={18}/> 12 downloadable resources</div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;