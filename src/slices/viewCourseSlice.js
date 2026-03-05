import { createSlice } from "@reduxjs/toolkit";
const initialState={
    enrolledCourseDetail:null,
    enrolledCourseSection:null,
    enrolledCourseSubSection:null,
    enrolledCourseCompletedVideo:[],
    markVideoAsRead:false
}

const viewCourseSlice=createSlice({
    initialState:initialState,
    name:'enrolledCourse',
    reducers:{
        setEnrolledCourseDetail(state,action){
            state.enrolledCourseDetail=action.payload
        },
        setEnrolledCourseSection(state,action){
            state.enrolledCourseSection=action.payload
        },
        setEnrolledCourseSubSection(state,action){
            state.enrolledCourseSubSection=action.payload
        },
        setEnrolledCourseCompletedVideo(state,action){
            state.enrolledCourseCompletedVideo=action.payload
        },
        setVideoAsRead(state,action){
            state.markVideoAsRead=action.payload
        }
    }
})

export const {setVideoAsRead,setEnrolledCourseCompletedVideo,setEnrolledCourseSection,setEnrolledCourseSubSection,setEnrolledCourseDetail} = viewCourseSlice.actions
export default viewCourseSlice.reducer;