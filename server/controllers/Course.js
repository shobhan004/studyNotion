
import User from "../model/User.js";


export const createCourse = async(req ,res) =>{
try{
    const {Id} = req.body;
    const userId = req.user.id;  // usually user id JWT me hoti hai
    
    if(!Id ){
        res.status(200).json({
            success: false,
            message: "Please send all the details",
        })
    }

    const updatedUser = await User.findByIdAndUpdate(userId,
        {
            $addToSet: { cart: Id }
        },
        {new : true}
    );

     if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    res.status(200).json(
       {
         success:true,
        message: "cart added successfully",
       }
    )

}catch(err){
    console.log(err);
     return res.status(500).json({
            success: false,
            message: "Server error: Failed to add course to cart",
        });
}

}

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware se user milta hai
     if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - No user found" });
    }
    const { courseData } = req.body; // course ID

      if (!courseData || !courseData.id) {
      return res.status(400).json({ success: false, message: "Course data missing" });
    }

    console.log("User from token:", req.user);
    console.log("Body received:", req.body);
    
    // TODO: update user cart in DB (example)
    // Assuming you have User model with cart array
    // const user = await User.findById(userId);
    // user.cart.push(Id);
    // await user.save();

    const user = await User.findByIdAndUpdate(userId,
      {
         $addToSet: { addedCourses: courseData },
      },{
        new:true,
      }
    )
    const addedCourses = user.addedCourses;
    const count = addedCourses.length;

    console.log(count);
    if(!count){
      return res.status(400).json({
        success : false,
        message : 'Cannot determine count',
      })

    }
   if(!user){
    return res.status(400).json({
      success: false,
      message: "cannot add course "
    })
   }
    return res.status(200).json({
      success: true,
      message: "Course added to cart successfully",
      count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error adding course to cart",
    });
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

    const user = await User.findById(userId);

    if(!user){
      console.log("User not found")
       return res.status(400).json({
        success : false,
        message : "User not found"
      })
    }
    const courses = user.addedCourses;
    console.log( " Purchased Courses from DB:" , courses);
   return  res.status(200).json({
      success : true,
      message : "Added Courses founded",
       courses,
    })

  }catch(error){
    return res.status(400).json({
        success : false,
        message : "Something went wrong",
      })
  }
}

export const  deleteCourse = async(req , res) =>{
  try{

    const userId = req.user.id;
    const {id} = req.body;

    const user = await User.findById(userId);
    const addedCourses = user.addedCourses;

    const updatedCourses = addedCourses.filter((current) => current.id !== id); 
    const count = updatedCourses.length;
    user.addedCourses = updatedCourses;
    await user.save(); // This was missing!

    res.status(200).json({
      success: true,
      message : "Item removed successfully",
      updatedCourses,
      count,
    })

  }catch(error){
 res.status(200).json({
      success: false,
      message : "Error occured in removing item",
      updatedCourses,
    })
  }
}