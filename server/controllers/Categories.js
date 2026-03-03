
const Category = require("../model/Category");


exports.createCategory = async (req ,res) =>{
    try{
        const{name , description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : "Enter all details",
            })
        }

        // as an object save hoga
        const Categorydetails = await Category.create({
            name : name,
            description : description,

        })

        return res.status(200).json({
            success : true,
            Message : "Tag created successfully",
        })

    }catch(err){
              return res.status(500).json({
                success : false,
                message : "Enter all details",
            })
    }
}

exports.showAllCategories = async(req , res) =>{
    
        // saare tag nikale hai {} means no condition name :true ka mtlb name hona hi chayeye
        // yaha pr {name : true , description:true} ese mongoose projection bolte hai because
        // mongoose + mongodb apne aap se id and other things add krke save krta hai
        // so we only need name and description
        try{
        //  isko projection kehte hai ki saare catrgory le aao {} iska mtlb and name : true , description:true
        // inka mtlb ki categories me sirf name and description hi lana 
         const allCategories = await Category.find({} , {name : true , description:true});

         return res.status(200).json({
            success : true,
            message : "All tags returned successfully",
            data:allCategories
         })

        }catch(err){
          console.log(err);
         return res.status(401).json({
            success : true,
            Message : err.message,
        })
        }
         
    
};

exports.categoryPageDetails =  async(req , res) =>{
    try{ 
        const {categoryId} = req.body;
        
       const selectedCategory = await Category.findById(categoryId).populate({
        path : "Courses",
        match : "published",
        populate : "ratingandreview"
       }).exec()

        // validation
        if(!selectedCategory){
            return res.status(401).json({
                success : false,
                message : "Data not found"
            })
        }
        // if the courses array is empty
        if(selectedCategory.courses.length === 0){
            console.log("No courses found for the selected category.");
             return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
        }

        // different categories
        const differentCategories = await Category.find({
            _id: {$ne :categoryId},
        }).populate("courses").exec();


         let differentCategory = await Category.findOne(
                categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                  ._id
              )
                .populate({
                  path: "courses",
                  match: { status: "Published" },
                })
                .exec()


        // get top selling courses

         // Get top-selling courses across all categories
              const allCategories = await Category.find()
                .populate({
                  path: "courses",
                  match: { status: "Published" },
                  populate: {
                    path: "instructor",
                },
                })
                .exec()
              const allCourses = allCategories.flatMap((category) => category.courses)
              const mostSellingCourses = allCourses
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 10)

        return res.status(200).json({
            success : true,
            data:{
                selectedCategory,
                differentCategories,
            },
        });
    }catch(err){
         console.log(err);
         return res.status(401).json({
            success : true,
            Message : err.message,
        })
    }
}