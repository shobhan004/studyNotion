import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/authApi';
import { FiArrowLeft, FiMail, FiCheckCircle } from "react-icons/fi"; // Feather icons for modern look

const ForgotPassword = () => {
    const [checkmail, setCheckmail] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); // Add a loading state
    const dispatch = useDispatch();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Dispatch hone ke baad loading false karenge, assume action returns a promise
        await dispatch(getPasswordResetToken(email, setCheckmail));
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                
                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6">
                        {checkmail ? (
                            <FiCheckCircle className="h-8 w-8 text-blue-600" />
                        ) : (
                            <FiMail className="h-8 w-8 text-blue-600" />
                        )}
                    </div>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                        {checkmail ? "Check your email" : "Reset your password"}
                    </h2>
                    <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                        {checkmail 
                            ? `We've sent a password reset link to `
                            : "Don't worry! It happens. Please enter the email address associated with your account."
                        }
                        {checkmail && <span className="font-semibold text-slate-900 block mt-1">{email}</span>}
                    </p>
                </div>

                {/* Form Section */}
                <form className="mt-8 space-y-6" onSubmit={handleOnSubmit}>
                    {!checkmail && (
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all duration-300 shadow-sm"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-blue-500/30 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : checkmail ? (
                            "Resend Email"
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

export default ForgotPassword;