import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { setUser } from "../../slices/profileSlice"
import { setToken,setLoading } from "../../slices/authSlice"
export const login=(email,password,navigate)=>{
    return async(dispatch)=>{
        const toastID=toast.loading("Signing in")

        try {
            const response=await apiconnector('post','https://code-catalyst-backend.onrender.com/api/v1/user/login',
                {
                    email,
                    password
                }
            )
            
            console.log('login successfull')
            
            toast.success('Login successfull',{toastID})
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            
            navigate("/dashboard")
        } catch (error) {
            console.log(error.response.message)
            toast.error("Unable to login")
        }
       toast.dismiss(toastID)

    }
}
export const logout=(navigate)=>{
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("user")
        localStorage.removeItem('token')
        toast.success("logged out")
        navigate('/')
    }
}

export const sendOTP=(email,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            const response=await apiconnector("POST",'https://code-catalyst-backend.onrender.com/api/v1/user/sendotp',{
                email
            })
            console.log('hello',response)
            toast.success('otp send successfully')
            console.log('otp send successfully',response)
            navigate('/verify-email')
        } catch (error) {
            console.log(error.response.data.error)         
            
            
        }   
        dispatch(setLoading(false))
        
    }
}

export const resetPasswordToken=(email,setSentEmail,setEmail)=>{
    return async(dispatch)=>{
        const toastID=toast.loading("Sending Email...")
        dispatch(setLoading(true))
        try {
            const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/user/reset-password-token',{
                email
            })
            console.log(response)
            setSentEmail(true)
            setEmail(email)
            toast.success('Email Sent Successfully',{id:toastID})
        } catch (error) {
            toast.error("Unable to Send Email!!!",{id:toastID})
            console.log(error.response.message)
        }
        dispatch(setLoading(false))
    }
}

export const resetPassword=(pass,confirmPass,token,setPassChange)=>{
    return async(dispatch)=>{
        const toastID=toast.loading('please wait...')        
        try {
            const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/user/reset-password',{
                pass,
                confirmPass,
                token
            })
            console.log(response)
            toast.success('password reset successfully',{id:toastID})
            setPassChange(true)
               

        } catch (error) {
            toast.error('unable to reset password',{id:toastID})
             console.log(error.response.message)
        }
    }
}

export const signUp=(signUpData,otp,navigate)=>{
    return async(dispatch)=>{
        
        dispatch(setLoading(true))
        try {
            const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/user/signup',{
                ...signUpData,
                otp
            })
            console.log(response)
            toast.success("Congratulations! User is created in database")            
            navigate('/login')
            } catch (error) {
            console.log(error.response.data.message)
        }
        dispatch(setLoading(false))
        
    }
}