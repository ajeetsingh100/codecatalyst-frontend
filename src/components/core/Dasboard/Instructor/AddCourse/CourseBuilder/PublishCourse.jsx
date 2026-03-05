import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { changeCourseStatus } from '../../../../../../services/operations/courseAPI'
import { useNavigate } from 'react-router-dom'

const PublishCourse = () => {
  const {course}=useSelector(state=>state.course)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {register,handleSubmit}=useForm()
  const handleFormData=async (data)=>{
    if(data.isChecked){
      const formData=new FormData()
      const updates={
        "status":"published"
      }
      formData.append('updates',JSON.stringify(updates))
      formData.append('courseId',course._id)
      try {
         const status=await dispatch(changeCourseStatus(formData))
         if(status){
          navigate('/dashboard/my-courses')
         }
      } catch (error) {
        console.log(error.response.data)
      }     
    }
  }
  return (
    <div>
        <div>
          <form action="" onSubmit={handleSubmit(handleFormData)}>
            <div className="row row-gap-4">
              <div className="form-group col-12 text-center">               
                <input type="checkbox" className='me-2' name=""{...register('isChecked')} id="" />
                <label>Make my course public to all</label>
              </div>
             <div className="form-group col-12 d-flex justify-content-end">
               <button className="btn btn-warning">Publish</button>
             </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default PublishCourse