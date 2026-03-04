import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../services/apiconnector';
import { useSelector, useDispatch } from 'react-redux'; 
import { courseEndpoints } from '../../services/apis';
import { toast } from 'react-hot-toast'; 
import { setStep, setInstructorCourse, setEditCourse } from '../../slices/courseSlice';
import CourseBuilderForm from './CourseBuilderForm';
import PublishCourse from './PublishCourse';


const AddCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  
  const { editCourse, course , step} = useSelector((state) => state.course);

  const [courseCategories, setCourseCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    whatYouWillLearn: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    if (editCourse && course) {
      setFormData({
        courseName: course.courseName || '',
        courseDescription: course.courseDescription || '',
        whatYouWillLearn: course.whatYouWillLearn || '',
        price: course.price || '',
        // 🚀 Fix: Ensure category ID is correctly extracted
        category: course.category?._id || course.category || '',
      });
    }
  }, [editCourse, course]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiConnector("GET", "https://studynotion-2-i5wm.onrender.com/api/v1/course/showAllCategories");
        if (res) setCourseCategories(res.data.data);
      } catch (error) {
        console.log("Categories fetch nahi ho payi bhai:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      toast.success("New thumbnail selected!");
    }
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();

  // 1. Basic Validation
  if (!editCourse && !thumbnail) {
    toast.error("Please upload a course thumbnail!");
    return;
  }
  if (!formData.category) {
    toast.error("Category select karlo bhai!");
    return;
  }

  // 🚀 2. EDIT MODE OPTIMIZATION
  if (editCourse) {
    // Check karo ki kya kuch change hua bhi hai?
    const isUpdated = 
      formData.courseName !== course.courseName ||
      formData.courseDescription !== course.courseDescription ||
      formData.whatYouWillLearn !== course.whatYouWillLearn ||
      formData.price !== course.price ||
      formData.category !== (course.category?._id || course.category) ||
      thumbnail !== null;

    if (!isUpdated) {
      // Agar kuch change nahi hua toh faltu API call kyun karni? Seedha Step 2!
      dispatch(setStep(2));
      return;
    }
  }

  // 3. API CALL (Create or Update)
  const toastId = toast.loading(editCourse ? "Updating Course..." : "Creating Course...");
  try {
    const formDataToSend = new FormData();
    
    // Edit mode ke liye ID zaroori hai
    if (editCourse) {
      formDataToSend.append("courseId", course._id);
    }

    formDataToSend.append("courseName", formData.courseName);
    formDataToSend.append("courseDescription", formData.courseDescription);
    formDataToSend.append("whatYouWillLearn", formData.whatYouWillLearn);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    
    // Jab tak Step 3 (Publish) nahi aata, status 'Draft' hi rakhenge
    formDataToSend.append("status", "Draft");

    if (thumbnail) {
      formDataToSend.append("thumbnail", thumbnail);
    }

    const apiUrl = editCourse 
      ? "https://studynotion-2-i5wm.onrender.com/api/v1/course/editCourse" 
      : courseEndpoints.CREATE_COURSE_API;

    const res = await apiConnector(
      "POST",
      apiUrl,
      formDataToSend,
      { Authorization: `Bearer ${token}` }
    );

    if (res.data.success) {
      toast.success(editCourse ? "Course Updated!" : "Course Created!");
      
      // 🚀 Sabse important: Response wala course data Redux mein save karo
      // taaki Step 2 (Builder) ko Course ID aur purana Content mil sake
      dispatch(setInstructorCourse(res.data.data)); 
      
      dispatch(setStep(2));
      
      if (!editCourse) {
        dispatch(setEditCourse(true));
      }
    }
  } catch (error) {
    console.error("Submission error:", error);
    toast.error("Process failed. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }
};

 return (
    <div className="min-h-screen bg-gray-50 pt-[10px] pb-8 px-4 md:px-8">
      
      {/* 🚀 STEP 1: Basic Information Form */}
      {step === 1 && (
        <div className="animate-in fade-in duration-500">
          <div className="max-w-6xl mx-auto mb-8">
            <button onClick={() => navigate(-1)} className="group relative flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-600 mb-6 active:scale-95">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:border-blue-200">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-tight">Back</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {editCourse ? "Edit Course" : "Create New Course"}
                  </h1>
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border shadow-sm ${editCourse ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                    {editCourse ? "Edit Mode" : "Creation Mode"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  {editCourse ? "Make changes to your existing course details." : "Fill in the details below to structure your new course."}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                  <input 
                    type="text" name="courseName" value={formData.courseName} onChange={handleChange}
                    placeholder="e.g. Master MERN Stack Development"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Description *</label>
                  <textarea 
                    name="courseDescription" value={formData.courseDescription} onChange={handleChange} rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">What You Will Learn</label>
                  <textarea 
                    name="whatYouWillLearn" value={formData.whatYouWillLearn} onChange={handleChange} rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
                <button onClick={(e) => handleFormSubmit(e, 'Published')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition">
                  Next 
                </button>
                <button onClick={(e) => handleFormSubmit(e, 'Draft')} className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold py-2.5 rounded-lg transition">
                  Save as Draft
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input 
                    type="number" name="price" value={formData.price} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                  />
                </div>

                {/* --- Category Dropdown --- */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                    Course Category <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <div onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between bg-white border ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'} rounded-xl p-3.5 cursor-pointer transition-all duration-200 shadow-sm`}>
                      <span className={`${!formData.category ? 'text-gray-400' : 'text-gray-900'} text-sm font-medium`}>
                        {formData.category ? courseCategories.find(cat => cat._id === formData.category)?.name : "Choose a category"}
                      </span>
                      <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {isOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
                        <div className="max-h-60 overflow-y-auto">
                          {courseCategories.map((cat) => (
                            <div key={cat._id} onClick={() => { setFormData({ ...formData, category: cat._id }); setIsOpen(false); }} className="group flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-none">
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{cat.name}</span>
                                <span className="text-[11px] text-gray-400 group-hover:text-blue-400">{cat.description || "Professional content"}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- Thumbnail Section --- */}
                <div className="mt-6">
                  <h2 className="text-sm font-semibold text-gray-800 mb-3">Course Thumbnail *</h2>
                  <div className="relative group flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-blue-50/50 hover:border-blue-400 transition-all duration-300 overflow-hidden cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" title="" />
                    {thumbnail ? (
                      <img src={URL.createObjectURL(thumbnail)} alt="Preview" className="absolute inset-0 w-full h-full object-cover z-10" />
                    ) : (editCourse && course?.thumbnail) ? (
                      <img src={course.thumbnail} alt="Current" className="absolute inset-0 w-full h-full object-cover z-10" />
                    ) : null}
                    <div className={`flex flex-col items-center justify-center p-6 text-center z-10 ${(thumbnail || (editCourse && course?.thumbnail)) ? 'opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/40 text-white' : 'text-gray-500'}`}>
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <p className="text-sm font-semibold">Click to upload thumbnail</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 STEP 2: Course Builder UI */}
      {step === 2 && (
        <div className="animate-in fade-in duration-500">
          <CourseBuilderForm />
        </div>
      )}

      {/* 🚀 STEP 3: Publish Course UI (NAYA ADD KIYA HAI) */}
      {step === 3 && (
        <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
          <PublishCourse />
        </div>
      )}

    </div>
  );
};
export default AddCourse;