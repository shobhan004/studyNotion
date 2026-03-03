import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { setUser } from "../slices/profileSlice";
import { setToken } from "../slices/authSlice"; 
import ConfirmationModal from '../components/common/ConfirmationModal'
import { 
  FiCamera, FiUser, FiLock, FiTrash2, 
  FiChevronRight, FiSave, FiEye, FiEyeOff 
} from 'react-icons/fi'
import toast from 'react-hot-toast'

// ── Simple Input Component ──────────────────────────────
const SettingsInput = ({ label, type = "text", value, onChange, name, placeholder }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
    />
  </div>
)

const Settings = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  // 🚀 File Upload States & Ref
  const fileInputRef = useRef(null)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  // 🚀 Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || user?.firstname || "",
    lastName: user?.lastName || user?.lastname || "",
    contactNumber: user?.additionalDetails?.contactNumber || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    about: user?.additionalDetails?.about || "",
    gender: user?.additionalDetails?.gender || "",
  })

  // 🔄 Sync state when user data changes
  useEffect(() => {
    setFormData({
      firstName: user?.firstName || user?.firstname || "",
      lastName: user?.lastName || user?.lastname || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      about: user?.additionalDetails?.about || "",
      gender: user?.additionalDetails?.gender || "",
    })
  }, [user])

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // 📸 File Select Handler (Triggered when user picks an image)
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  // 📸 File Preview Generator
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  // 📸 Hidden Input Click Trigger
  const handleClick = () => {
    fileInputRef.current.click()
  }

  // 🚀 Actual API Call for Profile Picture Upload (Cloudinary)
  const handleFileUpload = async () => {
    try {
      setLoading(true)
      const toastId = toast.loading("Uploading picture...")
      
      const formData = new FormData()
      formData.append("displayPicture", imageFile) // Make sure backend expects "displayPicture"

      const response = await apiConnector(
        "PUT", 
        "http://localhost:4000/api/v1/profile/updateDisplayPicture", 
        formData, 
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        toast.success("Profile picture updated successfully!", { id: toastId })
        dispatch(setUser(response.data.data))
        localStorage.setItem("user", JSON.stringify(response.data.data))
        // Reset the image file state so the "Save Picture" button hides again
        setImageFile(null) 
      }
    } catch (error) {
      console.log("Upload Error:", error)
      toast.error("Could not upload picture.")
      toast.dismiss()
    } finally {
      setLoading(false)
    }
  }

  // 🚀 API Call for Profile Details Update
  const handleProfileUpdate = async () => {
    const toastId = toast.loading("Syncing profile data...")
    try {
      setLoading(true);
      const response = await apiConnector("PUT", "http://localhost:4000/api/v1/profile/updateProfile", formData, {
        Authorization: `Bearer ${token}`,
      });

      if (response.data.success) {
        toast.success("Profile synchronized successfully!", { id: toastId });
        dispatch(setUser(response.data.updatedUserDetails)); 
        localStorage.setItem("user", JSON.stringify(response.data.updatedUserDetails));
      }
    } catch (error) {
      toast.error("Process failed. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ⚠️ API Call for Account Deletion
  const handleDeleteAccount = async () => {
    const toastId = toast.loading("Processing account termination...")
    try {
      setLoading(true);
      const response = await apiConnector("DELETE", "http://localhost:4000/api/v1/profile/deleteProfile", null, {
        Authorization: `Bearer ${token}`,
      });

      if (response.data.success) {
        toast.success("Account successfully terminated.", { id: toastId });
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signup");
      }
    } catch (error) {
      toast.error("Could not delete account.", { id: toastId });
    } finally {
      setLoading(false);
      setConfirmationModal(null);
    }
  };

  return (
    <div className="w-full max-w-[850px] mx-auto space-y-8 pb-20 animate-dashIn">
      
      {/* 🌟 Header Section */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-1 font-medium">Manage your account settings and preferences.</p>
      </div>

      {/* 📸 Section 1: Change Profile Picture */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-6">
        
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/gif, image/jpeg, image/jpg"
        />

        {/* Profile Image with Hover Overlay */}
        <div className="relative group cursor-pointer" onClick={handleClick}>
          <img 
            src={previewSource || user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`} 
            alt="profile" 
            className="h-20 w-20 rounded-2xl object-cover ring-4 ring-slate-50 shadow-md"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-all">
            <FiCamera className="text-white text-xl" />
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-slate-800">Change Profile Picture</p>
          <div className="flex gap-3 items-center">
            
            <button 
  onClick={handleClick}
  disabled={loading}
  className="rounded-lg bg-blue-50 border border-blue-200 px-5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100 hover:border-blue-300 transition-all shadow-sm"
>
  Select Image
</button>
            
            {/* Show Upload Button only when a new image is selected */}
            {imageFile && (
              <button 
                onClick={handleFileUpload}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                {loading ? "Uploading..." : "Save Picture"}
              </button>
            )}

          </div>
        </div>
      </div>

      {/* 👤 Section 2: Edit Profile Details */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <FiUser className="text-blue-600" />
          <h2 className="text-lg font-black text-slate-800">Profile Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsInput 
            label="First Name" name="firstName"
            value={formData.firstName} onChange={handleOnChange}
            placeholder="Enter first name" 
          />
          <SettingsInput 
            label="Last Name" name="lastName"
            value={formData.lastName} onChange={handleOnChange}
            placeholder="Enter last name" 
          />
          <SettingsInput 
            label="Contact Number" name="contactNumber"
            value={formData.contactNumber} onChange={handleOnChange}
            placeholder="Enter contact number" 
          />
          <SettingsInput 
            label="Date of Birth" type="date" name="dateOfBirth"
            value={formData.dateOfBirth} onChange={handleOnChange}
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Gender
            </label>
            <select
              name="gender" value={formData.gender} onChange={handleOnChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">About</label>
            <textarea 
              name="about" value={formData.about} onChange={handleOnChange} rows="4"
              placeholder="Tell us about yourself..."
              className="w-full mt-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-none"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button 
            onClick={() => navigate("/dashboard/my-profile")}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleProfileUpdate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-2.5 text-sm font-bold text-white hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 disabled:bg-slate-600"
          >
            <FiSave size={16} /> {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ⚠️ Section 4: Delete Account */}
      <div className="rounded-3xl border border-red-100 bg-red-50/30 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <FiTrash2 size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-red-900 tracking-tight">Delete Account</h3>
            <p className="text-sm font-medium text-red-600/70 max-w-md">Once you delete your account, there is no going back. All your courses and data will be removed forever.</p>
          </div>
        </div>
        <button 
          onClick={() => setConfirmationModal({
            text1: "Delete Account?",
            text2: "This action is permanent and will remove all your data. Are you sure you want to proceed?",
            btn1Text: "Delete",
            btn2Text: "Cancel",
            btn1Handler: () => handleDeleteAccount(),
            btn2Handler: () => setConfirmationModal(null),
          })}
          className="rounded-xl bg-red-600 px-8 py-3 text-sm font-bold text-white hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
        >
          Remove Account
        </button>
      </div>

      {/* 🚀 Modal ko niche render karo */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default Settings