import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import {login} from "../../../services/authApi"

function Loginform({ setIsLoggedIn}){
  const dispatch = useDispatch();
    const [formdata , setFormData] =  useState({email : "", password : ""});
    const navigate = useNavigate();
    const [showpassword , setShowpassword] = useState(false);

      function changehandler(event){
        setFormData((prev) =>({
          ...prev,
      [event.target.name] : event.target.value
    }))
  }
  function submithandler(e){
    e.preventDefault();
    const{email , password} = formdata;
    dispatch(login(email , password , navigate))
  }
   
return(
    <div className="w-full">
     <Toaster position="top-center" reverseOrder={false} />
    <form onSubmit={submithandler}>

   
    <div className="w-full">
      <label>
            <p className="text-black font-medium mb-1.5  ">Email Address <sup className="text-red-500">*</sup></p>
            <input type="email" placeholder="Enter email address" className="  text-gray-600 left-0 px-3 border-[2px] py-2.5 border-gray-800 w-full rounded-full" onChange={changehandler} name="email"></input>
            {/* ye name essiliye deiya kyki upar event.target.name yahi se le rha hai */}
        </label>
    </div>

    <div className="mt-2.5 relative">
     <label>
            <p className="text-black font-medium mb-1.5 ">Password <sup className="text-red-500">*</sup></p>
            <input type = { showpassword ? "text" : "password"} placeholder="Enter Password"  className="text-gray-600 left-0 px-3 border-[2px] py-2.5 border-gray-800 w-full rounded-full" onChange={changehandler} name="password">
            </input>
            <span className="text-zinc-700 absolute right-3 text-xl top-[43px]" onClick={() => setShowpassword(!showpassword)}>{showpassword ? (<IoEyeOutline /> )  :( <IoEyeOffOutline />)}</span> 
           <Link to="/forget"><span className="text-orange-600 text-[14px] absolute right-0 top-[78px]">Forget Password</span></Link>
        </label>
    </div>
      
        
       
                <button className="bg-orange-500 mt-12 w-full px-3 py-2.5 rounded-full cursor-pointer text-white hover:text-orange-500 hover:bg-white hover:border-2 hover:border-orange-500 ">Sign In</button>
        


         </form>
    </div>
)
}

export default Loginform