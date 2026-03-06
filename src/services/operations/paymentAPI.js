import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import rzp_logo from '../../assets/Logo/rzp_logo.png'
import { resetCart } from "../../slices/cartSlice"


const loadScript=(src)=>{
    return new Promise((resolve,reject)=>{
        const script=document.createElement('script')
        script.src=src
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            reject(false)
        }
        document.body.appendChild(script)
    })
}

export const createOrder=async(courses,navigate,dispatch,userDetails)=>{
    const toastID=toast.loading('please wait...')
    try {
        const result=await loadScript('https://checkout.razorpay.com/v1/checkout.js')
           if (!result) {
            toast.error("RazorPay SDK failed to load");
            return;
        }
        const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/payment/capturePayment',{courses:courses})
        console.log('MY_VAR:',process.env.REACT_APP_RAZORPAY_KEY)
        const options={
            key:process.env.REACT_APP_RAZORPAY_KEY,
            amount:response.data.orderResponse.amount,
            currency:response.data.orderResponse.currency,
            order_id:response.data.orderResponse.id,
            name:"CodeCatalyst",
            description:"Thank You for purchasing course",
            img:rzp_logo,
            prefill:{
                name:`${userDetails.firstName+userDetails.lastName}`,
                email:`${userDetails.email}`
            },            
            handler:(response1)=>{
                console.log('Response from create order response',response1)
                verifyPayment({...response1,courses},navigate,dispatch)
                sendEmail(response1,response.data.orderResponse.amount)
            }
        }
        const paymentObject=new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on('payment.failed',(response)=>{
            toast.error('OOPs, payment failed',{id:toastID})
            console.log(response.error)
        })
        
    } catch (error) {
        console.log('PAYMENT API ERROR...',error)
        toast.error('Could not make payment',error)
    }
    toast.dismiss(toastID)
}
async function  sendEmail(response1,amount){
    try {
        await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/payment/sendPaymentSuccessEmail',{
            orderId:response1.razorpay_order_id,
            paymentId:response1.razorpay_payment_id,
            amount
        })

    } catch (error) {
        console.log('unable to send successfully email',error)
        toast.error("Unable to send successfull mail")
    }
}

async function verifyPayment(formData,navigate,dispatch){
    const toastID=toast.loading("Verifying Payment...")
    try {
        const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/payment/verifyPayment',formData)
        console.log('verifyPayment response:',response)
        toast.success('Payment is verified',{id:toastID})
        dispatch(resetCart())
        navigate('/dashboard/enrolled-courses')
        
    } catch (error) {
        toast.error("Unable to verify payment",{id:toastID})
        console.log('Unable to verify payment',error.response.data.message)
    }
}