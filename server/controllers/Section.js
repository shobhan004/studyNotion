const Section = require("../model/Sections");
const Course = require("../model/Course");

exports.createSection = async (req, res) => {
    try {
        // 1. Data fetch karo
        const { sectionName, courseId } = req.body;

        // 2. Validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties: Section name and Course ID are required",
            });
        }

        // 3. Section create karo
        const newSection = await Section.create({ sectionName });

        // 4. Course ko update karo (Section ID add karo)
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // 5. Response bhej do
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create section, please try again",
            error: error.message,
        });
    }
};


exports.deleteSection = async (req, res) => {
    try {
        // 1. Data fetch (Humein Section ID aur Course ID dono chahiye)
        const { sectionId, courseId } = req.body;

        // 2. Validation
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties: Section ID and Course ID are required",
            });
        }

        // 🚀 3. (Optional but Pro Tip) Pehle Section dhoondho taaki uske SubSections delete kar sakein
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // 4. SubSections delete karo (Jo is section se jude hain)
        // Note: Agar tere SubSection model ka naam 'SubSection' hai toh use require kar lena uper
        // await SubSection.deleteMany({ _id: { $in: section.subSection } });

        // 5. Ab asli Section delete karo
        await Section.findByIdAndDelete(sectionId);

        // 6. Course ke array se is Section ki ID remove karo ($pull use karke)
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId,
                },
            },
            { new: true }
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // 7. Response bhej do
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            updatedCourse, // 👈 Frontend ko updated course bhej rahe hain taaki UI turant update ho jaye
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section, please try again",
            error: error.message,
        });
    }
};


exports.updateSection = async (req, res) => {
    try {
        // 1. Data fetch karo
        const { sectionName, sectionId, courseId } = req.body;

        // 2. Validation
        if (!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required (Section Name, ID, and Course ID)",
            });
        }

        // 3. Section update karo
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        // 🚀 4. THE FIX: Poora Course nikaalo updated data ke saath taaki frontend crash na ho
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // 5. Response bhej do
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedCourse, // Redux yahi expect karta hai
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while updating section",
            error: error.message,
        });
    }
};