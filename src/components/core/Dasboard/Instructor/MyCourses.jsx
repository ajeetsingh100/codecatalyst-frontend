import React, { useEffect, useState } from 'react'
import { apiconnector } from '../../../../services/apiconnector'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setEditCourse,setCourse } from '../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { Modal } from 'bootstrap'

const MyCourses = () => {
  const [courses,setCoursePage]=useState([])
  const [deleteCourseID,setDeleteCourseID]=useState(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  function redirectToAddCourse(){
    navigate('/dashboard/add-course')
  }
   async function loadCourse(courseID){
     const response=await apiconnector('POST','https://code-catalyst-wkk9.onrender.com/api/v1/course/load-course',{courseID})
     console.log('load course for edit',response.data.course)
     dispatch(setCourse(response.data.course))
     dispatch(setEditCourse(true))
     navigate('/dashboard/add-course')
  }
  async function deleteCourse(){
    console.log(deleteCourseID)
    const response= await apiconnector('DELETE','https://code-catalyst-wkk9.onrender.com/api/v1/course/delete-course',{courseID:deleteCourseID})
    if(response.data.success){
        const modalElement=document.getElementById('exampleModal')
        const modal=Modal.getOrCreateInstance(modalElement)
        modal.hide()
    }
    toast.success('Course deleted successfully')
    fetchallCourse()
}
    const fetchallCourse=async()=>{
        const response=await apiconnector('GET','https://code-catalyst-wkk9.onrender.com/api/v1/course/get-instructor-courses')  
        console.log(response.data)
        if(response.data.instructorCourses.length===0){
        console.log('line executed')
        setCoursePage([])
        }
        
        setCoursePage(response.data.instructorCourses)
    }
 function setCourseToDelete(courseID){
    setDeleteCourseID(courseID)
 }

  useEffect(()=>{
    
fetchallCourse()
  },[])
  return (
    <div>
        <div className='container-fluid '>
            <div className='container mt-4'>
              {/* page header */}
                <header>
                    <h3>My Courses</h3>
                </header>
                {/* CTA Section */}
                <div className=' d-flex justify-content-between'>
                  {/* tab */}
                    <div>
                        <ul className='nav nav-underline'>
                            <li className='nav-item'><a href="#" className='nav-link active'>Published Course</a></li>
                            {/* <li className='nav-item'><a href="#" className='nav-link'>Draft Course</a></li> */}
                        </ul>
                    </div>
                    {/* CTA Button,Filter,Search */}
                    <div> 
                        <button type="button" className='btn btn-sm btn-warning' onClick={()=>redirectToAddCourse()}><span className='bi bi-plus'>Add Course</span></button>
                    </div>
                </div>
                {/* table */}
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Course</td>
                            <td>Duration</td>
                            <td>Price</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          courses?.map(course=>
                             <tr key={course?._id}>
                                <td>
                                  {/* course body */}
                                    <div className='d-flex gap-2'>
                                      {/* course thumbnail */}
                                        <div style={{maxWidth:"200px"}} className=' ' >
                                           <img src={course?.thumbnail}  className=' img-thumbnail border-2 border-dark border shadow-sm ' alt="" />
                                        </div>
                                        {/* course information */}
                                        <div>
                                            {/* cours head */}
                                            <h4>
                                                {course?.courseName}
                                            </h4>
                                            <div>
                                                {course?.description}
                                            </div> 
                                            {/* course status */}
                                            <div>
                                                {course?.status}
                                            </div>                                         
                                        </div>
                                    </div>                                    
                                </td>
                                <td>
                                    {course.totalCourseDuration}
                                </td>
                                <td>
                                    {course.price}
                                </td>
                                <td>
                                   <button type="button" className='btn btn-sm btn-primary' onClick={()=>loadCourse(course._id)}><span className='bi bi-pencil-square'></span>Edit</button>
                                   <button type="button" className='btn btn-sm btn-danger ms-1' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setCourseToDelete(course._id)} ><span className='bi bi-trash' ></span> Delete</button>
                                </td>
                            </tr>)}
                        
                    </tbody>
                </table>
            </div>
        </div>
        {/* delete model */}
      


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel"><span className="bi bi-exclamation-octagon text-danger fw-bold"></span> Course Delete Confirmation</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure want to delete the course?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" onClick={()=>deleteCourse()}><span className='bi bi-trash'></span> Delete</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    
                </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default MyCourses