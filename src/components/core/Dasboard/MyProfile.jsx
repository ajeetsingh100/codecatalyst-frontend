import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const {user}=useSelector((state)=>state.profile)
  const navigate=useNavigate()
  const navigateToEdit=()=>{
    console.log('navigate to settings')
    navigate('/dashboard/settings')
  }
  return (
    <div className='py-4'>      
      <div className='container d-flex gap-4 flex-column border border-1 shadow  p-3 text-white w-75 '>
        <h1 className='text-dark'>My Profile</h1>       
         {/*img  */}
        <div className='d-flex justify-content-between align-items-center bg-dark rounded-2 py-3  px-4'>
           <div className='d-flex align-items-center gap-3'>
            <div className='rounded-circle overflow-hidden' style={{width:"80px", height:"80px"}}><img src={user?.image} className='img-fluid' alt="" /></div>
             <div className='d-flex flex-column'>
              <div >{user?.firstName} { user?.lastName}</div>
              <div >{user?.email}</div>
             </div>
           </div>
          <button type="button" className='btn btn-sm btn-warning' onClick={navigateToEdit}><span className='bi bi-pencil-square'></span> Edit</button>
        </div>
        {/* about */}
        <div className='rounded-2 bg-dark px-4 py-3'>
          <div className='d-flex  justify-content-between align-items-center'>
            <div className='fw-bold'>About</div>
            <button type="button" className='btn  btn-sm btn-warning' onClick={navigateToEdit}><span className='bi bi-pencil-square'></span> Edit</button>
          </div>
          <div >{user?.additionalDetails.about}</div>
        </div>
        {/* person details */}
        <div className='rounded-2 bg-dark px-4 py-3'>
          <div className='d-flex justify-content-between'>
            <div className='fw-bold'>Person Details</div>
            <div className='btn btn-sm btn-warning'onClick={navigateToEdit}><span className='bi bi-pencil-square' ></span> Edit</div>
          </div>
          <div className='row row-gap-3'>
            <div className="col-6">
              <label htmlFor="" className='text-secondary'>First Name</label>
              <div className=''>{user?.firstName}</div>
            </div>
            <div className="col-6">
              <label htmlFor="" className='text-secondary'>Last Name</label>
              <div>{user?.lastName}</div>
            </div>
            <div className="col-6">
              <label htmlFor="" className='text-secondary'>Email</label>
              <div >{user?.email}</div>
            </div>
            <div className="col-6">
              <label htmlFor="" className='text-secondary'>Contact No</label>
              <div >{user?.additionalDetails.contactNo}</div>
            </div>
            <div className="col-6">
              <label htmlFor="" className='text-secondary'>Gender</label>
              <div >{user?.additionalDetails.gender}</div>
            </div>
            <div className="col-6">
              <label htmlFor="" className='text-secondary'>Date of Birth</label>
              <div>{user?.additionalDetails.dateOfBirth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile