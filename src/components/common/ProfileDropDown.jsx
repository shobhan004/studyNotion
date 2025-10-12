

const user = ["Profile", "MyCourses" ,"Settings","SignOut"];
import { CiSettings } from "react-icons/ci";
import {courseEndpoints} from '../../services/apis';
import {endpoints} from '../../services/apis';
import { CiUser } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../services/apiconnector';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setToken} from '../../slices/authSlice';
const ProfileDropDown = () => {
    const [name , setName] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
   
    const dispatch = useDispatch();
   const {GET_IMAGE_LETTER} = courseEndpoints; 
    if(!token){
        throw new Error("Token Not received");
        
    }
    const removeUser = async()=>{
      const {SIGN_OUT} = endpoints;
      try{
      const response = await apiConnector("POST" ,SIGN_OUT , null);
      if(!response.data.success){
        throw new Error(response.data.message);
      }else{
        localStorage.removeItem("token");
        dispatch(setToken(null));
        navigate("/login");
        
      }
      
      }catch(err){
        console.log(err);
      }
    }
    const getUsername = async()=>{
      console.log("inside the getUsername function");
     const response = await apiConnector("GET" ,GET_IMAGE_LETTER, null ,
        {
            Authorization:`Bearer ${token}`
        }
    );
    if(!response.data.success){

        throw new Error(response.data.message);
        
    }
    const uname = response?.data?.username;
    setName(uname);
    }
    useEffect(()=>{
    getUsername();
    },[])

    const handler =()=>{
    dispatch(setToken(null));
    navigate("/login"); 
    }


  return (
    <div className='relative group' >    
     <img 
  src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`} 
  alt="avatar" 
  className="w-10 h-10 rounded-full  "
/>

  {
     (
     <div className="opacity-0 group-hover:opacity-100 absolute z-50 w-[200px] -left-5 top-11 cursor-pointer ">
      <ul className='flex-col  bg-white p-2 rounded-lg text-black   shadow-xl'>
        <li className='  hover:bg-zinc-200 hover:rounded-2xl  text-lg font-meduim p-2.5 flex items-center gap-1.5' onClick={()=>navigate("/dashboard/myprofile")}> <span className='text-2xl'><CiUser /></span>Profile</li>
        <li className=' hover:bg-zinc-200 hover:text-black hover:rounded-2xl  text-lg font-meduim p-2.5 flex items-center gap-1.5' onClick={()=>navigate("/dashboard/mycourses")}> <span><IoBookSharp /></span>MyCourses</li>
        <li className=' hover:bg-zinc-200  hover:text-black hover:rounded-2xl  text-lg font-meduim p-2.5 flex items-center gap-1.5' onClick={()=>navigate("/dashboard/Settings")}> <span className='text-2xl'><CiSettings /></span> Settings</li>
        <li className=' hover:bg-zinc-200  hover:text-black hover:rounded-2xl  text-lg font-meduim p-2.5 flex items-center gap-1.5' onClick={()=>removeUser()}><span className='text-xl'><IoIosLogOut /></span>SignOut</li>
      </ul>
       
      </div>
    )
  }

 
     
     
    </div>
  )
}

export default ProfileDropDown
