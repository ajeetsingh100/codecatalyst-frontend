import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createOrder } from '../services/operations/paymentAPI'
import { apiconnector } from '../services/apiconnector'
import CourseContent from '../components/core/CourseDetail/CourseContent'
import Footer from '../components/common/Footer'

import { addToCart } from '../slices/cartSlice'
import ReviewSlider from '../components/core/Catelog/ReviewSlider'

const CourseDetailPage = () => {
  const [courseID,setCourseID]=useState()
  const [courseDetails,setCourseDetails]=useState(null)
    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector((state)=>state.profile)
  
    console.log(courseID)
    function buyCourse(){
      if(courseDetails)
      createOrder([courseDetails],navigate,dispatch,user)
    }
    async function loadCourseDetails(){
      const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/get-course-details',{courseID:courseID})
      console.log(response.data)
      setCourseDetails(response.data.courseDetails)
    }
    useEffect(()=>{
      console.log('hello')
      setCourseID([location.pathname.split('/').at(-1)])
      
    },[])
    function addCourseToCart(){
      console.log('course added to cart')
      dispatch(addToCart(courseDetails))
    }

    useEffect(()=>{
      if(courseID){
        console.log('courseID',courseID)
        loadCourseDetails()
      }
    },[courseID])
  return (
    <div>
        <section className='container-fluid bg-richblack-900 text-white py-5'>
            <div className='container'>
                <div className="row">
                    <div className="col-8 d-flex flex-column gap-3 align-items-start">
                        <h2>{courseDetails?.courseName}</h2>
                        <div className=' fs-5 fw-light'>{courseDetails?.courseDescription}</div>
                        <div className='badge bg-primary'>Bestseller</div>
                        <div>Created by {courseDetails?.instructor.firstName+" "+courseDetails?.instructor.lastName}</div>
                        <div className='d-flex gap-4 text-thin'>
                          <div><span className='bi bi-info-circle'></span> LastUpdated {courseDetails?.updatedAt.split('T').at(0)}</div>
                          <div><span className='bi bi-globe'></span> English</div>
                        </div>
                     </div>
                    <div className="col-4  position-relative">
                        <div className='position-absolute'>
                            <div className="card">                     
                                <div className='card-body'>
                                  <img src={courseDetails?.thumbnail} className='card-img-top' alt="" />
                                    <div className='card-text fs-4'>₹{courseDetails?.price}</div>
                                </div>
                                <div className='d-flex flex-column gap-2 px-2 pb-3'>
                                    <button type='button' className='btn btn-outline-primary' onClick={()=>addCourseToCart()}>Add to Cart</button>
                                    <button type='button' className='btn btn-warning' onClick={()=>buyCourse()}>Buy Course</button>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className='container py-4'>
            <div className='row'>
                <div className='col-8 d-flex flex-column gap-4'>
                  {/* WhatYouWillLearn */}
                    <div className='border border-1 border-secondary-subtle p-4'>
                        <h5>What You'll Learn</h5>
                        <ul className='list-unstyled'>
                            <li className='d-flex gap-3 text-thin' style={{fontSize:'14px'}}><span className='bi bi-check-lg'></span><div>{courseDetails?.whatYouWillLearn}</div></li>
                        </ul>
                    </div>
                    {/* This Course includes */}
                    <div>
                      <h5 className='lh-lg'>This course includes:</h5>
                      <div >
                          <ul className='list-unstyled row row-gap-2 text-thin'>
                              <li className='col-6'> <span className='bi bi-play-circle me-3'></span>{courseDetails?.totalCourseDuration} on-demand videos</li>
                              <li className='col-6'><span className='bi bi-trophy me-3'></span>Certificate of Completion</li>
                              <li className='col-6'><span className='bi bi-phone me-3'></span>Access on mobile and TV</li>
                          </ul>
                      </div>
                    </div>   
                    {/* course-content */}
                     <div>
                        <CourseContent courseDetails={courseDetails}/>
                     </div>
                     {/* Requirement*/}
                     <div>
                          <h5 className='lh-lg'>
                            Requirements
                          </h5>
                          <ul className='text-thin'>
                              {
                                courseDetails?.instructions.map(require=>
                                  <li>{require}</li>
                                )
                              }
                          </ul>
                     </div>
                     {/*instructor: */}
                     <div>
                          <h5 className='lh-lg'>Instructor</h5>
                          <div className='w-75'>
                              <div className='card border-0 bg-transparent shadow-none'>
                                  <div className='card-body'>
                                      <h6> <u>{courseDetails?.instructor.firstName+" "+courseDetails?.instructor.lastName}</u></h6>
                                      <div className='fs-6 text-thin text-secondary-emphasis'>{courseDetails?.instructor.additionalDetails.about}</div>
                                      <div className='card-body row '>
                                          <div className='col-3 p-0'>
                                              <img src={courseDetails?.instructor.image} className='img-fluid rounded-circle' alt="" />  
                                          </div>
                                          <div className='col-9 px-4 py-2 '>
                                              <ul className='list-unstyled text-thin d-flex flex-column gap-2' style={{fontSize:"14px"}}>
                                                  <li><span className='bi bi-star-fill me-3'></span>4.7 Instructor Rating</li>
                                                  <li><span className='bi bi-award me-3'></span>56,838 Reviews</li>
                                                  <li><span className='bi bi-people me-3'></span>333,668 Students</li>
                                                  <li><span className='bi bi-play-circle-fill me-3'></span>{courseDetails?.instructor.courses.length} Courses</li>
                                              </ul>
                                          </div>  
                                      </div> 
                                  </div>
                              </div>
                          </div>
                     </div>
                     {/* studentReview */}
                     <div>
                          <h5 className='mb-3'>Students Reviewed</h5>
                          <ReviewSlider course={courseDetails}/>
                     </div>
                </div> 
            </div>
        </section>  
        <Footer/>    
    </div>
  )
}

export default CourseDetailPage