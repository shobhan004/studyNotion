import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { signUp } from '../../../services/authApi'; // Ensure ye api updated ho
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SignUpform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Naya State: Account Type ke liye
  const [accountType, setAccountType] = useState("Student");
  
  const [signform, setSignform] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changehandler(event) {
    setSignform((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  function submitHandler(e) {
    e.preventDefault();
    if (signform.password !== signform.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { firstname, lastname, email, password, confirmpassword } = signform;
    // 🚨 IMPORTANT: authApi.js mein accountType pass karna mat bhoolna!
    dispatch(signUp(firstname, lastname, email, password, confirmpassword, accountType, navigate));
  }

  // Consistent SaaS Styles
  const inputStyle = `
    w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl
    text-slate-900 placeholder:text-slate-400 font-medium
    focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 
    transition-all duration-300 shadow-sm
  `;

  const labelStyle = "text-sm font-bold text-slate-700 mb-1.5 ml-1 block";

  return (
    <div className='w-full max-w-[500px]'>
      
      {/* 🚀 THE PRO TOGGLE SWITCH */}
      <div className="flex bg-slate-100 p-1.5 gap-1 mb-8 rounded-full max-w-max border border-slate-200/60 shadow-inner">
        <button
          className={`py-2 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
            accountType === "Student"
              ? "bg-white text-slate-900 shadow-sm scale-100"
              : "text-slate-500 hover:text-slate-700 scale-95"
          }`}
          onClick={() => setAccountType("Student")}
        >
          Student
        </button>
        <button
          className={`py-2 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
            accountType === "Instructor"
              ? "bg-white text-slate-900 shadow-sm scale-100"
              : "text-slate-500 hover:text-slate-700 scale-95"
          }`}
          onClick={() => setAccountType("Instructor")}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-5">
        
        {/* First & Last Name */}
        <div className='flex flex-col md:flex-row gap-4'>
          <div className="flex-1">
            <label className={labelStyle}>First Name <span className='text-red-500'>*</span></label>
            <input 
              required
              type='text' 
              placeholder='Enter first name' 
              className={inputStyle} 
              onChange={changehandler} 
              name='firstname'
              value={signform.firstname}
              // value is used because it make input a controlled component and can perform realtime manipulation and validation
              // 
            />
          </div>
          <div className="flex-1">
            <label className={labelStyle}>Last Name <span className='text-red-500'>*</span></label>
            <input 
              required
              type='text' 
              placeholder='Enter last name' 
              className={inputStyle} 
              onChange={changehandler} 
              name='lastname'
              value={signform.lastname}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelStyle}>Email Address <span className='text-red-500'>*</span></label>
          <input 
            required
            type='email' 
            placeholder='name@example.com' 
            className={inputStyle} 
            onChange={changehandler} 
            name='email'
            value={signform.email}
          />
        </div>

        {/* Password Fields */}
        <div className='flex flex-col md:flex-row gap-4'>
          <div className="flex-1 relative">
            <label className={labelStyle}>Create Password <span className='text-red-500'>*</span></label>
            <input 
              required
              type={showPassword ? "text" : "password"} 
              placeholder='••••••••' 
              className={inputStyle} 
              onChange={changehandler} 
              name='password'
              value={signform.password}
            />
            <span 
              className="absolute right-4 top-[38px] text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20}/> : <AiOutlineEye size={20}/>}
            </span>
          </div>
          <div className="flex-1 relative">
            <label className={labelStyle}>Confirm <span className='text-red-500'>*</span></label>
            <input 
              required
              type={showConfirmPassword ? "text" : "password"} 
              placeholder='••••••••' 
              className={inputStyle} 
              onChange={changehandler} 
              name='confirmpassword'
              value={signform.confirmpassword}
            />
            <span 
              className="absolute right-4 top-[38px] text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20}/> : <AiOutlineEye size={20}/>}
            </span>
          </div>
        </div>

        {/* Dynamic Submit Button */}
        <button 
          className={`w-full mt-4 py-4 text-white rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 active:scale-95 transform-gpu ${
            accountType === "Instructor" 
              ? "bg-slate-900 hover:bg-purple-600 hover:shadow-purple-200 shadow-slate-200" 
              : "bg-slate-900 hover:bg-blue-600 hover:shadow-blue-200 shadow-slate-200"
          }`}
        >
          Create {accountType} Account
        </button>
      </form>
    </div>
  )
}

export default SignUpform;