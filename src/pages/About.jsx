
import Highlights from '../components/core/Home/Highlights'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import stats from '../data/stats'
import GridTemplate from '../components/AboutUs/GridTemplate'
import FormSection from '../components/AboutUs/FormSection'
import Footer from '../components/common/Footer'


const About = () => {
  return (
    <div className='mb-32'>
      {/* section 1 */}
      <div className='mt-36 '>
        <h1 className='text-black text-4xl font-bold w-[800px] mx-auto'>Driving Innovation in Online Education for a </h1>
        <h1 className='text-4xl font-bold text-center'><Highlights text={"Brighter Future"} ></Highlights></h1>
        <p className=' w-[900px] mx-auto text-lg mt-6'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
      </div>
      <div className='flex gap-10 justify-center mt-11 mb-11'>
        <img src={aboutus1}></img>
        <img src={aboutus2}></img>
        <img src={aboutus3}></img> 
      </div>

      {/* section 2 */}
      <div className='text-4xl font-bold text-center'>We are passionate about revolutionizing the way we learn. Our innovative </div>
      <div className='text-4xl font-bold text-center'>platform <Highlights text={"combines technology"}></Highlights><span>expertise</span>,and community to create an</div>
      <div className='text-4xl font-bold text-center'> unparalleled educational experience.</div>



       {/* section 3 */}
    <div className='flex flex-col mt-16 pt-36'>
    {/* upper */}
        <div className='flex gap-24 w-[1200px] mx-auto items-center '>
            {/* left section */}
            <div className='flex flex-col gap-11 w-[50%]'>
            <h1 className=' text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-red-700 to-orange-300'>Our Founding Story</h1>
            <p className='text-lg'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
            <p className='text-lg'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
            <div className>
              <img src={FoundingStory}></img>
            </div>

        </div>
        {/* lower */}
         <div className='flex gap-32 w-[1200px] mx-auto mt-40'>
            {/* left section */}
            <div className='flex flex-col gap-10'>
            <h1 className='text-5xl font-semibold font-montserrat  text-transparent bg-clip-text bg-gradient-to-b from-red-700 to-orange-300' >Our Vision</h1>
            <p className='text-lg font-roboto'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            
            </div>
            <div className='flex flex-col gap-10'>
                <h1 className='text-5xl font-semibold font-montserrat  text-transparent bg-clip-text bg-gradient-to-b from-red-700 to-orange-300'>Our Mission</h1>
                <p className='text-lg font-roboto'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>

        </div>
    </div>
    <div className='w-full mt-24 bg-zinc-800 mb-16 min-h-[150px] flex justify-around items-center'>
      {
        stats.map((current) =>{
         return(
          <div className='flex flex-col gap-3' >
           <h1 className='text-4xl font-semibold text-white font-montserrat text-center'>{current.count}</h1>
           <p className='text-lg text-white text-center'>{current.record}</p> 
          </div>
         ) 
        })
      }
    </div>


    {/* section 4 */}
    
    

    {/* form section*/}
    <FormSection></FormSection>


    
    </div>
   
  )
}

export default About
