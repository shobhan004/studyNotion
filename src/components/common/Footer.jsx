import React from 'react'
import { FiInstagram } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import gpay from "../../assets/Images/gpay.png";
import visa from "../../assets/Images/visa.png";
import phonepay from "../../assets/Images/phonepay.png";
import mastercard from "../../assets/Images/mastercard.png";


import { Link } from 'react-router-dom';
import studynotion from "../../assets/Images/download.png";
const Footer = () => {
  return (
    
      <footer className="w-full bg-black pt-20 px-9 ">
      <div className=' w-[1350px] mx-auto flex flex-col gap-8 '>
      <div className='flex gap-12 justify-center'>
      <div className='text-white border-r-2 text-[18px] border-r-zinc-600 pr-16  flex flex-col gap-1.5 justify-center items-center'>
      <img src={studynotion}></img>
      <p className>Contact Us</p>
      <p>8473256194</p>
      </div>
      <div className='text-white w-[70%] flex flex-col gap-3.5'>
        <h1 className='text-[2.5rem] font-semibold font-montserrat tracking-tight text-center'>Kickstart Your Learning Journey Today !</h1>
        <p className='text-center text-lg'>Browse courses and unlock your skills to reach full of dreams</p>
        <div className='text-center'> 
        <button className='bg-amber-700  rounded-full justify-center px-[38px] py-[12px] text-white text-lg' >Click Here</button>
        </div>
        
      </div>
      <div className='text-white border-l-2 border-l-zinc-600 pl-16 text-lg flex flex-col items-center justify-center gap-1.5'>
        <p>Social Media</p>
        <div className='flex gap-3'>
          <FiInstagram  />
          <FaFacebookF />
          <FaXTwitter />
          <FaLinkedin />
          <FaYoutube />
        </div>
      </div>
      <div></div>
      </div>
      {/* logo */}
      <div>
        
      </div>

      {/* cards */}
      <div className='flex justify-between pb-5'>
        <div>qwdewfdcdcd</div>
        <div className='flex gap-3.5'>
        <img src={gpay} className='w-[70px] bg-white p-2.5 h-[40px] rounded-lg'></img>
        <img src={mastercard} className='w-[70px] bg-white p-2.5 h-[40px] rounded-lg'></img>
        <img src={visa} className='w-[70px] bg-white p-2.5 h-[40px] rounded-lg'></img>
        <img src={phonepay} className='w-[70px] bg-white p-2.5 h-[40px] rounded-lg'></img>
        </div>
        
      </div>
      </div>
           
            
           
      </footer>
    
  )
}

export default Footer
