import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiConnector } from '../../services/apiconnector';
import { FiMenu, FiX, FiPlayCircle, FiCheckCircle, FiChevronDown, FiChevronUp, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [courseData, setCourseData] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await apiConnector("POST", "https://studynotion-2-i5wm.onrender.com/api/v1/course/getFullCourseDetails", { courseId }, {
        Authorization: `Bearer ${token}`
      });

      if (response?.data?.success) {
        console.log( response.data.data.progressPercentage);
        const details = response.data.data.courseDetails;
        const percentage = response.data.data.progressPercentage;
        
        // 🚀 DATA MERGE: Course info aur Percentage ek saath
        setCourseData({
          ...details,
          progressPercentage: percentage || 0
        });
        
        // Initial video set karna
        if (details?.courseContent?.[0]?.subSection?.[0]) {
           setActiveVideo(details.courseContent[0].subSection[0]);
           setActiveSection(details.courseContent[0]._id);
        }
      }
    } catch (error) {
      console.error("Course fetch error:", error);
      toast.error("Could not load course content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const handleVideoSelect = (video, sectionId) => {
    setActiveVideo(video);
    setActiveSection(sectionId);
    if(window.innerWidth < 1024) setSidebarOpen(false); 
  };

  const handleVideoCompletion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiConnector(
        "POST",
        "https://studynotion-2-i5wm.onrender.com/api/v1/progress/updateCourseProgress",
        { courseId, subSectionId: activeVideo._id },
        { Authorization: `Bearer ${token}` }
      );

      if (response.data.success) {
        toast.success("Lecture Completed! 🎉");
        fetchCourseDetails(); // Refresh data to update bar
      }
    } catch (error) {
      console.error("Progress update error:", error);
      toast.error("Already marked as completed");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-50 text-slate-800">
        <h2 className="text-2xl font-bold mb-4">Course content not found</h2>
        <button onClick={() => navigate('/dashboard/enrolled-courses')} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#0F172A] text-slate-200 overflow-hidden font-sans">
      
      {/* --- Sidebar --- */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-80 bg-[#1E293B] border-r border-slate-800 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-5 border-b border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/dashboard/enrolled-courses')} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <FiArrowLeft /> Back to Dashboard
            </button>
            <button className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
              <FiX size={24} />
            </button>
          </div>
          <h2 className="text-lg font-bold text-white leading-snug line-clamp-2">
            {courseData?.courseName}
          </h2>

          {/* 🚀 DYNAMIC PROGRESS BAR (Container fix kiya hai) */}
          <div className="mt-2">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-700 ease-in-out" 
                    style={{ width: `${courseData?.progressPercentage || 0}%` }}
                ></div>
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-2">
                {courseData?.progressPercentage || 0}% Completed
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {courseData?.courseContent?.map((section) => (
            <div key={section._id} className="border-b border-slate-800/50">
              <button 
                onClick={() => setActiveSection(activeSection === section._id ? null : section._id)}
                className="w-full flex items-center justify-between p-4 bg-[#1E293B] hover:bg-slate-800 transition-colors"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-bold text-slate-200">{section.sectionName}</span>
                  <span className="text-xs text-slate-500 mt-1">{section.subSection?.length || 0} Lectures</span>
                </div>
                {activeSection === section._id ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
              </button>

              {activeSection === section._id && (
                <div className="bg-[#0F172A] py-2">
                  {section.subSection?.map((video) => {
                    const isPlaying = activeVideo?._id === video._id;
                    return (
                      <button 
                        key={video._id}
                        onClick={() => handleVideoSelect(video, section._id)}
                        className={`w-full flex items-start gap-3 p-3 px-5 transition-all ${isPlaying ? 'bg-blue-600/10 border-l-2 border-blue-500' : 'hover:bg-slate-800 border-l-2 border-transparent'}`}
                      >
                        <div className={`mt-0.5 ${isPlaying ? 'text-blue-500' : 'text-slate-500'}`}>
                           <FiPlayCircle size={16} /> 
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className={`text-sm font-medium line-clamp-2 ${isPlaying ? 'text-blue-400' : 'text-slate-300'}`}>
                            {video.title}
                          </span>
                          <span className="text-xs text-slate-500 mt-1">{video.timeDuration || "Video"}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- Main Video Area --- */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#0F172A]">
        <div className="lg:hidden p-4 bg-[#1E293B] border-b border-slate-800 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-300">
            <FiMenu size={24} />
          </button>
          <h1 className="text-sm font-bold text-white line-clamp-1">{courseData?.courseName}</h1>
        </div>

        {activeVideo ? (
          <div className="w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-6">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <video
                key={activeVideo.videoUrl}
                src={activeVideo.videoUrl}
                onEnded={() => handleVideoCompletion()}
                controls
                controlsList="nodownload"
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex flex-col gap-4 bg-[#1E293B] p-6 rounded-2xl border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{activeVideo.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                    {activeVideo.description || "No description provided."}
                  </p>
                </div>
                
                <button 
                    onClick={() => handleVideoCompletion()}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors whitespace-nowrap shadow-lg shadow-blue-900/20 active:scale-95"
                >
                  <FiCheckCircle size={20} />
                  Mark as Completed
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            Select a video from the sidebar to start learning.
          </div>
        )}
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default ViewCourse;