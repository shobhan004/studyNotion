import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../services/apiconnector';

// 🚀 IMPORT TERA NAYA MODAL
import ConfirmationModal from '../common/ConfirmationModal'; 

// Icons
import { FiPlus, FiClock, FiUsers, FiEdit3, FiTrash2, FiPlayCircle, FiAlertCircle } from 'react-icons/fi';

const MyCourses = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🚀 Modal ke liye nayi state
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await apiConnector(
          "GET", 
          "https://studynotion-2-i5wm.onrender.com/api/v1/course/getInstructorCourses", 
          null, 
          { Authorization: `Bearer ${token}` }
        );
        
        if(res.data.success) {
            setCourses(res.data.data);
        }
      } catch (error) {
        console.error("Courses fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, [token]);

  // 🚀 Asli Delete Function (API fixed)
  const handleDeleteCourse = async () => {
    if(!courseToDelete) return;
    
    try {
       // 1. Fixed URL and Bearer space
       const res = await apiConnector(
           "DELETE", 
           "https://studynotion-2-i5wm.onrender.com/api/v1/course/deleteCourse", // Tumhara backend route
           { courseId: courseToDelete._id }, 
           { Authorization: `Bearer ${token}` } // Space zaroori hai!
       );

       if(res.data.success) {
           // 2. UI se turant hata do bina refresh ke
           setCourses(courses.filter((course) => course._id !== courseToDelete._id));
           // 3. Modal band kar do
           setCourseToDelete(null);
       }
    } catch(error) {
       console.log("Delete karne mein issue aaya:", error);
    }
  }

  // 🚀 Edit Button ka naya logic
const handleEditCourse = (course) => {
    // 1. Pura course object Redux mein save karo
    dispatch(setInstructorCourse(course)); 
    // 2. Edit mode on karo (taaki forms ko pata chale ki update karna hai)
    dispatch(setEditCourse(true));
    // 3. Step 1 par bhej do (Basic Info pehle check karega instructor)
    dispatch(setStep(1));
    // 4. URL par navigate karo
    navigate(`/dashboard/edit-course/${course._id}`);
};

  // 1. SKELETON LOADER
  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-between items-center mb-10">
          <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm">
              <div className="w-full h-48 bg-gray-100 rounded-2xl animate-pulse mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse mb-3"></div>
              <div className="h-4 w-1/2 bg-gray-100 rounded-md animate-pulse mb-6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. EMPTY STATE
  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center p-12 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 mb-8 bg-blue-50/50 rounded-full flex items-center justify-center border border-blue-100">
                <FiPlayCircle className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Launch Your Teaching Journey</h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto text-[15px]">
              You haven't created any courses yet. Transform your expertise into a global learning experience today.
            </p>
            <button onClick={() => navigate('/dashboard/add-course')} className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
              <FiPlus className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create First Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. GRID LAYOUT WITH CUSTOM MODAL
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 relative">
      
      {/* 🚀 CUSTOM MODERN DELETE MODAL (Replaced old one with your new portal modal) */}
      {courseToDelete && (
        <ConfirmationModal 
          modalData={{
            text1: "Delete Course?",
            text2: `Are you sure you want to delete "${courseToDelete.courseName}"? All progress and data will be permanently removed.`,
            btn1Text: "Yes, Delete",
            btn2Text: "Cancel",
            btn1Handler: () => handleDeleteCourse(),
            btn2Handler: () => setCourseToDelete(null),
          }} 
        />
      )}

      <div className="max-w-7xl mx-auto pt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Instructor Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium tracking-wide">Manage your {courses.length} active courses</p>
          </div>
          <button onClick={() => navigate('/dashboard/add-course')} className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
            <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            New Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-100 transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 p-2">
                <img src={course.thumbnail} alt={course.courseName} className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-5 left-5">
                    {course.status === 'Published' ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-green-700 shadow-sm uppercase tracking-widest"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Live</span>
                    ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-gray-700 shadow-sm uppercase tracking-widest"><FiClock className="w-3.5 h-3.5 text-gray-400" />Draft</span>
                    )}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[1.1rem] font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{course.courseName}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow leading-relaxed">{course.courseDescription}</p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-5 mt-auto">
                  <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Price</span>
                          <span className="font-extrabold text-gray-900">₹{course.price}</span>
                      </div>
                      <div className="w-px h-8 bg-gray-100"></div>
                      <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1"><FiUsers /> Students</span>
                          <span className="font-extrabold text-gray-900">{course.studentsEnrolled?.length || 0}</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-1">
                      <button
                      onClick={() => handleEditCourse(course)}
                       className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Course">
                          <FiEdit3 className="w-4 h-4" />
                      </button>
                      
                      {/* 🚀 TRASH BUTTON TRIGGER */}
                      <button 
                        onClick={() => setCourseToDelete(course)} 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete Course"
                      >
                          <FiTrash2 className="w-4 h-4" />
                      </button>
                      
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;