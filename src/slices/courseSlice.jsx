import {createSlice} from "@reduxjs/toolkit"

const loadCoursesFromStorage = () => {
  try {
    const savedCourses = localStorage.getItem('enrolledCourses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  } catch (error) {
    console.error('localStorage error:', error);
    return [];
  }
}

const initialState = {
  // Student side
  courses: loadCoursesFromStorage(),
  
  // Instructor side (🚀 Naya Add Kiya)
  step: 1,
  course: null, // Ye wo current course hai jise hum edit kar rahe hain
  editCourse: false, // Ye batayega ki hum edit mode mein hain ya nahi
}

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    // 🎓 Student Reducers (Pehle se the)
    setCourse(state, action) {
      if (Array.isArray(action.payload)) {
        state.courses = action.payload;
      } else {
        const exists = state.courses.find(course => course._id === action.payload._id);
        if (!exists) {
          state.courses.push(action.payload);
        }
      }
      localStorage.setItem('enrolledCourses', JSON.stringify(state.courses));
    },
    removeCourse(state, action) {
      state.courses = state.courses.filter(course => course._id !== action.payload);
      localStorage.setItem('enrolledCourses', JSON.stringify(state.courses));
    },

    // 👨‍🏫 Instructor Reducers (🚀 Naye Add Kiye)
    setStep: (state, action) => {
        state.step = action.payload
    },
    // Iska use hum Edit mode mein course data set karne ke liye karenge
    setInstructorCourse: (state, action) => {
        state.course = action.payload
    },
    setEditCourse: (state, action) => {
        state.editCourse = action.payload
    },
    resetCourseState: (state) => {
        state.step = 1
        state.course = null
        state.editCourse = false
    },
  }
})

// 🚀 Exports update kar diye
export const {
    setCourse, 
    removeCourse, 
    setStep, 
    setInstructorCourse, // Note: EditCourse.jsx mein isko use karenge
    setEditCourse, 
    resetCourseState
} = courseSlice.actions

export default courseSlice.reducer