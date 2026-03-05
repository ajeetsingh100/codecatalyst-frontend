import React from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/navigation';
import ReviewCard from './ReviewCard';

const ReviewSlider = ({course}) => {
  return (
    <div>
         <Swiper
      // install Swiper modules
          modules={[Navigation, FreeMode]}
          spaceBetween={25}
          slidesPerView={4}
          navigation={true}                
        >
            {
              course?.ratingAndReviews.map(ratingAndReviews=> 
                {return (<SwiperSlide>
                  <ReviewCard ratingAndReviews={ratingAndReviews}/>
                </SwiperSlide>)}
              )
            }
            
     </Swiper>
    </div>
  )
}

export default ReviewSlider