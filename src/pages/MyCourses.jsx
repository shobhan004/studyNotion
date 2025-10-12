import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeCourse } from '../slices/courseSlice';
import { IoMdRemove } from "react-icons/io";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  
  console.log('MyCourses - Full Redux State:', useSelector(state => state));
  console.log('MyCourses - Courses:', courses);
  console.log('MyCourses - localStorage:', localStorage.getItem('enrolledCourses'));
  
  const removeHandler = (courseId) => {
    dispatch(removeCourse(courseId));
  };
  
  return (
    <div className='mt-20 mb-20'>
      <div><h1 className="text-3xl font-bold mb-6 text-center">My Enrolled Courses</h1></div>
      
      {/* Debug info
      <div className="bg-gray-100 p-4 mb-4 rounded">
        <p><strong>Debug Info:</strong></p>
        <p>Courses Count: {courses?.length || 0}</p>
        <p>localStorage: {localStorage.getItem('enrolledCourses') ? 'Has Data' : 'Empty'}</p>
      </div>
       */}
      <div className="space-y-4 w-[600px] mx-auto flex flex-col gap-14">
        {courses && courses.length > 0 ? (
          courses.map((current, index) => (
            <div key={current._id || index} className='rounded-xl shadow-xl p-3.5 flex flex-col gap-3'>
              <h1 className='text-2xl font-medium'>{current.title}</h1>
              <p className="text-lg ">{current.description}</p>
              {current.image && <img src={current.image} alt={current.title} />}
              {/* <p className="font-semibold text-3xl text-green-400">₹{current.price}</p> */}
              <button className='px-8 cursor-pointer py-2.5 bg-orange-600 mx-auto hover:text-white text-white rounded'>
                Continue Learning
              </button>
              
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <h2 className="text-xl text-gray-500">No Enrolled Courses</h2>
            <p className="text-gray-400 mt-2">Purchase some courses to see them here!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses