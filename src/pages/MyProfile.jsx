import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MyProfile = () => {

  const {user} = useSelector((state) =>state.profile);
  return (
    <div className="mt-24 w-[60%] mx-auto  flex flex-col gap-32  p-10">
    {/* section 1 */}
     <div className='rounded-lg p-6 shadow-xl bg-zinc-500 flex flex-col gap-2.5'>
      <h1 className='text-white font-semibold font-montserrat text-4xl'>My Profile</h1>
      <div className='flex justify-between items-center'>
        <div className='flex gap-9'>
          <img src={user.image} className='h-[50px] w-[50px] rounded-full'></img>
          <div>
            <p className='text-white text-lg'>{user.firstname}  {user.lastname}</p>
            <p className='text-white text-lg'>{user.email}</p>
          </div>
        </div>
        <div>
         <Link to={"/settings"} className='inline-block  bg-orange-500 rounded-full text-white hover:text-orange-500 hover:bg-white hover:border-2  px-5 py-2'>
  Edit
</Link>
        </div> 
      </div>
     </div>
      {/* section 2 */}
      {/* <div className='shadow-xl bg-zinc-500 p-6 '>
      <div className='flex justify-between mx-auto pr-7'>
       <h1 className='text-white text-2xl font-semibold font-montserrat p-8'>About</h1>
       <div>
        <Link to={"/settings"} className='inline-block  bg-orange-500 rounded-full text-white hover:text-orange-500 hover:bg-white hover:border-2  px-5 py-2'>
  Edit
</Link>
       </div>
        
      </div>
        
      </div> */}

      {/* section 3 */}
      <div className='p-4 bg-zinc-500 rounded-lg shadow-xl'>
       <div className='flex flex-col gap-6'>
        <div className='flex justify-between'>
          <h1 className='text-white font-semibold font-montserrat text-4xl'>Personal details</h1>
           <div>
        <Link to={"/settings"} className='  bg-orange-500 rounded-full text-white hover:text-orange-500 hover:bg-white hover:border-2  px-5 py-2'>
  Edit
</Link>
       </div>
        </div>
        <div className='flex gap-24'>
          <div className='flex flex-col gap-3'>
            <p className='text-white text-lg'>First name</p>
            <p className='text-white  text-lg'>{user.firstname}</p>
            <p className='text-white  text-lg'>Email</p>
            <p className='text-white  text-lg'>{user.email}</p>
            <p className='text-white  text-lg'>Gender</p>
            <p className='text-white  text-lg'>Add Gender</p>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-white  text-lg'>Last name</p>
            <p className='text-white  text-lg'>{user.lastname}</p>
            <p className='text-white  text-lg'>Contact number</p>
            <p className='text-white  text-lg'>Add contact number</p>
            <p className='text-white  text-lg'>Date of Birth</p>
            <p className='text-white  text-lg'>Add Gender</p>
          </div>
        </div>
       </div>
      </div>
    </div>
      
    
  )
}

export default MyProfile

