import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/authApi';
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
    const [checkmail , setCheckmail] = useState(false);
    const [email , setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) =>{
     e.preventDefault();
     dispatch(getPasswordResetToken(email , setCheckmail));

    }

  return (
    <div className='pt-36 '>
      <div className='flex flex-col justify-center items-center gap-5 '>
        <h1 className='text-black text-3xl font-semibold' >
            {
                checkmail ? "Check your Mail"   : "Reset your password" 
            }
        </h1>
        <p className='w-[600px] text-xl text-center'>
            {
                checkmail ?`Check your mail ${email}`  :  "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            }
        </p>
        <form onSubmit={handleOnSubmit}>
            {
                !checkmail && (
                    <label > 
                    <p className='mb-2'>Email Address <span className='text-red-400'>*</span></p>
                      <input
                    required
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Enter your Email Address '
                    onChange={(e) =>setEmail(e.target.value)}
                    className='w-full h-[40px] rounded-md'
                    >
                        
                    </input>
                    </label>
                   
                )
            }
            <button className='mt-3 w-full py-3 rounded-lg text-black hover:text-white bg-linear-to-t from-sky-500 to-indigo-500 border-0'>
                {
                    checkmail  ? <div  className='text-xl px-3.5'>Resend Email</div> :
                        <div className='text-xl '>Submit</div>
                }
            </button>
        </form>
        <div >
            <Link to={'/login'} className='flex items-center gap-2.5'>
                <p className='text-lg'><FaArrowLeft /></p>
                <p className='text-lg'>Back To Login</p>
              
            </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
