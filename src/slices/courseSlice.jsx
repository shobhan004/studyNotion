import {createSlice} from "@reduxjs/toolkit"

// localStorage से courses load करें
const loadCoursesFromStorage = () => {
  try {
    const savedCourses = localStorage.getItem('enrolledCourses');
    console.log('Loading from localStorage:', savedCourses);
    return savedCourses ? JSON.parse(savedCourses) : [];
  } catch (error) {
    console.error('localStorage error:', error);
    return [];
  }
}

const initialState = {
  courses: loadCoursesFromStorage(),
}

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    setCourse(state, action) {
      console.log('setCourse called with:', action.payload);
      
      // अगर array है तो सभी add करें, single item है तो उसे add करें
      if (Array.isArray(action.payload)) {
        // Clear existing और नए courses add करें
        state.courses = action.payload;
      } else {
        // Single course add करें (duplicate check के साथ)
        const exists = state.courses.find(course => course._id === action.payload._id);
        if (!exists) {
          state.courses.push(action.payload);
        }
      }
      
      // localStorage में save करें
      localStorage.setItem('enrolledCourses', JSON.stringify(state.courses));
      console.log('Updated courses:', state.courses);
    },
    removeCourse(state, action) {
      state.courses = state.courses.filter(course => course._id !== action.payload);
      localStorage.setItem('enrolledCourses', JSON.stringify(state.courses));
    }
  }
})

export const {setCourse, removeCourse} = courseSlice.actions
export default courseSlice.reducer