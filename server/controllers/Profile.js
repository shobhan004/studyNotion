const Profile = require("../model/Profile");
const User = require('../model/User');
const Course = require('../model/Course');
const CourseProgress = require('../model/CourseProgress');
const {uploadImageToCloudinary} = require('../utils/ImageUploader');

exports.getUsername = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const firstname = userDetails.firstname;
        const lastname = userDetails.lastname;
        // Dono ko mila kar username bana diya
        const username = `${firstname} ${lastname}`;

        return res.status(200).json({
            success: true,
            message: "Username fetched successfully",
            username,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching username",
        });
    }
}
 
//  bhai update isliye kyuki pehle apan ne null kri thi isliye ab update kr rhe hain
exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        const id = req.user.id;

        // Validation: Phone aur Gender zaroori hain
        if (  !id) {
            return res.status(400).json({
                success: false,
                message: "Missing properties: Contact and Gender are required",
            });
        }

        // 1. User Model Update (Name changes)
        const userDetails = await User.findById(id);
        if (firstName) userDetails.firstname = firstName;
        if (lastName) userDetails.lastname = lastName;
        await userDetails.save();

        // 2. Profile Model Update
        const profileId = userDetails.additionaldetails;
        const profileDetails = await Profile.findById(profileId);
        console.log(profileDetails);

        console.log("dob ke pehle ke pehle")


        profileDetails.dateOfBirth = dateOfBirth;
        console.log("dob ke baad")
        profileDetails.gender = gender;
        profileDetails.ContactNumber = contactNumber;
        
        await profileDetails.save();

        console.log("updatedUserDetails ke pehle")

        // Updated user with profile fetch karo frontend ke liye
        const updatedUserDetails = await User.findById(id).populate("additionaldetails").exec();

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            updatedUserDetails,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}

// 🚀 DELETE ACCOUNT: Isme HW wala logic bhi add kar diya hai
exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User Not found",
            });
        }

        // 📝 HW Task: Remove user from enrolled courses
        // Agar Instructor hai toh uske courses delete karo, agar Student hai toh unenroll
        // Student unenrollment logic (Optional but pro approach):
        // await Course.updateMany(
        //     { studentsEnrolled: id },
        //     { $pull: { studentsEnrolled: id } }
        // );

        // Profile pehle delete karo
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // User delete karo
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Account Deleted Successfully",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not delete account"
        });
    }
}

// 🚀 GET ALL DETAILS: Isme response mein data bhej hi nahi raha tha tu
exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails, // 👈 Ye missing tha
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}


exports.instructorDashboard = async (req, res) => {
  try {
    // 1. Token se instructor ki ID nikal li (auth middleware deta hai ye)
    const instructorId = req.user.id;

    // 2. Database se wo saare Courses uthao jo is instructor ne banaye hain
    const courseDetails = await Course.find({ instructor: instructorId });

    // 3. Har course ka data calculate karo (Students aur Kamai)
    const courseData = courseDetails.map((course) => {
      // Agar studentsEnrolled array exist karta hai toh uski length, warna 0
      const totalStudentsEnrolled = course.studentsEnrolled?.length || 0;
      
      // Kamai = Bachon ki ginti * Course ka daam
      const totalAmountGenerated = totalStudentsEnrolled * (course.price || 0);

      // Naya object banakar return kar rahe hain jo frontend ko chahiye
      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
    });

    // 4. Poore Dashboard ke Grand Totals (Upar wale 3 cards ke liye)
    const totalCourses = courseDetails.length; // 🚀 Tera wala logic yahan use hua!
    const totalStudents = courseData.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);
    const totalEarnings = courseData.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);

    // 5. Frontend ko mast JSON response bhej do
    return res.status(200).json({
      success: true,
      message: "Instructor Dashboard Data Fetched Successfully",
      data: {
        totalCourses,
        totalStudents,
        totalEarnings,
        courses: courseData, // Ye neeche wale list/charts ke liye
      },
    });

  } catch (error) {
    console.error("Error in instructorDashboard:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. User dhoondo aur 'courses' array ko deeply populate karo taaki courseContent (sections) mil jayein
    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent", 
        },
      })
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    // 2. Har course ka progress calculate karne ke liye ek naya array banayenge
    let coursesWithProgress = [];

    for (let i = 0; i < userDetails.courses.length; i++) {
      let course = userDetails.courses[i];
      let totalVideos = 0;

      // Har section ke andar jao aur subSection (videos) ka count add karo
      // (Maan kar chal rahe hain aapke section model mein 'subSection' ka array hai)
      for (let j = 0; j < course.courseContent.length; j++) {
        totalVideos += course.courseContent[j].subSection.length || 0;
      }

      // User ka CourseProgress document dhoondo is course ke liye
      let courseProgressDetails = await CourseProgress.findOne({
        courseID: course._id,
        userId: userId,
      });

      // Percentage Calculate karo
      let progressPercentage = 0;
      if (totalVideos !== 0 && courseProgressDetails?.completedVideos) {
        // (Completed Videos / Total Videos) * 100
        progressPercentage = Math.round(
          (courseProgressDetails.completedVideos.length / totalVideos) * 100
        );
      }

      // Course details ke sath nayi percentage property merge karke array mein daal do
      coursesWithProgress.push({
        ...course.toObject(), // Mongoose document ko plain JS object mein convert karna padta hai naye fields add karne ke liye
        progressPercentage: progressPercentage,
      });
    }

    return res.status(200).json({
      success: true,
      data: coursesWithProgress, // 👈 Ab frontend ko courses ke sath progressPercentage bhi jaayega!
    });

  } catch (error) {
    console.error("🔥 BACKEND CRASH ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 📸 Profile Picture Upload Controller
exports.updateDisplayPicture = async (req, res) => {
    try {
        // 1. Frontend se aayi hui image aur user ki ID nikal
        const displayPicture = req.files.displayPicture; // 'displayPicture' wahi naam hai jo frontend FormData mein append kiya tha
        const userId = req.user.id;

        // 2. Validation: Check karo image aayi ya nahi
        if (!displayPicture) {
            return res.status(404).json({
                success: false,
                message: "Please select an image to upload",
            });
        }

        // 3. Image ko Cloudinary par upload karo 
        // (Assume kar raha hu process.env.FOLDER_NAME mein 'StudyNotion' set hai)
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000, // Height
            1000  // Width
        );

        console.log("Cloudinary Upload Success:", image.secure_url);

        // 4. User model mein nayi image ki secure_url update karo
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        ).populate("additionaldetails").exec();

        // 5. Success response bhej do (Ye data frontend ke Redux store mein jayega)
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        });

    } catch (error) {
        console.error("Error updating display picture:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating profile picture",
            error: error.message,
        });
    }
};