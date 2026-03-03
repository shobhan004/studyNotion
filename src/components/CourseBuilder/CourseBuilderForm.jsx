import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiPlusCircle, FiEdit2, FiTrash2, FiChevronDown } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { apiConnector } from '../../services/apiconnector'
import { setInstructorCourse, setStep } from '../../slices/courseSlice'
import SubSectionModal from './SubSectionModal' 

const CourseBuilderForm = () => {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [sectionName, setSectionName] = useState("")
  const [editSectionId, setEditSectionId] = useState(null)
  const [addSubSection, setAddSubSection] = useState(null)
  const [loading, setLoading] = useState(false)

  // 🚀 Section Create/Update Handler
  // 🚀 Section Create/Update Handler
  const handleSectionSubmit = async (e) => {
    e.preventDefault()
    if(!sectionName) return toast.error("Bhai naam toh likho!")

    setLoading(true)
    const toastId = toast.loading(editSectionId ? "Updating Section..." : "Creating Section...")
    
    try {
      const result = await apiConnector(
        "POST",
        editSectionId 
          ? "http://localhost:4000/api/v1/course/updateSection" 
          : "http://localhost:4000/api/v1/course/createSection",
        {
          sectionName,
          sectionId: editSectionId, // Edit mode mein ye ID backend jayegi
          courseId: course._id,
        },
        { Authorization: `Bearer ${token}` }
      )

      if (result.data.success) {
        // 🚀 Backend se updatedCourse aana chahiye
        // Agar backend 'data' bhej raha hai toh result.data.data likhna
        dispatch(setInstructorCourse(result.data.updatedCourse)) 
        
        // Form reset karo
        setSectionName("")
        setEditSectionId(null)
        toast.success(editSectionId ? "Section Updated 🔥" : "Section Created 🔥")
      }
    } catch (error) {
      console.error("Section error:", error)
      toast.error("Bhai kuch gadbad ho gayi!")
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  const handleDeleteSection = async (sectionId) => {
    const toastId = toast.loading("Deleting section...");
    try {
      const result = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/course/deleteSection",
        { sectionId, courseId: course._id },
        { Authorization: `Bearer ${token}` }
      );
      if (result.data.success) {
        dispatch(setInstructorCourse(result.data.updatedCourse));
        toast.success("Section Deleted");
      }
    } catch (error) {
      toast.error("Could not delete section");
    }
    toast.dismiss(toastId);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const toastId = toast.loading("Deleting lecture...");
    try {
        const result = await apiConnector(
            "POST",
            "http://localhost:4000/api/v1/course/deleteSubSection",
            { 
                subSectionId, 
                sectionId, 
                courseId: course._id 
            },
            { Authorization: `Bearer ${token}` }
        );

        if (result.data.success) {
            dispatch(setInstructorCourse(result.data.updatedCourse));
            toast.success("Lecture Deleted 🔥");
        }
    } catch (error) {
        toast.error("Could not delete lecture");
    }
    toast.dismiss(toastId);
};

  

 return (
    <div className="space-y-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm max-w-4xl mx-auto">
      <h2 className="text-2xl font-black text-gray-900 tracking-tight">Step 2: Course Builder</h2>
      
      {/* 🚀 FIXED: Form ke andar input wapas add kar diya */}
      <form onSubmit={handleSectionSubmit} className="space-y-4">
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">Section Name <span className="text-pink-500">*</span></label>
          <input 
            type="text" 
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="e.g. Introduction to MERN"
            className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-blue-500 shadow-inner bg-gray-50/50"
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex items-center gap-2 rounded-xl border-2 border-blue-600 px-6 py-2.5 font-bold text-blue-600 hover:bg-blue-50 transition-all active:scale-95"
          >
            <FiPlusCircle className="text-xl" /> 
            {editSectionId ? "Edit Section Name" : "Create Section"}
          </button>
          
          {editSectionId && (
            <button 
              type="button" 
              onClick={() => {setEditSectionId(null); setSectionName("")}} 
              className="text-sm font-medium text-gray-500 hover:text-gray-700 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open className="group overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/30 transition-all">
            <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100/50">
              <div className="flex items-center gap-3 font-bold text-gray-800">
                <FiChevronDown className="group-open:rotate-180 transition-transform text-blue-500" />
                {section.sectionName}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setEditSectionId(section._id); 
                    setSectionName(section.sectionName);
                  }} 
                  className="text-gray-400 hover:text-blue-600"
                >
                  <FiEdit2 />
                </button>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSection(section._id);
                  }}
                  className="text-gray-400 hover:text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </summary>

            <div className="p-5 pt-0 space-y-3">
              {section.subSection?.map((data) => (
                <div key={data._id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm group/item">
                  <div className="flex items-center gap-3 font-medium text-gray-700">🎬 {data.title}</div>
                  <button onClick={() => handleDeleteSubSection(data._id, section._id)}
                  type="button" className="opacity-0 group-hover/item:opacity-100 text-gray-400 hover:text-red-600 transition-opacity">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={() => setAddSubSection(section._id)}
                className="mt-4 flex items-center gap-2 text-sm font-black text-blue-600 hover:underline"
              >
                <FiPlusCircle /> Add Lecture
              </button>
            </div>
          </details>
        ))}
      </div>

      <div className="flex justify-end gap-x-3 border-t border-gray-100 pt-8">
        <button 
          type="button" 
          onClick={() => dispatch(setStep(1))} 
          className="rounded-xl bg-gray-100 px-6 py-2.5 font-bold text-gray-600 hover:bg-gray-200"
        >
          Back
        </button>
        <button 
          type="button" 
          onClick={() => {
            if(!course?.courseContent || course.courseContent.length === 0) return toast.error("Bhai kam se kam ek section toh banao!");
            if(course.courseContent.some(s => !s.subSection || s.subSection.length === 0)) return toast.error("Har section mein lecture hona zaroori hai!");
            dispatch(setStep(3));
          }} 
          className="rounded-xl bg-blue-600 px-8 py-2.5 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
        >
          Next
        </button>
      </div>

      {addSubSection && (
        <SubSectionModal sectionId={addSubSection} setModalData={setAddSubSection} add={true} />
      )}
    </div>
  )
}

export default CourseBuilderForm
