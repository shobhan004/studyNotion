import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({ position ,heading , subheading , ctabtn1 , ctabtn2 ,codeblock , backgroundGradient, codeColor }) => {
  return (
    <div className={`${position} flex w-[1200px] mx-auto gap-20 my-28 items-center `}>
      <div className='w-[50%] flex flex-col gap-10' >
      <h1 className='text-2xl  text-zinc-900 font-semibold'>{heading}</h1>
      <p className='text-zinc-900 text-xl font-semibold font-montserrat '>{subheading}</p>
      <div className='flex gap-7 items-center'>
        <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
        <div className='flex gap-2 items-center'>
        {ctabtn1.btntext}
          <FaArrowRight/>
        </div>
        </CTAButton>
        <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
         {ctabtn2.btntext}
        </CTAButton>
      </div>
      </div>

      {/* section 2 */}
      <div className='flex w-[50%] rounded-lg p-5 TypeAnimaton border-white border bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400
'>

        
       {/* gradient */}
       <div className='w-[10%]   gap-3 text-white' >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
       </div>
       <div className={`w-[90%]  font-montserrat text-white  font-medium flex`}>
        <TypeAnimation sequence={[codeblock,5000,""]}
        repeat={Infinity}
        cursor ={true}
        style={
          {
            whiteSpace :"pre",
            display : "block"
          }
        }
        omitDeletionAnimation ={true}
        />
     
       </div>
      </div>
    </div>
  )
}

export default CodeBlocks
