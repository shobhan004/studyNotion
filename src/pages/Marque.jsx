import React from 'react'
import Infosys from '../assets/Images/infosys.png';
import wipro from '../assets/Images/wipro.png';
import amazon from '../assets/Images/amazon.png';
import flipkart from '../assets/Images/flipkart.png';
import accentrue from '../assets/Images/accenture.png';
import google from '../assets/Images/google.png';
import tcs from '../assets/Images/Tcs.png';
import cognizant from '../assets/Images/cognizant.png';
import {motion} from 'framer-motion';
function marque() {

 const logos = [
  Infosys,
   wipro,
   amazon,
   flipkart,
   accentrue
 ];
 
  return (
    <div className='w-full bg-zinc-200 flex flex-col p-20 gap-8'>
     <h1 className='text-[1.5rem] text-center text-zinc-600 font-semibold'>Trusted by over 17,000 companies and millions of learners around the world</h1>
     <div className='w-full bg-zinc-200 flex gap-12 px-5  overflow-hidden'> 
     <motion.div initial={{x:"0"}} animate={{x:"-100%"}} transition={{ease:"linear" , duration:10 , repeat:Infinity}} className='flex flex-shrink-0  gap-12 items-center'>
       {/* {
        logos.map((elem , index) =><img src={elem} className='w-[150px] h-[60px] flex-shrink-0'></img>)
      } */}
      <img src={Infosys} className='w-[100px] h-[100px]'></img>
      <img src={google} className='w-[50px] h-[50px]'></img>
       <img src={cognizant} className='w-[166px] h-[70px]'></img>
      <img src={wipro} className='w-[70px] h-[80px]'></img>
      <img src={flipkart} className='w-[100px] h-[110px]'></img>
      <img src={amazon} className='w-[100px] h-[50px]'></img>
      <img src={accentrue} className='w-[100px] h-[30px]'></img>
      </motion.div> 
       <motion.div initial={{x:"0"}} animate={{x:"-100%"}} transition={{ease:"linear" , duration:10 , repeat:Infinity}} className='flex flex-shrink-0  gap-12 items-center'>
       {/* {
        logos.map((elem , index) =><img src={elem} className='w-[150px] h-[60px] flex-shrink-0'></img>)
      } */}
      <img src={Infosys} className='w-[100px] h-[100px]'></img>
      <img src={google} className='w-[50px] h-[50px]'></img>
       <img src={cognizant} className='w-[166px] h-[70px]'></img>
      <img src={wipro} className='w-[70px] h-[80px]'></img>
      <img src={flipkart} className='w-[100px] h-[110px]'></img>
      <img src={amazon} className='w-[100px] h-[50px]'></img>
      <img src={accentrue} className='w-[100px] h-[30px]'></img>
      </motion.div> 

      <motion.div initial={{x:"0"}} animate={{x:"-100%"}} transition={{ease:"linear" , duration:10 , repeat:Infinity}} className='flex flex-shrink-0  gap-12 items-center'>
       {/* {
        logos.map((elem , index) =><img src={elem} className='w-[150px] h-[60px] flex-shrink-0'></img>)
      } */}
      <img src={Infosys} className='w-[100px] h-[100px]'></img>
      <img src={google} className='w-[50px] h-[50px]'></img>
       <img src={cognizant} className='w-[166px] h-[70px]'></img>
      <img src={wipro} className='w-[70px] h-[80px]'></img>
      <img src={flipkart} className='w-[100px] h-[110px]'></img>
      <img src={amazon} className='w-[100px] h-[50px]'></img>
      <img src={accentrue} className='w-[100px] h-[30px]'></img>
      </motion.div> 
     </div>
      
      
    </div>
  )
}

export default marque
