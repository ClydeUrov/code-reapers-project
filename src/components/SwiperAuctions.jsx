import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

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

  if (!images) return <h2>Error</h2>;

  return (
    <>
      <div className="relative flex w-full flex-col gap-4 ">
        <div className="flex flex-col items-center justify-around">
          <Swiper
            className="h-[54dvh] w-full"
            ref={swiper1Ref}
            loop={true}
            modules={[FreeMode, Thumbs]}
          >
            {images?.map((item, i) => {
              return (
                <SwiperSlide key={item.id} data-number={i}>
                  <img
                    src={item.image}
                    alt={i + 1}
                    className="h-full w-full object-fill"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className=" absolute top-[25dvh] z-10 flex w-full justify-between px-4 ">
            <button type="button" onClick={handleNextSlide}>
              <FaArrowLeft
                size={32}
                className="text-gray-100 opacity-50 hover:rounded-full hover:bg-gray-200/[0.5] hover:bg-gray-50 hover:opacity-100"
              />
            </button>
            <button
              type="button"
              className=" p-2 hover:rounded-full hover:bg-gray-50/50"
              onClick={handlePrevSlide}
            >
              <FaArrowRight
                size={32}
                className="text-gray-100 opacity-70 hover:text-gray-100/90  "
              />
            </button>
          </div>
        </div>
        <Swiper
          ref={swiper2Ref}
          className="w-full"
          // direction="horizontal"
          loop={true}
          spaceBetween={16}
          slidesPerView={3}
          // freeMode={true}
          // watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
        >
          {[...images.slice(1), images[0]]?.map((item, i) => {
            return (
              <SwiperSlide key={item.id}>
                <img
                  src={item.image}
                  alt={i + 1}
                  className="h-[14dvh] w-full  object-fill"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default SwiperAuctions;
