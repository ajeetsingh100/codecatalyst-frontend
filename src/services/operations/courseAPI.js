import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import {setCourse,setEditCourse,setStep} from '../../../src/slices/courseSlice'

import { setLoading } from "../../slices/authSlice"




//*********************************************************************************
//                          COURSE HANDLING FUNCTIONS
//*********************************************************************************
export const addCourse=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Creating course please wait...')
        try {
            const response=await apiconnector("POST",'https://code-catalyst-backend.onrender.com/api/v1/course/create-course',formData)
            console.log(response)
            dispatch(setCourse(response.data.course))
            //localStorage.setItem('course',JSON.stringify(response.data.course))
            toast.success("Course created successfully",{id:toastID})     
            dispatch(setStep(2))    
          
        } catch (error) {
            toast.error('Unable to create course',{id:toastID})
            console.log(error.response.data)
            console.log(error.response.data.message)
        }
    }
}

export const updateCourse=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Modifying course details...')
        try {
            const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/edit-course',formData)
            console.log('response from course API',response.data.updatedCourse)
            dispatch(setStep(2))
            dispatch(setEditCourse(false))
            dispatch(setCourse(response.data.updatedCourse))
            //localStorage.setItem('course',JSON.stringify(response.data.updatedCourse))
            toast.success('Course successfully modified',{id:toastID})
            
        } catch (error) {
            toast.error('Unable to modify course details!!',{id:toastID})
            console.log(error.response.data)
        }
    }
}
export const changeCourseStatus=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Please Wait...')
        try {
            const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/edit-course',formData)
            console.log(response)
            toast.success('Your course is successfully published',{id:toastID})
            dispatch(setStep(1))
            return response.data.success
            
        } catch (error) {
            toast.error("Unable to publish your course",{id:toastID})
            console.log(error.response.data)
            throw error
        }
    }
}
//*********************************************************************************
//                          SECTION HANDLING FUNCTIONS
//*********************************************************************************
export const createSection=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Section Creation is in Progress')
        try {
            const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/add-section',formData)
            console.log(response)
            dispatch(setCourse(response.data.updatedCourse))
            //localStorage.setItem('course',JSON.stringify(response.data.updatedCourse))
            toast.success('Section successfully created',{id:toastID})
        } catch (error) {
            toast.error("Unable to Create Section",{id:toastID})
            console.log(error.response.data)
        }
    }
}

export const updateSection=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Updating Section Name....')
        try {
            const response=await apiconnector('PUT','https://code-catalyst-backend.onrender.com/api/v1/course/update-section',formData)
            console.log('response from updateSection',response.data.updatedCourse)
            dispatch(setCourse(response.data.updatedCourse))  
           // localStorage.setItem('course',JSON.stringify(response.data.updatedCourse))
            toast.success('Section Name Update Successfully',{id:toastID})         
        } catch (error) {
            toast.error('Unable to Update Section Name',{id:toastID})
            console.log(error.response.data)
        }
    }
}

export const deleteSection=(courseID,sectionID)=>{
    return async(dispatch)=>{
        console.log(`courseID ${courseID}, sectionID: ${sectionID}`)
        const toastID=toast.loading('Deleting Section...')
        try {
            const response=await apiconnector('DELETE','https://code-catalyst-backend.onrender.com/api/v1/course/delete-section',{
                courseID,
                sectionID
            })
            console.log('response from delete section api',response.data.updatedCourse)
            dispatch(setCourse(response.data.updatedCourse))
            //localStorage.setItem('course',JSON.stringify(response.data.updatedCourse))
            toast.success('Section Deleted Successfully',{id:toastID})
            
        } catch (error) {
            toast.error('Unable to delete section',{id:toastID})
            console.log(error.response.data)
        }


    }
}
//*********************************************************************************
//                          SUBSECTION HANDLING FUNCTIONS
//*********************************************************************************
export const createSubSection=(course,formData)=>{
    return async(dispatch)=>{
       
        const toastID=toast.loading('Adding Sub Section Please Wait')
        try {
            dispatch(setLoading(true))
            const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/add-sub-section',formData)
            console.log(response.data)
            const response1=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/get-course-details',{courseID:course._id})
            console.log('response from createSubSection:',response1.data)
      
            dispatch(setCourse(response1.data.courseDetails))
           // localStorage.setItem('course',JSON.stringify(response1.data.courseDetails))
            toast.success('Sub Section Added Successfully',{id:toastID})
            return response1.data    
            
        } catch (error) {
            toast.error('Unable to Add Sub Section',{id:toastID})
            console.log(error.response.data)
            throw error
        }
    }
}
export const updateSubSection=(formData)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Updating Sub Section...')
        try {
            const response=await apiconnector('PUT','https://code-catalyst-backend.onrender.com/api/v1/course/update-sub-section',formData)
            console.log(response.data)
            dispatch(setCourse(response.data.updatedCourse))
            //localStorage.setItem('course',JSON.stringify(response.data.updatedCourse))
            toast.success('Sub Section Updated Successfully',{id:toastID})
            return response.data
            
        } catch (error) {
            toast.error('Unable to Update Sub Section',{id:toastID})
             console.log(error.response.data)
             throw error
        }
    }
}
export const deleteSubSection=(courseID,sectionID,subSectionID)=>{
    return async(dispatch)=>{
        console.log(`courseID: ${courseID} sectionID: ${sectionID} subSectionID: ${subSectionID} `)
        const toastID=toast.loading('Deleting SubSection...')
        try {
            const response=await apiconnector('DELETE','https://code-catalyst-backend.onrender.com/api/v1/course/delete-sub-section',{
                courseID,
                sectionID,
                subSectionID
            })
            console.log(response.data)
            dispatch(setCourse(response.data.updatedCourse))
            //localStorage.setItem('course',JSON.stringify(response.data.updatedCourse))
            toast.success('Sub Section Deleted Successfully',{id:toastID})

        } catch (error) {
             toast.error('Unable to Delete Sub Section',{id:toastID})
             console.log(error.response.data)
        }
        
    }
}

//*********************************************************************************
//                          RATING AND REVIEW HANDLING FUNCTIONS
//*********************************************************************************

export const createRateAndReview=(courseID,rating,review)=>{
   return async(dispatch)=>{
     const toastID=toast.loading('Adding your review please wait...')
    try {
          const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/createRating',{
            courseID,
            rating,
            review
          })
         
          if(response.data.success){
            toast.success('Review is added successfully',{id:toastID})
            return true
          }
        return false
    } catch (error) {
        toast.error("Unable to add review",{id:toastID})
        console.log('Error in createRateAndReview api',error.response.data.message)    
        throw error    
    }

   }
}
export const updateUserReview=(courseID,rating,review)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('Adding your review please wait...')
    try {
        const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/update-user-review',{
            courseID,
            rating,
            review
        })
        if(response.data.success){
            toast.success('User review updated successfully',{id:toastID})
            return true
        }
        toast.error('Something went wrong',{id:toastID})
        return false
    } catch (error) {
        toast.error("Unable to update user review",{id:toastID})
        console.log('Error in update-user-review api',error.response.data.message)
        
    }
    }
}
export const updateUserCourseProgress=(courseID,subSectionID)=>{
    return async()=>{
        const toastID=toast.loading('Updating your progress please wait...')
        try {
          
            toast.success('Your progress is saved successfully',{id:toastID})
        } catch (error) {
            toast.error("Unable to update your progress",{id:toastID})
            console.log("unable to update your course progress",error.response.data.message)
        }
    }
}