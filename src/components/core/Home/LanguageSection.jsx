import React from 'react'
import CTAButton from './CTAButton'
import Highlights from './Highlights'
import knowprogress from '../../../assets/Images/Know_your_progress.png'
import compete from '../../../assets/Images/Compare_with_others.png'
import plan from '../../../assets/Images/Plan_your_lessons.png'
const LanguageSection = () => {
  return (
    <div className='mt-32 w-full py-28'>
      <div className='w-[60%] mx-auto flex flex-col gap-10'>
        <h1 className=' text-[3rem] font-roboto font-bold text-center'>Your swiss knife for <Highlights text={"learning any language"
}></Highlights></h1>
        <p className='text-lg  font-montserrat font-medium text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking,
         custom schedule and more.</p>
      </div>
      <div className='flex mx-auto w-11/12 relative items-center justify-center pt-20 pb-14'>
        <img src={knowprogress} className='h-[400px] w-[400px] object-contain -mr-32' ></img>
        <img src={compete} className='h-[500px] w-[450px]  object-contain'></img>
        <img src={plan} className='h-[500px] w-[450px] object-contain -ml-32' ></img>
      </div>
      <div className='w-[180px] mx-auto  '><CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton></div>
    </div>
  )
}

export default LanguageSection
