
import { Swiper,SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/navigation';
import SwiperCard from './SwiperCard';

const Slider = ({courses}) => {
  
  console.log('courses',courses)
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
              courses?.map(course=> 
                {return (<SwiperSlide>
                  <SwiperCard course={course}/>
                </SwiperSlide>)}
              )
            }
            
     </Swiper>
    
    </div>
  )
}

export default Slider