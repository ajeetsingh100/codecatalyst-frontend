import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    loading:false,
}

const profileSlice=createSlice({
    initialState:initialState,
    name:'profile',
    reducers:{
        setUser(state,action){
            state.user=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        }
    }
})

export const {setUser} = profileSlice.actions
export default profileSlice.reducer;