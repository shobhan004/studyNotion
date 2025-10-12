import React, { useState } from 'react'
import { CgPassword } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux'
import { IoMdEye } from "react-icons/io";
import {IoIosEyeOff} from "react-icons/io";
import padlock from "../assets/Images/padlock.png";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { resetPassword } from '../services/authApi';

const UpdatePassword = () => {
    const [showpassword , setShowpassword] = useState(false);
    const [showconfirmpassword , setshowconfirmpassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const [formdata , setFormdata] = useState(
      {password : "",
      confirmpassword : "",
    });
     
    const dispatch = useDispatch();


    
    const changehandler = (e) =>{
    setFormdata((prevData) =>({
      ...prevData,
        [e.target.name] : e.target.value,
    }
  ))
    }

    const {password , confirmpassword} = formdata;

    const submithandler = (e) =>{
      e.preventDefault();
      const token = location.pathname.split('-1').at(-1);
      dispatch(resetPassword( password , confirmpassword , token ));
    }

  return (
    <div className='flex flex-col justify-center items-center email min-h-screen'>
      <img src={padlock} className='w-[70px] h-[70px]'></img>
      {
        loading ? (<div>loading .... </div>)  : (
        <div className='flex flex-col justify-center gap-3.5'>
        <h1 className='text-3xl text-white font-bold' >Choose New Password</h1>
        <p className='text-xl text-white'>Almost all done Enter your password and all set</p>

        <form onSubmit={submithandler} className='flex flex-col gap-3.5 relative'>
            <label >
                <p className='text-white'>New Password <span className='text-red-600'>*</span></p>
                <input
                type = { showpassword ? "text" : "password"}
                name='password'
                value={password}
                placeholder='New password '
                onChange={changehandler}
                className='w-full inputs h-[40px] border-b-purple-400 border-b-[3px] placeholder-purple-400 align-text-top '>
                </input>
                <span onClick={ () => setShowpassword((prev) =>!prev)} className='text-white absolute right-5 top-8 text-2xl'>
                {   
                  showpassword  ? <IoMdEye />  :   <IoIosEyeOff />
                   
                }</span>
            </label>

            <label>
                <p className='text-white  '>Confirm Password <span className='text-red-600'>*</span></p>
                <input
                type = { showconfirmpassword ? "text" : "password"}
                name='confirmpassword'
                value={confirmpassword}
                onChange={changehandler}
                placeholder='Confirm password '
                className='w-full inputs h-[40px] border-b-purple-400 border-b-[3px] placeholder-purple-400'>
                
                </input>
                <span onClick={() => {setshowconfirmpassword((prev) => !prev)}}  className='text-white absolute right-5 top-28 text-2xl'>
                {   
                  showconfirmpassword  ? <IoMdEye /> :  <IoIosEyeOff />
                   
                }</span>
            </label>
            <div className='flex justify-between items-center '>
              <button className='text-white password px-5 py-3 rounded-full'>Set New Password</button>
                 <Link to={"/login"}  className='text-white'>
              Go to login page
            </Link>
            </div>
         
        </form>
        </div>
       
        )
        

      }
      </div>
  )
}

export default UpdatePassword
