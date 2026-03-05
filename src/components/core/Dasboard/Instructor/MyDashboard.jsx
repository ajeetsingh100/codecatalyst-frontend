import React, { useEffect, useState } from 'react'
import PieChart from '../../PieChart/PieChart'


import { apiconnector } from '../../../../services/apiconnector'
import Loader from '../../../common/Loader'
const MyDashboard = () => {
   
      const [user,setUser]=useState(null)
       const [pie_data,setData]=useState([])
        const [label,setLabel]=useState('')
        const [pie_label,setPieLabel]=useState([])
        const [totalIncome,setTotalIncome]=useState([0])
        const showStudentState=()=>{
            if(user?.courses.length!==0){
                setPieLabel('Student Enrolled')
                const Label=user?.courses.map(course=>{
                    if(course.courseName?.length>10)
                        return course.courseName.slice(0,11)+'...'
                    return course.courseName
                })
                setLabel(Label)
                const Data=user?.courses.map(course=>{
                    if(course.studentEnrolled?.length!==0)
                    return course.studentEnrolled?.length
                    return 0
                })
                setData(Data)

            }
            return
       
         
        }
      const showIncomeState=()=>{
        if(user?.courses.length!==0){
            setPieLabel('Total Income')
            const Label=user?.courses.map(course=>{
              if(course.courseName?.length>10)
                  return course.courseName.slice(0,11)+'...'
              return course.courseName
          })
          setLabel(Label)
          const Income=user.courses.map(course=>{
              if(course.studentEnrolled.length!==0)
              {
                return course.price*course.studentEnrolled.length            
              }
              return 0
               
          })
          setData(Income)
        }
          return
        }

      useEffect(()=>{
        const loadUserStat=async()=>{
            const response=await apiconnector("get",'https://code-catalyst-wkk9.onrender.com/api/v1/course/get-instructor-stat')
            setUser(response.data.user)
        }
        loadUserStat()
        
      },[])
      useEffect(()=>{
        if(user?.courses.length!==0){
            const IncomeArray=user?.courses.map(course=>{
                if(course.studentEnrolled?.length!==0){
                    return course.price*course.studentEnrolled?.length
                }
                return 0
            })      
        setTotalIncome(IncomeArray)
        showStudentState()
        }
    },[user])
  return (
    <div className='p-2'>
        {
            user?<div className="container mt-4" style={{ maxWidth: "65rem" }}>
            <div>
                <h4>Hi, {user.firstName+' '+user.lastName}  </h4>
                <p>Let's start something new</p>
            </div>
            <div className='d-flex justify-content-between gap-2 '>
                <div className=' text-white bg-richblack-700 w-75 rounded px-4 py-4'>
                    <div>
                        Visualize
                        <div className='mt-2 '>
                            <button className='btn btn-primary me-2 btn-sm' onClick={showStudentState}>Student</button>
                            <button className='btn btn-primary btn-sm' onClick={showIncomeState}>Income</button>
                        </div> 
                       
                    </div>
                {user?.courses.length!==0?<PieChart label={label} pie_data={pie_data} pie_label={pie_label}/>:<div>Since you have not created any course yet we're unable to show any data</div>}
            </div>
            <div className='bg-richblack-700 rounded w-25 p-3 text-white'>
                <div className=' text-richblack-200'>Courses Created <p className='text-white fs-3'>{user.courses.length>0?user?.courses.length:0}</p></div>
                <div className='text-richblack-200'>Enrolled Students <p className='text-white fs-3'>{user.courses.length>0?user?.courses.reduce((acc,course)=>acc+course.studentEnrolled.length,0):0}</p> </div>
                <div className=' text-richblack-200'>Total Income <p className='text-white fs-3'>{totalIncome?.reduce((acc,income)=>acc+income,0)}</p></div>
            </div>

            </div>
            
        </div>:<Loader/>
        }
       
        
        


    </div>
  )
}

export default MyDashboard