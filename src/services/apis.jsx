// const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;


// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  SIGN_OUT:BASE_URL + "/auth/logOut",

};

export const categories = {
    // CATEGORIES_API : BASE_URL + "/course/showAllCategories",
    SUBMIT_SUGGESTIONS_API: BASE_URL + "/suggestions/submitSuggestions"
};

export const Payment = {
  BUY_NOW_PAYMENT_API: BASE_URL + "/payment/capturepayment",
  VERIFY_PAYMENT_API : BASE_URL + "/payment/verifyPayment",
  SUCCESS_MAIL_SENDER_API : BASE_URL + "/payment/successmail",
};
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  GET_IMAGE_LETTER : BASE_URL + "/profile/getusername",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  ADD_COURSE_API: BASE_URL + "/course/addCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
   ADD_TO_CART_API: BASE_URL + "/course/addToCart",
  CREATE_COURSE_API: BASE_URL +  "/course/createCourse",
  GET_ADDED_COURSES: BASE_URL + "/course/getCourse",
}

export const profileEndpoints = {
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses", 
};


export const RATING_API = {
    GET_ALL_RATINGS: BASE_URL + "/rating/getAll",
    CREATE_RATING: BASE_URL + "/rating/create",
}

export const ratingEndpoints = {
    CREATE_RATING: BASE_URL + "/rating/create",
    GET_ALL_RATINGS: BASE_URL + "/rating/getAll",
} 
