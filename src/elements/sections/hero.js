import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectFade } from "swiper/modules";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { Autoplay, Pagination, Navigation, EffectCoverflow, EffectCreative } from "swiper/modules";

import img1 from "../../img/hero/1.png";
import img2 from "../../img/hero/2.png";
import img3 from "../../img/hero/3.png";
import img4 from "../../img/hero/4.png";

export const Hero = () => {
  return (
    <div style={{ background: "#FEFCF9", height: "800px", padding: "0px 100px" }}>
      <Swiper
        effect={"creative"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        // coverflowEffect={{
        //   rotate: 50,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: true
        // }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-125%", 0, -800],
            rotate: [0, 0, -90]
          },
          next: {
            shadow: true,
            translate: ["125%", 0, -800],
            rotate: [0, 0, 90]
          }
        }}
        navigation={true}
        modules={[EffectCreative, EffectCoverflow, EffectCards, Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
      >
        <SwiperSlide style={{ height: "400px" }}>
          <img src={img1} alt="1" style={{ width: "50%", objectFit: "contain" }} />
          <div>Buy</div>
        </SwiperSlide>
        <SwiperSlide style={{ height: "400px" }}>
          <img src={img2} alt="1" style={{ width: "50%", objectFit: "contain" }} />
        </SwiperSlide>
        <SwiperSlide style={{ height: "400px" }}>
          <img src={img3} alt="1" style={{ width: "50%", objectFit: "contain" }} />
        </SwiperSlide>
        <SwiperSlide style={{ height: "400px" }}>
          <img src={img4} alt="1" style={{ width: "50%", objectFit: "contain" }} />
        </SwiperSlide>
        ...
      </Swiper>
    </div>
  );
};
