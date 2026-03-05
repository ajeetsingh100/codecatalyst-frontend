import React, { useRef, useState } from 'react'

import {  useDispatch, useSelector } from 'react-redux'
import { changeProfilePic } from '../../../../services/operations/settingsAPI'

const UpdateProfilePic = () => {
    const {user}=useSelector((state)=>state.profile)
    const dispatch=useDispatch()
    const [preview,setPreview]=useState('')
    const [image,setImage]=useState('')
    const inputRef=useRef(null)
    const handleClick=()=>{
        inputRef.current.click()    
    }
    const handleChange=(e)=>{
        setImage(e.target.files[0])
        handleFile(e.target.files[0])
    }
    const handleFile=(file)=>{
        const reader= new FileReader()
        reader.readAsDataURL(file)
    
        reader.onloadend=()=>{
            setPreview(reader.result)
        }    
    }

    function handlFormData(e){
        e.preventDefault()
        const formData= new FormData()
        formData.append('displayPicture',image)
        dispatch(changeProfilePic(formData)) 
    }
  return (
    <div>
        <div className='bg-richblack-900 rounded-5  text-white py-3 px-4'>
            <form action="" onSubmit={handlFormData}>
                <div className='border-white border border-2 rounded-5 overflow-hidden' style={{height:"55px",width:"55px"}}>
                    <img src={preview||user.image} alt="" className='img-fluid' />
                </div>
                <input type="file" name="" id="" ref={inputRef} hidden onChange={handleChange}/>
                <div className='d-flex gap-2 mt-2'>
                <button type='button' onClick={handleClick} className='btn btn-warning'>Select</button>
                <button className='btn btn-warning d-flex gap-2'><span className='bi bi-upload'></span>Upload</button>
                </div>
               
            </form>
        </div>
    </div>
  )
}

export default UpdateProfilePic