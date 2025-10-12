import React from 'react'
import ContactForm from '../components/common/ContactForm'
import { FaMessage } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import Footer from '../components/common/Footer';

const Contact = () => {
  return (
    <div >
      <div className=' flex gap-11 mt-32 w-[1200px] mx-auto mb-12'>
        <div className='bg-zinc-800 p-20 h-[450px] w-[43%] rounded-lg flex flex-col gap-9'>
         <div className='flex flex-col justify-center'>
         <div className='flex items-center gap-2.5'>
         <p className='text-white'><FaMessage></FaMessage></p>
         <h1 className='text-white text-xl font-semibold font-montserrat'> Chat on us</h1>
         </div>
            
            <p className='text-white font-roboto'>Our friendly team is here to help.

info@studynotion.com</p>
         </div>
         
         <div>
          <div className='flex gap-2.5 items-center'>
            <p className='text-white'><FaEarthAmericas /></p>
            <h1 className='text-white text-xl font-semibold font-montserrat'>Visit us</h1>
          </div>
          <p className='text-white font-roboto'>Come and say hello at our office HQ.

Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
         </div>


         <div>
          <div className='flex gap-2.5 items-center'>
            <p className='text-white'><IoCall /></p>
            <h1 className='text-white text-xl font-semibold font-montserrat'>Call us</h1>
          </div>
          <p className='text-white font-roboto'>Mon - Fri From 8am to 5pm</p>
          <p className='text-white font-roboto'>+123 456 7869</p>
         </div>
         
        </div>
        <div className='border-2 border-zinc-800 rounded-lg p-8
        '>
         <h1 className='text-black font-montserrat text-4xl font-semibold'>Got a Idea? We've got the skills.</h1>
         <h1  className='text-black font-montserrat text-4xl font-semibold'>Let's team up</h1>
         <p>Tell us more about yourself and what you're got in mind.</p>
         <ContactForm></ContactForm>
        </div>
      </div>

     
    </div>
  )
}

export default Contact
