import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  FiBook, FiUser, FiSettings, FiLogOut, FiBell, FiPlus, 
  FiChevronRight, FiMenu, FiShoppingCart, FiBookOpen,FiGrid
} from 'react-icons/fi'
import { setToken } from '../slices/authSlice'
import { setUser } from '../slices/profileSlice'

// ─────────────────────────────────────────────────────────
// 1. PREMIUM LOADING SCREEN
// ─────────────────────────────────────────────────────────
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 90) { clearInterval(t); return 90 }
        return p + Math.random() * 18
      })
    }, 180)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 blur-[100px] opacity-70" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-7">
        <div className="relative">
          <span className="absolute inset-0 rounded-2xl bg-blue-500/25 blur-lg animate-pulse" />
          <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl shadow-blue-500/40">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 7h8M8 11h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">StudyNotion</h1>
          <p className="mt-1.5 text-sm font-medium text-slate-400">Preparing your workspace…</p>
        </div>

        <div className="w-56 h-1 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// 2. CLEAN NAVIGATION DATA (No more Ghosts!)
// ─────────────────────────────────────────────────────────
const INSTRUCTOR_NAV = [
  { to: '/dashboard/instructor', icon: FiGrid, label: 'Overview' },
  { to: '/dashboard/my-profile', icon: FiUser, label: 'My Profile' },
  { to: '/dashboard/my-courses', icon: FiBook, label: 'My Courses' },
  { to: '/dashboard/add-course', icon: FiPlus, label: 'Add Course' },
]

const STUDENT_NAV = [
  { to: '/dashboard/my-profile', icon: FiUser, label: 'My Profile' },
  { to: '/dashboard/enrolled-courses', icon: FiBookOpen, label: 'Enrolled Courses' },
  { to: '/cart', icon: FiShoppingCart, label: 'My Cart' },
]

// ─────────────────────────────────────────────────────────
// 3. SMART SIDEBAR
// ─────────────────────────────────────────────────────────
const Sidebar = ({ user, collapsed, onToggle }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isInstructor = user?.accountType === 'Instructor'
  const navLinks = isInstructor ? INSTRUCTOR_NAV : STUDENT_NAV
  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`

  const handleLogout = () => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <aside className={`group/sidebar relative flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out flex-shrink-0 ${collapsed ? 'w-[72px]' : 'w-64'}`}>
      
      {/* Logo Area */}
      <div className={`flex h-16 items-center border-b border-slate-100 px-4 gap-3 flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}>
        <div className="h-8 w-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/20">S</div>
        {!collapsed && (
          <>
            <span className="font-black text-slate-900 tracking-tight text-lg">StudyNotion</span>
            <button onClick={onToggle} className="ml-auto p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all"><FiMenu size={15} /></button>
          </>
        )}
      </div>

      {collapsed && (
        <button onClick={onToggle} className="absolute -right-3.5 top-[20px] z-20 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-all">
          <FiChevronRight size={13} />
        </button>
      )}

      {/* User Chip */}
      {!collapsed ? (
        <div className="mx-3 my-3 flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 flex-shrink-0">
          {user?.image 
            ? <img src={user.image} alt="" className="h-8 w-8 rounded-lg object-cover flex-shrink-0" />
            : <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{initials}</div>
          }
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800">{user?.firstName} {user?.lastName}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">{user?.accountType || 'Student'}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center my-3 flex-shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">{initials}</div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex flex-col flex-1 overflow-y-auto px-2 py-1 gap-1">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-150 group/link ${collapsed ? 'justify-center' : ''} ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-blue-600" />}
                <link.icon className={`flex-shrink-0 text-[17px] transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover/link:text-slate-600'}`} />
                {!collapsed && <span>{link.label}</span>}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-3 hidden group-hover/link:flex z-50">
                    <span className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white shadow-xl">{link.label}</span>
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions (Settings & Logout) */}
      <div className="flex-shrink-0 border-t border-slate-100 p-2 flex flex-col gap-1">
        <NavLink to="/dashboard/settings" className={({ isActive }) => `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-150 group/link ${collapsed ? 'justify-center' : ''} ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
          {({ isActive }) => (
            <>
              {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-blue-600" />}
              <FiSettings className={`flex-shrink-0 text-[17px] ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover/link:text-slate-600'}`} />
              {!collapsed && <span>Settings</span>}
            </>
          )}
        </NavLink>

        <button onClick={handleLogout} className={`group/link flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150 relative ${collapsed ? 'justify-center' : ''}`}>
          <FiLogOut className="flex-shrink-0 text-[17px] text-slate-400 group-hover/link:text-red-400" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

// ─────────────────────────────────────────────────────────
// 4. HEADER 
// ─────────────────────────────────────────────────────────
const PATH_TITLES = {
  '/dashboard/my-profile': 'My Profile',
  '/dashboard/my-courses': 'My Courses',
  '/dashboard/add-course': 'Add New Course',
  '/dashboard/settings': 'Settings',
  '/dashboard/cart': 'My Cart',
  '/dashboard/enrolled-courses': 'Enrolled Courses'
}

const Header = ({ user }) => {
  const location = useLocation()
  const isInstructor = user?.accountType === 'Instructor'
  const title = PATH_TITLES[location.pathname] ?? 'Dashboard'
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`

  return (
    <header className="sticky top-0 z-20 flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl px-8">
      <div>
        <h1 className="text-xl font-black text-slate-900 leading-none">{title}</h1>
        <p className="text-xs font-medium text-slate-400 mt-0.5">{today}</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:border-slate-300 hover:bg-slate-50 transition-all">
          <FiBell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {isInstructor && (
          <NavLink to="/dashboard/add-course" className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-blue-600 transition-all duration-300 hover:-translate-y-0.5">
            <FiPlus size={16} /> New Course
          </NavLink>
        )}

        {user?.image 
          ? <img src={user.image} alt="" className="h-9 w-9 rounded-xl object-cover ring-2 ring-slate-200" />
          : <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-blue-100">{initials}</div>
        }
      </div>
    </header>
  )
}

// ─────────────────────────────────────────────────────────
// 5. MAIN DASHBOARD LAYOUT
// ─────────────────────────────────────────────────────────
const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading, user } = useSelector((state) => state.profile)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  if (authLoading || profileLoading) return <LoadingScreen />

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-screen overflow-hidden bg-slate-50">
      <Sidebar user={user} collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} />
      
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Header user={user} />
        <div className="h-[2px] w-full flex-shrink-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 opacity-50" />
        
        <main key={location.pathname} className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}>
          <div className="mx-auto w-full max-w-[1300px] px-6 py-8 animate-dashIn">
            {/* YAHAN TERE BAAKI COMPONENTS LOAD HONGE (MyProfile, AddCourse etc) */}
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        @keyframes dashIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        .animate-dashIn { animation: dashIn 0.28s ease-out both; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  )
}

export default Dashboard