const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        const options = { folder };
        
        // Agar image ki height ya quality reduce karni ho (Compression ke liye)
        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }
        
        // Auto resource type se cloudinary khud samajh jata hai ki Image hai ya Video
        options.resource_type = "auto";

        // File upload process
        return await cloudinary.uploader.upload(file.tempFilePath, options);
        
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
}