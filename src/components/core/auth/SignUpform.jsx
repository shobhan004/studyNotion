import girls from '../../../assets/Images/signup.webp'
import frame from '../../../assets/Images/frame.png'
import { useState } from 'react';
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { signUp } from '../../../services/authApi';
import { useNavigate } from 'react-router-dom';
function SignUpform(){
  // navigate is used to navigate or send the user to different pages or navigate them to different pages
  const navigate = useNavigate();
   const[signform , setSignform] = useState({firstname:"", lastname:"" ,email:"" , password:"",confirmpassword:""}) ;
   const dispatch = useDispatch(); 
    console.log({signform});
   
  function changehandler(event){
    setSignform((prev) =>({
      ...prev,
      [event.target.name] : event.target.value
    }))
  }

  function submitHandler(e){
    e.preventDefault();
    const {firstname , lastname, email , password, confirmpassword} = signform;
   
   // Pass 'navigate' as the last argument
  dispatch(
    signUp(
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      navigate // <-- Add this here
    )
  );
  }

return(
   <div>
     <div>
    
    </div>
     <form onSubmit={submitHandler}>

     
    <div className='flex gap-4'>
    
      <label>
        <p className='text-zinc-900 font-medium'>First Name <sup className='text-red-600'>*</sup></p>
        <input type='text' placeholder='Enter firstname' className='text-black rounded-md p-2 border-2 border-gray-700 ' onChange={changehandler} name='firstname'></input>
      </label>    
      <label>
        <p className='text-black font-medium'>Last Name <sup className='text-red-500'>*</sup></p>
        <input type='text' placeholder='Enter Lastname' className='text-black rounded-md p-2 border-2 border-gray-700 '  onChange={changehandler} name='lastname'></input>
      </label>  
    </div>

    {/*  email address*/}
    <div className='mt-3'>
     <label>
      <p className='text-black font-medium'>Email address <sup className='text-red-500'>*</sup></p>
      <input type='email' placeholder='Enter email' className='text-black rounded-md p-2 border-2 border-gray-700  w-[400px]'  onChange={changehandler} name='email'></input>
    </label>
    </div>
   
    <div className='flex gap-4 mt-3'>
      <label>
        <p className='text-black font-medium'>Create Password <sup className='text-red-500'>*</sup></p>
        <input type='text' placeholder='Enter password ' className='text-black rounded-md p-2 border-2 border-gray-700 '  onChange={changehandler} name='password'></input>
      </label>
      <label>
        <p className='text-black font-medium'>Confirm Password <sup className='text-red-500'>*</sup></p>
        <input type='text' placeholder='Confirm Password' className='text-black rounded-md p-2 border-2 border-gray-700 '  onChange={changehandler} name='confirmpassword'></input>
      </label>
    </div>
    <button className='bg-gradient-to-b from-orange-500 to-orange-600 border  text-white w-[410px] rounded-full hover:text-orange-600  hover:from-white hover:to-white py-2.5 mt-10 cursor-pointer  hover:border-orange-600'>Create Account</button>
    </form>
   </div>
   

 
)

}

export default SignUpform;