import React, { useState, useEffect } from 'react';
import { FiUsers, FiDollarSign, FiBook, FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector'; // Path verify kar lena bhai
import toast from 'react-hot-toast';

// 🚀 API URL - Agar teri apis.js mein hai toh wahan se import karna better hai
const INSTRUCTOR_DASHBOARD_API = "https://studynotion-2-i5wm.onrender.com/api/v1/profile/instructorDashboard"; 



const InstructorDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth); 
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchInstructorData = async () => {
    try {
      const response = await apiConnector("GET", INSTRUCTOR_DASHBOARD_API, null, {
        Authorization: `Bearer ${token}`,
      });
      
      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Dashboard API Error:", error);
      // Agar backend ready nahi hai toh toast dikhega
      toast.error("Could not fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInstructorData(); // 🚀 PAGE KHULTE HI FRESH DATA AAYEGA
    }
  }, [token]);


  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>
      </div>
    );
  }

  // Agar backend ne data nahi bheja
  if (!dashboardData || dashboardData?.courses?.length === 0) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center animate-dashIn">
        <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500 text-3xl">
          <FiBook />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">No Data Found!</h2>
        <p className="text-slate-500 mt-2 max-w-sm text-center">
          You haven't published any courses yet. Create your first course to start seeing analytics here.
        </p>
        <button 
          onClick={() => navigate('/dashboard/add-course')}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/30"
        >
          Create New Course
        </button>
      </div>
    );
  }

  // 🚀 Bar charts ke liye max values nikalna (Real Data se safely)
  const maxStudents = dashboardData?.courses?.length > 0 
    ? Math.max(...dashboardData.courses.map(c => c.totalStudentsEnrolled || 0)) 
    : 1; 
    
  return (
    <div className="space-y-8 animate-dashIn">
      
      {/* 🌟 Welcome Section */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Hi, {user?.firstName || "Instructor"}! 👋
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Let's start something new today. Here's what's happening with your courses.
        </p>
      </div>

      {/* 📊 Top Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Courses */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="h-14 w-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-inner">
            <FiBook />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Courses</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {dashboardData?.totalCourses || 0}
            </h3>
          </div>
        </div>

        {/* Card 2: Students */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="h-14 w-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-inner">
            <FiUsers />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {dashboardData?.totalStudents || 0}
            </h3>
          </div>
        </div>

        {/* Card 3: Income */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-50 opacity-50 border border-emerald-100"></div>
          <div className="h-14 w-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shadow-inner relative z-10">
            <FiDollarSign />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Income</p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">
              ₹{(dashboardData?.totalEarnings || 0).toLocaleString('en-IN')}
            </h3>
          </div>
        </div>
      </div>

      {/* 📈 Analytics Visuals & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Course Performance Bars */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FiTrendingUp className="text-blue-500" /> Course Performance
            </h2>
          </div>

          <div className="space-y-8">
            {dashboardData?.courses?.slice(0, 4).map((course) => (
              <div key={course._id} className="space-y-3">
                <div className="flex justify-between items-end">
                  <h3 className="text-sm font-bold text-slate-700">{course.courseName}</h3>
                  <span className="text-xs font-bold text-slate-500">
                    {course.totalStudentsEnrolled || 0} Students
                  </span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((course.totalStudentsEnrolled || 0) / maxStudents) * 100}%` }}
                  ></div>
                </div>
                
                <p className="text-xs font-semibold text-emerald-600 text-right mt-1">
                  Revenue: ₹{(course.totalAmountGenerated || 0).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: CTA Banner */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-xl font-black text-white mb-2">Ready to expand your empire?</h2>
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
              Create a new course today and share your knowledge with thousands of students waiting to learn from you.
            </p>
          </div>

          <button 
            onClick={() => navigate('/dashboard/add-course')}
            className="relative z-10 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 active:scale-95 flex justify-center items-center gap-2"
          >
            Create New Course <FiChevronRight />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default InstructorDashboard;