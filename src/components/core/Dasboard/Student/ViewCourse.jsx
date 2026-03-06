import React, { useEffect, useState } from 'react'
import VideosDropdown from '../../ViewCourse/VideosDropdown'
import { Outlet, useParams } from 'react-router-dom'

import ReviewModal from '../../ViewCourse/ReviewModal'
import { apiconnector } from '../../../../services/apiconnector'
import { useDispatch, useSelector } from 'react-redux'
import {  setEnrolledCourseCompletedVideo, setEnrolledCourseDetail,setEnrolledCourseSection } from '../../../../slices/viewCourseSlice'
import Loader from '../../../common/Loader'


const ViewCourse = () => {
    const {courseID}=useParams()
    const [load,setLoad]=useState(true)
    const [reviewEdit,setReviewEdit]=useState(false)
    const [editComment,setEditComment]=useState(true)
    const {markVideoAsRead}=useSelector(state=>state.enrolledCourse)
    const dispatch=useDispatch()
     useEffect(()=>{
    const courseDetail= async()=>{
      const response= await apiconnector("POST",`https://code-catalyst-backend.onrender.com/api/v1/course/get-full-course-details`,{courseId:courseID})
      console.log(response.data.courseDetails)
      dispatch(setEnrolledCourseDetail(response.data.courseDetails))
      dispatch(setEnrolledCourseSection(response.data.courseDetails.courseSection))
      dispatch(setEnrolledCourseCompletedVideo(response.data.completedVideos))   
      setLoad(false)
    }
  courseDetail()  
  },[courseID,markVideoAsRead])
  return (
    
        <div className='container-fluid'>
        <div className='row'>
            <div className='col-3 '>
                <VideosDropdown setReviewEdit={setReviewEdit} setEditComment={setEditComment}/>
            </div>
            
            <div className='col-9'>
             {  load?<Loader/>: <Outlet/>}
            </div>
        </div>           
          <ReviewModal reviewEdit={reviewEdit} setReviewEdit={setReviewEdit} editComment={editComment} setEditComment={setEditComment}/>            
      </div>
      
    
    
      )
}

export default ViewCourse