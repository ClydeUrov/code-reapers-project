import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
function SwiperAuctions({ mainImage, images }) {
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);

  function handleNextSlide() {
    swiper1Ref.current.swiper.slideNext();
    swiper2Ref.current.swiper.slideNext();
  }

  function handlePrevSlide() {
    swiper1Ref.current.swiper.slidePrev();
    swiper2Ref.current.swiper.slidePrev();
  }

  return (
    <div className="flex">
      <Swiper
        className="h-40 w-40"
        ref={swiper1Ref}
        loop={true}
        navigation={{
          prevEl: "swiper_prev",
          nextEl: "swiper_next",
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images?.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <img src="asdsadas.com" alt={i + 1} className="h-40 w-40" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button type="button" onClick={handleNextSlide}>
        ⬅️
      </button>
      <button type="button" onClick={handlePrevSlide}>
        ➡️
      </button>
      <Swiper
        ref={swiper2Ref}
        className="h-40 w-40"
        direction="vertical"
        loop={true}
        spaceBetween={16}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images?.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <img src="asdsadas.com" alt={i + 1} className="h-10 w-10" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
  //     <div className="flex justify-between">
  //       <Swiper
  //         spaceBetween={50}
  //         slidesPerView={2}
  //         onSlideChange={() => console.log("slide change")}
  //         onSwiper={(swiper) => console.log(swiper)}
  //       >
  //         {images.map((el, i) => (
  //           <SwiperSlide key={i}>
  //             <img src={el} alt="" className="h-10 w-10" />
  //           </SwiperSlide>
  //         ))}
  //       </Swiper>
  //       <Swiper
  //         spaceBetween={50}
  //         slidesPerView={3}
  //         onSlideChange={() => console.log("slide change")}
  //         onSwiper={(swiper) => console.log(swiper)}
  //       >
  //         {images.map((el, i) => (
  //           <SwiperSlide key={i}>
  //             <img src={el} alt="" className="h-10 w-10" />
  //           </SwiperSlide>
  //         ))}
  //       </Swiper>
  //     </div>
  //   );
}

export default SwiperAuctions;
