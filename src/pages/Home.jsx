import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Highlights from "../components/core/Home/Highlights";
import CTAButton from "../components/core/Home/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Home/CodeBlocks";
import TimeLineSection from "../components/core/Home/TimeLineSection";
import studynotion from "../assets/Images/download.png";
import video from "../assets/Images/mixkit-hands-of-a-programmer-working-on-his-computer-41640-4k.mp4"
import NavButtons from "../components/NavButtons";
import LanguageSection from "../components/core/Home/LanguageSection";
import Instructor from "../assets/Images/Instructor.png";
import Explore from "../components/core/Home/Explore";
import { useState } from "react";
import Testimonial from './Testimonial';
import { FaArrowRightLong } from "react-icons/fa6";
import landing from '../assets/Images/boy.png';
import Marque from './Marque';

function Home(){

 
    return(
    <div className="  w-[100%] h-full overflow-x-hidden ">
       
     {/* section 1 */}
     <div className=" relative bg-gradient-to-r from-orange-500 to-orange-700  w-full h-screen  flex space-y-9">
        <div className="w-[1400px] mx-auto">
        <img src={landing} className="absolute h-[650px] -right-14 -bottom-0.5"></img>
      
        <div className="w-[60%] p-10">
            <h1 className="text-white text-[3rem] font-montserrat font-bold z-40 mt-52 ">Empower Your Future with <span className="text-white">Coding Skills</span></h1>
        <p className="text-white text-lg font-medium font-montserrat mt-8 z-50 w-[70%] ">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
        <div className=" flex  gap-7 mt-6 ">
        <Link to={"/login"}>
          <div className="bg-zinc-800 text-white text-lg px-[40px] py-[12px] rounded-full flex items-center gap-2.5 hover:text-black hover:bg-white">Get Started <span><FaArrowRightLong /></span></div>
        </Link>
           
        </div>
        </div>
        </div>
        
     </div>
      
    
      {/* <div className="herosection py-7 bg-white">
       <div className>
        <CodeBlocks 
         position={"lg:flex-row"}
         heading={
          <div className="text-zinc-900 text-[2.5rem] font-bold">
            Unlock your{" "}                 
            <Highlights text={"coding potential"}></Highlights>{" "}    
            with our online courses.
          </div>
         }
         subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}     
         ctabtn1={
          {
            active : true,
            btntext : "Learn More",
            linkto : "/signup"
          }
         }
         ctabtn2={
          {
            active : false,
            btntext : "Learn More",
            linkto : "./login",
          }
         }
          codeblock={`<!DOCTYPE html>
<html lang="en">
<head>
<title>This is myPage</title>
</head>
<body> 
<h1><a href="/">Header</a></h1>
<a href="/one">One</a>
</nav>
</body>`}
codeColor={"text-yellow-200"}
         ></CodeBlocks>
      </div> 
       

        <div className ='mt-64 '>
        <CodeBlocks 
         position={"lg:flex-row-reverse"}
         heading={
          <div className="text-white text-4xl font-semibold">
            Start{" "}               
            <Highlights text={`coding \n in seconds`}></Highlights>{" "}    
          </div>
         }
         subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}     
         ctabtn1={
          {
            active : true,
            btntext : "Continue Lesson",
            linkto : "/signup"
          }
         }
         ctabtn2={
          {
            active : false,
            btntext : "Learn More",
            linkto : "./login",
          }
         }
          codeblock={`import React from "react";
import CTAButton from "./Button";
import TypeAnimation from "react-type";
import { FaArrowRight } from "react-icons/fa";

const Home = () =>{
return (
<div>Home</div>
)
}
export default Home;`}
codeColor={"text-yellow-200"}
         ></CodeBlocks>
      </div> 

      
      </div> */}
       

     <div className="w-[100%] pt-14">
     <div className=" flex  w-[85%] mx-auto pt-24 mb-4 gap-6">
      <div className="text-[2.7rem] w-[50%] text-black font-roboto font-bold ">Get the skills you need for a job <br>
      </br> <Highlights text={ `  that is in demand.`}></Highlights></div>
      <div className="flex flex-col gap-4  ">
        <p className="text-black font-montserrat font-medium text-lg ">The modern StudyNotion is the dictates its own terms. Today, to <br/>
        be a competitive specialist requires more than professional skills.</p>
        <div className="w-[200px]"><CTAButton active={true} linkto={"/signup"} >Learn More</CTAButton></div>
        
      </div>
     </div>
      <TimeLineSection></TimeLineSection>

     <LanguageSection></LanguageSection> 
     </div>

     <Marque></Marque>
     
     {/* section 3 */}
     <div className="w-full bg-white pt-40 flex flex-col justify-center ">
     <div className="w-[80%] mx-auto  flex items-center justify-center gap-16 p-24">
      
        <img src={Instructor} className="w-[50%]"></img>
      
      <div className="flex flex-col gap-9 ">
        <h1 className="text-[3rem] text-zinc-500 font-roboto font-semibold ">Became an <br/> <Highlights text={"instructor"}></Highlights> </h1>
         <p className="text-zinc-700 font-montserrat text-lg font-medium w-[100%]">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
         <div className="w-[65%]">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex gap-3.5 items-center">
             <div> Start Teaching Now</div>
             <FaArrowRight></FaArrowRight>
            </div>
          </CTAButton>
         </div>
      </div>
     
     </div>
      
      <Testimonial></Testimonial>

     </div>
     {/* <footer className="w-[100%] bg-black pb-32">
     <div className=" w-[1400px] mx-auto flex gap-11 pt-24 justify-center  pb-16 border-b-[1px] border-gray-500 ">
      <div className="flex gap-9  border-r-[1px] border-gray-500  pr-16">
        <div className="flex flex-col gap-3.5">
          <img src={studynotion} className=""></img>
          <p className="text-gray-400 text-lg font-bold">Company</p>
          <p className="text-gray-500">About</p>
          <p className="text-gray-500">Carrers</p>
          <p className="text-gray-500">Affiliates</p>
          <div>

          </div>

        </div>
        <div className="flex flex-col gap-3.5">
          <p className="text-gray-400 text-lg font-bold">Resources</p>
          <p className="text-gray-500">Articles</p>
          <p className="text-gray-500">Blog</p>
          <p className="text-gray-500">Chart Sheet</p>
          <p className="text-gray-500">Code Challenges</p>
          <p className="text-gray-500">Docs</p>
          <p className="text-gray-500">Projects</p>
            <p className="text-gray-500">Videos</p>
            <p className="text-gray-500">Work space</p>

            <div className="flex flex-col gap-3.5">
          <p className="text-gray-400 text-lg font-bold">Support</p>
          <p className="text-gray-500">Help center</p>
            </div>
        </div>
        <div className="flex flex-col gap-3.5">
          <p className="text-gray-400 text-lg font-bold">Plans</p>
          <p className="text-gray-500">Paid memberships</p>
          <p className="text-gray-500">For students</p>
          <p className="text-gray-500">Business solutions</p>

          <div className=" flex flex-col gap-3.5">
          <p className="text-gray-400 text-lg font-bold">Community</p>
          <p className="text-gray-500">Forums</p>
          <p className="text-gray-500">Chapters</p>
          <p className="text-gray-500">Events</p>
          </div>
          
        </div>
      </div>
     <div className="flex gap-11">
     <div className="flex flex-col gap-3.5">
      <p className="text-gray-400 text-lg font-bold">Company</p>
          <p className="text-gray-500">AI</p>
          <p className="text-gray-500">Cloud Computing</p>
          <p className="text-gray-500">Cloud Foundations</p>
          <p className="text-gray-500">Computer Science</p>
          <p className="text-gray-500">Cybersecurity</p>
          <p className="text-gray-500">Data Analytics</p>
          <p className="text-gray-500">Data Science</p>
          <p className="text-gray-500">Data Visualization</p>
          <p className="text-gray-500">Dev Ops</p>
          <p className="text-gray-500">Developer Tools</p>
          <p className="text-gray-500">Game Developement</p>
          <p className="text-gray-500">IT</p>
          <p className="text-gray-500">Machine Learing </p>
          <p className="text-gray-500">Math</p>
            <p className="text-gray-500">Mobile Developement</p>
            <p className="text-gray-500">Web Developement</p>
            <p className="text-gray-500">Web Design</p>   
     </div>

     <div className="flex flex-col gap-3.5">
            <p className="text-gray-400 text-lg font-bold">Languages</p>
          <p className="text-gray-500">Bash</p>
          <p className="text-gray-500">C++</p>
          <p className="text-gray-500">C#</p>
          <p className="text-gray-500">Go</p>
          <p className="text-gray-500">HTML & CSS</p>
          <p className="text-gray-500">Java</p>
          <p className="text-gray-500">JavaScript</p>
          <p className="text-gray-500">Kotlin</p>
          <p className="text-gray-500">PHP</p>
          <p className="text-gray-500">Python</p>
          <p className="text-gray-500">R</p>
          <p className="text-gray-500">Ruby</p>
          <p className="text-gray-500">SQL</p>
            <p className="text-gray-500">Swift</p>

     </div>
      
      <div className="flex flex-col gap-2.5">
          <p className="text-gray-400 text-lg font-bold">Career building</p>
          <p className="text-gray-500">Career paths</p>
          <p className="text-gray-500">Career services</p>
          <p className="text-gray-500">Interview prep</p>
          <p className="text-gray-500">-</p>
          <p className="text-gray-500">Full Catalog</p>
          <p className="text-gray-500">Beta Content</p>
      </div>
     </div>
     </div>
     
      
     
     </footer> */}
    
       
    </div>
    )
    
}


export default Home;