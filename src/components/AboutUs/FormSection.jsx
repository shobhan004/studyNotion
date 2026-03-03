import React from 'react'
import ContactForm from '../common/ContactForm'

const FormSection = () => {
  return (
    <div className='relative mx-auto w-11/12 max-w-[700px] py-16 px-8 md:px-12 
                    bg-white border border-slate-100 rounded-[3rem] 
                    shadow-[0_20px_50px_rgba(0,0,0,0.05)]'>
      
      {/* 1. Brand Accent - Top Center line */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-b-full'></div>

      {/* 2. Header Section */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4'>
          Get in <span className='text-blue-600'>Touch</span>
        </h2>
        <p className='text-slate-500 text-lg font-medium'>
          We'd love to hear from you. Please fill out this form.
        </p>
      </div>

      {/* 3. Form Wrapper */}
      <div className='relative z-10'>
        <ContactForm />
      </div>

      {/* 4. Visible Background Glows - Increased Opacity & Adjusted Positioning */}
      <div className='absolute -top-10 -right-10 w-40 h-40 bg-blue-200 opacity-50 rounded-full blur-[60px] -z-10'></div>
      <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 opacity-50 rounded-full blur-[60px] -z-10'></div>
      
    </div>
  )
}

export default FormSection