import React from 'react'
import ContactForm from '../common/ContactForm'

const FormSection = () => {
  return (
    <div className='w-[500px] mx-auto'>
      <h1 className='text-black font-roboto text-5xl font-bold text-center'>Get in Touch</h1>
      <p className='text-center mt-2'>We'd love to here for you, Please fill out this form.</p>
      <ContactForm></ContactForm>
    </div>
  )
}

export default FormSection
