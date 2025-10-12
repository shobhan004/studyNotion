import React from 'react'
import { Link } from 'react-router-dom'
import Highlights from '../core/Home/Highlights'
import CTAButton from '../core/Home/CTAButton'
const learningGrid = [
    {
        order:-1,
        heading: "World-class learning for",
        highlightText: "Anyone Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order : 1,
         heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        
    },
     {
        order : 2,
         heading: "Our Learning Methods",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
        
    },
    {
        order : 3,
         heading: "Certification",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
        
    },
    {
        order : 4,
         heading: "Rating Auto-grading",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
        
    },
       {
        order : 5,
         heading: "Ready to Work",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
        
    },
]
const GridTemplate = () => {
  return (
    <div className='w-[1400px] grid grid-cols-1 lg:grid-cols-4 mx-auto pt-36 bg-purple-500 mb-14'>
     {
      learningGrid.map((current) =>{
        return(
            <div className={`${current.order === -1 && "lg:col-span-2"}
            ${current.order % 2 ===1 ? "bg-pink-800 " :"bg-purple-500"}
            ${current.order === 3 && "lg:col-start-2" }
             `}>
                {
                    current.order < 0 
                    ?(
                        <div className='flex flex-col'>
                        <h1 className='text-5xl font-semibold text-white'>{current.heading}</h1>
                        <h1 className='text-5xl font-semibold '><Highlights text={current.highlightText} ></Highlights></h1>
                        <p className='mt-6'>{current.description}</p>
                        <div className ='w-fit mt-6'>
                         <CTAButton linkto={current.BtnLink} active={true}>
                             {current.BtnText}
                         </CTAButton> 
                        </div>
                        
                        </div>
                        
                    )
                    :(
                        <div className='h-[300px] p-10 text-white flex flex-col gap-6'>
                            <h2 className='text-xl'>{current.heading}</h2>
                            <p>{current.description}</p>
                        </div>
                    )
                }
            </div>
        )
      })
     }
    </div>
  )
}

export default GridTemplate
