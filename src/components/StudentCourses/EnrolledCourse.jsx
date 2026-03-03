import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlayCircle, FiMoreVertical, FiClock } from 'react-icons/fi';
import { PiBooksBold } from 'react-icons/pi';
import { profileEndpoints } from '../../services/apis'; 

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiConnector(
        "GET",
        profileEndpoints.GET_USER_ENROLLED_COURSES_API, 
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (response.data.success) {
        setEnrolledCourses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      toast.error("Could not fetch enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Enrolled Courses</h1>
        <p className="text-slate-500 font-medium mt-1">
          Continue your learning journey. You have {enrolledCourses.length} {enrolledCourses.length === 1 ? 'course' : 'courses'}.
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-2xl py-20 px-6 flex flex-col items-center justify-center border border-slate-200 shadow-sm text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <PiBooksBold size={36} className="text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No courses yet</h2>
          <p className="text-slate-500 mb-6 max-w-sm">
            You haven't enrolled in any courses yet. Start exploring our catalog to upskill yourself.
          </p>
          <button 
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Browse Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 group flex flex-col cursor-pointer"
              onClick={() => navigate(`/view-course/${course._id}`)}
            >
              <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                <img 
                  src={course.thumbnail} 
                  alt={course.courseName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur p-3 rounded-full text-blue-600 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                     <FiPlayCircle size={28} />
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {course.courseName}
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600 p-1" onClick={(e) => { e.stopPropagation(); }}>
                    <FiMoreVertical />
                  </button>
                </div>

                <p className="text-sm text-slate-500 line-clamp-1 mb-6">
                  {course.courseDescription}
                </p>

                {/* --- Dynamic Progress Bar Fix --- */}
                <div className="mt-auto">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span className="flex items-center gap-1"><FiClock size={12}/> Progress</span>
                    <span className="text-slate-900">{course.progressPercentage || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${course.progressPercentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;