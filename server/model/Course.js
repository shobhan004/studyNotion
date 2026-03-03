const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: { 
        type: String, 
        required: true,
        trim: true
    },
    courseDescription: { 
        type: String, 
        required: true 
    },
    // 1. INSTRUCTOR LINK: Course kisne create kiya?
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // 2. COURSE CONTENT LINK: Sections aur videos kahan hain?
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],
    // 3. UI SUPPORT: "What you will learn" points ke liye
    whatYouWillLearn: {
        type: String,
    },
    price: { 
        type: Number, 
        required: true 
    },
    // 4. CATEGORY: Ise bhi String ki jagah ek alag schema banana better hai, par abhi ke liye String chalega
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Ye ab string nahi, Category model ka link hai
        required: true,
        
    },
    thumbnail: { // Tumhare schema ka 'image'
        type: String,
        required: true
    },
    // 5. ENROLLMENT TRACKING: Kitne students ne kharida?
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    // 6. DRAFT/PUBLISH LOGIC: Instructor course aadha banakar save kar sake
    status: {
        type: String,
        enum: ["Draft", "Published"],
        default: "Draft"
    },
  },
  { timestamps: true } // Ye tumhara 'createdAt' aur 'updatedAt' automatically handle kar lega
);

module.exports = mongoose.model("Course", courseSchema);