import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children , active , linkto}) => {
  return ( 
  <Link to={linkto}>
    <div className={`rounded-full px-[40px] py-[13px] text-lg border  ${active ?"bg-gradient-to-r from-orange-500 to-orange-700 text-white  hover:text-orange-600 hover:from-white hover:to-white  hover:border-orange-500"  :"bg-white text-blue-500 border-[1.5px] border-blue-500"}`}>
        {children}
    </div>
  </Link>
  )
}

export default CTAButton
