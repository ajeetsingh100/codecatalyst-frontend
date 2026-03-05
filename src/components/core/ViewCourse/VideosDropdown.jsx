import React from 'react'

import { Link, useParams } from 'react-router-dom'
import { apiconnector } from '../../../services/apiconnector'

import { useSelector } from 'react-redux'

const VideosDropdown = ({setReviewEdit,setEditComment}) => {
  const {enrolledCourseDetail,enrolledCourseCompletedVideo}=useSelector(state=>state.enrolledCourse)
  
  let videoIndex=1
  const {index}=useParams()
  const{subSectionID,courseID}=useParams()
  console.log('totalVideo',enrolledCourseCompletedVideo)
  const commentModel=async()=>{
    
    const response=await apiconnector('POST','https://code-catalyst-wkk9.onrender.com/api/v1/course/check-user-review',{
        courseID
    })
    console.log('comment model',response.data)
    if(response.data.review.length>0)
    {setReviewEdit(true)
     setEditComment(true)
     return
    }
    setEditComment(false)
  }
  
  
  return (
    <div className='d-flex flex-column gap-3  p-2 ' style={{fontSize:"14px"}}>     
       {/*review modal button*/}
        <div>
            <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal"  onClick={commentModel} data-bs-target="#staticBackdrop5">
              <i class="bi bi-chat-quote"></i> Add Review
           </button>  
        </div>
        {/* course information */}
        <div>
            <div className='rounded py-2 bg-puregrey-25' style={{minHeight:'5rem'}} >
                <div className='d-flex justify-content-between px-3 py-1'>
                    <div>
                    Total Lecture-{enrolledCourseDetail?.totalCourseLectures}
                </div>
                <div>
                    Lecture Done-{enrolledCourseCompletedVideo.length>0?enrolledCourseCompletedVideo.length:0}
                </div>
                </div>
                 <div className='col text-center'>
                  Lecture Index-{index}/{enrolledCourseDetail?.totalCourseLectures}
                </div>
            </div>
        </div>
        {/* video dropdown */}
        <div>
          {
            enrolledCourseDetail?.courseSection.map((section)=>{
              return (
                  <div className='accordion' id={`section-${section._id}`}>
                          <div className='accordion-item'>
                                 <h2 className='accordion-header  bg-puregrey-25'>
                                      <div className='d-flex   p-3 justify-content-between' style={{fontSize:'15px'}} data-bs-toggle='collapse' data-bs-target={`#close-section-${section._id}`}>
                                          <div>{section.sectionName}</div>
                                          <div className='text-thin'>{section.subSection.length} lecture(s){section.totalSectionDuration}</div> 
                                      </div>                                            
                                  </h2>
                                    <div id={`close-section-${section._id}`}  class="accordion-collapse collapse" data-bs-parent={`#section-${section._id}`}>
                                        <div className='accordion-body bg-puregrey-5'>
                                           <ul className='list-unstyled'>
                                              {
                                                  section.subSection.map(subSection=>
                                                    <Link to={`${section._id}/${videoIndex++}/${subSection._id}`} className={`text-decoration-none text-dark `}> <li className={` p-2 rounded ${subSectionID===subSection._id&&`bg-puregrey-25`}`}>{enrolledCourseCompletedVideo.includes(subSection._id)?<i class="bi bi-check-circle-fill text-primary me-2"></i>:<i class="bi bi-file-earmark-play me-2"></i>} {subSection.title}</li></Link>
                                                  )
                                              }
                                           </ul>
                                        </div>
                                    </div>
                            </div>
                    </div>
                )
            })
        }        
        </div>
    </div>
  )
}

export default VideosDropdown