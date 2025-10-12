import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";

const Testimonial = () => {

    const reviews = [
  {
    name: "Ravi Kumar",
    review: "STUDYNOTION has completely transformed the way I approach learning. The courses are exceptionally well-structured, and the step-by-step video tutorials make even complex topics easy to understand. The practical projects provided after each module really helped me solidify my understanding and gain hands-on experience. I feel more confident in my skills than ever before.",
    rating: 5,
    course: "DSA Mastery",
  },
  {
    name: "Priya Sharma",
    review: "The platform’s interface is sleek, intuitive, and incredibly user-friendly. Navigating between courses and modules is seamless, and the content quality is top-notch. The learning experience is immersive, and I particularly loved the way theory and practice are balanced.",
    rating: 4,
    course: "Web Development Bootcamp",
  },
  {
    name: "Aman Verma",
    review: "I have tried multiple online learning platforms, but STUDYNOTION stands out. The courses are very practical and provide real-world insights. The quizzes, assignments, and projects challenge you and help retain knowledge effectively.",
    rating: 5,
    course: "React.js Advanced",
  },
  {
    name: "Neha Gupta",
    review: "The instructors are highly knowledgeable and explain concepts in a very clear, concise manner. I appreciate how they break down complex topics into easy-to-follow steps",
    rating: 5,
    course: "Java Mastery",
  },
];


  return (
    <div className='w-[1200px] mx-auto min-h-[500px] py-40'>
     <div className="max-w-5xl mx-auto py-10 ">
      <h2 className="text-[3rem] font-bold  font-montserrat text-center text-orange-500 mb-24">
        What Our Students Say
      </h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white shadow-lg rounded-2xl border-1 border-zinc-600 flex-col gap-5 w-[1000px]  p-6 text-center">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-6 h-6 ${
                      idx < r.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-800"
                    }`}
                  />
                ))}
              </div>
              <p className="italic text-base text-[1.5rem] mb-4 font-semibold text-zinc-500">"{r.review}"</p>
              <h3 className="font-bold text-[2rem] text-zinc-700 ">{r.name}</h3>
              <p className="text-lg text-zinc-700 font-semibold">{r.course}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
      
    
  )
}

export default Testimonial
