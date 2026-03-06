import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"

export const getEnrolledCourses=async()=>{
    try {
        const response=await apiconnector('GET','https://code-catalyst-backend.onrender.com/api/v1/profile/get-enrolled-courses')
        console.log(response)
        return  response.data.courses
    } catch (error) {
        toast.error('Unable to fetch enrolled courses')
        console.log(error.response.data.message)
    }
    
}