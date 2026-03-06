
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
  modules={[Navigation, FreeMode]}
  spaceBetween={20}
  navigation={true}
  freeMode={true}

  breakpoints={{
    320: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4
    }
  }}
>

{
  courses?.map((course) => (
    <SwiperSlide key={course._id}>
      <SwiperCard course={course}/>
    </SwiperSlide>
  ))
}

</Swiper>
    </div>
  )
}

export default Slider