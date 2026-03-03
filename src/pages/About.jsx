import React from 'react'
import Highlights from '../components/core/Home/Highlights'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import stats from '../data/stats'
import GridTemplate from '../components/AboutUs/GridTemplate'
import FormSection from '../components/AboutUs/FormSection'

const About = () => {
  return (
    <div className="w-full bg-white overflow-hidden">
      
      {/* ================= SECTION 1: HERO & VISION ================= */}
      <section className="relative pt-32 pb-20 bg-slate-50">
        {/* Background Blobs for Consistency */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-0"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] -z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 z-10 text-center">
          <header className="max-w-4xl mx-auto mb-16">
            <h1 className="text-2xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-8">
              Driving Innovation in Online Education for a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Brighter Future
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
              Eduvate is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>
          </header>

          {/* Image Gallery with Modern Tilt/Shadow */}
          <div className="flex flex-wrap gap-8 justify-center mt-12 group">
            {[aboutus1, aboutus2, aboutus3].map((img, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-2 border-4 border-white w-full sm:w-[30%]">
                <img src={img} alt="About Us" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: QUOTE SECTION ================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-[1.3] tracking-tight">
                "We are passionate about revolutionizing the way we learn. Our innovative platform 
                <span className="text-blue-600"> combines technology</span>, 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"> expertise</span>, 
                and community to create an unparalleled educational experience."
             </h2>
        </div>
      </section>

      {/* ================= SECTION 3: THE FOUNDING STORY ================= */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Left Content */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <h2 className="text-4xl py-2 lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                Our Founding Story
              </h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed ">
                <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities.</p>
                <p>As experienced educators, we witnessed firsthand the limitations of traditional systems. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
              </div>
            </div>
            {/* Right Image with Glass Effect */}
            <div className="lg:w-1/2 relative p-4 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl">
              <img src={FoundingStory} alt="Founding Story" className="rounded-2xl w-full shadow-lg" />
            </div>
          </div>

          {/* Vision & Mission: Two Column Modern Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-32">
            <div className="flex flex-col gap-6 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
              <h3 className="text-4xl  pb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                Our Vision
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team worked tirelessly to combine cutting-edge technology with engaging content.
              </p>
            </div>
            <div className="flex flex-col gap-6 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
              <h3 className="text-4xl pb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                Our Mission
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION: SYNCED WITH THEME ================= */}
      <div className="w-full bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((current, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h1 className="text-4xl lg:text-5xl font-bold text-white">{current.count}</h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{current.record}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FORM SECTION ================= */}
      <section className="py-24 bg-slate-50">
          <FormSection />
      </section>

    </div>
  )
}

export default About