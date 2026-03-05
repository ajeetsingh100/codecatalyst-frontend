import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../../../slices/cartSlice'
import EmptyCart from './EmptyCart'
import { createOrder } from '../../../../services/operations/paymentAPI'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
    const {cart,totalPrice}=useSelector((state)=>state.cart)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector((state)=>state.profile)
    let count=1
    function buyAllCourse(){
        createOrder(cart,navigate,dispatch,user)
    }
  return (
    <div className='container-fluid px-4 py-3'>
        <h3>Your Cart</h3>
        {
            cart.length===0?<EmptyCart/>:(
            
            <div className='container row'>
                <div className='col-8'>
                    <table className='table'>
                        <tbody>
                                {
                                cart.map((course)=>
                                <tr className='text-thin'>
                                    <td>
                                        <div style={{maxWidth:"75px"}} className=' ' >
                                            <img src={course?.thumbnail}  className=' img-thumbnail ' alt="" />
                                        </div>
                                    </td>
                                    <td>{course.courseName}</td>
                                    <td>₹{course.price}</td>
                                    <td>
                                        <div onClick={()=>dispatch(removeFromCart(course))} className='pointer text-secondary-emphasis'>Remove</div>
                                    </td>
                                </tr>
                                )
                                }
                        </tbody>
                     </table> 
                </div>                
                <div className='col-4'>
                    <div className="card">
                        <div className='card-body d-flex flex-column gap-2'>
                            <div className='card-text'>Total Price</div>
                            <div className='card-text'>₹{totalPrice}</div>
                            <div className='btn btn-warning' onClick={()=>buyAllCourse()}>Proceed to Checkout</div>
                        </div>
                    </div>
                </div>

            </div>

        
            
           ) 
        }
        
    </div>
  )
}

export default Wishlist