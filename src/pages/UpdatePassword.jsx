import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { useState } from 'react'



const UpdatePassword = () => {
  const {register,handleSubmit}=useForm()
  const dispatch=useDispatch()
  const [passChange,setPassChange]=useState(false)
  const {token}=useParams()
  const {loading}=useSelector((state)=>state.auth)
  const handleFormData=(data)=>{
    const {pass,confirmPass}=data
    dispatch(resetPassword(pass,confirmPass,token,setPassChange))
  }
  return (
    <div>
      <div className='container-fluid '>
        <div className='container w-50 d-flex justify-content-center  align-items-center' style={{minHeight:"500px"}}>
          <div className='container w-50'>
            {passChange?
            <div>
              <div className='d-flex flex-column gap-2'>
                <h4 className='text-success'>Your password has been changed successfully!!!</h4>
                <Link to="/login" className='text-decoration-none '><span className='bi bi-arrow-left-circle'></span> Back to login</Link>
              </div>
            </div>:
            <div>
                <div>
                  Almost done. Enter your new password and you're all set.     
                </div>
                <div className=' mt-3'>
                  <form onSubmit={handleSubmit(handleFormData)}>
                    <div className="row row-gap-2">
                        <div className="form-group col-12">
                          <label htmlFor="new-password" className='form-label'>New Password *</label>
                          <input type="password" name="" className='form-control' id="new-password" {...register('pass')} />
                        </div>
                        <div className="form-group col-12">
                          <label htmlFor="new-password" className='form-label'>Confirm New Password*</label>
                          <input type="password" name="" className='form-control' id="new-password" {...register('confirmPass')} />
                        </div>
                        <div className='form-group col-12 mt-2'>
                          <button className='btn btn-warning form-control'>Reset Password</button>
                        </div>
                      </div>
                  </form>
                </div>
              </div>              
              }
          </div>
       </div>  
      </div>      
  </div>
  )
}

export default UpdatePassword