import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay, FaUsers, FaChalkboardTeacher, FaLaptopCode, FaStar, FaCheckCircle, FaPython, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { FaGoogle, FaMicrosoft, FaApple, FaAmazon } from "react-icons/fa";
import CTAButton from "../components/core/Home/CTAButton";
import CodeBlocks from "../components/core/Home/CodeBlocks";
import Instructor from "../assets/Images/Instructor.png";
import Testimonial from './Testimonial';

// Helper for Light Mode Bento Cards
const FeatureCard = ({ title, desc, icon: Icon, colorClass, iconBg }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
    <div className={`mb-4 inline-flex items-center justify-center rounded-xl ${iconBg} p-4 text-3xl ${colorClass}`}>
      <Icon />
    </div>
    <h3 className="mb-3 text-xl font-bold text-slate-900" style={{fontFamily: "'Syne', sans-serif"}}>{title}</h3>
    <p className="text-slate-600 leading-relaxed font-medium" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>{desc}</p>
  </div>
);

function Home() {
  return (
    <div className="w-full bg-white text-slate-800 overflow-x-hidden" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
        
        <div className="absolute top-0 -right-1 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-40 animate-pulse "></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[120px] opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400 rounded-full blur-[140px] opacity-20"></div>

        <div className="w-11/12 max-w-7xl mx-auto flex flex-col items-center text-center z-10 relative">

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]" style={{fontFamily: "'Syne', sans-serif"}}>
            Learning that gets you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Skills for Life.
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed font-medium" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
            Join millions of people from around the world learning together. Online learning is not the next big thing, it is the <span className="font-bold text-slate-800">now big thing.</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-16">
             <Link to="/signup">
                <button className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2" style={{fontFamily: "'Syne', sans-serif"}}>
                    Start Learning Free <FaArrowRight />
                </button>
             </Link>
             <Link to="/login">
                <button className="px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-slate-400 hover:text-slate-900 transition-all flex items-center gap-2 shadow-sm" style={{fontFamily: "'Syne', sans-serif"}}>
                   <FaPlay className="text-xs" /> Watch Demo
                </button>
             </Link>
          </div>

          {/* ================= HERO GRAPHIC ================= */}
          <div className="relative w-full max-w-5xl mx-auto perspective-1000">
             
             <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transform rotate-x-2 transition-transform duration-500 hover:rotate-0">
                <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   <div className="ml-4 h-4 w-60 bg-slate-200 rounded-full opacity-50"></div>
                </div>
                
                <div className="flex h-[400px] md:h-[500px]">
                   <div className="w-16 md:w-64 bg-slate-50 border-r border-slate-100 p-4 hidden md:flex flex-col gap-4">
                      <div className="h-8 w-3/4 bg-blue-100 rounded-md"></div>
                      <div className="h-4 w-full bg-slate-200 rounded-md"></div>
                      <div className="h-4 w-5/6 bg-slate-200 rounded-md"></div>
                      <div className="h-4 w-4/6 bg-slate-200 rounded-md"></div>
                      <div className="mt-auto h-20 w-full bg-indigo-50 rounded-xl border border-indigo-100"></div>
                   </div>
                   
                   <div className="flex-1 bg-slate-900 p-6 font-mono text-sm relative">
                      <div className="text-blue-300">import <span className="text-white">React</span> from <span className="text-green-300">'react'</span>;</div>
                      <div className="text-blue-300 mt-2">function <span className="text-yellow-300">App</span>() {'{'}</div>
                      <div className="text-white ml-4 mt-2">return (</div>
                      <div className="text-slate-400 ml-8 mt-2">&lt;div className="learning-platform"&gt;</div>
                      <div className="text-pink-400 ml-12 mt-2">&lt;h1&gt;Welcome to Future&lt;/h1&gt;</div>
                      <div className="text-slate-400 ml-8 mt-2">&lt;/div&gt;</div>
                      <div className="text-white ml-4 mt-2">);</div>
                      <div className="text-blue-300 mt-2">{'}'}</div>
                      <div className="w-2 h-5 bg-blue-500 animate-pulse mt-1 ml-4 inline-block"></div>
                      <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-800 rounded-lg border border-slate-700 p-3 shadow-xl opacity-90">
                         <div className="flex items-end justify-between h-full gap-2">
                            <div className="w-1/5 bg-blue-500 h-[40%] rounded-t-sm"></div>
                            <div className="w-1/5 bg-blue-500 h-[70%] rounded-t-sm"></div>
                            <div className="w-1/5 bg-blue-500 h-[50%] rounded-t-sm"></div>
                            <div className="w-1/5 bg-blue-400 h-[90%] rounded-t-sm animate-pulse"></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="absolute -right-4 -top-10 md:right-[-30px] md:top-[10%] bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                   <FaCheckCircle size={20}/>
                </div>
                <div>
                   <p className="text-xs text-slate-500 font-bold uppercase" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>Status</p>
                   <p className="text-sm font-bold text-slate-800" style={{fontFamily: "'Syne', sans-serif"}}>Job Ready</p>
                </div>
             </div>

             <div className="absolute -left-4 bottom-10 md:left-[-40px] md:bottom-[20%] bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow delay-700">
                <div className="flex -space-x-2">
                   {[1,2,3].map((i) => (
                      <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500`}>
                         U{i}
                      </div>
                   ))}
                </div>
                <div>
                   <p className="text-xs text-slate-500 font-bold uppercase" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>Community</p>
                   <p className="text-sm font-bold text-slate-800" style={{fontFamily: "'Syne', sans-serif"}}>10k+ Students</p>
                </div>
             </div>

             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                 <FaReact className="absolute top-[-20px] left-[20%] text-blue-400 text-4xl animate-spin-slow opacity-80" />
                 <FaNodeJs className="absolute bottom-[-20px] right-[20%] text-green-500 text-4xl animate-bounce opacity-80" />
                 <FaPython className="absolute top-[40%] right-[-10px] text-yellow-500 text-3xl animate-pulse opacity-80" />
             </div>

          </div>

        </div>
      </div>

      {/* ================= LOGO STRIP ================= */}
      <div className="bg-white border-y border-slate-100 py-10">
        <div className="w-11/12 max-w-7xl mx-auto text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>Trusted by companies of all sizes</p>
            <div className="flex flex-wrap justify-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <FaGoogle className="text-3xl lg:text-4xl hover:text-[#4285F4]" />
                <FaMicrosoft className="text-3xl lg:text-4xl hover:text-[#F25022]" />
                <FaApple className="text-3xl lg:text-4xl hover:text-black" />
                <FaAmazon className="text-3xl lg:text-4xl hover:text-[#FF9900]" />
            </div>
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-white px-4">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4" style={{fontFamily: "'Syne', sans-serif"}}>Why learn with us?</h2>
               <p className="text-slate-500 font-medium text-lg" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>We provide the tools to help you succeed.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard title="Hands-on Projects" desc="Apply what you learn with real-world projects and quizzes. Theory is good, practice is better." icon={FaLaptopCode} colorClass="text-blue-600" iconBg="bg-blue-50" />
                <FeatureCard title="Expert Instructors" desc="Learn from industry experts who are passionate about teaching and have years of experience." icon={FaChalkboardTeacher} colorClass="text-emerald-600" iconBg="bg-emerald-50" />
                <FeatureCard title="Lifetime Access" desc="Learn at your own pace, with lifetime access to all course materials and updates." icon={FaStar} colorClass="text-yellow-500" iconBg="bg-yellow-50" />
            </div>
         </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-12 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-6" style={{fontFamily: "'Syne', sans-serif"}}>Top categories</h3>
            <div className="flex flex-wrap justify-center gap-3">
                {["Development", "Business", "IT & Software", "Design", "Marketing", "Personal Development", "Photography", "Music"].map((tag, idx) => (
                    <button key={idx} className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold hover:border-slate-800 hover:text-slate-900 hover:shadow-md transition-all" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
                        {tag}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* ================= CODE SECTION 1 ================= */}
      <div className="relative w-full py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[120px] opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 z-10">
            <div className="rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl p-8 md:p-14">
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight" style={{fontFamily: "'Syne', sans-serif"}}>
                            Unlock your <br/>
                            <span className="text-blue-600">coding potential</span>
                        </div>
                    }
                    subheading={"Our courses are designed to be fun and engaging. You'll be writing code from day one."}
                    ctabtn1={{ btntext: "Try it Yourself", linkto: "/signup", active: true }}
                    ctabtn2={{ btntext: "Learn More", linkto: "/login", active: false }}
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="/one">One</a>\n<a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>`}
                    codeColor={"text-yellow-500"}
                    backgroundGradient={<div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/30 rounded-full blur-[80px] -z-10"></div>}
                />
            </div>
        </div>
      </div>

      {/* ================= CODE SECTION 2 ================= */}
      <div className="relative w-full py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[140px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-400 rounded-full blur-[140px] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 z-10">
            <div className="rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-indigo-100 shadow-2xl p-8 md:p-14">
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight" style={{fontFamily: "'Syne', sans-serif"}}>
                            Start <br/>
                            <span className="text-indigo-600">coding in seconds</span>
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code immediately."}
                    ctabtn1={{ btntext: "Continue Lesson", linkto: "/signup", active: true }}
                    ctabtn2={{ btntext: "Learn More", linkto: "/login", active: false }}
                    codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n  return (\n    <div>Home</div>\n  )\n}\nexport default Home;`}
                    codeColor={"text-indigo-300"}
                    backgroundGradient={<div className="absolute top-0 left-0 w-[100%] h-[100%] bg-indigo-500/20 rounded-full blur-[100px] -z-10"></div>}
                />
            </div>
        </div>
      </div>

      {/* ================= INSTRUCTOR SECTION ================= */}
      <section className="relative py-28 bg-white overflow-hidden">
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[120px] opacity-60 -translate-x-1/2"></div>

        <div className="relative w-11/12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 z-10">
            
            <div className="lg:w-1/2 relative group">
                <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-blue-600 rounded-tl-3xl opacity-30 group-hover:-top-4 group-hover:-left-4 transition-all duration-300"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-indigo-600 rounded-br-3xl opacity-30 group-hover:-bottom-4 group-hover:-right-4 transition-all duration-300"></div>
                <div className="absolute top-4 left-4 w-full h-full bg-slate-900/5 rounded-2xl -z-10 border border-slate-200"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white transition-transform duration-500 hover:scale-[1.02]">
                    <img src={Instructor} alt="Instructor" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-60"></div>
                </div>
                <div className="absolute bottom-10 -left-8 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 hidden md:flex items-center gap-4 animate-bounce-slow">
                    <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-slate-900" style={{fontFamily: "'Syne', sans-serif"}}>20M+</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>Students Learning</p>
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2 flex flex-col items-start">
                <div className="mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold uppercase tracking-wider" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
                    Partner with us
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8 leading-[1.1]" style={{fontFamily: "'Syne', sans-serif"}}>
                    Become an <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Instructor
                    </span>
                </h2>
                <p className="font-medium text-lg text-slate-600 mb-10 leading-relaxed" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
                    Join our elite community of educators. We provide the 
                    <span className="text-slate-900 font-bold"> high-end tools</span> and 
                    <span className="text-slate-900 font-bold"> global reach</span> to help you teach what you love to millions.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className="flex flex-row gap-2 items-center" style={{fontFamily: "'Syne', sans-serif"}}>
                            Start Teaching Today
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </CTAButton>
                    <Link to="/about" className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors py-3" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
                        Learn about our method <FaArrowRight className="text-sm" />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* ================= REVIEW SECTION ================= */}
      <div className="py-24 bg-slate-50 border-t border-slate-200">
         <div className="w-11/12 max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12" style={{fontFamily: "'Syne', sans-serif"}}>
                Trusted by learners worldwide
            </h2>
            <Testimonial />
         </div>
      </div>

    </div>
  );
}

export default Home;