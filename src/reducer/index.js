import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'
import courseReducer from '../slices/courseSlice'
import confirmationReducer from '../slices/confirmationSlice'
import enrolledCourseReducer from '../slices/viewCourseSlice'
const rootReducer= combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    confirm:confirmationReducer,
    enrolledCourse:enrolledCourseReducer
})

export  default rootReducer