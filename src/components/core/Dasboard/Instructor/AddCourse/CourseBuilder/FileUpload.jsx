import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'


const FileUpload = ({value='',onChange,accept}) => {
    const [isFileUploaded,setFileUploaded]=useState(false)
    const [preview,setPreview]=useState('')
    const [isImage,setIsImage]=useState(true)
    const {editSubSection,editCourse}=useSelector(state=>state.course)
    const {view}=useSelector(state=>state.confirm)
    const dispatch=useDispatch()
   

    const onDrop=(files)=>{
        const file=files[0]  
        onChange(file)
       
    }
     const {getRootProps, getInputProps, open} = useDropzone({noClick: true, accept: accept,onDrop:onDrop});
    const handleFile=(file)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
        setPreview(fileReader.result)
        }
    }
    const handleRemove=()=>{
        setPreview(null)
        setFileUploaded(false)
    }    
  useEffect(()=>{
    console.log('value=>',value)
    console.log('editSubSection:',editSubSection)
    console.log('editCourse:',editCourse)
   if (editCourse) {
      if (value instanceof File) {
        if (value.type.startsWith("image")) {
          const preview =handleFile(value)
          setPreview(preview)
          setIsImage(true)
        }
      } else {
        // existing image url (from backend)
        setPreview(value);
        setIsImage(true);
      }
      setFileUploaded(true);
      return;
    }
    if(editSubSection){
      console.log('value ek link hai',value)
      console.log('editSubSection',editSubSection) 
      console.log('isImage:',isImage)
     
      if(value instanceof File){
        console.log('file hai ye ')
        const preview=URL.createObjectURL(value)
        setPreview(preview)   
        setFileUploaded(true); 
        setIsImage(false)    
        return
      }
      console.log('setting preview, fileuploaded, isImage')
      setPreview(value);  
      setFileUploaded(true); 
      setIsImage(false)
      console.log('successfullly assigned preview, fileuploaded, isImage')
      return
    }
    if(value instanceof File){
      if(value.type.startsWith('image')){
        const preview=handleFile(value)
        setPreview(preview)
        setFileUploaded(true)
        setIsImage(true)
        return
      }
      if(value.type.startsWith('video')){
        const preview=URL.createObjectURL(value)
        setPreview(preview)   
        setFileUploaded(true); 
        setIsImage(false)    
        console.log('after setting preview')
        return 
      }       
    }
    if(!editSubSection){
     setFileUploaded(false)
    }
   
    
  },[editCourse,editSubSection,value])

  return (
    <section className="container rounded-3 border-1 border border-richblack-600 bg-richblack-800  align-items-center px-4 py-3 d-flex justify-content-center" style={{height:"310px"}}>
      { isFileUploaded?<div>{
        isImage?<div className=' w-100 text-center ' style={{height:"270px"}}>
            <div className='w-100 overflow-hidden' style={{height:"250px"}}>
                <img src={preview} className='img-fluid' alt="image" style={{objectFit:"contain"}} />
            </div>
            <div  className='mt-2 text-decoration-underline ' style={{fontSize:"14px",fontWeight:"300",cursor:"pointer"}} onClick={handleRemove}> Cancel</div>

        </div>:
        <div className='text-center  ' style={{height:"250px"}}>
        <video src={preview} controls width="440" alt='video' ></video>
        { !view && <div  className=' text-decoration-underline text-white ' style={{fontSize:"14px",fontWeight:"300",cursor:"pointer"}} onClick={handleRemove}> Cancel</div>}
        </div>
        }
        
      </div>
        
        :<div {...getRootProps({className:'dropzone w-100  w-100 d-flex justify-content-center align-items-center', style:{height:"230px"}})} >
             <input {...getInputProps()} />
            <div className='w-50 d-flex flex-column align-items-center gap-1'>
                <div className='rounded-circle bg-richblack-900 text-center overflow-hidden' style={{width:"50px",height:"50px"}} ><i class="bi bi-cloud-arrow-up text-warning fs-2"></i></div>
                <div className='w-75 text-center ' style={{fontSize:"14px"}}>
                  Drag n Drop an image, or click on <span className='text-warning' style={{cursor:"pointer"}} onClick={open}>Browse</span> a file
                </div>             
            </div>
        </div>      
      }        
    </section>
  );
}

export default FileUpload