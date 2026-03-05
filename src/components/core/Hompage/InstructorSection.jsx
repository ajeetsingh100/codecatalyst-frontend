import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "./CTAButton"


const InstructorSection = () => {
  return (
    <div className='mt-5'>
      <div className='row'>

        <div className='col-6 d-flex justify-content-center'>
            <div className='w-75'>
                <img
                src={Instructor}
                alt=""
                className='shadow img-fluid'
            />
            </div>
        </div>

        <div className='col-6'>
            <div className='fs-4'>
                Become an
                <HighlightText text={" Instructor"} />
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                       
                    </div>
                </CTAButton>
            </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorSection
