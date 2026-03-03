import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import { apiConnector } from '../services/apiconnector';
import { RATING_API } from '../services/apis';

const COLORS = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-emerald-100 text-emerald-600",
    "bg-orange-100 text-orange-600",
    "bg-pink-100 text-pink-600",
    "bg-yellow-100 text-yellow-600",
];

// "muku@gmail.com" → "Muku"
const getNameFromEmail = (email = "") => {
    return email.split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}

// "muku@gmail.com" → "MU"
const getInitials = (email = "") => {
    const name = getNameFromEmail(email);
    const parts = name.split(" ");
    return parts.length > 1
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();
}

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await apiConnector("GET", RATING_API.GET_ALL_RATINGS);
                if (res.data.success) {
                    setReviews(res.data.data);
                }
            } catch (err) {
                console.error("Could not fetch reviews:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="w-full text-center py-20 text-slate-400 font-medium">
                No reviews yet. Be the first to leave one!
            </div>
        );
    }

    return (
        <div className='w-full max-w-7xl mx-auto py-10 px-4'>
            <div className="relative pt-10 pb-20">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    loop={true}
                    className="mySwiper !pb-14"
                >
                    {reviews.map((r, i) => (
                        <SwiperSlide key={r._id || i} className="h-full">
                            <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2rem] p-8 h-full flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                                <div>
                                    {/* Stars + Quote Icon */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star
                                                    key={idx}
                                                    size={16}
                                                    className={idx < r.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}
                                                />
                                            ))}
                                        </div>
                                        <Quote className="text-slate-100 group-hover:text-blue-100 transition-colors" size={32} />
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-slate-600 text-base leading-relaxed mb-8 font-medium italic">
                                        "{r.review}"
                                    </p>
                                </div>

                                {/* User Info */}
                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                                    {r.user?.image ? (
                                        <img
                                            src={r.user.image}
                                            alt={getNameFromEmail(r.user?.email)}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm ${COLORS[i % COLORS.length]}`}>
                                            {getInitials(r.user?.email)}
                                        </div>
                                    )}
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-bold text-slate-900 text-lg leading-tight">
                                            {getNameFromEmail(r.user?.email)}
                                        </h3>
                                        {/* <div className="flex gap-1 mt-0.5">
                                            {[...Array(r.rating)].map((_, idx) => (
                                                <Star key={idx} size={11} className="text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div> */}
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <style dangerouslySetInnerHTML={{ __html: `
                    .swiper-pagination-bullet-active { background: #2563eb !important; width: 24px !important; border-radius: 5px !important; }
                    .swiper-pagination-bullet { background: #cbd5e1; opacity: 1; }
                `}} />
            </div>
        </div>
    );
};

export default Testimonial;