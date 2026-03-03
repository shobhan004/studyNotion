import React from 'react'
import ContactForm from '../components/common/ContactForm'
import { FaMessage, FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden pb-20">
      
      {/* 1. Background Consistency (Blobs) */}
      <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] -z-0'></div>
      <div className='absolute bottom-20 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] -z-0'></div>

      <div className='relative z-10 flex flex-col lg:flex-row gap-12 mt-36 w-11/12 max-w-7xl mx-auto'>
        
        {/* ================= LEFT SIDE: INFO CARDS ================= */}
        <div className='lg:w-[40%] flex flex-col gap-6'>
          
          {/* Main Container for Info */}
          <div className='bg-slate-900 p-10 md:p-12 rounded-[2.5rem] flex flex-col gap-10 shadow-2xl shadow-blue-900/20'>
            
            {/* Chat Box */}
            <div className='flex gap-4 items-start group'>
              <div className='p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300'>
                <FaMessage size={24} />
              </div>
              <div>
                <h3 className='text-white text-xl font-bold font-montserrat mb-1'>Chat with us</h3>
                <p className='text-slate-400 text-sm font-medium mb-1'>Our friendly team is here to help.</p>
                <p className='text-blue-400 font-bold text-sm'>info@eduvate.com</p>
              </div>
            </div>

            {/* Visit Box */}

            {/* Call Box */}
            <div className='flex gap-4 items-start group'>
              <div className='p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300'>
                <IoCall size={24} />
              </div>
              <div>
                <h3 className='text-white text-xl font-bold font-montserrat mb-1'>Call us</h3>
                <p className='text-slate-400 text-sm font-medium mb-1'>Mon - Fri From 8am to 5pm</p>
                <p className='text-blue-400 font-bold text-sm'>+91 123 456 7869</p>
              </div>
            </div>

          </div>

          {/* Social Proof Placeholder - Adds credibility */}
          <div className='p-8 bg-blue-50 border border-blue-100 rounded-3xl'>
             <p className='text-blue-900 font-bold text-center italic'>
                "The best support team I've ever interacted with!"
             </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE: THE FORM CARD ================= */}
        <div className='lg:w-[60%] border border-slate-100 rounded-[3rem] p-8 md:p-14 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)]'>
          <div className='mb-10'>
            <h2 className='text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4'>
              Got an Idea? We've got the <span className='text-blue-600'>skills.</span>
            </h2>
            <p className='text-slate-500 text-lg font-medium'>
              Tell us more about yourself and what you've got in mind. Let's build something great together.
            </p>
          </div>
          
          <ContactForm />
        </div>

      </div>
    </div>
  )
}

export default Contact