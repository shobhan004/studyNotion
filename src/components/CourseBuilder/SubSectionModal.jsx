import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { apiConnector } from '../../services/apiconnector'
import { setInstructorCourse } from '../../slices/courseSlice'
import { FiX, FiUploadCloud } from 'react-icons/fi'
import { createPortal } from 'react-dom'

const SubSectionModal = ({ sectionId, setModalData, add = false }) => {
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [lectureTitle, setLectureTitle] = useState("")
  const [lectureDesc, setLectureDesc] = useState("")

  // 🎥 Video Preview Logic
  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault() // 🚀 Refresh rokne ke liye
    e.stopPropagation();
    
    if (!videoFile || !lectureTitle || !lectureDesc) {
      return toast.error("Saari details bharo bhai!")
    }

    const toastId = toast.loading("Uploading video to Cloudinary...")
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("sectionId", sectionId)
      formData.append("courseId", course._id)
      formData.append("title", lectureTitle)
      formData.append("description", lectureDesc)
      formData.append("video", videoFile) // Controller mein name check kar lena

      const res = await apiConnector(
        "POST",
        "https://studynotion-2-i5wm.onrender.com/api/v1/course/addSubSection",
        formData,
        { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      )

      if (res.data.success) {
        toast.success("Lecture Added! 🔥")
        // 🚀 UI Update: Pura updated course Redux mein dalo
        console.log("BACKEND RESPONSE:", res.data);
        dispatch(setInstructorCourse(res.data.data))

        // Modal band karo
        setModalData(null)
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Video upload fail ho gaya!")
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

 // 🚀 FIXED: React Portal ensures it renders directly in the <body> tag, ignoring all parent layouts!
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md overflow-y-auto overflow-x-hidden">
      
      <div className="relative my-auto w-11/12 max-w-[700px] rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Add New Lecture</h2>
          <button 
            type="button" 
            onClick={() => setModalData(null)} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-black"
          >
            <FiX size={24}/>
          </button>
        </div>

        {/* Form Content */}
        <form method="POST" onSubmit={handleFormSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          <div className="flex flex-col gap-2">
             <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Lecture Video</label>
             <div className="relative h-64 w-full cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-blue-50/50 transition-all overflow-hidden group">
                <input 
                    type="file" accept="video/*" 
                    onChange={handleVideoChange}
                    className="absolute inset-0 z-50 opacity-0 cursor-pointer"
                />
                {videoPreview ? (
                  <video src={videoPreview} className="h-full w-full object-cover" controls />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <FiUploadCloud size={48} className="mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
                    <p className="font-bold text-gray-600">Click to upload video</p>
                    <span className="text-[11px] text-gray-400 uppercase">MP4 or MKV (Max 50MB)</span>
                  </div>
                )}
             </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Lecture Title</label>
            <input 
              value={lectureTitle} 
              onChange={(e) => setLectureTitle(e.target.value)}
              className="rounded-xl border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/30 transition-all font-medium" 
              placeholder="Enter lecture title..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Description</label>
            <textarea 
              value={lectureDesc} 
              onChange={(e) => setLectureDesc(e.target.value)}
              className="rounded-xl border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/30 transition-all font-medium" 
              placeholder="Briefly describe this lecture..." 
              rows={3}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 py-4 font-black text-white shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:bg-gray-400"
          >
            {loading ? "Processing Video..." : "Save Lecture"}
          </button>
        </form>

      </div>
    </div>,
    document.body // 👈 Ye jadoo wali line hai jo isko body mein dal degi
  )
}

export default SubSectionModal