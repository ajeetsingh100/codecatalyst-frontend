import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CourseInformation from './CourseBuilder/CourseInformation'
import CourseBuilder from './CourseBuilder/CourseBuilder'
import PublishCourse from './CourseBuilder/PublishCourse'
import { setEditCourse,setCourse } from '../../../../../slices/courseSlice'
import { useNavigate } from 'react-router-dom'

const AddCourse = () => {
  const {step,editCourse}=useSelector(state=>state.course)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const steps=[
    {
      id:1,
      title:'Add Info'
    },
    {
      id:2,
      title:'Add Section'
    },
    {
      id:3,
      title:'Publish'
    }
  ]
  function cancelEdit(){
    dispatch(setEditCourse(false))
    dispatch(setCourse(null))
    navigate('/dashboard/my-courses')
  }
  return (
    <div>
      <div className=' container-fluid py-3 d-flex justify-content-center'>
        {/* main-container */}
        <div className=' container row gap-2 py-2 justify-content-center  ' style={{maxWidth:"980px",width:"100%"}}>
          {/* first-flex-item[main container for heading, steps, form]*/}
           <div className=' col-7 d-flex flex-column gap-4 py-3 shadow-lg bg-richblack-800 rounded-3 text-white'>
            <h4>Add Course</h4>
           { editCourse&&<div className='d-flex  justify-content-end'>
                <button type="button" className='btn btn-warning btn-sm' onClick={()=>cancelEdit()}>Cancel Edit </button>
            </div>}
            {/* steps */}
            <div className=' d-flex flex-column  position-relative py-3'>
                <div class="position-relative m-4 ">
                    <div class="progress" style={{height: "1px"}}>
                      <div class={`progress-bar bg-warning ${step===1&&`w-0`} ${step===2&&`w-50`} ${step===3&&`w-100`}` } role="progressbar"></div>
                    </div>
                   {
                    steps.map((stepCount)=>{
                      return(
                        <div className={`
                          position-absolute top-0 translate-middle btn btn-sm rounded-pill
                          ${stepCount.id===1&&`start-0`}
                          ${stepCount.id===2&&`start-50`}
                          ${stepCount.id===3&&`start-100`}
                              ${stepCount.id===1&&step>=1&&`btn-warning`}
                              ${stepCount.id===2&&step>=2?`btn-warning`:`btn-secondary`}
                              ${stepCount.id===3&&step===3?`btn-warning`:`btn-secondary`}
                        `} style={{width:"2rem", height:"2rem"}}>
                              {stepCount.id===1&&1}
                              {stepCount.id===2&&2}
                              {stepCount.id===3&&3}
                        </div>                        
                      )
                    })
                  }
                  
                </div>  
                 <div className='position-relative mx-4 mt-2 '>
                  
                     {
                    steps.map((stepCount)=>{
                      return(
                        <div className={`
                          position-absolute top-0 translate-middle btn btn-sm rounded-pill
                          ${stepCount.id===1&&`start-0`}
                          ${stepCount.id===2&&`start-50`}
                          ${stepCount.id===3&&`start-100`}
                              text-white`}>
                              {stepCount.title}
                        </div>                        
                      )
                    })
                  }  
                </div>
                 
                
            </div> 
           
            {/* form */}
            <div>
             {step===1&& <CourseInformation/>}
             {step===2&& <CourseBuilder/>}
             {step===3&& <PublishCourse/>}             
            </div>
           </div>
           {/* second-flex-item */}
           <div className=' col-5 d-flex flex-column gap-3 bg-richblack-800 rounded-3 text-white px-2 py-2 ' style={{maxWidth:"350px",width:"100%", minHeight:"320px",maxHeight:'320px'}}>
             <div className='d-flex gap-2'>
              <i class="bi bi-lightning-fill text-warning "></i>
              <h5 className='fs-6'>Course Upload Tips</h5>
             </div>
             {/* Tips */}
             <div>
                 <ul className='text-thin d-flex flex-column gap-2 ' style={{fontSize:"12px"}}>
                <li>Set the course Price upotion of make it free.</li>
                <li>Standard size for the course thembanil 1024x576.</li>
                <li>Video section controls teh course overview video.</li>
                <li> Course Builder is where you create & organize a course.</li>
                <li>Add Topics in teh Course Builder secton to create lessons, quizess and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page</li>
                <li>Mains Announcement to notfiy any important.</li>
                <li>Notes to all enrolled students at once.</li>
              </ul>
             </div>
           </div>
        </div>
      </div>
    </div>

  )
}

export default AddCourse