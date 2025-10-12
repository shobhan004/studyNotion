import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timeLineLanguage from '../../../assets/Images/TimelineImage.png'

const TimeLineSection = () => {
  const  TimeLineSection = [
    {
      Logo : logo1,
      heading :"Leadership",
      Description : "Fully committed to the success company"
    },
    {
      Logo : logo2,
      heading :"Responsibility",
      Description : "Students will always be our top priority",
    },
    {
      Logo : logo3,
      heading : "Responsibility",
      Description : "Students will always be our top priority",
    },
    {
     Logo : logo4,
     heading :"Flexibility",
     Description :"The ability to switch is an important skills",
    },
   
  ]
  return (
    <div className='flex w-[1200px] items-center  pt-36  mb-20 mx-auto '>
      <div className='flex flex-col gap-16 w-[50%]'>
        {
            TimeLineSection.map( (current , index) =>{
                return (
                      <div className='flex gap-4'>
                    <img src={current.Logo} className='w-[52px] h-[52px]'></img>
                    <div>
                        <h2 className='font-semibold text-xl text-black font-roboto '>{current.heading}</h2>
                        <p className='text-black text-lg font-montserrat font-medium '>{current.Description}</p>
                    </div>
                </div>
                )
               
            })
        }
      </div>
      <div className='w-[50%] relative'>
        <img src={timeLineLanguage} className='shadow-xl shadow-orange-600'></img>
        <div className='absolute bg-orange-600 flex w-[89%]  rounded-sm right-8 -bottom-12 h-[100px] gap-9 justify-center p-7 '>
            <div className='flex border-r-2 border-white pr-10 items-center gap-8'>
                <h1 className='text-white font-bold text-4xl'>10</h1>
                <p className='text-white text-lg'>Years <br/> Experiences</p>
            </div>
            <div className='flex  border-white items-center gap-8'>
                <h1 className='text-white font-bold text-4xl'>250</h1>
                <p className='text-white font-roboto text-lg '>Types of Courses</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection
