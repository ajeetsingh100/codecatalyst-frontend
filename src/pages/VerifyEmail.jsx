import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signUp } from '../services/operations/authAPI'
import { sendOTP } from '../services/operations/authAPI'

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const {signUpData}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleFormData=(e)=>{
        e.preventDefault()
        dispatch(signUp(signUpData,otp,navigate))        
    }
    useEffect(()=>{
        if(!signUpData){
            navigate('/signup')
        }
    },[])
    
  return (
    <div>
        <div className='container-fluid '>
            <div className='container w-50 d-flex justify-content-center  align-items-center' style={{minHeight:"500px"}}>
                <div className='w-50 d-flex flex-column gap-4'>
                    <div>
                        <h3>Verify Email</h3>
                        <div>A verfication code has been sent to you enter the code below</div>
                    </div>
                    <div>
                        <form onSubmit={handleFormData}>
                            <div className='row row-gap-2'>
                                    <div className="form-group col">
                                        <label className='form-label'>Enter OTP *</label>
                                        <OTPInput                                        
                                            numInputs={6}
                                            value={otp}
                                            onChange={setOtp}
                                            renderSeparator={<span>-</span>}                                        
                                            renderInput={(props) => <input {...props} 
                                                style={{
                                                    width:"50px",
                                                    height:"60px",
                                                    textAlign:'center',
                                                    fontSize:'22px',
                                                    fontWeight:'bold'
                                                }}
                                                placeholder={0}
                                            />}
                                        />
                                </div>
                                <div className='form-group col'>
                                   <button className='btn btn-warning form-control'>Verify Email</button>                 
                                </div>                                
                            </div>
                        </form>
                        
                    </div>
                    <div className='d-flex gap-5'>                                     
                            <Link to='/login' className='text-decoration-none d-flex gap-2'><span className='bi bi-arrow-left-circle'></span>Back to login</Link>
                            <Link to='' className='text-decoration-none'  onClick={()=> dispatch(sendOTP(signUpData.email,navigate))}><span className='bi bi-arrow-repeat'></span> Resend it</Link>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyEmail