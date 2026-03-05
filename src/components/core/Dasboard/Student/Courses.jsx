import React from 'react'
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Courses = ({courses}) => {
 
console.log('course',courses)
   
  return (
    <div>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th>Course Thumbnail</th>
              <th>Course Description</th>
              <th>Course Progress</th>
              <th>Status</th> 
            </tr>
          </thead>
          <tbody>
            {
              courses?.map((course)=>
              <tr>
                <td>
                    <div style={{maxWidth:"75px"}} className=' ' >
                         <img src={course?.thumbnail}  className=' img-thumbnail border-1 border-dark border shadow-sm ' alt="" />
                     </div>
                </td>
                <td>{course.courseName}</td>
                <td>
                   <ProgressBar animated now={course.progressPercentage}  label={`${course.progressPercentage}%`} />                  
                </td>
                <td>
                    {
                      course.progressPercentage===100&&<Link to={`/view-course/${course._id}/${course.courseSection[0]._id}/1/${course.courseSection[0].subSection[0]._id}`}>Completed</Link>
                    }
                    {
                      course.progressPercentage===0&&<Link to={`/view-course/${course._id}/${course.courseSection[0]._id}/1/${course.courseSection[0].subSection[0]._id}`}>Not Started</Link>

                    }
                    {
                      (course.progressPercentage>0&&course.progressPercentage<100)&&<Link to={`/view-course/${course._id}/${course.courseSection[0]._id}/1/${course.courseSection[0].subSection[0]._id}`}>Resume</Link>
                    }
                </td>
              </tr>
              )
            }
          </tbody>
        </table>
    </div>
  )
}

export default Courses