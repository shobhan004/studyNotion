import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { apiConnector } from '../services/apiconnector'
import { FiX, FiUploadCloud } from 'react-icons/fi'

const SubSectionModal = ({ sectionId, setModalData, add = false, view = false, edit = false }) => {
  const [loading, setLoading] = useState(false)
  const [videoPreview, setVideoPreview] = useState(null)

  // 🚀 Video handle karne ke liye
  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data) => {
    const toastId = toast.loading("Uploading lecture...")
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("sectionId", sectionId)
      formData.append("title", data.lectureTitle)
      formData.append("description", data.lectureDesc)
      formData.append("videoFile", data.lectureVideo[0])
      formData.append("timeDuration", "10:00") // Dummy for now

      const res = await apiConnector("POST", "https://studynotion-2-i5wm.onrender.com/api/v1/course/addSubSection", formData, {
        Authorization: `Bearer ${localStorage.getItem("token")?.replace(/"/g, "")}`,
      })

      if (res.data.success) {
        toast.success("Lecture Added!")
        setModalData(null) // Modal band
        // 💡 Yahan Redux update ka logic aayega
      }
    } catch (error) {
      toast.error("Video upload fail ho gaya")
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[600px] rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h3 className="text-xl font-black text-slate-800">Add Lecture</h3>
          <button onClick={() => setModalData(null)}><FiX size={24}/></button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Video Upload Box */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Lecture Video</label>
            <div className="relative h-60 w-full cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden">
              <input type="file" accept="video/*" className="absolute inset-0 z-50 opacity-0 cursor-pointer" 
                onChange={handleVideoChange} name="lectureVideo" required />
              {videoPreview ? (
                <video src={videoPreview} className="h-full w-full object-cover" controls />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <FiUploadCloud size={40} className="mb-2"/>
                  <p className="text-sm">Click to upload a video</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Lecture Title</label>
            <input name="lectureTitle" placeholder="Enter Lecture Title" className="rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500" required />
          </div>

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 transition-all">
            {loading ? "Uploading..." : "Save Lecture"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal