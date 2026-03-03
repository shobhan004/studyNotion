const SubSection = require("../model/SubSections");
const Section = require("../model/Sections");
const Course = require("../model/Course");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");

exports.createSubSection = async (req, res) => {
    try {
        // 1. Data fetch (Title, Duration, Description, SectionID)
        const { title, description, sectionId , courseId} = req.body;
        
        // 2. Video file fetch (req.files se aayegi)
        const video = req.files.video;
        console.log("vedio file aayi kya " , video);


        // 3. Validation
        if (!title  || !description || !sectionId || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required, including the video file",
            });
        }

        // 4. Video upload to Cloudinary (Folder name 'SyncCode' ya jo tune rakha ho)
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
          console.log("4 pr aa gya");
        // 5. SubSection create karo
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}s`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        console.log("5 pr aa gya");
        
        // 6. Section ko update karo (SubSection ID push karo)
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: subSectionDetails._id } },
            { new: true }
        ).populate("subSection");
         console.log("6 pr aa gya");

         const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // 7. Response
        return res.status(200).json({
            success: true,
            message: "Sub-Section created successfully",
            data: updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while creating SubSection",
            error: error.message,
        });
    }
};


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId, courseId } = req.body;

        // 1. SubSection delete karo
        await SubSection.findByIdAndDelete(subSectionId);

        // 2. Section ke andar se SubSection ID remove karo
        await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSection: subSectionId } }
        );

        // 🚀 THE FIX: Poora updated course nikaalo taaki UI sync rahe
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: { path: "subSection" },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
            updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};