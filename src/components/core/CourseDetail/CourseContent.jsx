import React from 'react'

const CourseContent = ({courseDetails}) => {
  return (
    <div>
        <h5 className='mb-4'>
            Course content
        </h5>
        <div className='text-thin text-secondary-emphasis mb-2'>{courseDetails?.courseSection.length} sections<span className='bi bi-dot'></span>{courseDetails?.totalCourseLectures} lectures<span className='bi bi-dot'></span>{courseDetails?.totalCourseDuration} total length</div>
        {
            courseDetails?.courseSection.map((section)=>{
                return (
                    <div className='accordion' id={`section-${section._id}`}>
                            <div className='accordion-item'>
                                    <h2 className='accordion-header bg-puregrey-25'>
                                        <div className='d-flex fs-6  p-3 justify-content-between' data-bs-toggle='collapse' data-bs-target={`#close-section-${section._id}`}>
                                            <div>{section.sectionName}</div>
                                            <div className='text-thin'>{section.subSection.length} lectures <span className='bi bi-dot'></span>{section.totalSectionDuration}</div> 
                                        </div>                                            
                                    </h2>
                                    <div id={`close-section-${section._id}`}  class="accordion-collapse collapse" data-bs-parent={`#section-${section._id}`}>
                                        <div className='accordion-body bg-puregrey-5'>
                                           <ul className='list-unstyled'>
                                                {
                                                    section.subSection.map(subSection=>
                                                        <li><i class="bi bi-file-earmark-play me-3"></i>{subSection.title}</li>
                                                    )
                                                }
                                           </ul>
                                        </div>
                                    </div>
                            </div>
                    </div>
                )
            })
        }        
    </div>
  )
}

export default CourseContent