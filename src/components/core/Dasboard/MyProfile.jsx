import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {

  const { user } = useSelector((state)=>state.profile)
  const navigate = useNavigate()

  const navigateToEdit = () =>{
    navigate('/dashboard/settings')
  }

  return (
    <div className="py-4">
      <div className="container border shadow p-3 text-white" style={{maxWidth:"80rem"}}>

        <h1 className="text-dark mb-4">My Profile</h1>

        {/* Profile Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-dark rounded-2 py-3 px-3 px-md-4 gap-3">

          <div className="d-flex flex-column flex-sm-row align-items-center gap-3 text-center text-sm-start">

            <div
              className="rounded-circle overflow-hidden"
              style={{width:"70px", height:"70px"}}
            >
              <img src={user?.image} className="img-fluid" alt="" />
            </div>

            <div>
              <div className="fw-bold">
                {user?.firstName} {user?.lastName}
              </div>

              <div className="text-secondary small">
                {user?.email}
              </div>
            </div>

          </div>

          <button
            className="btn btn-sm btn-warning"
            onClick={navigateToEdit}
          >
            <span className="bi bi-pencil-square"></span> Edit
          </button>

        </div>

        {/* About Section */}
        <div className="rounded-2 bg-dark px-3 px-md-4 py-3 mt-4">

          <div className="d-flex justify-content-between align-items-center mb-2">

            <div className="fw-bold">About</div>

            <button
              className="btn btn-sm btn-warning"
              onClick={navigateToEdit}
            >
              <span className="bi bi-pencil-square"></span> Edit
            </button>

          </div>

          <div className="text-secondary">
            {user?.additionalDetails?.about || "No bio added"}
          </div>

        </div>

        {/* Personal Details */}
        <div className="rounded-2 bg-dark px-3 px-md-4 py-3 mt-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <div className="fw-bold">Personal Details</div>

            <button
              className="btn btn-sm btn-warning"
              onClick={navigateToEdit}
            >
              <span className="bi bi-pencil-square"></span> Edit
            </button>

          </div>

          <div className="row g-3">

            <div className="col-12 col-md-6">
              <label className="text-secondary small">First Name</label>
              <div>{user?.firstName}</div>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-secondary small">Last Name</label>
              <div>{user?.lastName}</div>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-secondary small">Email</label>
              <div>{user?.email}</div>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-secondary small">Contact No</label>
              <div>{user?.additionalDetails?.contactNo}</div>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-secondary small">Gender</label>
              <div>{user?.additionalDetails?.gender}</div>
            </div>

            <div className="col-12 col-md-6">
              <label className="text-secondary small">Date of Birth</label>
              <div>{user?.additionalDetails?.dateOfBirth}</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default MyProfile