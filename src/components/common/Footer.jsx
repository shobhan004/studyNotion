import React from 'react'
import { FiInstagram } from "react-icons/fi";
import { FaFacebookF, FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';

// Payment Icons
import gpay from "../../assets/Images/gpay.png";
import visa from "../../assets/Images/visa.png";
import phonepay from "../../assets/Images/phonepay.png";
import mastercard from "../../assets/Images/mastercard.png";

const Footer = () => {
  return (
    <footer className="relative w-full bg-slate-900 pt-20 pb-10 overflow-hidden">
      
      {/* 1. Background Decoration (Consistency check: Subtle glow) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 z-10">
        
        {/* ================= TOP SECTION: CTA ================= */}
        {/* <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pb-20 border-b border-slate-800">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Kickstart Your <span className="text-blue-400">Learning Journey</span> Today!
            </h2>
            <p className="text-slate-400 text-lg font-medium">
              Browse thousands of courses and unlock your potential with our expert-led tutorials.
            </p>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end">
             <Link to="/signup">
                <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 active:scale-95">
                  Get Started for Free
                </button>
             </Link>
          </div>
        </div> */}

        {/* ================= MIDDLE SECTION: LINKS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20">
          
          {/* Column 1: Brand & Social */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
           <Link to="/" className="flex items-center gap-[11px] group">
             <div className="relative w-[38px] h-[38px] rounded-[11px] overflow-hidden
               flex items-center justify-center
               shadow-[0_2px_10px_rgba(79,70,229,0.22)]
               group-hover:shadow-[0_6px_20px_rgba(79,70,229,0.35)]
               group-hover:-translate-y-px group-hover:-rotate-[5deg]
               transition-all duration-300"
               style={{background:"linear-gradient(135deg,#2563eb,#4f46e5)"}}>
               <div className="absolute top-0 inset-x-0 h-[45%] bg-white/10 rounded-t-[11px]"/>
               <span className="relative z-10 text-white/95 font-semibold
                 text-[19px] tracking-[-0.5px] leading-none"
                 style={{fontFamily:"'Outfit',sans-serif"}}>S</span>
               <div className="absolute bottom-[5px] right-[6px] w-[5px] h-[5px]
                 rounded-full bg-indigo-300/85"/>
             </div>
             <div className="flex flex-col gap-[2px] leading-none">
               <span className="font-semibold text-[26px] tracking-[-0.6px]"
                 style={{fontFamily:"'Outfit',sans-serif"}}>
                 <span className="text-white">Ski</span>
                 <span style={{background:"linear-gradient(135deg,#2563eb,#4f46e5)",
                   WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}} className='text-blue-600'>lio</span>
               </span>
             </div>
           </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering learners through accessible, project-based tech education. Build your future with Eduvate.
            </p>
            <div className="flex gap-4 text-slate-400">
                <a href="#" className="hover:text-blue-400 transition-colors"><FiInstagram size={20}/></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><FaFacebookF size={20}/></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><FaXTwitter size={20}/></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><FaLinkedin size={20}/></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><FaYoutube size={20}/></a>
            </div>
          </div>

          {/* Column 2: Resources */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Resources</h4>
            <div className="flex flex-col gap-3 text-slate-400 text-sm font-medium">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Legal</h4>
            <div className="flex flex-col gap-3 text-slate-400 text-sm font-medium">
                <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>

          {/* Column 4: Support */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Support</h4>
            <div className="flex flex-col gap-3 text-slate-400 text-sm font-medium">
                <p>Email: help@eduvate.com</p>
                <p>Phone: +91 8473256194</p>
               
            </div>
          </div>

        </div>

        {/* ================= BOTTOM SECTION: COPYRIGHT & PAYMENTS ================= */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-center gap-8">
          

          <div className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
            <img src={gpay} alt="GPay" className="h-6 object-contain filter brightness-0 invert" />
            <img src={visa} alt="Visa" className="h-6 object-contain filter brightness-0 invert" />
            <img src={phonepay} alt="PhonePe" className="h-6 object-contain filter brightness-0 invert" />
            <img src={mastercard} alt="Mastercard" className="h-6 object-contain filter brightness-0 invert" />
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer;