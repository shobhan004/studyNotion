import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    loading : false,
    signupData : null,
    token: localStorage.getItem("token") || null,
};

// value looks like this 

//   type: "auth/setLoading",
//   payload: true
// }
const authSlice = createSlice({
name : "auth" ,
 initialState : initialState,
 reducers : {
    setToken(state , value){
        state.token = value.payload;
    },
    setLoading(state , value){
        state.loading = value.payload;
    },
    setSignupData(state , value){
        state.signupData = value.payload;
    }
 
 },
})

export const{setToken , setLoading ,setSignupData } = authSlice.actions;
export default authSlice.reducer;