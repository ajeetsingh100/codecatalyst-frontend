import React, {  useState } from 'react'
import {  useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSection, updateSection } from '../../../../../../services/operations/courseAPI'
import NestedView from './NestedView'
import SubSectionModalForm from './SubSectionModalForm'
import { setEditCourse, setEditSection, setStep } from '../../../../../../slices/courseSlice'
import ConfirmationModel from './ConfirmationModel'

const CourseBuilder = () => {
  const {register,handleSubmit,reset}=useForm()
  const [sectionID,setSectionID]=useState()
  const [subSectionID,setSubSectionID]=useState()
  
  const {editSection,course}=useSelector(state=>state.course)
  const dispatch=useDispatch()

  /*HANDLE FORM DATA*/
  function handleFormData(data) {
    const formData=new FormData()
    if(editSection){      
      formData.append("courseID",course._id)
      formData.append('sectionID',sectionID)
      formData.append('sectionName',data.sectionName)
      dispatch(updateSection(formData))
      reset({
        sectionName:''
      })
      dispatch(setEditSection(false))
      console.log('code after reset()')
      return
    }
    formData.append('courseID',course._id)
    formData.append("sectionName",data.sectionName)
    console.log(course)
    dispatch(createSection(formData))
    reset()
  }


  /*HANDLE CANCEL EDIT*/
  function handleCancelEdit(){
    dispatch(setEditSection(false))
    console.log('cancel edit')
    reset({
      sectionName:''
    })

 }

  /*HANDLE BACK*/
  function handleBack(){
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }
  return (
    <div>
        <div className='d-flex flex-column gap-3'>
          <div>
            {/* section form */}
             <form action="" onSubmit={handleSubmit(handleFormData)}>
                <div className='row'>
                  {/* create section input field */}
                  <div className='form-group col-12'>
                    <label className='form-label'>Section Name</label>
                    <input type="text" name="" {...register('sectionName')} className='form-control' id="" />              
                  </div>
                  <div className="form-group mt-3">
                      <button className='btn border-warning text-yellow-300'>
                          {
                            editSection?'Edit Section Name':'Create Section'                       
                          }                            
                          {
                            editSection?<span className='bi bi-pencil ms-2'></span>:<span className='bi bi-plus-circle ms-2'></span>
                          }
                      </button>
                      {
                        editSection&&<button type='button' className='btn btn-link text-richblack-300' style={{fontSize:"14px"}} onClick={handleCancelEdit}>Cancel Edit</button>
                      }
                  </div>
                </div>
             </form>
          </div>
          {/* nested view */}
          
            <NestedView reset={reset} setSectionID={setSectionID} setSubSectionID={setSubSectionID}/>          
            <SubSectionModalForm  sectionID={sectionID} subSectionID={subSectionID}/>
            <ConfirmationModel sectionID={sectionID} subSectionID={subSectionID}/>
             <div className='d-flex justify-content-between'>
               <button className='btn btn-warning' type='button' onClick={handleBack}><span className='bi bi-chevron-left'></span>Go Back </button>
               <button type='button' className='btn btn-warning ' onClick={()=>dispatch(setStep(3))}>Next <span className='bi bi-chevron-right '></span></button>
             </div>
        </div>
    </div>
  )
}

export default CourseBuilder