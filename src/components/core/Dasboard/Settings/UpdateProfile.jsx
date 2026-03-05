import React, { useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../../services/operations/settingsAPI'

const UpdateProfile = () => {
  const {register,handleSubmit,reset}=useForm()
   const {user}=useSelector((state)=>state.profile)
   const dispatch=useDispatch()
   const handleFormData=(data)=>{
    dispatch(updateProfile(data))
   }
   

  useEffect(()=>{   
    if(user){
      reset({
        firstName:user.firstName||'',
        lastName:user.lastName||'',
        dateOfBirth:user.additionalDetails.dateOfBirth||'',
        gender:user.additionalDetails.gender||'',
        about:user.additionalDetails.about||'',
        contactNo:user.additionalDetails.contactNo||'',
      }
  )}
  },[])
  return (
    <div>
      <div className=' bg-richblack-900 rounded-5 text-white py-3 px-4'>
        <h3>Profile Information</h3>
        <div>
          <form action="" onSubmit={handleSubmit(handleFormData)} >
            <div className='row'>
                <div className='form-group col-6'>
                  <label htmlFor="firstName" >First Name </label>
                  <input type="text" name="" id="firstName" className='form-control' {...register('firstName')} />              
                </div>              
                <div className='form-group col-6'>
                  <label htmlFor="lastName" >Last Name </label>
                  <input type="text" name="" id="firstName" className='form-control beautiful-input'  {...register('lastName')} />                 
                </div>
                <div className='form-group col-4'>
                  <label htmlFor="lastName" >Gender </label>
                  <select name="" id="" className='form-control' {...register('gender')}>
                    <option value={'Male'}>Male</option>
                    <option value={'Female'}>Female</option>
                  </select>                 
                </div>
                <div className='form-group col-4'>
                  <label htmlFor="dateOfBirth" >Date of Birth </label>
                  <input type="date" name="" id="dateOfBirth" className='form-control'  {...register('dateOfBirth')} />                 
                </div>
                <div className='form-group col-4'>
                  <label htmlFor="contactNo" >Contact Number </label>
                  <input type="tel" name="" id="dateOfBirth" className='form-control'  {...register('contactNo')} />                 
                </div>           
                <div className='col'>
                    <label htmlFor="about">About</label>
                   <textarea name="" id="" className='form-control'  {...register('about')}></textarea>
                </div>
            </div>
            <button className='btn btn-warning mt-3'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile