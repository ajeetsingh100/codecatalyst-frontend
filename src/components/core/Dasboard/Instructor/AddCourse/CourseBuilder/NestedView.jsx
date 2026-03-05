import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {  setEditSection, setEditSubSection } from '../../../../../../slices/courseSlice'
import {openConfirmation, setOpen, setView} from '../../../../../../slices/confirmationSlice'
import { Modal } from 'bootstrap'


const NestedView = ({reset,setSectionID,setSubSectionID}) => {
    const {editSubSection,course}=useSelector(state=>state.course)
    const {isOpen,view}=useSelector(state=>state.confirm)
    const dispatch=useDispatch()

   
    /*HANDLES SECTION EDIT EVENT*/
    function handleSectionEdit(sectionID){
        dispatch(setEditSection(true))
        
        console.log('reponse from nested view',course)
        const selectedSection=course.courseSection?.find(section=>section._id===sectionID)
        setSectionID(selectedSection._id)
        reset({
            sectionName:selectedSection.sectionName
        })
    }

    /*HANDLE SECTION DELETE EVENT*/
    function handleSectionDelete(sectionID){        
        dispatch(openConfirmation({
            actionType:'Section',
            ids:{
                'sectionID':sectionID
            }
        }))

    }
    
    /*HANLDE SUBSECTION EDIT EVENT*/
    function handleSubSectionEdit(sectionID,subSectionID){   
       setSubSectionID(subSectionID)  
       const modalElement = document.getElementById('staticBackdrop');
       const modal = Modal.getOrCreateInstance(modalElement);    
       modal.show()
       handleAddNewSection(sectionID)   
       dispatch(setEditSubSection(true))
       dispatch(setView(false))
       console.log(view)
       dispatch(setOpen(false))
       dispatch(setView(false))
      

    }
    function handleAddNewSection(sectionID){
        setSectionID(sectionID)
        console.log('view value from handleAddNewSection:',isOpen)
        dispatch(setOpen(true))
        dispatch(setView(false))
      
    }
  
    /*HANLDE SUBSECTION DELETE EVENT*/
    function handleSubSectionDelete(sectionID,subSectionID){
        dispatch(openConfirmation({
            actionType:'SubSection',
            ids:{
                'sectionID':sectionID,
                'subSectionID':subSectionID
            }
        }))
    }
    /*HANDLE SUBSECTION VIEW EVENT */
    function handleSubSectionView(sectionID,subSectionID){
      
       const modalElement = document.getElementById('staticBackdrop');
       const modal = Modal.getOrCreateInstance(modalElement);    
       modal.show()
       setSectionID(sectionID)
       setSubSectionID(subSectionID)  
       dispatch(setEditSubSection(true))
       dispatch(setView(true))
       dispatch(setOpen(false))
    }
  return (
    <div>
       
        {
            course.courseSection.map(section=>
             <div key={section._id} className="accordion " id={`${section._id}`}>
                <div class="accordion-item">
                    <h2 class="accordion-header d-flex justify-content-between ">
                         <div className='fs-5 px-2 py-2'>
                            {section.sectionName}  
                        </div>                          
                       <div className='btn-group px-3'>
                          <button className='btn btn-sm btn-link' type="button" onClick={()=>handleSectionEdit(section._id)}><span className='bi bi-pencil text-dark'></span></button>
                          <button className='btn btn-sm btn-link' type="button" onClick={()=>handleSectionDelete(section._id)} data-bs-toggle="modal"  data-bs-target="#exampleModal"><span className='bi bi-trash text-danger'></span></button>
                          <button className='collapsed btn btn-sm btn-link shadow-none p-0 ' type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${section._id}`} >
                            <span className='bi bi-caret-down'></span>
                          </button>
                       </div>
                    
                    </h2>
                    <div  id={`collapse-${section._id}`} className="accordion-collapse collapse"  data-bs-parent={`#${section._id}`}>
                        <div class="accordion-body">
                            {section.subSection.map(subSection=>
                                <div className='accordion' id={`${subSection._id}`}>
                                    <div className='accordion-item'>
                                        <h2 className='accordion-header d-flex justify-content-between'>    
                                            <div className='fs-6'>
                                                {subSection.title}
                                            </div> 
                                            <div>
                                                <button type='button' className='btn btn-link btn-sm' onClick={()=>handleSubSectionEdit(section._id,subSection._id)}><span class='bi bi-pencil text-dark'></span></button>
                                                <button type='button' className='btn btn-link btn-sm' onClick={()=>handleSubSectionDelete(section._id,subSection._id)}  data-bs-toggle="modal"  data-bs-target="#exampleModal"><span class='bi bi-trash text-danger'></span></button>
                                                <button type="button" className='btn btn-link btn-sm'onClick={()=>handleSubSectionView(section._id,subSection._id)} ><span class='bi bi-eye'></span></button>
                                                <button className=' collapsed btn btn-link btn-sm' type='button' data-bs-toggle='collapse' data-bs-target={`#sub-${subSection._id}`}><span className='bi bi-caret-down'> </span></button>
                                            </div>

                                           
                                        </h2>
                                    </div>
                                    <div id={`sub-${subSection._id}`} className="accordion-collapse collapse" data-bs-parent={`#${subSection._id}`}>
                                        <div class="accordion-body">
                                            {
                                                subSection.description
                                            }
                                            {
                                                <video src={subSection.videoUrl} style={{height:'200px',width:"200px"}}></video>
                                            }
                                        </div>
                                    </div>
                            </div>)}                              
                            <span className="text-yellow-300" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>handleAddNewSection(section._id)}>Add Sub Section</span>
                        </div>
                    </div>
                </div>
            </div>  
            )
        }
       <span ></span>
             
         
    </div>
    // modal
  
  )
}

export default NestedView