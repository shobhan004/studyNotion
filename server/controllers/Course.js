import mongoose from "mongoose";
import Category from "../model/Category.js"; // 🚀 Ye missing tha
import Section from "../model/Sections.js";   // 🚀 Ye bhi missing tha
import CourseProgress from "../model/CourseProgress.js";
import SubSection from "../model/SubSections.js"; // 🚀 Ye bhi missing tha
import User from "../model/User.js";
import {uploadImageToCloudinary} from '../utils/ImageUploader.js'
import Course from "../model/Course.js";


// export const createCourse = async(req ,res) =>{
// try{
//     const {Id} = req.body;
//     const userId = req.user.id;  // usually user id JWT me hoti hai
    
//     if(!Id ){
//         res.status(200).json({
//             success: false,
//             message: "Please send all the details",
//         })
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId,
//         {
//             $addToSet: { cart: Id }
//         },
//         {new : true}
//     );

//      if (!updatedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }
//     res.status(200).json(
//        {
//          success:true,
//         message: "cart added successfully",
//        }
//     )

// }catch(err){
//     console.log(err);
//      return res.status(500).json({
//             success: false,
//             message: "Server error: Failed to add course to cart",
//         });
// }

// }


export const createCourse = async(req , res) =>{
  try{
     const {
     courseName, 
     courseDescription, 
     whatYouWillLearn, 
     price, 
     category, 
     status
  } = req.body

  const thumbnail = req.files?.thumbnail;

  if (!courseName || !courseDescription || !price || !category || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "All required fields, including thumbnail, are mandatory",
      });
  }
  const userId = req.user.id;
  const instructorDetails = await User.findById(userId);

  if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }
  
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME 
    );

    if(!thumbnailImage){
      return res.status(404).json({
      success : false,
      message : "Image  not found",
      })
    }

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn || "",
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status || "Draft",
    });
    
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );


    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });

  }
  catch(err){
  console.error(err);
  res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: err.message,
    });
  }
}



export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { courseData } = req.body; 

    if (!courseData || !courseData.id) {
      return res.status(400).json({ success: false, message: "Course data missing" });
    }

    const courseId = courseData.id;

    const studentDetails = await User.findById(userId);
    
    if (!studentDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🚀 FIX: (studentDetails.courses || []) use kiya taaki crash na ho!
    const enrolledCourses = studentDetails.courses || [];
    const isEnrolled = enrolledCourses.some(id => id.toString() === courseId.toString());
    
    if (isEnrolled) {
      return res.status(400).json({ 
        success: false, 
        message: "You are already enrolled in this course! 🎓" 
      });
    }

    // 🚀 FIX: (studentDetails.cart || []) use kiya taaki crash na ho!
    const currentCart = studentDetails.cart || [];
    const isAlreadyInCart = currentCart.some(id => id.toString() === courseId.toString());
    
    if (isAlreadyInCart) {
      return res.status(400).json({ 
        success: false, 
        message: "Course is already in your cart! 🛒" 
      });
    }

    // 🚀 FINAL STEP:
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { cart: courseId } }, 
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course added to cart successfully",
      count: updatedUser.cart.length,
    });

  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};


export const getCourses = async(req, res) =>{
  try{
    console.log("at the getCourses controller");
     const userId = req.user.id; // auth middleware se user milta hai
     console.log(userId);
     if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - No user found" });
    }
    console.log("user dondne se pehle");
    const user = await User.findById(userId).populate("cart").exec();
    
    if(!user){
      console.log("User not found")
       return res.status(400).json({
        success : false,
        message : "User not found"
      })
    }
    console.log("user mil gya");
    const cartcourses = user.cart || [];
    console.log( " Purchased Courses from DB:" , cartcourses);
   return  res.status(200).json({
      success : true,
      message : "Added Courses founded",
      courses: cartcourses,
    })

  }catch(error){
    console.log(error);
    return res.status(500).json({
        success : false,
        message : "Something went wrong",
      })
  }
}



export const deleteCourse = async (req, res) => {
  try {
    // 1. Sahi variable name (Frontend se courseId aa raha hai)
    const { courseId } = req.body;
    const instructorId = req.user.id;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    // 2. Asli Course ko Database se hamesha ke liye uda do
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // 3. Instructor ke profile se bhi us course ki ID ko hata do
    await User.findByIdAndUpdate(instructorId, {
      $pull: { courses: courseId } 
    });

    // Success Response!
    return res.status(200).json({
      success: true,
      message: "Course permanently deleted successfully",
    });

  } catch (error) {
    console.error("Delete course error:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting course",
      error: error.message,
    });
  }
};
// controllers/Course.js

export const getInstructorCourses = async (req, res) => {
    try {
        // req.user.id hume auth middleware se mil jayega
        const instructorId = req.user.id;

        // Database se saare courses lao jinka instructor ye user hai
        // .sort({ createdAt: -1 }) se sabse naye courses sabse upar aayenge
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: instructorCourses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        });
    }
};


// controllers/Course.js

export const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id; 

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // 🚀 AB YE ERROR NAHI DEGA
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    let totalLectures = 0;
    courseDetails.courseContent.forEach((section) => {
      totalLectures += section.subSection.length || 0;
    });

    let progressPercentage = 0;
    if (totalLectures > 0 && courseProgressCount) {
      const completedCount = courseProgressCount.completedVideos.length;
      progressPercentage = Math.round((completedCount / totalLectures) * 100);
    }

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progressPercentage: progressPercentage, 
        completedVideos: courseProgressCount?.completedVideos || [],
      },
    });

  } catch (error) {
    console.error("DEBUGGING ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// controllers/Course.js

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Agar nayi thumbnail image aayi hai toh upload karo
    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Sirf wahi fields update karo jo body mein aayi hain
    // Loop through updates safely
// Loop through updates safely
for (const key in updates) {
  if (Object.prototype.hasOwnProperty.call(updates, key)) {
    // 🚀 CHECK: Agar value khali hai ya "undefined" hai, toh skip karo
    if (updates[key] !== "" && updates[key] !== undefined && updates[key] !== null) {
      course[key] = updates[key];
    }
  }
}
    if (course.instructor.toString() !== req.user.id) {
  return res.status(401).json({
    success: false,
    message: "Bhai, ye tera course nahi hai! Chori mat kar 😂",
  });
}

    await course.save();

    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// 🚀 Saare Published courses nikalne ke liye
export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" }, // 👈 Sirf live courses
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
        courseDescription: true, // 👈 Ye frontend par list dikhane ke liye chahiye
      }
    )
      .populate("instructor")
      .populate("category")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all published courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch course data",
      error: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { courseId } = req.body; 

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID required" });
    }

    // 🚀 FIX: $pull 'cart' me se karo
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: courseId } },
      { new: true }
    ).populate("cart"); 

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Removed from cart",
      updatedCourses: updatedUser.cart || [], 
      count: updatedUser.cart.length || 0     
    });

  } catch (error) {
    console.error("Remove from Cart Error:", error);
    
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



