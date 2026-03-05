
import SignUpp from '../assets/Images/signup.jpg'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector} from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { sendOTP} from '../services/operations/authAPI'
import { setSignUpData } from '../slices/authSlice'
import Loader from '../components/common/Loader'


function Signup(){
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setConfirmPassword]=useState(false)
    const {loading}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {register,handleSubmit,formState,watch}=useForm()
    const {errors}=formState
    const handleFormData=(data)=>{
        dispatch(setSignUpData(data))
        dispatch(sendOTP(data.email,navigate))
        
    }
    
    return(
        <div> {loading?
            <Loader/>
         :
           <div className="container mx-auto row mt-4 border-1 border rounded shadow p-3" style={{maxWidth:"65rem"}}>
            <div className="col-6">
                <div>
                    <div className=" text-dark fs-4 fw-bold">Join the millions learning to code with CodeJunction for free</div>
                    <div className="mt-2">
                        <div className=''>Build skills for today, tomorrow and beyond</div>
                        <div className="fst-italic fw-bold text-success">Eduction to future-proof your career</div>
                    </div>
                    <div>
                        <form action="" className="mt-4 d-flex flex-column gap-2" onSubmit={handleSubmit(handleFormData)}>
                            <div className="row">
                                <div className="form-group col-6">
                                <label>First Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control border-1 border-primary border" {...register('firstName',{required:{value:true,message:'*first name is required'}})} placeholder='First name' />
                                <span className='text-danger small'>{errors.firstName?.message}</span>
                            </div>                        
                            <div className="form-group col-6">
                                <label>Last Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control border-1 border-primary border"{...register('lastName',{required:{value:true,message:'*last name is required'}})} placeholder='Last name'/>
                                <span className='text-danger small'>{errors.lastName?.message}</span>
                            </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" className="form-control" {...register('email',{required:{value:true,message:'*email is required'}})} placeholder='Email'/>
                                <span className='text-danger small'>{errors.email?.message}</span>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='accountType'>Role</label>
                                <select className='form-control' id='accountType' {...register('accountType',{required:{value:true,message:"*select a role!!!"}})}>
                                    <option value="">--select your role--</option>
                                    <option value={'student'}>Student</option>
                                    <option value={'instructor'}>Instructor</option>
                                </select>
                            </div>
                            <span className='text-danger small'>{errors.accountType?.message} </span>
                            <div className="d-flex gap-2 form-group">
                                <div>
                                    <label>Password <span className="text-danger">*</span></label>
                                    <div className='input-group'>
                                          <input type={`${showPassword?'text':'password'}`} className="form-control" {...register('password',{required:{value:true,message:'*password is required'}})}  placeholder='Password'/>
                                          <input type="checkbox" className={`btn-check`} id='eye'  onChange={()=>setShowPassword((prev)=>!prev)}/>
                                                <label htmlFor="eye" className={`btn btn-warning`}>
                                                <span className={`${showPassword?'bi bi-eye':'bi bi-eye-slash'}`}></span>
                                                </label>
                                     </div>  
                                     <span className='text-danger small'>{errors.password?.message}</span>                            
                                  
                                </div>                                
                                <div>
                                    <label>Confirm Password <span className="text-danger">*</span></label>
                                     <div className='input-group'>
                                          <input type={`${showConfirmPassword?'text':'password'}`} className="form-control" {...register('confirmPassword',{validate:{checkConfirmPass:(value)=>value===watch('password')||'*password and confirm password do not match'}})} placeholder='Password'/>
                                          <input type="checkbox" className={`btn-check`} id='confirm-eye'  onChange={()=>setConfirmPassword((prev)=>!prev)}/>
                                                <label htmlFor="confirm-eye" className={`btn btn-warning`}>
                                                <span className={`${showConfirmPassword?'bi bi-eye':'bi bi-eye-slash'}`}></span>
                                                </label>
                                          
                                     </div> 
                                     <span className='text-danger small'>{errors.confirmPassword?.message}</span>                                   
                               </div>                            
                            </div>
                            <div className="form-group mt-4">
                                <input type='submit' className="btn btn-warning form-control" value="Create Account" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div>
                    <img src={SignUpp}  className='img-fluid' alt="" />
                </div>
            </div>
                
           </div>
            }
        </div>
    )
}

export default Signup