import React from 'react'
import ReactDOM from 'react-dom'

const ConfirmationModal = ({ modalData }) => {
  // 🚀 Hum modal ko seedha body mein render karenge
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center bg-black/40 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl animate-scaleIn">
        <p className="text-2xl font-black text-slate-800 tracking-tight">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-8 text-sm font-medium text-slate-500 leading-relaxed">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <button
            onClick={modalData?.btn1Handler}
            className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 transition-all shadow-lg shadow-red-200"
          >
            {modalData?.btn1Text}
          </button>
          <button
            onClick={modalData?.btn2Handler}
            className="flex-1 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>,
    document.body // 🚀 Target: Body tag
  )
}

export default ConfirmationModal