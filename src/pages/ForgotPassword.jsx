import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetPasswordToken} from '../services/operations/authAPI'

const ForgotPassword = () => {
    const [sentEmail,setSentEmail]=useState(false)
    const [email,setEmail]=useState('')
    const {loading}=useSelector((state)=>state.auth)
    const {register,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch()
    function handleFormData(data){
        dispatch(resetPasswordToken(data.email,setSentEmail,setEmail))   
     }

  return (
    <div>
        {loading?<span></span>:
        <div className='container-fluid'>
            <div style={{minHeight:"500px"}}className="container  w-50  d-flex  justify-content-center align-items-center">
                <div className='container w-75 rounded-1 shadow p-3 row row-gap-3'>
                    {
                        !sentEmail?(
                            <div className='text-dark fw-bold fs-4 col-10'>
                                Reset your password
                            </div>
                        ):(
                            <div className='text-dark fs-4 fw-bold col-10'>
                                Check email
                            </div>
                        )
                    }
                    {
                        !sentEmail?(
                            <div className='text-secondary-emphasis col-10'>
                                Have no fear we'll email you instuctions to reset
                                your password. if you don't have access to your
                                email we can try account recovery
                            </div>
                        ):(
                            <div className='text-secondary-emphasis col-10'>
                                we have sent the reset email to {email}
                                
                            </div>
                        )
                    }
                    
                        <div className='col-10'>
                                <form onSubmit={handleSubmit(handleFormData)} className='d-flex flex-column gap-3'>
                                {
                                    !sentEmail&&(
                                    <div className='form-group'>
                                        <label htmlFor="email" className='form-label' >Email address</label>
                                    <input type="email" name="" {...register('email',{required:{value:true,message:"*email is required to send reset email"}})}className='form-control' placeholder='enter your email' id="" />
                                    <p className='fs-6 text-danger text-thin'>{errors.email?.message}</p>
                                   </div>
                                    )
                                }
                                    <div className='form-group mt-2'>                                    
                                        {
                                            !sentEmail?(<button className='btn btn-warning form-control'>Send Email</button>):(<button className='btn btn-warning form-control'>Resend Email</button>)
                                        }
                                    </div>
                                    
                            </form>
                            </div>
                        
                    
                    <Link to='/login' className='text-decoration-none d-flex gap-2'><span className='bi bi-arrow-left-circle'></span>Back to login</Link>
                </div>
            </div> 
        </div>
    }
    </div>
    
  )
}

export default ForgotPassword