import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CTAButton from '../core/Home/CTAButton';
import { apiConnector } from '../../services/apiconnector';
import { countryCode } from '../../data/countryCode';
import {categories } from '../../services/apis';
import toast from 'react-hot-toast';

const ContactForm = () => {
    const[loading , setLoading] = useState(false);
    const {SUBMIT_SUGGESTIONS_API} = categories;
    
    // register ka matlb hota hai ki apko isski state manage krni hai and espar validation lagane hai jese required true
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors , isSubmitSuccessful}
    } = useForm();
    
    // data is like 
//     {
//   "firstname": "Shobhan",
//   "lastname": "Bhagwati",
//   "email": "shobhan@gmail.com",
//   "message": "Hello bhai!"
// }
    console.log("inside the contact form")
    const submitContactform = async(data)=>{
       
        console.log("Submitting data:", data);
console.log("API endpoint:", SUBMIT_SUGGESTIONS_API);

   
    try{
        const response = await apiConnector("POST" , SUBMIT_SUGGESTIONS_API , data );
        if(!response.data.success){
            console.log(response.data.message);
            toast.error("Something went wrong");
        }
        console.log(response);
 
        toast.success("Thank You For your valuable feedback")
    }catch(err){
        console.log(err);
    }
    }
// yaha pr useeffect ka use hoga jb bhi formsubmit ho jayega and it will clear the data
useEffect(() => {
  if (isSubmitSuccessful) {
    reset({
      firstname: "",
      lastname: "",
      email: "",
      message: "",
      phonenumber: ""
    });
  }
}, [isSubmitSuccessful, reset]); // dependency add karna important
  return (
    <form onSubmit={handleSubmit(submitContactform)}>
    <div className='w-full flex flex-col gap-6'>
    <div className='flex  mt-14 gap-5'>
     <div className='flex flex-col '>
        <label htmlFor='firstname'>First Name</label>
        <input
        type='text'
        name='firstname'
        placeholder='Enter first Name'
        className='border-2 border-gray-400 p-1 rounded-md'
        {...register("firstname" ,{required  : true} )}
        // is register ki help se ek key create ho jaati hai jiska name hai firstname
        ></input>
         {
            errors.firstname && (
                <span>please enter firstname</span>
            )
        }
     </div>

      <div className='flex flex-col'>
        <label htmlFor='lastname'>Last Name</label>
        <input
        type='text'
        name='lastname'
        placeholder='Enter last Name'
        className='border-2 border-gray-400 p-1 rounded-md'
        {...register("lastname" ,{required: true})}
        ></input>
        {
            errors.lastname && (
                <span>please enter lastname</span>
            )
        }
     </div>

     
    </div>

    <div className='flex flex-col '>
        <label htmlFor='email'>Email Address</label>
        <input
        type='text'
        name='email'
        placeholder='Enter email address'
        className='border-2 border-gray-400 p-1 rounded-md'
        {...register("email" , {required : true})}
        ></input>
        {
            errors.email && (
                <span>Please enter you email</span>
            )
        }
     </div>

     {/* phone number */}
     <div className='flex flex-col'>
        <label htmlFor='dropdown'>Phone number</label>
        <div className='flex'>
           <select
         name='dropdown'
         id='dropdown'
         className='w-[20%] border-2 border-gray-400 p-1 rounded-md'>
        {
          countryCode.map((element) =>{
            return(
                <option
                value={element.code}>
                  {element.code} - {element.country}
                </option>
            )
          })
        }
        </select>
        <input
        name='phonenumber'
        placeholder='12345 67890'
        className='w-full border-2 border-gray-400 p-1 rounded-md'
        {...register("phonenumber" ,
        {
            required :{value:true},
            maxLength:{value:10, message:"Invalid Phone number"},
            minLength:{value:8, message: "Invalid Phone number"}
        }
        )}
        ></input>
        {
            errors.phonenumber &&(
                <span>Enter valid phone number</span>
            )
        }
        </div>
       
     </div>

     {/* message */}
     <div className='flex flex-col'>
        <label>Message</label>
        <textarea
        name='message'
        type='text'
        placeholder='Enter your message here'
        cols={20}
        rows={7}
         className='border-2 border-gray-400 p-1 rounded-md'
        {...register("message" , {required:true})}
        >
        </textarea>
        {
            errors.message &&(
                <span>Enter your Message</span>
            )
        } 
     </div>

     <div className="w-[200px]">
        <CTAButton active={true}>Send Message</CTAButton>
     </div>
    </div>
    
     
    </form>



  )
}

export default ContactForm
