import React from 'react'
import { Link } from 'react-router-dom'

const NavButtons = ({children , linkto , navstatus , navhandler}) => {
  return (
    <div>
      <Link to={linkto} >
        <div className="text-white font-montserrat font-medium p-3 ">{children}</div>
      </Link>
    </div>
  )
}

export default NavButtons
