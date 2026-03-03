const CourseProgress = require("../model/CourseProgress");
const SubSection = require("../model/SubSections");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    // 1. Check karo ki subSection valid hai ya nahi
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({ error: "Invalid SubSection" });
    }

    // 2. User ka progress document dhoondo
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    // 🚀 SMART FIX: Agar Shaggy don ne pehle kharida tha aur document nahi hai, toh ab bana lo
    if (!courseProgress) {
      console.log("Creating new progress document for existing user...");
      courseProgress = await CourseProgress.create({
        userId: userId,
        courseID: courseId,
        completedVideos: [subSectionId], // Pehli video seedha complete mark kar do
      });

      return res.status(200).json({
        success: true,
        message: "Course Progress initialized and updated! 🎉",
      });
    } else {
      // 3. Agar document mil gaya, toh check karo video pehle se completed toh nahi hai
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({ 
            success: false,
            message: "Video already completed" 
        });
      }

      // 4. Array mein push karo
      courseProgress.completedVideos.push(subSectionId);
    }

    // 5. Save karo
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed! 🎉",
    });

  } catch (error) {
    console.error("Progress update error:", error);
    return res.status(500).json({ 
        success: false,
        message: "Internal Server Error" 
    });
  }
};