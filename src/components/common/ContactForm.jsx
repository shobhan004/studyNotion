import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../services/apiconnector'
import { ratingEndpoints } from '../../services/apis'  // apna API path
import toast from 'react-hot-toast'
import { Star } from 'lucide-react'
import { useSelector } from 'react-redux'

const ReviewForm = () => {
    const [loading, setLoading] = useState(false)
    const [hovered, setHovered] = useState(0)
    const { token } = useSelector((state) => state.auth)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitSuccessful }
    } = useForm({ defaultValues: { rating: 0 } })

    const selectedRating = watch("rating")

    const submitReview = async (data) => {
        if (data.rating === 0) {
            toast.error("Please select a rating")
            return
        }
        setLoading(true)
        try {
            const response = await apiConnector(
                "POST",
                ratingEndpoints.CREATE_RATING,
                { rating: data.rating, review: data.review },
                { Authorization: `Bearer ${token}` }
            )
            if (!response.data.success) {
                toast.error("Something went wrong")
            } else {
                toast.success("Review submitted successfully! 🎉")
            }
        } catch (err) {
            console.log(err)
            toast.error("Could not submit review")
        }
        setLoading(false)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ rating: 0, review: "" })
            setHovered(0)
        }
    }, [isSubmitSuccessful, reset])

    const inputStyle = `
        w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 
        text-slate-900 placeholder:text-slate-400 focus:bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
        transition-all duration-200 shadow-sm
    `
    const labelStyle = "text-sm font-bold text-slate-700 mb-2 ml-1 block"

    return (
        <form onSubmit={handleSubmit(submitReview)} className="max-w-2xl mx-auto">
            <div className='flex flex-col gap-8'>

                {/* 1. Star Rating */}
                <div className='flex flex-col'>
                    <label className={labelStyle}>Your Rating</label>
                    <div className="flex gap-2 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={36}
                                className={`cursor-pointer transition-all duration-150 
                                    ${(hovered || selectedRating) >= star
                                        ? "text-yellow-400 fill-yellow-400 scale-110"
                                        : "text-slate-300"
                                    }`}
                                onMouseEnter={() => setHovered(star)}
                                onMouseLeave={() => setHovered(0)}
                                onClick={() => setValue("rating", star)}
                            />
                        ))}
                    </div>
                    {/* hidden input to register rating */}
                    <input type="hidden" {...register("rating", { min: 1 })} />
                    {errors.rating && <span className="text-xs text-red-500 mt-1 ml-1 font-medium">Please select a rating</span>}
                </div>

                {/* 2. Review Message */}
                <div className='flex flex-col'>
                    <label className={labelStyle}>Your Review</label>
                    <textarea
                        placeholder='Share your experience with this course...'
                        rows={5}
                        className={inputStyle}
                        {...register("review", { required: "Please write a review" })}
                    />
                    {errors.review && <span className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.review.message}</span>}
                </div>

                {/* 3. Submit */}
                <div className="mt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all 
                        ${loading
                            ? "bg-slate-400 cursor-not-allowed text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:-translate-y-1"
                        }`}
                    >
                        {loading ? "Submitting..." : "Submit Review ✨"}
                    </button>
                </div>

            </div>
        </form>
    )
}

export default ReviewForm