import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({ children, active, linkto, outline = false }) => {
  return (
    <Link to={linkto}>
      <div
        className={`
          relative inline-flex items-center justify-center
          rounded-full px-8 py-3 text-base md:text-lg font-bold
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          cursor-pointer select-none
          hover:-translate-y-1 active:scale-95 active:translate-y-0
          
          ${
            active
              ? "bg-slate-900 text-white shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_25px_-5px_rgba(15,23,42,0.2)] hover:bg-slate-800"
              : "bg-white text-slate-700 border border-slate-200 shadow-sm hover:border-slate-400 hover:bg-slate-50"
          }
        `}
      >
        {/* Halka sa glass shine effect sirf active button ke liye */}
        {active && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        )}
        
        <span className="relative z-10 flex items-center gap-2">
            {children}
        </span>
      </div>
    </Link>
  )
}

export default CTAButton