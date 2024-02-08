import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
function SwiperAuctions({ mainImage }) {
  const images = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
  ];

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
    <>
      <div className="flex w-fit gap-4 ">
        <div className="flex flex-col items-center justify-around">
          <Swiper
            className="h-64 w-64"
            ref={swiper1Ref}
            loop={true}
            modules={[FreeMode, Thumbs]}
          >
            {images?.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <img src={item} alt={i + 1} className="h-64 w-64" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className=" relative bottom-[8.5rem] z-10 flex w-full justify-between px-4 ">
            <button type="button" onClick={handleNextSlide}>
              <FaArrowLeft
                size={20}
                className="text-gray-100 opacity-50 hover:rounded-full hover:bg-gray-200/[0.5] hover:bg-gray-50 hover:opacity-100"
              />
            </button>
            <button type="button" onClick={handlePrevSlide}>
              <FaArrowRight
                size={20}
                className="text-gray-100 opacity-50 hover:rounded-full hover:bg-gray-200/[0.5] hover:bg-gray-50 hover:opacity-100"
              />
            </button>
          </div>
        </div>
        <Swiper
          ref={swiper2Ref}
          className="h-64 w-20"
          direction="vertical"
          loop={true}
          spaceBetween={16}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
        >
          {[...images.slice(1), images[0]]?.map((item, i) => {
            return (
              <SwiperSlide key={i} onClick={(e) => console.log(e)}>
                <img src={item} alt={i + 1} className="h-20 w-20" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default SwiperAuctions;
