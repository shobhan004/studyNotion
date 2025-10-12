import React from 'react'
import { Outlet } from 'react-router-dom'
import Slider from '../components/Dashboard/Slider'
const Dashboard = () => {
  return (
    <div className='w-full flex'>
      <Slider></Slider>
      <div className='w-full'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Dashboard
