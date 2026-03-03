import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep, resetCourseState } from "../../slices/courseSlice"; 
import { toast } from "react-hot-toast";
import { apiConnector } from "../../services/apiconnector";
import { FiCheck } from "react-icons/fi"; // 🚀 Ek icon add kiya hai checkmark ke liye

const PublishCourse = () => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (course?.status === "Published") {
      setIsPublic(true);
    }
  }, [course]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const handleCoursePublish = async (e) => {
    e.preventDefault();

    if (
      (course?.status === "Published" && isPublic === true) ||
      (course?.status === "Draft" && isPublic === false)
    ) {
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Publishing Course...");
    const courseStatus = isPublic ? "Published" : "Draft";

    try {
      const formData = new FormData();
      formData.append("courseId", course._id);
      formData.append("status", courseStatus);

      const res = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/course/editCourse",
        formData,
        { Authorization: `Bearer ${token}` }
      );

      if (res.data.success) {
        toast.success(`Course ${courseStatus} Successfully! 🚀`);
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
      }
    } catch (error) {
      console.error("Publish Error:", error);
      toast.error("Failed to publish course.");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm max-w-4xl mx-auto">
      <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
        Step 3: Final Submission
      </h2>
      
      <form onSubmit={handleCoursePublish}>
        {/* 🚀 MODERN CUSTOM CHECKBOX CONTAINER */}
        <div 
          onClick={() => setIsPublic(!isPublic)}
          className={`group cursor-pointer my-6 mb-10 flex items-center gap-x-6 rounded-[2rem] p-6 border-2 transition-all duration-300 ${
            isPublic 
              ? "bg-blue-600 border-blue-600 shadow-[0_20px_40px_rgba(37,99,235,0.2)]" 
              : "bg-gray-50 border-gray-100 hover:border-gray-200"
          }`}
        >
          {/* Custom Square Box */}
          <div className="relative flex items-center justify-center">
            <div className={`h-8 w-8 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
              isPublic 
                ? "bg-white border-white scale-110" 
                : "bg-white border-gray-300 group-hover:border-blue-400"
            }`}>
              {isPublic && <FiCheck className="text-blue-600 text-xl font-bold animate-in zoom-in duration-200" />}
            </div>
          </div>

          <div className="flex flex-col">
            <label className={`text-lg font-black transition-colors duration-300 ${isPublic ? "text-white" : "text-gray-800"}`}>
              Make this course public
            </label>
            <p className={`text-sm font-medium transition-colors duration-300 ${isPublic ? "text-blue-100" : "text-gray-500"}`}>
              Once published, students can purchase and enroll in your course.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="rounded-2xl bg-gray-100 px-8 py-3.5 font-bold text-gray-600 hover:bg-gray-200 transition-all active:scale-95"
          >
            Back
          </button>
          
          <button
            disabled={loading}
            type="submit"
            className="rounded-2xl bg-blue-600 px-10 py-3.5 font-black text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-all active:scale-95 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Finish & Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;