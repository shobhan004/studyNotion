import React, { useState, useEffect } from 'react' // 🚀 useState, useEffect add kiya
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector' // 🚀 path check kar lena
import toast from 'react-hot-toast'
import {
  FiEdit2, FiMail, FiPhone, FiCalendar, FiUser,
  FiBook, FiAward, FiUsers, FiCamera, FiChevronRight, FiFileText
} from 'react-icons/fi'

// ── Small reusable detail row ─────────────────────────────
const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
      <Icon className="text-slate-400 text-sm" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-800 truncate">{value || <span className="text-slate-300 italic font-medium">Not provided</span>}</p>
    </div>
  </div>
)

// ── Stat badge ────────────────────────────────────────────
const StatBadge = ({ icon: Icon, label, value, color, bg }) => (
  <div className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl ${bg} border border-slate-100 py-5 px-4 shadow-sm hover:shadow-md transition-shadow`}>
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color} bg-white shadow-sm`}>
      <Icon className="text-base" />
    </div>
    <p className="text-2xl font-black text-slate-900">{value}</p>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
  </div>
)

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate  = useNavigate()
  
  // 🚀 Backend Stats State
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(false)

  const isInstructor = user?.accountType === 'Instructor'
  const initials     = `${user?.firstName?.[0] ?? '?'}${user?.lastName?.[0] ?? ''}`

  // 🚀 API Call to fetch real stats
  useEffect(() => {
    const fetchProfileStats = async () => {
      if(isInstructor && token) {
        setLoading(true)
        try {
          const response = await apiConnector(
            "GET", 
            "https://studynotion-2-i5wm.onrender.com/api/v1/profile/instructorDashboard", 
            null, 
            { Authorization: `Bearer ${token}` }
          )
          if (response.data.success) {
            setProfileData(response.data.data)
          }
        } catch (error) {
          console.error("Profile Stats Error:", error)
          // Toast nahi dikhayenge taaki profile access block na ho
        } finally {
          setLoading(false)
        }
      }
    }
    fetchProfileStats()
  }, [isInstructor, token])

  return (
    <div className="w-full max-w-[900px] mx-auto space-y-6 pb-10 animate-dashIn">

      {/* ── HERO CARD ────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative group flex-shrink-0">
            {user?.image ? (
              <img src={user.image} alt="profile" className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/10 shadow-xl" />
            ) : (
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-black text-white ring-4 ring-white/10 shadow-xl">
                {initials}
              </div>
            )}
            <button onClick={() => navigate('/dashboard/settings')} className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <FiCamera className="text-white text-xl" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-black text-white">{user?.firstName} {user?.lastName}</h1>
              <span className={`rounded-full border px-3 py-0.5 text-xs font-black uppercase tracking-widest ${isInstructor ? 'bg-orange-500/20 border-orange-400/30 text-orange-400' : 'bg-blue-500/20 border-blue-400/30 text-blue-400'}`}>
                {user?.accountType || "Student"}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-300"><FiMail className="text-slate-400" />{user?.email}</p>
          </div>

          <button onClick={() => navigate('/dashboard/settings')} className="flex-shrink-0 flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 hover:border-white/20 transition-all backdrop-blur self-start">
            <FiEdit2 size={15} /> Edit Profile
          </button>
        </div>
      </div>

      {/* ── ABOUT ME CARD ────────────────── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2"><FiFileText className="text-blue-500" /> About Me</h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {user?.additionalDetails?.about || (
            <span className="italic text-slate-400">Write something about yourself. Click 'Edit Profile' to add a bio.</span>
          )}
        </p>
      </div>

      {/* ── STATS ROW (Instructor Only) ──────────────────── */}
      {isInstructor && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 🚀 REAL DATA: Profile data se populate ho raha hai */}
          <StatBadge 
            icon={FiBook}  
            label="Total Courses"  
            value={profileData?.totalCourses ?? (loading ? "..." : "0")} 
            color="text-blue-600"    
            bg="bg-white" 
          />
          <StatBadge 
            icon={FiUsers} 
            label="Total Students" 
            value={profileData?.totalStudents?.toLocaleString() ?? (loading ? "..." : "0")} 
            color="text-emerald-600" 
            bg="bg-white" 
          />
         
        </div>
      )}

      {/* ── INFO GRID ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-black text-slate-900">Personal Details</h2>
            <button onClick={() => navigate('/dashboard/settings')} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-indigo-600 transition-colors bg-blue-50 px-2 py-1 rounded-md">Edit <FiChevronRight size={12} /></button>
          </div>
          <div className="flex-1">
            <DetailRow icon={FiUser} label="Full Name" value={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`} />
            <DetailRow icon={FiPhone} label="Phone" value={user?.additionalDetails?.contactNumber} />
            <DetailRow icon={FiCalendar} label="Date of Birth" value={user?.additionalDetails?.dateOfBirth} />
            <DetailRow icon={FiUser} label="Gender" value={user?.additionalDetails?.gender} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
          <h2 className="text-base font-black text-slate-900 mb-2">Account Details</h2>
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0">{initials}</div>
              <div>
                <p className="text-sm font-black text-slate-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">{user?.accountType || "Student"}</p>
              </div>
            </div>
            <DetailRow icon={FiMail} label="Registered Email" value={user?.email} />
            <div className="flex items-center gap-4 py-4 border-b border-slate-100">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100"><FiCalendar className="text-slate-400 text-sm" /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Member Since</p>
                <p className="text-sm font-semibold text-slate-800">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Recently Joined'}</p>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard/settings')} className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"><FiEdit2 size={14} /> Account Settings</button>
        </div>
      </div>
    </div>
  )
}

export default MyProfile