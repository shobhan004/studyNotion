import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") || null,
    addedCount : 0,
    Courses : []
};
 
const cartSlice = createSlice({
name : "cart" ,
 initialState : initialState,
 reducers : {
    setTotalItems(state , value){
        state.totalItems = value.payload;
    },
    // add to cart
    setTotalCourses(state , value){
        state.Courses.push(value.payload);
    },
     setaddedCount(state , value){
        state.addedCount = value.payload;
    },
 },
})

export const{setTotalItems , setTotalCourses , setaddedCount} = cartSlice.actions;
export default cartSlice.reducer;