import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from './ProfileDropDown';
import CTAButton from '../core/Home/CTAButton'; // Using our production-ready button

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Redux States
    const { addedCount } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.profile); 
    const { token } = useSelector((state) => state.auth);

    // Active Link styling logic
    const isActive = (path) => location.pathname === path ? "text-blue-600" : "text-slate-600";

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                
                {/* 1. BRAND LOGO - Modern & Techy */}
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
      <span className="text-slate-900">Ski</span>
      <span style={{background:"linear-gradient(135deg,#2563eb,#4f46e5)",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}} className='text-blue-600'>lio</span>
    </span>
  </div>
</Link>

                {/* 2. NAVIGATION LINKS - Clean & Spaced */}
                <div className="hidden md:flex items-center gap-10">
                    <Link to="/" className={`${isActive('/')} font-bold text-sm uppercase tracking-widest hover:text-blue-500 transition-colors`}>
                        Home
                    </Link>
                    
                    {/* 🚀 PRO LOGIC: Agar Instructor NAHI hai toh 'Courses' dikhao */}
                    {user?.accountType !== "Instructor" && (
                        <Link to="/courses" className={`${isActive('/courses')} font-bold text-sm uppercase tracking-widest hover:text-blue-500 transition-colors`}>
                            Catalog
                        </Link>
                    )}

                    {/* 🚀 PRO LOGIC: Agar Instructor hai toh 'Dashboard' dikhao */}
                    {user?.accountType === "Instructor" && (
                        <Link to="/dashboard/my-courses" className={`${isActive('/dashboard/instructor')} font-bold text-sm uppercase tracking-widest text-purple-600 hover:text-purple-700 transition-colors`}>
                            My Courses
                        </Link>
                    )}

                    <Link to="/aboutUs" className={`${isActive('/aboutUs')} font-bold text-sm uppercase tracking-widest hover:text-blue-500 transition-colors`}>
                        About
                    </Link>
                    <Link to="/contactUs" className={`${isActive('/contactUs')} font-bold text-sm uppercase tracking-widest hover:text-blue-500 transition-colors`}>
                        Contact
                    </Link>
                </div>

                {/* 3. ACTIONS AREA (Cart, Profile, Login/Signup) */}
                <div className="flex items-center gap-4 md:gap-6">
                    
                    {/* Cart Icon - 🚀 Sirf non-instructors ko dikhega */}
                    {user?.accountType !== "Instructor" && (
                        <div className="relative cursor-pointer group" onClick={() => navigate("/cart")}>
                            <div className="p-2 rounded-full hover:bg-blue-50 transition-colors">
                                <IoCartOutline size={26} className="text-slate-700 group-hover:text-blue-600 transition-colors" />
                            </div>
                            {addedCount > 0 && (
                                <span className="absolute top-0 right-0 bg-blue-600 text-white rounded-full text-[10px] font-bold w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                                    {addedCount}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Conditional Rendering: Token Logic */}
                    {token === null ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block">
                                <CTAButton active={false} linkto="/login">
                                    <span className="px-1 text-sm">Log In</span>
                                </CTAButton>
                            </div>
                            <CTAButton active={true} linkto="/signup">
                                <span className="px-1 text-sm">Sign Up</span>
                            </CTAButton>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <ProfileDropDown />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;