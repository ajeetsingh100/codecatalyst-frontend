import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

const Requirement = ({value,onChange}) => {
    const [requirement,setRequirement]=useState('')
    const [requirementList,setRequirementList]=useState(value)
    const {course}=useSelector(state=>state.course)
    
    useEffect(()=>{onChange(requirementList)},[requirementList])

    function addRequirement(){
        if(requirement){
        setRequirementList([...requirementList,requirement])
        setRequirement('')
        }
    }
     function removeRequirement(removeindex){       
        setRequirementList(prev=>prev.filter((value,index)=>index!==removeindex))
    }
    function display(){
        console.log('updated course',course)
    }
        
  return (
    <div>
        <label htmlFor="" className='form-label'>Requirement/Instructions</label>
        <input type="text" name="" value={requirement} onChange={(e)=>setRequirement(e.target.value)}className='form-control' id="" />
        <button type='button' onClick={addRequirement} className='btn btn-warning mt-2'>Add Requirements</button>
            <ul className='mt-2'>
                {
                    requirementList.map((requirement,index)=>
                        <li>{requirement} <button type="button" className='btn rounded-pill btn-sm btn-secondary'  onClick={()=>removeRequirement(index)}>clear</button></li>
                    )
                }
            </ul>
            {/* <button type="button" onClick={display}>display</button> */}
    </div>
  )
}

export default Requirement