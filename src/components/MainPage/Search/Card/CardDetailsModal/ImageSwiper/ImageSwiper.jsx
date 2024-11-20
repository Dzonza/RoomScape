import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import './imageSwiper.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ImageSwiper = ({ images }) => {
  return (
    <div className="image-modal-container">
      <Swiper
        className="swiper"
        modules={[Pagination, EffectCoverflow, Autoplay]}
        centeredSlides={true}
        grabCursor={true}
        spaceBetween={0}
        loop={true}
        effect={'coverflow'}
        slidesPerView={'auto'}
        autoplay={{ pauseOnMouseEnter: true, delay: 2000 }}
        speed={1100}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
      >
        <div>
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index} className="swiper--slide">
                <img
                  className="swiper-img"
                  src={image}
                  alt="image of apartment"
                />
              </SwiperSlide>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
