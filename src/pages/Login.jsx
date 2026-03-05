
import Loginn from '../assets/Images/login.jpg'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/operations/authAPI'
import { Link } from 'react-router-dom'

function Login(){
    const [showPassword,setShowPassword]=useState(false)
    const {register,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleFormData=(data)=>{          
        console.log('response from frontend',data)      
        dispatch(login(data.email,data.password,navigate))
    }


    return(
       <div className='d-flex justify-content-center align-items-center' style={{height:"35rem"}}>
            <div class="card  shadow rounded" style={{maxWidth:" 55rem"}}>
                <div class="row g-0">
                    <div class="col-md-6">
                    <img src={Loginn} class="img-fluid " alt="..."  />
                    </div>
                    <div class="col-md-6">
                    <div class="card-body">
                        <div className="">
                    <div className=" text-dark fs-4 fw-bold">Join the millions learning to code with CodeJunction for free</div>
                    <div className="mt-2">
                        <div className=''>Build skills for today, tomorrow and beyond</div>
                        <div className="fst-italic fw-bold text-success">Eduction to future-proof your career</div>
                    </div>
                    <div>
                        <form action="" className="mt-4 d-flex flex-column gap-2" onSubmit={handleSubmit(handleFormData)}>                           
                            <div className="form-group">
                                <label>Email <span className="text-danger">*</span></label>
                                <input type="email" {...register('email',{required:{value:true,message:"*email is required"}})} className="form-control border-1 border-primary border" placeholder='Email Address' />
                                <p className='fs-6 text-thin mt-1 text-danger'>{errors.email?.message}</p>
                            </div>                     
                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input type="password" {...register('password',{required:{value:true,message:"*password is required"
                                }})} className="form-control"  placeholder='Password'/>
                                <p className='mt-1 fs-6 text-thin text-danger'>{errors.password?.message}</p>
                            </div>      
                            <div className="form-group text-end"><Link to='/forgot-password' className='text-decoration-none'>forgot password</Link></div>                    
                            <div className="form-group mt-4">
                                <input type='submit' className="btn btn-warning form-control" value="Sign in" />
                            </div>
                        </form>                        
                    </div>
                </div>
            
                        
                    </div>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default Login