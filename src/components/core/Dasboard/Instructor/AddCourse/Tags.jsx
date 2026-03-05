import React, { useEffect, useState } from 'react'


const CourseTags = ({value,onChange}) => {
    const [courseTags,setCourseTags]=useState(value)
    const [courseTag,setCourseTag]=useState('')

    useEffect(()=>{
        onChange(courseTags)
    },[courseTags])

    function addTag(e){
        e.preventDefault()
        if(courseTag){
            setCourseTags([...courseTags,courseTag])
            setCourseTag('')
        }
    }
     function removeTag(removeIndex){
            setCourseTags(prev=>prev.filter((value,index)=>index!==removeIndex))
        }
    
    function handleKey(e){
        if(e.key==="Enter"){
            addTag(e)
        }
        
    }

  return (
    <div>
        <label htmlFor="" className='form-label'>Tags</label>
        <input type="text" className='form-control' placeholder='Name your tag and Press Enter' name="" value={courseTag} onChange={(e)=>setCourseTag(e.target.value.toUpperCase())} onKeyDown={handleKey} id="" />
        <div className=' d-flex flex-wrap'>
            {
                courseTags.map((value,index)=>
                    <span className='badge rounded-pill bg-primary mt-2 me-2'>{value}<span className='bi bi-x' onClick={()=>removeTag(index)}></span></span>
                )
            }
        </div>
    </div>
  )
}

export default CourseTags