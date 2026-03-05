import React, { useEffect, useState } from 'react'
import { useForm ,Controller} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Requirement from '../Requirement'
import CourseTags from '../Tags'
import { addCourse, updateCourse } from '../../../../../../services/operations/courseAPI'
import { apiconnector } from '../../../../../../services/apiconnector'
import FileUpload from './FileUpload'
import { setStep,setEditCourse } from '../../../../../../slices/courseSlice'
import { convertToTitleCase } from '../../../../../common/Navbar'




const CourseInformation = () => {
  
  const [categories,setCategories]=useState([])
  
  const dispatch=useDispatch()
  const {reset,handleSubmit,register,formState:{errors,dirtyFields},control}=useForm()
  const {editCourse,course}=useSelector(state=>state.course)
  
  useEffect(()=>{
    console.log('course',course)
    if(editCourse&&categories.length>0){
      reset({       
      ...course,
      category:course.category._id,
      thumbnail:course.thumbnail
      }) 
      if(!editCourse){
        reset()
      }     
    
    }
  },[editCourse,categories])
  
  function handleFormData(form){
    console.log(form)
    const formData=new FormData()
    if(editCourse&&Object.keys(dirtyFields).length!==0){
      const updates={}
      Object.keys(dirtyFields).forEach(key=>{
        if(key!=='thumbnail')
          updates[key]=form[key]
      })
      formData.append('updates',JSON.stringify(updates))
      formData.append('courseId',course._id)
      formData.append('thumbnail',form.thumbnail)
      dispatch(updateCourse(formData))
      return
      
    }

   
    formData.append('courseName',form.courseName)
    formData.append("courseDescription",form.courseDescription)
    formData.append("whatYouWillLearn",form.whatYouWillLearn)
    formData.append("price",form.price)
    formData.append("tags",JSON.stringify(form.tags))
    formData.append("instructions",JSON.stringify(form.instructions))
    formData.append("category",form.category)
    formData.append('thumbnail',form.thumbnail)
    formData.append("status",'draft')
    dispatch(addCourse(formData))
    
  }

  async function fetchAllCatgories(){
    console.log('before api call')
     const response=await apiconnector('GET','https://code-catalyst-wkk9.onrender.com/api/v1/course/show-all-categories')
     console.log('after api call')
     console.log('response for category',response.data)
         
     setCategories(response.data.allCategory)

  }
  function handleDirty(){ 
    console.log(dirtyFields)
  }
  function handleNext(){
    dispatch(setStep(2))
    dispatch(setEditCourse(false))
  }

  useEffect(()=>{
   fetchAllCatgories()
  },[])
  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleFormData)} noValidate class='needs-validation'>
        <div className='row row-gap-2'>
          {/* course title */}
          <div className='form-group col-12'>
            <label htmlFor="" className='form-label'>Course Title</label>
            <input type="text" name="" className='form-control' id=""{...register('courseName')}  />
           
          </div>
          {/* course description */}
          <div className='form-group col-12'>
            <label htmlFor="">Course Short Description</label>
            <textarea   className="form-control"rows={4} cols={3} {...register('courseDescription')}></textarea>
          </div>
          <div className='form-group col-12'>
            <lable className="form-label">Course Price</lable>
            <input type="text" name="" id="" className='form-control' {...register('price')}/>
          </div>
          <div className='form-group col-12'>
            <lable className="form-label">Choose Category</lable>
            <select name="" id="" className='form-control' {...register('category')}>
              <option value="">Choose a Catgory</option>
              {
                categories?.map((category)=>
                  <option value={category._id}>{convertToTitleCase(category.categoryName)}</option>
                )
              }
              
            </select>
          </div>
          <div className='form-group col-12'>
            {/* <CourseTags name={"tags"} setValue={setValue} register={register}/> */}
            <Controller
              name='tags'
              control={control}
              defaultValue={course?.tags||[]}
              render={({field})=><CourseTags value={field.value} onChange={field.onChange}/>}
            />
          </div>
          {/* <div className='form-group col-12'>
            <lable className="form-label">Course Thumbnail</lable>
            <input type='file' {...register('image')}/>
          </div> */}
          <div className='form-group col-12'>
            <Controller
              name='thumbnail'
              control={control}              
              render={({field})=><FileUpload value={field.value} onChange={field.onChange} accept={{"image/jpeg":[],"image/jpg":[],"image/png":[]}}/>}
            />

          </div>
          <div className='form-group col-12'>
            <lable className="form-label">Benefits of the course</lable>
            <textarea className='form-control' rows={4} cols={3} {...register('whatYouWillLearn')}></textarea>
          </div>
           <div className='form-group col-12'>
            {/* <Requirement name={'instructions'} register={register} setValue={setValue} watch={watch}/> */}
            <Controller
              name='instructions'
              control={control}
              defaultValue={course?.instructions||[]}
              render={({field})=><Requirement value={field.value} onChange={field.onChange}/>}
            />
          </div>
          <div className='form-group d-flex justify-content-end mt-3'>
             {
              editCourse?
                  Object.keys(dirtyFields).length!==0?
                      <button  className='btn btn-warning'>Save & Next</button>:
                      <button type='button' onClick={handleNext} className='btn btn-primary'>Next<span className='bi bi-chevron-right me-1'></span></button>
                  :<button className='btn btn-warning'>Save & Next</button>
             }
              
          </div>
             {/* <button type="button" onClick={handleDirty}>Show Dirty Fields</button> */}
             {/* <button type="button" onClick={()=>dispatch(setEditCourse(true))}>EditCourse</button> */}
        </div>
      </form>
    </div>
  )
}

export default CourseInformation