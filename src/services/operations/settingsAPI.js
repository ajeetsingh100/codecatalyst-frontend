import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setUser } from "../../slices/profileSlice"

export const changeProfilePic=(formData)=>{
   return async(dispatch)=>{
    const toastID=toast.loading('updating profile pic')
    try {
        const response=await apiconnector('PUT','https://code-catalyst-backend.onrender.com/api/v1/profile/update-display-picture',formData)
        console.log(response)
        dispatch(setUser(response.data.updatedProfile))
        // localStorage.setItem('user',JSON.stringify(response.data.updatedProfile))
        console.log(response.data)
        toast.success('user profile updated',{id:toastID})
    } catch (error) {
        toast.error('Unable to update profile pic',{id:toastID})
        console.log(error.response.data.message)
    }
   }
}
export const updateProfile=(formData)=>{
   return async(dispatch)=>{
    const toastID=toast.loading('updating profile')
    try {
        const response=await apiconnector('PUT','https://code-catalyst-backend.onrender.com/api/v1/profile/update-profile',formData)
        console.log(response)
        dispatch(setUser(response.data.updatedUser))
        //localStorage.setItem('user',JSON.stringify(response.data.updatedUser))
        console.log(response.data)
        toast.success('user profile updated',{id:toastID})
    } catch (error) {
        toast.error('Unable to update profile',{id:toastID})
        console.log(error.response.data.message)
    }
   }
}

export const changePassword=(formData)=>{
   return async(dispatch)=>{
    const toastID=toast.loading('changing password')
    try {
        const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/user/change-password',formData)
        console.log(response)
        dispatch(setUser(response.data.updatedUser))
        //localStorage.setItem('user',JSON.stringify(response.data.updatedUser))
        console.log(response.data)
        toast.success('password changed successfully',{id:toastID})
    } catch (error) {
        toast.error('Unable to change password',{id:toastID})
        console.log("hello",error.response)
       console.log(error.response.data.message)
    }
   }
}