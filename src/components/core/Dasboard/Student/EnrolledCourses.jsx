import React, { useEffect, useState } from 'react'

import EmptyEnrolledCourses from './EmptyEnrolledCourses'

import Loader from '../../../common/Loader'
import Courses from './Courses'
import { getEnrolledCourses } from '../../../../services/operations/profileAPI'

const EnrolledCourses = () => {  
    const [courses,setCourses]=useState(null)
    const fetchCourse=async()=>{
    const courses=await getEnrolledCourses()
  
    setCourses(courses)
  }
  useEffect(()=>{fetchCourse()},[])
  return (
    <div>
      <div>
        {
          !courses?(
            <div><Loader/></div>
          ):courses.length===0?(
            <EmptyEnrolledCourses/>
          ):(<div><Courses courses={courses}/></div>)
          
          
        }
      </div>
    </div>
  )
}

export default EnrolledCourses