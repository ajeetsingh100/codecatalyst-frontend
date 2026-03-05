import { createSlice } from "@reduxjs/toolkit"

const initialState={
    editCourse:false,
    editSubSection:false,
    editSection:false,
    course:localStorage.getItem('course')?JSON.parse(localStorage.getItem('course')):null,
    step:1,
    loading:false,
}

 const courseSlice=createSlice({
    initialState:initialState,
    name:'course',
    reducers:{
        setCourse(state,action){
       
               state.course=action.payload
           
        },
        setStep(state,action){
            state.step=action.payload
        },
         setEditCourse(state,action){
            state.editCourse=action.payload
        },
        setEditSection(state,action){
            state.editSection=action.payload
        },
        setEditSubSection(state,action){
            state.editSubSection=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },

        resetCourse(state){
            state.course={}
            state.step=0
            state.editCourse=false
        }

    }
})

export const {setCourse,setStep,resetCourse,setEditCourse,setEditSubSection,setEditSection,setLoading} = courseSlice.actions
export default courseSlice.reducer;