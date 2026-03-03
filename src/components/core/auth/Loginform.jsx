import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { login } from "../../../services/authApi";

function Loginform({ setIsLoggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formdata, setFormData] = useState({ email: "", password: "" });
  const [showpassword, setShowpassword] = useState(false);

  function changehandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  function submithandler(e) {
    e.preventDefault();
    const { email, password } = formdata;
    
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    
    dispatch(login(email, password, navigate));
  }

  // Common styles for consistency
  const inputStyle = `
    w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl
    text-slate-900 placeholder:text-slate-400 font-medium
    focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 
    transition-all duration-300 shadow-sm
  `;

  const labelStyle = "text-sm font-bold text-slate-700 mb-2 ml-1 block";

  return (
    <div className="w-full">
      <Toaster position="top-center" reverseOrder={false} />
      
      <form onSubmit={submithandler} className="flex flex-col gap-6">
        
        {/* --- Email Address --- */}
        <div className="w-full">
          <label className={labelStyle}>
            Email Address <span className="text-red-500">*</span>
          </label>
          <input 
            required
            type="email" 
            name="email"
            placeholder="name@company.com" 
            className={inputStyle} 
            onChange={changehandler} 
            value={formdata.email}
          />
        </div>

        {/* --- Password --- */}
        <div className="w-full relative">
          <div className="flex justify-between items-center mb-2 px-1">
             <label className="text-sm font-bold text-slate-700">
                Password <span className="text-red-500">*</span>
             </label>
             <Link to="/forget">
                <span className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot Password?
                </span>
             </Link>
          </div>
          
          <div className="relative group">
            <input 
              required
              type={showpassword ? "text" : "password"} 
              name="password"
              placeholder="••••••••" 
              className={inputStyle} 
              onChange={changehandler}
              value={formdata.password}
            />
            
            <button 
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" 
              onClick={() => setShowpassword(!showpassword)}
            >
              {showpassword ? <IoEyeOutline size={22} /> : <IoEyeOffOutline size={22} />}
            </button> 
          </div>
        </div>

        {/* --- Submit Button --- */}
        <button 
          type="submit"
          className="mt-4 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg 
                     shadow-xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 
                     transition-all duration-300 active:scale-95 transform-gpu"
        >
          Sign In
        </button>

      </form>
    </div>
  )
}

export default Loginform;