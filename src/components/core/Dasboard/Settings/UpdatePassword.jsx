import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../../../services/operations/settingsAPI'

const UpdatePassword = () => {
  const {register,handleSubmit,reset}=useForm()
  const dispatch=useDispatch()
  function handleFormData(formData){
    dispatch(changePassword(formData))
    reset()
  }
  return (
    <div>
      <div className='text-white rounded-5 bg-richblack-900 px-4 py-3'>
          <div>
            <form action="" onSubmit={handleSubmit(handleFormData)}>
              <div className='row col-gap-2'>
                <div className="form-group col-6">
                  <label htmlFor="new-password">New Password</label>
                  <input type="password" name="" className='form-control'{...register('newPass')} id="" />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="new-password">Confirm Password</label>
                  <input type="password" name="" className='form-control' {...register('confirmPass')} id="" />
                </div>
              </div>
              <button className='btn btn-warning mt-3'>Change Password</button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default UpdatePassword