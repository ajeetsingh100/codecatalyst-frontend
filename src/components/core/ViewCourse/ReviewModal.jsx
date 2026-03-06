import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactStars from 'react-stars'
import { apiconnector } from '../../../services/apiconnector'
import { useParams } from 'react-router-dom'
import { Modal } from 'bootstrap'
import { useDispatch } from 'react-redux'
import { createRateAndReview, updateUserReview } from '../../../services/operations/courseAPI'


const ReviewModal = ({reviewEdit,setReviewEdit,editComment,setEditComment}) => {
  const [userRating,setUserRating]=useState(0)
  const dispatch=useDispatch()
  const {handleSubmit,control,register,reset,formState:{errors}}=useForm()
  const {courseID}=useParams()
  const ratingChanged=(rating)=>{
  console.log('rating',rating)
  setUserRating(rating)
 }
 const onFormSubmit= async(data)=>{
  const review=data.review
  const modal=document.getElementById('staticBackdrop5')
  const modalEle=Modal.getOrCreateInstance(modal)

  if(reviewEdit){
   try {
   console.log('api in revie edit1')
     const response= await dispatch(updateUserReview(courseID,userRating,review))
     if(response){
      console.log('api in revie edit2')
      modalEle.hide()
     }
     return 
   } catch (error) {
     console.log(error)
     return 
   }
  }
try {
  console.log('api in create reviw')
    const response = await dispatch(createRateAndReview(courseID,userRating,review))
      if(response){
        modalEle.hide()
        return
      }
  } catch (error) {
    console.log(error)
    return 
  }
 }
 useEffect(()=>{
  const formReset=async()=>{
    const response=await apiconnector('post','https://code-catalyst-backend.onrender.com/api/v1/course/check-user-review',{courseID})
    console.log('review',response.data)
    reset({
      review:response.data.review[0]?.review,
      rating:response.data.review[0]?.rating
    })
    setUserRating(response.data.review[0]?.rating)
    console.log('reviewEdit',reviewEdit)
  }
  formReset()
 },[reviewEdit])

  return (
    <div> 
      <div class="modal fade" id="staticBackdrop5" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 className=' modal-title fs-5' id="staticBackdropLabel">Share you experience</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setReviewEdit(false)}></button>
            </div>
            <div class="modal-body">
              <div className='text-center'>
                  <h5>Rate your course</h5>
                  <form action="" onSubmit={handleSubmit(onFormSubmit)}>
                      <div className='d-flex justify-content-center'>
                        <Controller
                            name="rating"
                            control={control}
                            rules={{
                              validate: (value) =>
                                value > 0 || "Please select rating"
                            }}
                            render={({ field }) => (
                              <ReactStars
                                count={5}
                                value={field.value}
                                onChange={(newRating)=>{
                                  field.onChange(newRating);
                                  setUserRating(newRating)
                                }}
                                size={48}
                                color2="#ffd700"
                              />
                            )}
                          />    
                    </div>
                    <div className='text-start mt-2'>
                        <h6>Write your view</h6>
                        <textarea name="" id="" className='form-control' disabled={editComment} {...register("review",{required:{value:true,message:'please add your comment'}})} rows={4} placeholder='Add your comment...'></textarea>
                        <div className='text-danger text-thin '>{errors.review?.message}</div>
                        <div className='text-danger text-thin'>{errors.rating?.message}</div>
                    </div>
                    <div className='modal-footer'>
                      <button type="submit" class="btn btn-warning">Submit</button>
                      {reviewEdit&&<button type="button" class="btn btn-secondary" onClick={()=>setEditComment(false)}>Edit Review</button> }
                    </div>
                  </form>                  
              </div>             
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal