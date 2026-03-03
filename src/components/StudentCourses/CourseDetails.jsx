import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiConnector } from '../../services/apiconnector'
import { IoStar, IoTimeOutline, IoGlobeOutline, IoCalendarOutline, IoChevronDown, IoPlayCircleOutline } from "react-icons/io5"
import { FaIndianRupeeSign } from "react-icons/fa6"
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setaddedCount } from '../../slices/cartSlice'

const CourseDetails = () => {
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState(null) // Accordion toggle ke liye

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiConnector("POST", "http://localhost:4000/api/v1/course/getFullCourseDetails", { courseId } , { 
          // 🚀 2. Headers mein Authorization token add karo
          Authorization: `Bearer ${token}`, 
        })
        if (res.data.success) {
          setCourseData(res.data.data.courseDetails)
        }
      } catch (error) {
        toast.error("Could not fetch course details")
      }
      setLoading(false)
    }
    fetchCourseDetails()
  }, [courseId])

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token")
    if (!token) return toast.error("Please login first")
    
    const toastId = toast.loading("Adding...")
    try {
      const res = await apiConnector("POST", "http://localhost:4000/api/v1/course/addToCart", 
        { courseData: { id: courseData._id, courseName: courseData.courseName, price: courseData.price, thumbnail: courseData.thumbnail } },
        { Authorization: `Bearer ${token}` }
      )
      if (res.data.success) {
        dispatch(setaddedCount(res.data.count))
        toast.success("Added to Cart!")
      }
    } catch (err) { toast.error("Already in Cart or Error") }
    toast.dismiss(toastId)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-2xl">Loading Course...</div>

  return (
    <div className="min-h-screen bg-white">
      {/* 🟦 HERO SECTION */}
      <div className="bg-[#1C1D1F] text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <nav className="text-blue-400 text-sm font-bold flex gap-2">
                <span>Development</span> {">"} <span>{courseData.category?.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{courseData.courseName}</h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">{courseData.courseDescription}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <IoStar /> 4.8 (2,540 ratings)
                </div>
                <div className="text-gray-400">Created by <span className="text-blue-400 underline cursor-pointer">{courseData.instructor.firstname} {courseData.instructor.lastname}</span></div>
                <div className="flex items-center gap-1 text-gray-400"><IoGlobeOutline /> Hindi / English</div>
                <div className="flex items-center gap-1 text-gray-400"><IoCalendarOutline /> Last updated 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* ⬜ CONTENT & STICKY CARD */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-20 lg:-mt-64 relative z-10">
        
        {/* LEFT: SYLLABUS */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-72 lg:mt-64">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Course Content</h2>
          
          <div className="space-y-4">
            {courseData.courseContent.map((section, idx) => (
              <div key={section._id} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveSection(activeSection === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center gap-3 font-bold text-gray-800">
                    <IoChevronDown className={`transition-transform duration-300 ${activeSection === idx ? 'rotate-180' : ''}`} />
                    {section.sectionName}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{section.subSection?.length} Lectures</span>
                </button>

                {activeSection === idx && (
                  <div className="divide-y divide-gray-100 bg-white">
                    {section.subSection.map((sub) => (
                      <div key={sub._id} className="flex items-center justify-between p-4 px-8 group cursor-pointer hover:bg-blue-50/30">
                        <div className="flex items-center gap-3 text-gray-600">
                          <IoPlayCircleOutline className="text-blue-500" size={20} />
                          <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">{sub.title}</span>
                        </div>
                        <span className="text-xs text-gray-400">10:00</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: STICKY PRICING CARD */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white border border-gray-200 rounded-[2.5rem] shadow-2xl overflow-hidden">
             <div className="relative aspect-video">
                <img src={courseData.thumbnail} className="w-full h-full object-cover" alt="Course" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <IoPlayCircleOutline size={64} className="text-white" />
                </div>
             </div>
             
             <div className="p-8">
                <div className="flex items-center gap-2 mb-6">
                    <FaIndianRupeeSign className="text-3xl font-black text-gray-900" />
                    <span className="text-4xl font-black text-gray-900">{courseData.price}</span>
                    <span className="text-gray-400 line-through ml-2 font-bold text-lg">₹3,999</span>
                </div>

                <div className="flex flex-col gap-4">
                    <button 
                      onClick={handleAddToCart}
                      className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 text-lg"
                    >
                        Add to Cart
                    </button>
                    <button className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95 text-lg">
                        Buy Now
                    </button>
                </div>
                
                <p className="text-center text-xs text-gray-400 mt-6 font-medium tracking-wide">30-Day Money-Back Guarantee</p>
                
                <div className="mt-8 space-y-3">
                    <h4 className="font-bold text-gray-900">This course includes:</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                        <IoTimeOutline className="text-blue-500" /> Full lifetime access
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails