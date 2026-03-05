import React from 'react'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'
import UpdateAbout from './UpdateAbout'
import UpdateProfilePic from './UpdateProfilePic'


const Settings = () => {
  return (
    <div>
      <div className='container-fluid  d-flex justify-content-center'>
        <div className='w-75 d-flex gap-4 flex-column py-3'>
          <UpdateProfilePic/>
          <UpdateAbout/>
          <UpdateProfile/>
          <UpdatePassword/>
        </div>
      </div>
      
    </div>
  )
}

export default Settings