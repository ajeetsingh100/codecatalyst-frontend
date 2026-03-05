import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description:"Students will always be our priority ",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description:"Code you way to a solution",
    },
];

const TimelineSection = () => {
  return (
    <div className=''>
      <div className=' row '>

        <div className='col-6 '>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='' key={index}>
                            <div className='d-flex p-3 gap-3 align-items-baseline'>
                                <div className='position-relative'>
                                    <div className=' d-flex justify-content-center align-items-center z-1 bg-white p-2 rounded-circle' style={{width:"40px"}}>
                                        <img src={element.Logo}  />
                                    </div>
                                    
                                     {index==0&&<div style={{width:'2px', height:"22rem"}} className='bg-puregrey-25 position-absolute top-100 z-0 start-50'>

                                     </div>}
                                </div>

                                <div>
                                    <h2 className='' style={{fontSize:'18px'}}>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                            
                            <div className={` ${index === 3 ? "hidden":""}   h-14 
                            border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}>

                            </div>
                        </div>
                    )
                } )
            }
           
        </div>
        <div className='col-6 position-relative d-flex justify-content-center p-4 shadow rounded border' >
            <div className='' >
                 <img  src={timelineImage}
                    alt="timelineImage"
                    className='img-fluid'
                    />
            </div>
           

            <div className=' p-3 d-flex justify-content-between
            text-white bg-caribbeangreen-700 
            w-75 position-absolute bottom-0 
             '>
                <div className='d-flex gap-4 '>
                    <p className='fs-4'>10</p>
                    <p className='text-caribbeangreen-300 text-sm w-[75px]' style={{width:'75px'}}>Years of Experience</p>
                </div>

                <div className='d-flex gap-4 items-center lg:px-14 px-7'>
                <p className='fs-4 font-bold w-[75px]'>250</p>
                    <p className='text-caribbeangreen-300 text-sm' style={{width:"75px"}}>Type of Courses</p>
                </div>

            </div>

        </div>

      </div>
    </div>
  )
}

export default TimelineSection
