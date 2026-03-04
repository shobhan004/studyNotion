import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setEditCourse, setInstructorCourse, setStep } from "../../../../slices/courseSlice"
import { apiConnector } from "../../../../services/apiconnector"
import AddCourse from "../AddCourse/AddCourse" // 👈 Tera wahi AddCourse wala component

export default function EditCourse() {
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getFullDetails = async () => {
      setLoading(true)
      try {
        const result = await apiConnector(
          "POST",
          "https://studynotion-2-i5wm.onrender.com/api/v1/course/getFullCourseDetails", // 👈 Ye API honi chahiye
          { courseId },
          { Authorization: `Bearer ${token}` }
        )
        
        if (result?.data?.success) {
          dispatch(setEditCourse(true))
          dispatch(setInstructorCourse(result.data.data.courseDetails))
          dispatch(setStep(1))
        }
      } catch (error) {
        console.log("Edit Course Details Fetch Error:", error)
      }
      setLoading(false)
    }
    getFullDetails()
  }, [courseId, token, dispatch])

  if (loading) {
    return <div className="text-center mt-20 font-bold">Loading Course Data...</div>
  }

  return (
    <div>
      {/* 🚀 Ye AddCourse wala component hi use hoga, 
          Redux automatic values fill kar dega */}
      <AddCourse /> 
    </div>
  )
}