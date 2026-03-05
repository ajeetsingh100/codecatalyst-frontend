import React, { useState } from 'react'
import { deleteSection, deleteSubSection } from '../../../../../../services/operations/courseAPI'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'bootstrap'
import { closeConfirmation } from '../../../../../../slices/confirmationSlice'

const ConfirmationModel = () => {

   const {course}=useSelector(state=>state.course)
   const {actionType,ids}=useSelector(state=>state.confirm)
   const dispatch=useDispatch()

  function closeModal(){
    const modalElement=document.getElementById('exampleModal')
    const modal=Modal.getOrCreateInstance(modalElement)
    modal.hide()
  }
  function CTADeleteSection(){
    console.log('CTADeleteSection:',ids.sectionID)
    dispatch(deleteSection(course._id,ids.sectionID))
    dispatch(closeConfirmation())
    closeModal()
     
  }
  
  function CTADeleteSubSection(){
    console.log('CTADeletSubSection:',ids.sectionID,ids.subSectionID)
    dispatch(deleteSubSection(course._id,ids.sectionID,ids.subSectionID))
    dispatch(closeConfirmation())
    closeModal()  
   }
  return (
    <div>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog show">
              <div className="modal-content show ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" className='text-danger fs-6'><span className='bi bi-exclamation-octagon text-danger fs-5'> </span> {actionType} Delete Warning</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Are you sure you want to delete?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" onClick={actionType==='Section'?CTADeleteSection:CTADeleteSubSection}>Delete <span className='bi bi-trash'></span></button>
                  <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Close</button>              
                </div>
            </div>
          </div>
      </div>    
  </div>
  )
}


export default ConfirmationModel