import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({ 
    position, 
    heading, 
    subheading, 
    ctabtn1, 
    ctabtn2, 
    codeblock, 
    backgroundGradient, 
    codeColor 
}) => {
  return (
    <div className={`flex flex-col gap-10 lg:gap-10 ${position} my-20 justify-between w-11/12 max-w-7xl mx-auto items-center`}>
      
      {/* ================= SECTION 1: TEXT CONTENT ================= */}
      <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
        {/* Heading */}
        <div className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {heading}
        </div>

        {/* Subheading */}
        <div className='text-slate-500 text-lg font-medium leading-relaxed w-[85%]'>
            {subheading}
        </div>

        {/* Buttons */}
        <div className='flex gap-6 mt-4'>
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

      {/* ================= SECTION 2: MODERN CODE EDITOR ================= */}
      <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
        
        {/* 1. Background Gradient Blob (Passed from Props) */}
        {backgroundGradient}

        {/* 2. The Code Window */}
        <div className="relative rounded-xl border border-slate-200 bg-slate-900 shadow-2xl w-full z-10 overflow-hidden">
            
            {/* Window Header (Mac Style) */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div> {/* Red */}
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div> {/* Yellow */}
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div> {/* Green */}
                <div className="ml-auto text-xs text-slate-500 font-mono">Examle.jsx</div>
            </div>

            {/* Code Body */}
            <div className='flex p-4'>
                {/* Line Numbers */}
                <div className='text-center flex flex-col w-[10%] text-slate-600 font-mono font-bold select-none pr-2 border-r border-slate-800'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                {/* Typing Animation */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pl-4`}>
                    <TypeAnimation
                        sequence={[codeblock, 1000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default CodeBlocks