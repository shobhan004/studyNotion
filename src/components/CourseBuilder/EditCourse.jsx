import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
// purana import hatakar ye likho
import { setInstructorCourse, setEditCourse } from '../../slices/courseSlice'

// 🚀 TERA ASLI COMPONENT IMPORT (Path check kar lena ek baar)
import AddCourse from './AddCourse'; // Agar AddCourses bhi pages folder mein hai toh ye chal jayega
// Agar components mein hai toh: import AddCourses from '../components/AddCourses';

import { apiConnector } from '../../services/apiconnector'


export default function EditCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            try {
                // Backend se purana data la rahe hain
                const res = await apiConnector(
                    "POST", 
                    "https://studynotion-2-i5wm.onrender.com/api/v1/course/getFullCourseDetails", 
                    { courseId },
                    { Authorization: `Bearer ${token}` }
                );

                if (res?.data?.success) {
                    dispatch(setEditCourse(true)); // Edit mode ON
                   
                    dispatch(setInstructorCourse(res.data.data.courseDetails));
                }
            } catch (error) {
                console.error("Course fetch fail ho gaya edit ke liye:", error);
            } finally {
                setLoading(false);
            }
        }

        if (courseId) {
            populateCourseDetails();
        }
        
        return () => {
            dispatch(setEditCourse(false));
            
        }
    }, [courseId, token, dispatch]);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-[1200px] mx-auto min-h-screen">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Edit Course
                </h1>
                <button 
                    onClick={() => navigate('/dashboard/my-courses')}
                    className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                >
                    &larr; Back to My Courses
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                {/* 🚀 RenderSteps ki jagah tera single file form aayega */}
                <AddCourse /> 
            </div>
        </div>
    )
}