
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../../services/operations/courseAPI'
import FileUpload from './FileUpload'
import {setEditSubSection } from '../../../../../../slices/courseSlice'
import { useEffect } from 'react'
import { Modal } from 'bootstrap'
import { setOpen} from '../../../../../../slices/confirmationSlice'

const SubSectionModalForm = ({sectionID,subSectionID}) => {
  const {handleSubmit,register,control,reset}=useForm()
  const {course,editSubSection}=useSelector(state=>state.course)
  const {isOpen,view}=useSelector(state=>state.confirm)
  const dispatch=useDispatch()
    const handleFormData= async(data)=>{      
        const formData=new FormData()
         const modalElement=document.getElementById('staticBackdrop')
         const modal=Modal.getOrCreateInstance(modalElement)
        
        if(editSubSection){
          formData.append('courseID',course._id)
          formData.append('subSectionID',data._id)
          formData.append('title',data.title) 
          formData.append('video',data.video)
          formData.append('description',data.description)
          try {
          await dispatch(updateSubSection(formData))   
          dispatch(setEditSubSection(false))
          modal.hide()     
          return
          } catch (error) {
            console.log(error)
          }
          
        }
        formData.append('title',data.title)
        formData.append('description',data.description)
        formData.append('sectionID',sectionID)
        formData.append('video',data.video)
        try {
        await dispatch(createSubSection(course,formData))
        modal.hide() 
        dispatch(setOpen(false))
        } catch (error) {
          console.log(error)
        }
       
       
    }
    function fetchSubSection(sectionID,subSectionID){
      //console.log(`sectionID ${sectionID} subSectionID ${subSectionID}`)
      const section=course?.courseSection.find(section=>section._id===sectionID)
      const subSection=section?.subSection?.find(subSection=>subSection._id===subSectionID)
     // console.log(`fetched section ${section?.subSection} fetch subSection ${subSection}`)
      return subSection
    }
    useEffect(()=>{
      if(editSubSection){
        const subSection=fetchSubSection(sectionID,subSectionID)
       // console.log('fetched subSection',subSection)
        if(subSection){
            reset({
            ...subSection,
            video:subSection.videoUrl
          })
        }//subsection checked
        
      }//editsubsection checked

      
    },[editSubSection])
    useEffect(()=>{
       console.log(`isOpen: ${isOpen}`)
      if(isOpen){       
        reset({
          title:'',
          description:'',
          video:''
        })
      }
    },[isOpen])
    function display() {
      console.log(sectionID)
    }
    function handleClose(){
      console.log('view from handlClose',isOpen)
      dispatch(setEditSubSection(false))
      dispatch(setOpen(false))
      
    
    }

  return (
    <div>
       
        <div class="modal fade"  id='staticBackdrop'>
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    {/* header */}
                    {/* <div className="btn" onClick={display} >display</div> */}
                    <div class="modal-header">                      
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Sub Section</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>                     
                    </div>
                    {/* body */}
                    <div class="modal-body">
                       <form action="" onSubmit={handleSubmit(handleFormData)}>
                            <div className='row row-gap-3'>
                                {/* sub section name */}
                                <div className="form-group col-12">
                                    <label htmlFor="" className='form-label'>Sub Section Name</label>
                                    <input type="text" name="" id="" className='form-control' disabled={view} {...register('title')}/>
                                </div>
                                {/* sub section description */}
                                <div className="form-group col-12">
                                    <label htmlFor="" className='form-label'>Sub Section Description</label>
                                    <input type="text" name="" id="" className='form-control' disabled={view} {...register('description')}/>
                                </div>
                                {/* video */}
                                <div className="form-group col-12 text-white">
                                     <Controller
                                        name='video'
                                        control={control}                                   
                                        render={({field})=><FileUpload value={field.value} onChange={field.onChange} accept={{'video/mp4':[]}}/>}
                                        />          
                                </div>
                                {/* button */}
                                <div className="form-group col-12 mt-3">
                                  {
                                   view?'':editSubSection?<button className='btn btn-primary'>Edit Sub Section</button>:<button className='btn btn-warning'>Create Sub Section</button>
                                  }  
                                </div>
                            </div>
                       </form>
                    </div>
                </div>
             </div>
          </div>
    </div>
  )
}

export default SubSectionModalForm