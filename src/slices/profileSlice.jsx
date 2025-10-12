import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    // local storage me data is saved as string so we have to convert it into object to use
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};
 
const profileSlice = createSlice({
name : "profile" ,
 initialState : initialState,
 reducers : {
    setUser(state , value){
        state.user = value.payload;
    }
 },
})

export const{setUser} = profileSlice.actions;
export default  profileSlice.reducer;