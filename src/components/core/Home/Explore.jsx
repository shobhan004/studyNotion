import React, { useState } from 'react'
import Highlights from './Highlights'
import {HomePageExplore} from '../../../../data/ExploreMore'
import CTAButton from './CTAButton'
import { FaArrowRight } from "react-icons/fa";

const Explore = () => {
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths",   
    ]

 const [currentTab , setCurrentTab] = useState(tabsName[0]);
 const [courses, setCourses] = useState(HomePageExplore[0].courses);
 const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

 const clickhandler = (value) =>{
 setCurrentTab(value);
 const result = HomePageExplore.filter((current) => current.tag === value);
 setCourses(result[0].courses);
 setCurrentCard(result[0].courses[0].heading);
 }

 const cardhandler = (value) =>{
 setCurrentCard(value.heading);
 }
  return (
    <div className='w-full pt-7 bg-purple-950 flex flex-col gap-3 pb-14'>
      <h1 className='text-center text-white text-5xl font-semibold font-roboto'>
        Unlock the <Highlights text={"Power of Code"}> </Highlights>
      </h1>
      <p className='text-xl font-semibold font-roboto text-white text-center'>Learn to Build Anything You Can Imagine</p>
      <div className='flex gap-6 justify-center text-white text-xl mt-3'>
        {
            tabsName.map((element , index) =>{
                return(
                    <div className={`${element == currentTab ?"bg-linear-65 from-purple-500 to-pink-500 " :"text-white"} px-6 py-1.5 rounded-full hover:bg-linear-65 from-purple-500 to-pink-500 font-roboto`}
                    onClick={() => {clickhandler(element)}}
                    key={index}
                    >
                   {element}
                    </div>
                )
            })
        }
      </div>
      <div className='flex gap-16  mx-auto bg-purple-950 mt-6'>
        {
            courses.map((current) =>{
                return(
                    <div className={`flex flex-col gap-7 p-3 bg-white max-w-[300px] transition-all duration-300 cursor-pointer ${currentCard === current.heading ?("scale-125 shadow-2xl")  :("scale-100 bg-black")}`}
                    onClick={() =>{cardhandler(current)}}>
                     <h1 className='text-black font-semibold font-roboto text-xl'>{current.heading}</h1>
                     <p className='text-black font-roboto '>{current.description}</p>
                     <div className='flex justify-around'>
                      <div>{current.level}</div>
                      <div>{current.lessionNumber}</div>
                     </div>
                    </div>
                )
            })
        }
      </div>
      <div className='flex gap-7 justify-center mt-20'>
      <div className='w-[200px] '>
       <CTAButton active={true}>
       <div className='flex items-center gap-2'>
        {"Learn More"}
       <FaArrowRight></FaArrowRight>
       </div>
       </CTAButton>
      </div>
      <div>
        <CTAButton>Learn More</CTAButton>
      </div>
      </div>
      
    </div>
  )
}

export default Explore
