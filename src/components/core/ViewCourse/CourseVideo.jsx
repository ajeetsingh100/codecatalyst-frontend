import React, { useEffect, useState } from 'react'
import ReactPlayer from '@meetingmaker/react-player'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import { apiconnector } from '../../../services/apiconnector'
import { updateUserCourseProgress } from '../../../services/operations/courseAPI'
import { setVideoAsRead } from '../../../slices/viewCourseSlice'


const CourseVideo = () => {
  const {enrolledCourseSection,markVideoAsRead}=useSelector(state=>state.enrolledCourse)
  const [videoURL,setVideoURL]=useState('')
  const[isFirstVideoFlag,setIsFirstVideoFlag]=useState(false)
  const[isLastVideoFlag,setIsLastVideoFlag]=useState(false)  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {sectionID,subSectionID,courseID}=useParams()
  let {index}=useParams()
  useEffect(()=>{
    const loadVideoUsingURL=()=>{  
    const section=enrolledCourseSection?.find(section=>section._id===sectionID)
    const subSection=section?.subSection.find(subSection=>subSection._id===subSectionID)
    console.log('loadUsingURL')
    setVideoURL(subSection?.videoUrl)
    }
    loadVideoUsingURL()
   dispatch(setVideoAsRead(false))
   setIsFirstVideoFlag(false)
   setIsLastVideoFlag(false)
  },[subSectionID,enrolledCourseSection])
  
  //FUNCTION TO CHECK IS VIDEO IS THE FIRST VIDEO OF THE COURSE? IMPACT- TO SHOW/NOT TO SHOW PREVIOUS BUTTON
   const isFirstVideo=()=>{
    const currentSectionIndex=enrolledCourseSection?.findIndex(section=>section._id===sectionID)
    const currentVideoIndex=enrolledCourseSection[currentSectionIndex]?.subSection?.findIndex(subSection=>subSection._id===subSectionID)
    if(currentSectionIndex===0&&currentVideoIndex===0)
      return true
    else
      return false   
  }
  //FUNCTION TO CHECK IS VIDEO IS THE LAST VIDEO OF THE COURSE? IMPACT- TO SHOW/ NOT TO SHOW NEXT BUTTON
  const isLastVideo=()=>{
    const currentSectionIndex=enrolledCourseSection?.findIndex(section=>section._id===sectionID)
    const currentVideoIndex=enrolledCourseSection[currentSectionIndex].subSection.findIndex(subSection=>subSection._id===subSectionID)
    if(currentSectionIndex===enrolledCourseSection.length-1&&currentVideoIndex===enrolledCourseSection[currentSectionIndex].subSection.length-1)
      return true
    else
      return false   
  }
  //FUNCTION TO PLAY NEXT VIDEO IN THE COURSE
  const playNextVideo=()=>{
    console.log('callleddd')
    let currentSectionIndex=enrolledCourseSection?.findIndex(section=>section._id===sectionID)
    let currentVideoIndex=enrolledCourseSection[currentSectionIndex]?.subSection.findIndex(subSection=>subSection._id===subSectionID)
    console.log(currentSectionIndex,currentVideoIndex)
    if(currentVideoIndex===enrolledCourseSection[currentSectionIndex]?.subSection.length-1)
    { let updatedSectionIndex=++currentSectionIndex
      navigate(`/view-course/${courseID}/${enrolledCourseSection[updatedSectionIndex]._id}/${++index}/${enrolledCourseSection[updatedSectionIndex]?.subSection[0]._id}`)}
    else
    {console.log('hello')
      navigate(`/view-course/${courseID}/${enrolledCourseSection[currentSectionIndex]._id}/${++index}/${enrolledCourseSection[currentSectionIndex]?.subSection[currentVideoIndex++]._id}`)}
    
  }

  //FUNCTIONT TO PREVIOUS VIDEO IN THE COURSE
    const playPreviousVideo=()=>{
    console.log('callleddd')
    let currentSectionIndex=enrolledCourseSection.findIndex(section=>section._id===sectionID)
    let currentVideoIndex=enrolledCourseSection[currentSectionIndex]?.subSection.findIndex(subSection=>subSection._id===subSectionID)
    console.log(currentSectionIndex,currentVideoIndex)
    if(currentVideoIndex===0)
    { let updatedSectionIndex=--currentSectionIndex
      navigate(`/view-course/${courseID}/${enrolledCourseSection[updatedSectionIndex]._id}/${--index}/${enrolledCourseSection[updatedSectionIndex]?.subSection[enrolledCourseSection[updatedSectionIndex].subSection.length-1]._id}`)}
    else
    {console.log('hello')
      navigate(`/view-course/${courseID}/${enrolledCourseSection[currentSectionIndex]._id}/${--index}/${enrolledCourseSection[currentSectionIndex]?.subSection[currentVideoIndex--]._id}`)}
    
  }
  //FUNCTION TO DISPLAY CONTROLS
  const handleControls=async()=>{
    console.log('video ended')
    setIsFirstVideoFlag(!isFirstVideo())
    setIsLastVideoFlag(!isLastVideo())   
    const response= await apiconnector("post",'https://code-catalyst-backend.onrender.com/api/v1/course/check-user-progress',{
      courseID,
      subSectionID
    })
    if(!response.data.progressExist){
       dispatch(setVideoAsRead(true))
    }
    
  }
  //FUNCTION TO MARK VIDEOS AS READ
  const handleVideoAsRead=async()=>{
    dispatch(updateUserCourseProgress(courseID,subSectionID))
    dispatch(setVideoAsRead(false))
    
  }
  return (
    <div>        
      
        <div className='position-relative mt-3' style={{width:'60rem', height:"32rem"}}>
         <ReactPlayer onEnded={handleControls}   width={'60rem'} height={'32rem'} controls={true} url={videoURL}/>
                 
         {isFirstVideoFlag&&<button className=' btn btn-warning  ms-1 top-50 start-0  z-2 position-absolute btn-sm' onClick={()=>{playPreviousVideo()}}><i class="bi bi-rewind-fill"></i> Previous Lecture</button>}
         {markVideoAsRead&&<button className=' btn btn-primary  top-50 start-50 translate-middle-x z-2 position-absolute btn-sm' onClick={()=>handleVideoAsRead()}><i class="bi bi-bookmark-check"></i> Mark as Done</button>}       
         {isLastVideoFlag&&<button className=' btn btn-warning me-1 top-50 end-0  z-2 position-absolute btn-sm' onClick={()=>playNextVideo()}><i class="bi bi-fast-forward-fill"></i> Next Lecture</button>       }

        </div>
      
    </div>
  )
}

export default CourseVideo