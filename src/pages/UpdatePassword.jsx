import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authApi';
import { FiEye, FiEyeOff, FiLock, FiArrowLeft } from "react-icons/fi"; // Modern icons
import toast, { Toaster } from 'react-hot-toast';

const UpdatePassword = () => {
    const [showpassword, setShowpassword] = useState(false);
    const [showconfirmpassword, setshowconfirmpassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    
    const [formdata, setFormdata] = useState({
        password: "",
        confirmpassword: "",
    });

    const dispatch = useDispatch();
    const location = useLocation(); // 🚀 URL fetch karne ka sahi tareeka
    const navigate = useNavigate();

    const { password, confirmpassword } = formdata;

    const changehandler = (e) => {
        setFormdata((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    const submithandler = (e) => {
        e.preventDefault();
        
        // Frontend validation
        if(password !== confirmpassword) {
            toast.error("Passwords do not match");
            return;
        }

        // 🚀 Fix: URL se token nikalne ka safe tareeka (split by '/')
        const token = location.pathname.split('/').at(-1);
        
        // Action mein navigate pass karo agar success hone par login page pe bhejna hai
        dispatch(resetPassword(password, confirmpassword, token, navigate));
    }

    // Common input styling for consistency
    const inputStyle = `
        w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl
        text-slate-900 placeholder:text-slate-400 font-medium
        focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 
        transition-all duration-300 shadow-sm
    `;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />
            
            <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                
                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6">
                        <FiLock className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                        Choose New Password
                    </h2>
                    <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                        Almost done! Enter your new password below and you're all set to go.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={submithandler} className="mt-8 space-y-6">
                    
                    {/* New Password Field */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                            New Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                            <input
                                required
                                type={showpassword ? "text" : "password"}
                                name="password"
                                value={password}
                                placeholder="Enter new password"
                                onChange={changehandler}
                                className={inputStyle}
                            />
                            <button 
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none" 
                                onClick={() => setShowpassword(!showpassword)}
                            >
                                {showpassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                            <input
                                required
                                type={showconfirmpassword ? "text" : "password"}
                                name="confirmpassword"
                                value={confirmpassword}
                                onChange={changehandler}
                                placeholder="Confirm new password"
                                className={inputStyle}
                            />
                            <button 
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none" 
                                onClick={() => setshowconfirmpassword(!showconfirmpassword)}
                            >
                                {showconfirmpassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-blue-500/30 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                </form>

                {/* Footer Section */}
                <div className="mt-6 flex items-center justify-center">
                    <Link 
                        to="/login" 
                        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                        Back to Login
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default UpdatePassword;