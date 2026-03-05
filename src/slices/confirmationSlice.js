import { createSlice } from "@reduxjs/toolkit";
const initialState={
    actionType:'',
    ids:{},
    isOpen:false,
    view:false
  
}

const confirmationSlice=createSlice({
    initialState:initialState,
    name:'confirmation',
    reducers:{
        openConfirmation(state,action){
            state.actionType=action.payload.actionType
            state.ids=action.payload.ids
        },
        closeConfirmation(state,action){
            state.actionType=null
        
            state.ids=null
        },
        setOpen(state,action){
            state.isOpen=action.payload
        },
        setView(state,action){
            state.view=action.payload
        }
    }
})

export const {openConfirmation,closeConfirmation,setOpen,setView} = confirmationSlice.actions
export default confirmationSlice.reducer;