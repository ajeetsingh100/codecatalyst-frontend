import React from 'react'
import ReactStars from 'react-stars'

const ReviewCard = ({ratingAndReviews}) => {
  return (
    <div>
        <div className='card p-2' style={{width:'22rem', height:"180px", fontSize:"15px"}}>
            <div className='card-body  '>
                <div className='row'>
                    <div className='col-3  '>
                    <div style={{width:"50px"}}>
                        <img src={ratingAndReviews.user.image} className='img-fluid rounded-circle' alt="" />
                    </div>
                </div>
                <div className='col-7 '>
                  <div>
                      {ratingAndReviews.user.firstName+" "+ ratingAndReviews.user.lastName}
                  </div>
                  <div className='d-flex gap-2'>
                    <div>{ratingAndReviews.rating}</div>
                    <div >
                        <ReactStars
                            value={ratingAndReviews.rating}
                            edit={false}
                        />
                    </div>
                  </div>
                </div>
                <div className='col-2 '>
                    <i class="bi  fs-3 bi-chat-text"></i>
                </div>
            </div>
            <div className=' mt-2'>
                {ratingAndReviews.review}
            </div>  
            </div>
             {/* user review */}
            
        </div>
    </div>
  )
}

export default ReviewCard