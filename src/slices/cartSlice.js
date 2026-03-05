import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState={
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem('totalItems')):0,
    totalPrice:localStorage.getItem('totalPrice')?JSON.parse(localStorage.getItem('totalPrice')):0,
    cart:localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[],
}

const cartSlice=createSlice({
    initialState:initialState,
    name:'cart',
    reducers:{
        addToCart(state,action){
            const course=action.payload
            const index=state.cart.findIndex((item)=>item._id===course._id)
            if(index>=0){
                toast.error('Item already exist in cart')
                return
            }
            state.totalItems+=1
            state.totalPrice+=parseFloat(course.price)
            state.cart.push(course)
            toast.success('Item added in cart')
        },
        removeFromCart(state,action){
            const course=action.payload
            const index=state.cart.findIndex((item)=>item._id===course._id)
            if(index===-1){
                toast.error('Item not exist in the cart')
                return
            }
            state.totalItems--
            state.totalPrice-=parseFloat(course.price)
            state.cart.splice(index,1)
            toast.success('Item removed from cart')
        },
        resetCart(state){
            state.cart=[]
            state.totalItems=0
            state.totalItems=0
        }
    }
})

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions
export default cartSlice.reducer;