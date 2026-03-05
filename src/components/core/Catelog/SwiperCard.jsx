import React from 'react'
import { Link } from 'react-router-dom'

const SwiperCard = ({course}) => {
  return (
    <div>
          <div className='card' style={{width:"19rem",height:"22rem"}}>
              <div className="card-body">
                  <img src={course?.thumbnail} alt="" className='card-img-top' />
                  <div className='d-flex flex-column gap-2 mt-2'>
                      <div>
                          <div className="fs-5 fw-bolder">{course?.courseName}</div>                  
                          <div className='text-thin' style={{fontSize:"14px"}}>{course?.instructor.firstName+" "+course?.instructor.lastName}</div> 
                      </div>
                      <div className='d-flex gap-1 fs-6'>
                          <div className=' badge text-success bg-caribbeangreen-25'>Bestseller</div>   
                          <div className='badge border-secondary text-secondary border-1 border  text-thin'><i className='bi bi-star-fill text-warning'></i> 4.7</div>
                          <div className='badge border-secondary border-1 border text-secondary text-thin'> 14170 ratings</div>                      
                      </div>
                      <div>
                            <Link to={`/course/${course._id}`}>₹{course.price}</Link>                                            
                      </div>                                  
                      
                 </div>
              </div>
          </div>
    </div>
  )
}

export default SwiperCard