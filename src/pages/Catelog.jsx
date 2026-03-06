import React, { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'
import { apiconnector } from '../services/apiconnector'
import Slider from '../components/core/Catelog/Slider'
import { convertToTitleCase } from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const Catelog = () => {
  const [courses,setCourses]=useState()
  const location=useLocation();
  const searchedCategory=location.pathname.split('/').at(-1)

  async function findAllCategory(){
    const response=await apiconnector("GET",'https://code-catalyst-backend.onrender.com/api/v1/course/show-all-categories')
    return response.data.allCategory
  }
  
  async function setSearchedCategory(){
    const allCategories=await findAllCategory()
    const categoryFound=allCategories.find(category=>category.categoryName===searchedCategory)
    console.log('category founded',)
    const response=await apiconnector('POST','https://code-catalyst-backend.onrender.com/api/v1/course/get-category-page-details',{categoryID:categoryFound._id})
    setCourses(response.data.allCourses)
  }


  useEffect(()=>{
    setSearchedCategory()
  },[searchedCategory])
  return (
    <div>
      <div className='container-fluid px-4 mt-4'>
        <h2 className='mb-5'>
            {convertToTitleCase(searchedCategory)} Courses
        </h2>
        <div>
            <h3>Courses to get you started</h3>
            <h6 className='text-thin text-secondary'>Explore courses from experienced, real-world experts.</h6>
            <Slider courses={courses}/>
        </div>
        
    </div>
    <Footer/>

    </div>
    
  )
}

export default Catelog